#!/bin/bash

# exit on error
set -e

echo 'RUNNING SCRIPT: unit-component-integrator-tests.sh'
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "${SCRIPT_DIR}/../../.."
source "${SCRIPT_DIR}/lib/quiet-step.sh"

quiet_step "npm install" npm install --save-exact

echo "create build folder with dummy text file - when everything goes well there is no build folder which fails the build"
# -p: deze stage draait in een eigen workspace, maar -p houdt het script ook bruikbaar bij een lokale herhaalde run waar build/ al bestaat
mkdir -p build
touch build/dummy.txt

# CI=true laat de jest- en cypress-configs ook JUnit XML schrijven naar test-results, waar de junit-step
# van deze stage ze oppikt (zie jest.config.ts in libs/* en de cypress.config.ts bestanden)
quiet_step "run all jest (unit) tests" env CI=true npm run libs:jest

# de 'npm run' hieronder streamt de output naar de console (zie lib/quiet-step.sh): ze duren lang, bij een crash of OOM wil je zien hoe ver hij geraakt was
echo "run all web component tests (cypress)"
env CI=true npm run libs:component-tests:run

echo "run the integrator e2e tests (cypress)"
env CI=true npm run apps:integrator:serve-and-e2e
