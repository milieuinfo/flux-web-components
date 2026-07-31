#!/bin/bash

# exit on error
set -e

echo 'RUNNING SCRIPT: e2e-tests-storybook.sh'
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "${SCRIPT_DIR}/../../.."
source "${SCRIPT_DIR}/lib/quiet-step.sh"

quiet_step "npm install" npm install --save-exact

echo "create build folder with dummy text file - when everything goes well there is no build folder which fails the build"
# -p: deze stage draait in een eigen workspace, maar -p houdt het script ook bruikbaar bij een lokale herhaalde run waar build/ al bestaat
mkdir -p build
touch build/dummy.txt

echo "serve storybook and run the e2e tests"
npm run apps:storybook:serve-and-e2e
