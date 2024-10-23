#!/bin/bash

# exit on error
set -e

echo 'RUNNING SCRIPT: release-and-publish.sh'
cd uigov-web-components

# get branch name
GIT_REF_NAME=$(git rev-parse --abbrev-ref HEAD)
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

# op Bamboo bevat SECRET_GITHUB_TOKEN het GitHub PAT met de juiste rechten
if [[ -z ${SECRET_GITHUB_TOKEN+x} ]];
  then
    echo "SECRET_GITHUB_TOKEN is NIET gezet"
  else
    export GITHUB_TOKEN=${SECRET_GITHUB_TOKEN}
    echo "SECRET_GITHUB_TOKEN als GITHUB_TOKEN gezet, OK"
fi

# het GITHUB_TOKEN is nodig, ofwel rechtstreeks gezet ofwel via bamboo.SECRET_GITHUB_TOKEN
if [[ -z ${GITHUB_TOKEN+x} ]];
  then
    echo "GITHUB_TOKEN is NIET gezet, NOK - stop"
    exit 1
  else
    echo "GITHUB_TOKEN is gezet, OK"
fi

# the remote set by Bamboo is not authenticated, so remove the remote and add one with authentication
echo 'git remote rm origin'
git remote rm origin &> /dev/null
echo 'git remote add origin https://${SECRET_GITHUB_TOKEN}@github.com/milieuinfo/uigov-web-components.git'
git remote add origin https://${SECRET_GITHUB_TOKEN}@github.com/milieuinfo/uigov-web-components.git &> /dev/null
echo 'git fetch --prune origin'
git fetch --prune origin &> /dev/null
echo 'git pull origin ${GIT_REF_NAME}'
git config pull.ff only
git pull origin ${GIT_REF_NAME}
# the git fetch is necessary -> otherwise semantic-release is unaware of the previous version
# this gives 'does not point to a valid object!' errors - they can be ignored
echo 'delete all local git tags'
git tag -d $(git tag -l) &> /dev/null
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
    cp ./resources/ci-bamboo/release/.releaserc-release .releaserc
fi

if [[ ${DEVELOP_BRANCH} == true ]];
  then
    echo "semantic-release - '.releaserc-develop' script wordt gebruikt"
    cp ./resources/ci-bamboo/release/.releaserc-develop .releaserc
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
    # curl is niet meer geïnstalleerd in de cypress docker-image
    apt-get -y update; apt-get -y install curl
    # de tar uploaden naar artifactory (om het op de cdn te krijgen) - via curl omdat er geen package.json is
    echo "upload-file 'domg-wc-${NEXT_RELEASE_VERSION}.tgz' naar artifactory"
    curl --user "${ACD_REPOSITORY_DEBIAN_LOGIN}:${ACD_REPOSITORY_BAMBOO_PASSWORD}" \
     --upload-file domg-wc-${NEXT_RELEASE_VERSION}.tgz \
     -v -X PUT "${ACD_REPOSITORY_URL}/local-generic/domg/domg-wc-${NEXT_RELEASE_VERSION}.tgz"
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
