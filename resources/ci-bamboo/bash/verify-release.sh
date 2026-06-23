#!/bin/bash

# exit on error
set -e

echo 'RUNNING SCRIPT: verify-release.sh'
cd flux-web-components

# Branchnaam bepalen via BAMBOO_BRANCH_NAME (bamboo.planRepository.branchName).
# Bamboo's checkout-task zet de werkdir in detached HEAD op de trigger-SHA, waardoor
# git rev-parse na de chore(release) [skip ci] commit niet meer de echte branchnaam
# teruggeeft. Geen fallback op git rev-parse: zo faalt het script hard als de env var
# niet correct wordt doorgegeven, in plaats van stilletjes het oude (falende) gedrag te
# herhalen op de release branch.
if [[ -z "${BAMBOO_BRANCH_NAME:-}" || "${BAMBOO_BRANCH_NAME}" == "not-specified" ]]; then
    echo "ERROR: BAMBOO_BRANCH_NAME is niet gezet of staat op 'not-specified' - controleer bamboo.yml en compose.yaml" >&2
    exit 1
fi
CURRENT_BRANCH="${BAMBOO_BRANCH_NAME}"

# verificatie: enkel uitvoeren op een release of develop branch
if [[ "${CURRENT_BRANCH}" != *"release-v"* && "${CURRENT_BRANCH}" != "develop-v"* ]]; then
    echo "INFO: verify-release.sh moet enkel lopen op een release (bevat 'release-v') of develop branch (begint met 'develop-v'), huidige branch: ${CURRENT_BRANCH}" >&2
    exit 0
fi
echo "Branch verificatie OK: ${CURRENT_BRANCH}"

# versie bepalen uit de components package.json — afkomstig uit het 'artifact-release-and-publish'
# artifact (zie artifact-download task in bamboo.yml, destination: build)
cd ./build/dist/libs/components
NEXT_RELEASE_VERSION=$(npm pkg get version | sed 's/"//g')
echo "Using ${NEXT_RELEASE_VERSION} as NEXT_RELEASE_VERSION"
cd ../../../..

echo "npm ci - to force the clean"
set +e
npm ci --maxsockets 5 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "npm ci - success"
  else
    echo "npm ci - error - buffer-stderr.txt" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e

# consumer app dependencies updaten naar de ge-releaste versie
echo "update consumer-app dependencies to version ${NEXT_RELEASE_VERSION}"
cd apps/consumer
npm pkg set "dependencies.@domg-wc/components=${NEXT_RELEASE_VERSION}"
npm pkg set "dependencies.@domg-wc/map=${NEXT_RELEASE_VERSION}"

# Controleer of de placeholder nog aanwezig is
if grep -q "DOMG-WC-VERSION" package.json; then
  echo "ERROR: Version placeholder in 'apps/consumer/package.json' was not replaced!"
  exit 1
fi

echo "npm install in consumer-app"
set +e
npm install 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "consumer npm install - success"
  else
    echo "consumer npm install - error" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e

# consumer-named app builden
echo "build consumer-named app"
set +e
npm run consumer:named:build 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "build consumer-named - success"
  else
    echo "build consumer-named - error" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e

# consumer-side-effect app builden
echo "build consumer-side-effect app"
set +e
npm run consumer:side-effect:build 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "build consumer-side-effect - success"
  else
    echo "build consumer-side-effect - error" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e

# fat-lib klaarzetten voor lokale serve
cd ../..
echo "prepare fat-lib consumer app"
FAT_LIB_FILE="build/dist/fat-lib/domg-wc-compliance-${NEXT_RELEASE_VERSION}.min.js"
echo "Using ${FAT_LIB_FILE} for the fat-lib"

# fat-lib kopiëren naar app-fat-lib directory
echo "copy fat-lib to consumer-fat-lib"
if ! cp ${FAT_LIB_FILE} apps/consumer/src/app-fat-lib/domg-wc-compliance.min.js; then
    echo "copy fat-lib to consumer-fat-lib - error: ${FAT_LIB_FILE} not found or copy failed" >&2
    exit 1
fi
echo "copy fat-lib to consumer-fat-lib - success"

# e2e testen draaien via serve-and-e2e scripts
echo "running consumer-named serve-and-e2e"
set +e
cd apps/consumer
npm run consumer:named:serve-and-e2e 2> ../../buffer-stderr.txt 1> ../../buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "consumer named serve-and-e2e - success"
  else
    echo "consumer named serve-and-e2e - error" >&2
    cat ../../buffer-stderr.txt >&2
    cat ../../buffer-stdout.txt >&2
    cd ../..
    set -e
    exit 1
fi
cd ../..
set -e

echo "running consumer-side-effect serve-and-e2e"
set +e
cd apps/consumer
npm run consumer:side-effect:serve-and-e2e 2> ../../buffer-stderr.txt 1> ../../buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "consumer side-effect serve-and-e2e - success"
  else
    echo "consumer side-effect serve-and-e2e - error" >&2
    cat ../../buffer-stderr.txt >&2
    cat ../../buffer-stdout.txt >&2
    cd ../..
    set -e
    exit 1
fi
cd ../..
set -e

echo "running consumer-fat-lib serve-and-e2e"
set +e
cd apps/consumer
npm run consumer:fat-lib:serve-and-e2e 2> ../../buffer-stderr.txt 1> ../../buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "consumer fat-lib serve-and-e2e - success"
  else
    echo "consumer fat-lib serve-and-e2e - error" >&2
    cat ../../buffer-stderr.txt >&2
    cat ../../buffer-stdout.txt >&2
    cd ../..
    set -e
    exit 1
fi
cd ../..
set -e

echo 'VERIFY-RELEASE - DONE'
