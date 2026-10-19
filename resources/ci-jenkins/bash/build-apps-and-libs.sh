#!/bin/bash

# exit on error
set -e

echo 'RUNNING SCRIPT: build-apps-and-libs.sh'
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "${SCRIPT_DIR}/../../.."
source "${SCRIPT_DIR}/lib/quiet-step.sh"
source "${SCRIPT_DIR}/lib/install-pnpm.sh"

quiet_step "pnpm install" pnpm install --frozen-lockfile --network-concurrency 5

echo 'BUILDING - BEGIN'

# Leest de argTypes en de componenten, niet de web-types of Figma. Hoort dus niet bij de stage
# 'code connect: validate', die met SKIP_CODE_CONNECT overgeslagen kan worden.
echo "check that every attribute is in a Code Connect template"
pnpm run figma:code-connect:test
pnpm run figma:code-connect:check-attributes

quiet_step "generate web-types" pnpm run libs:web-types:generate

echo "validate the generated web-types"
pnpm run libs:web-types:validate

# de 'pnpm run' hieronder streamt de output naar de console (zie lib/quiet-step.sh): ze duren lang, bij een crash of OOM wil je zien hoe ver hij geraakt was
echo "build libraries"
pnpm run libs:build

quiet_step "add library dependencies" pnpm run libs:add-dependencies

echo "build storybook"
pnpm run apps:storybook:build

echo "build integrator"
pnpm run apps:integrator:build

echo "build playground-lit"
pnpm run apps:playground-lit:build

echo "build playground-native"
pnpm run apps:playground-native:build

echo "build playground-react"
pnpm run apps:playground-react:build

echo "build fat-lib"
pnpm run fat-lib:build

echo "build fat-lib-min"
pnpm run fat-lib:build-min

echo 'BUILDING - END'
