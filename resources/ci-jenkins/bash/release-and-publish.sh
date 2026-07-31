#!/bin/bash

# exit on error
set -e

echo 'RUNNING SCRIPT: release-and-publish.sh'
cd "$(dirname "$0")/../../.."

# op Jenkins is de checkout gedaan door een andere user (jnlp container) dan de user
# die dit script draait (root in de cypress container) - zonder safe.directory weigert
# git dan elke operatie
git config --global --add safe.directory "$(pwd)"

# branchnaam bepalen: BRANCH_NAME (multibranch) of GIT_BRANCH - de Jenkins checkout
# staat in detached HEAD, dus git rev-parse zou enkel 'HEAD' teruggeven. De
# rev-parse fallback is er voor een lokale run.
if [[ -n "${BRANCH_NAME:-}" ]]; then
    GIT_REF_NAME="${BRANCH_NAME}"
elif [[ -n "${GIT_BRANCH:-}" ]]; then
    GIT_REF_NAME="${GIT_BRANCH#origin/}"
else
    GIT_REF_NAME=$(git rev-parse --abbrev-ref HEAD)
fi
echo using $GIT_REF_NAME as GIT_REF_NAME

# determine the branch type
DEVELOP_BRANCH=false
RELEASE_BRANCH=false

if [[ ${GIT_REF_NAME} == *"develop"* ]] || [[ ${GIT_REF_NAME} == *"bugfix"* ]];
  then
    echo "--------------------------------------"
    echo "develop branch detected - beta release"
    echo "--------------------------------------"
    DEVELOP_BRANCH=true
fi

if [[ ${GIT_REF_NAME} == *"release"* ]];
  then
    echo "---------------------------------"
    echo "release branch detected - release"
    echo "---------------------------------"
    RELEASE_BRANCH=true
fi

if [[ ${DEVELOP_BRANCH} == false ]] && [[ ${RELEASE_BRANCH} == false ]];
  then
    echo "no develop or release branch detected - stopping build"
    exit 0
fi

# op Jenkins wordt GITHUB_TOKEN gezet via withCredentials (credentialsId 'github')
if [[ -z ${GITHUB_TOKEN+x} ]];
  then
    echo "GITHUB_TOKEN is NIET gezet, NOK - stop"
    exit 1
  else
    echo "GITHUB_TOKEN is gezet, OK"
fi

# the remote set by the CI server is not authenticated, so remove the remote and add one with authentication
# de 'x-access-token' username werkt met het GitHub App token dat Jenkins aanlevert
echo 'git remote rm origin'
git remote rm origin &> /dev/null
echo 'git remote add origin https://x-access-token:${GITHUB_TOKEN}@github.com/milieuinfo/flux-web-components.git'
git remote add origin https://x-access-token:${GITHUB_TOKEN}@github.com/milieuinfo/flux-web-components.git &> /dev/null
echo 'git fetch --prune origin'
git fetch --prune origin &> /dev/null
# Jenkins kan een shallow clone maken; semantic-release heeft de volledige historiek
# nodig om de vorige versie te bepalen
if [[ "$(git rev-parse --is-shallow-repository)" == "true" ]];
  then
    echo 'git fetch --unshallow origin'
    git fetch --unshallow origin &> /dev/null
fi
# op Jenkins staat de checkout in detached HEAD - de branch expliciet uitchecken,
# want semantic-release moet op de branch zelf draaien
echo "git checkout ${GIT_REF_NAME}"
git checkout ${GIT_REF_NAME}
echo 'git pull origin ${GIT_REF_NAME}'
git config pull.ff only
git pull origin ${GIT_REF_NAME}
# the git fetch is necessary -> otherwise semantic-release is unaware of the previous version
# this gives 'does not point to a valid object!' errors - they can be ignored
echo 'delete all local git tags'
# op een verse Jenkins clone kunnen er nog geen lokale tags zijn - 'git tag -d' zonder
# argumenten zou dan falen onder 'set -e'
if [[ -n "$(git tag -l)" ]];
  then
    git tag -d $(git tag -l) &> /dev/null
fi
echo 'fetch all remote git tags'
git fetch --all --tags --force &> /dev/null

GITHUB_USER=kspeltix
GITHUB_EMAIL=kris.speltincx@vlaanderen.be
echo 'git config user.name'
git config user.name ${GITHUB_USER}
git config user.name
echo 'git config user.email'
git config user.email ${GITHUB_EMAIL}
git config user.email

echo "npm install - no 'ci' to avoid the clean"
set +e
npm install --save-exact 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "npm install - success"
  else
    echo "npm install - error - buffer-stderr.txt" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e

echo "generate web-types - bring them up-to-date, semantic-release will commit them"
set +e
npm run libs:web-types:generate 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "generate web-types - success"
  else
    echo "generate web-types - error - buffer-stderr.txt" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e

if [[ ${RELEASE_BRANCH} == true ]];
  then
    echo "semantic-release - '.releaserc-release' script wordt gebruikt"
    cp ./resources/ci-jenkins/release/.releaserc-release .releaserc
fi

if [[ ${DEVELOP_BRANCH} == true ]];
  then
    echo "semantic-release - '.releaserc-develop' script wordt gebruikt"
    cp ./resources/ci-jenkins/release/.releaserc-develop .releaserc
fi

echo "semantic-release - uitvoering"
npx semantic-release --no-ci

echo "variabelen bepalen en zetten"
NEXT_RELEASE_VERSION=$(npm pkg get version | sed 's/"//g')
echo using ${NEXT_RELEASE_VERSION} as NEXT_RELEASE_VERSION

# de feitelijke release actie is afhankelijk van de branch

set +e
if [[ ${RELEASE_BRANCH} == true ]];
  then
    echo "publiceren van de npm packages naar de DOMG 'local-npm' repository"
    npm run libs:pack:release -- ${NEXT_RELEASE_VERSION}
    npm run libs:publish -- ${NEXT_RELEASE_VERSION}
fi
if [[ $? -eq 0 ]]
  then
    echo "publiceren van de npm packages naar de DOMG 'local-npm' repository - success"
  else
    echo "publiceren van de npm packages naar de DOMG 'local-npm' repository - error - buffer-stderr.txt" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e

set +e
if [[ ${DEVELOP_BRANCH} == true ]];
  then
    echo "publiceren van de npm packages naar de DOMG 'snapshot-npm' repository"
    npm run libs:pack:develop -- ${NEXT_RELEASE_VERSION}
    npm run libs:publish -- ${NEXT_RELEASE_VERSION}
fi
if [[ $? -eq 0 ]]
  then
    echo "publiceren van de npm packages naar de DOMG 'snapshot-npm' repository - success"
  else
    echo "publiceren van de npm packages naar de DOMG 'snapshot-npm' repository - error - buffer-stderr.txt" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e

echo "update domg-wc met versie nummer en maak er een tgz van"
# het versie nummer toevoegen aan de 'fat-js'
cd ./build/dist/fat-lib
mv domg-wc.js domg-wc-${NEXT_RELEASE_VERSION}.js
mv domg-wc.js.map domg-wc-${NEXT_RELEASE_VERSION}.js.map
mv domg-wc.min.js domg-wc-${NEXT_RELEASE_VERSION}.min.js
# een tar maken
tar cfz ../domg-wc-${NEXT_RELEASE_VERSION}.tgz .
cd ..

if [[ ${RELEASE_BRANCH} == true ]];
  then
    # De tar uploaden naar artifactory (om het op de cdn te krijgen) - een PUT
    # omdat er geen package.json is, dus geen 'npm publish'.
    #
    # Dit gebeurt via node en niet via curl: curl zit niet meer in de cypress
    # docker-image, en 'apt-get install curl' werkt op de Jenkins-pod niet omdat
    # die geen egress heeft naar deb.debian.org (apt-get update haalt dan geen
    # enkele package-index op en apt kan de naam 'curl' niet resolven).
    # Node is er sowieso - het is een cypress-image en npm install draait hierboven -
    # en heeft fetch() globaal sinds Node 18.
    TGZ="domg-wc-${NEXT_RELEASE_VERSION}.tgz"
    TARGET="${ACD_REPOSITORY_URL}/local-generic/domg/${TGZ}"
    echo "upload-file '${TGZ}' naar artifactory"
    node -e '
        const fs = require("fs");
        const [file, url] = process.argv.slice(1);
        const auth = Buffer.from(
            `${process.env.ACD_REPOSITORY_DEBIAN_LOGIN}:${process.env.ACD_REPOSITORY_PASSWORD}`
        ).toString("base64");
        fetch(url, {
            method: "PUT",
            headers: { Authorization: `Basic ${auth}` },
            body: fs.readFileSync(file),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`upload faalde: HTTP ${response.status} ${response.statusText}`);
                }
                console.log(`upload OK: HTTP ${response.status}`);
            })
            .catch((error) => {
                console.error(error.message);
                process.exit(1);
            });
    ' "${TGZ}" "${TARGET}"
fi

cd ..

echo "rebuild storybook - because only now CHANGELOG.md is up-to-date"
set +e
npm run apps:storybook:build 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "build storybook - success"
  else
    echo "build storybook - error - buffer-stderr.txt" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e

# tgz van Storybook maken
echo "tgz''en van Storybook"
set +e
cd ./dist/apps/storybook
tar cfz ../storybook-${NEXT_RELEASE_VERSION}.tgz .
if [[ $? -eq 0 ]]
  then
    echo "Storybook succesvol in een tgz gestoken"
  else
    echo "fout bij het tgz''en van Storybook" >&2
    set -e
    exit 1
fi
set -e
