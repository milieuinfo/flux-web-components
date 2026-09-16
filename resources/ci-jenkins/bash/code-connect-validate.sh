#!/bin/bash

# exit on error
set -e

# Controleert of alle Code Connect templates leesbaar zijn en of hun Figma node bestaat.
# Dit is een dry run: er wordt niets gepubliceerd. Publiceren gebeurt vanuit een andere repo.
#
# Faalt de stap, dan is er een template stuk of wijst het naar een node die niet meer bestaat.
# Beide zijn fouten in deze repo, dus de build hoort te falen.
#
# Vereist FIGMA_TOKEN: de dry run vraagt de nodes op via de Figma REST API.

echo 'RUNNING SCRIPT: code-connect-validate.sh'
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "${SCRIPT_DIR}/../../.."
source "${SCRIPT_DIR}/lib/quiet-step.sh"
source "${SCRIPT_DIR}/lib/install-pnpm.sh"

if [ -z "${FIGMA_TOKEN}" ]; then
    echo "FIGMA_TOKEN ontbreekt. Zet de Jenkins credential 'flux-web-componenten/figma_cli'."
    exit 1
fi

quiet_step "pnpm install" pnpm install --frozen-lockfile --network-concurrency 5

echo "validate the Code Connect templates"
# Zonder '--': pnpm geeft argumenten na de scriptnaam zelf door, en een '--' zou letterlijk bij de CLI
# aankomen, die --token dan negeert.
pnpm run figma:code-connect:validate --token "${FIGMA_TOKEN}"

echo 'code-connect-validate.sh - KLAAR'
