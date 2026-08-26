#!/bin/bash

# exit on error
set -e

echo 'RUNNING SCRIPT: verify-release.sh'
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "${SCRIPT_DIR}/../../.."
source "${SCRIPT_DIR}/lib/quiet-step.sh"
source "${SCRIPT_DIR}/lib/corepack-registry.sh"

corepack enable

# Normaliseer de JUnit classnames tot '<categorie>.<rest>', zodat de junit-step van deze stage op categorie
# groepeert in plaats van alles in (root) te zetten. Via een EXIT-trap zodat dit ook loopt wanneer een testrun
# faalt en set -e het script afbreekt - dan wil je het rapport net het meest. '|| true' houdt de exit code van het
# script intact.
trap 'node "${SCRIPT_DIR}/../test/normalize-junit-classnames.mjs" || true' EXIT

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
NEXT_RELEASE_VERSION=$(pnpm pkg get version | sed 's/"//g')
echo "Using ${NEXT_RELEASE_VERSION} as NEXT_RELEASE_VERSION"
cd ../../../..

# Bewust GEEN `pnpm install` op de root. Deze stage is een controlestap: ze moet aantonen dat de zonet gepubliceerde packages
# werken zoals een externe afnemer ze krijgt, dus zonder iets uit deze monorepo. Een root node_modules ondermijnt dat:
# want node resolutie kijkt vanuit apps/consumer omhoog en pikt daar dependencies op die de gepubliceerde packages zelf
# niet declareren (phantom dependencies) - de stage slaagt dan op een gebroken gepubliceerde package. De isolatie zit in
# de Jenkins-file: deze stage declareert een eigen agent en draait dus in een eigen pod met een verse workspace, zonder
# de monorepo-install die release-and-publish achterlaat. Wie dit script lokaal draait, moet zelf voor een schone repo
# zorgen (rm -rf node_modules apps/*/node_modules).

# consumer app dependencies updaten naar de ge-releaste versie
echo "update consumer-app dependencies to version ${NEXT_RELEASE_VERSION}"
cd apps/consumer
pnpm pkg set "dependencies.@domg-wc/components=${NEXT_RELEASE_VERSION}"
pnpm pkg set "dependencies.@domg-wc/map=${NEXT_RELEASE_VERSION}"

# Controleer of de placeholder nog aanwezig is
if grep -q "DOMG-WC-VERSION" package.json; then
  echo "ERROR: Version placeholder in 'apps/consumer/package.json' was not replaced!" >&2
  exit 1
fi

quiet_step "consumer pnpm install" pnpm install --no-frozen-lockfile

echo "build consumer-named app"
pnpm run consumer:named:build

echo "build consumer-side-effect app"
pnpm run consumer:side-effect:build

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

# consumer-e2e dependencies installeren: cypress, cypress-axe en typescript resolven vanaf apps/consumer-e2e enkel
# omhoog (apps/consumer-e2e -> apps -> root), nooit zijwaarts naar apps/consumer. Ze moeten dus in deze app zelf staan.
# Hier wel `--frozen-lockfile` en niet `--no-frozen-lockfile`: hier muteert niets vlak ervoor (anders dan bij apps/consumer, waar
# 'pnpm pkg set' de versie invult en de lock dus stale is), dus de lock is hier leidend en reproduceerbaar.
echo "install consumer-e2e dependencies"
cd apps/consumer-e2e
quiet_step "consumer-e2e pnpm install" pnpm install --frozen-lockfile
cd ../..

# e2e testen draaien via serve-and-e2e scripts
cd apps/consumer

# CI=true laat de cypress-config ook JUnit XML schrijven naar test-results, waar de junit-step
# van deze stage ze oppikt (zie apps/consumer-e2e/cypress.config.ts)
echo "running consumer-named serve-and-e2e"
env CI=true pnpm run consumer:named:serve-and-e2e

echo "running consumer-side-effect serve-and-e2e"
env CI=true pnpm run consumer:side-effect:serve-and-e2e

echo "running consumer-fat-lib serve-and-e2e"
env CI=true pnpm run consumer:fat-lib:serve-and-e2e

cd ../..

echo 'VERIFY-RELEASE - DONE'
