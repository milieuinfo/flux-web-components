#!/bin/bash

# exit on error
set -e

echo 'RUNNING SCRIPT: verify-release.sh'
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "${SCRIPT_DIR}/../../.."
source "${SCRIPT_DIR}/lib/quiet-step.sh"

# Branchnaam bepalen via de CI omgeving: BRANCH_NAME (multibranch) of GIT_BRANCH.
# De Jenkins checkout staat in detached HEAD, waardoor git rev-parse na de chore(release) [skip ci] commit niet meer
# de echte branchnaam teruggeeft. Geen fallback op git rev-parse: zo faalt het script hard als er geen branchnaam
# wordt doorgegeven, in plaats van stilletjes het oude (falende) gedrag te herhalen op de release branch.
if [[ -n "${BRANCH_NAME:-}" ]]; then
    CURRENT_BRANCH="${BRANCH_NAME}"
elif [[ -n "${GIT_BRANCH:-}" ]]; then
    CURRENT_BRANCH="${GIT_BRANCH#origin/}"
else
    echo "ERROR: geen branchnaam gevonden (BRANCH_NAME/GIT_BRANCH) - controleer de Jenkins omgeving" >&2
    exit 1
fi

# verificatie: enkel uitvoeren op een release of develop branch
if [[ "${CURRENT_BRANCH}" != *"release-v"* && "${CURRENT_BRANCH}" != "develop-v"* ]]; then
    echo "INFO: verify-release.sh moet enkel lopen op een release (bevat 'release-v') of develop branch (begint met 'develop-v'), huidige branch: ${CURRENT_BRANCH}" >&2
    exit 0
fi
echo "Branch verificatie OK: ${CURRENT_BRANCH}"

# versie bepalen uit de components package.json - uit de gedeelde workspace waarin release-and-publish net gedraaid heeft
cd ./build/dist/libs/components
NEXT_RELEASE_VERSION=$(npm pkg get version | sed 's/"//g')
echo "Using ${NEXT_RELEASE_VERSION} as NEXT_RELEASE_VERSION"
cd ../../../..

quiet_step "npm ci" npm ci --maxsockets 5

# consumer app dependencies updaten naar de ge-releaste versie
echo "update consumer-app dependencies to version ${NEXT_RELEASE_VERSION}"
cd apps/consumer
npm pkg set "dependencies.@domg-wc/components=${NEXT_RELEASE_VERSION}"
npm pkg set "dependencies.@domg-wc/map=${NEXT_RELEASE_VERSION}"

# Controleer of de placeholder nog aanwezig is
if grep -q "DOMG-WC-VERSION" package.json; then
  echo "ERROR: Version placeholder in 'apps/consumer/package.json' was not replaced!" >&2
  exit 1
fi

quiet_step "consumer npm install" npm install

echo "build consumer-named app"
npm run consumer:named:build

echo "build consumer-side-effect app"
npm run consumer:side-effect:build

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
cd apps/consumer

echo "running consumer-named serve-and-e2e"
npm run consumer:named:serve-and-e2e

echo "running consumer-side-effect serve-and-e2e"
npm run consumer:side-effect:serve-and-e2e

echo "running consumer-fat-lib serve-and-e2e"
npm run consumer:fat-lib:serve-and-e2e

cd ../..

echo 'VERIFY-RELEASE - DONE'
