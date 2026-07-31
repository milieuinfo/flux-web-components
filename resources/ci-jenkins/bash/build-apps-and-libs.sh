#!/bin/bash

# exit on error
set -e

echo 'RUNNING SCRIPT: build-apps-and-libs.sh'
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "${SCRIPT_DIR}/../../.."
source "${SCRIPT_DIR}/lib/quiet-step.sh"

quiet_step "npm ci" npm ci --maxsockets 5

echo 'BUILDING - BEGIN'

quiet_step "generate web-types" npm run libs:web-types:generate

echo "validate the generated web-types"
npm run libs:web-types:validate

# de 'npm run' hieronder streamt de output naar de console (zie lib/quiet-step.sh): ze duren lang, bij een crash of OOM wil je zien hoe ver hij geraakt was
echo "build libraries"
npm run libs:build

quiet_step "add library dependencies" npm run libs:add-dependencies

echo "build storybook"
npm run apps:storybook:build

echo "build integrator"
npm run apps:integrator:build

echo "build playground-lit"
npm run apps:playground-lit:build

echo "build playground-native"
npm run apps:playground-native:build

echo "build playground-react"
npm run apps:playground-react:build

echo "build fat-lib"
npm run fat-lib:build

echo "build fat-lib-min"
npm run fat-lib:build-min

echo 'BUILDING - END'
