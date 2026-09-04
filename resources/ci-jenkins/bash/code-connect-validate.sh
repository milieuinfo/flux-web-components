#!/bin/bash

# exit on error
set -e

# Controleert of alle Code Connect templates leesbaar zijn en of hun Figma node bestaat.
# Dit is een dry run: er wordt niets gepubliceerd. Publiceren gebeurt vanuit een andere repo.
#
# Faalt de stap, dan is er een template stuk of wijst het naar een node die niet meer bestaat.
# Beide zijn fouten in deze repo, dus de build hoort te falen.
#
# Vereist FIGMA_ACCESS_TOKEN: de dry run vraagt de nodes op via de Figma REST API.

echo 'RUNNING SCRIPT: code-connect-validate.sh'
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "${SCRIPT_DIR}/../../.."
source "${SCRIPT_DIR}/lib/quiet-step.sh"

if [ -z "${FIGMA_ACCESS_TOKEN}" ]; then
    echo "FIGMA_ACCESS_TOKEN ontbreekt. Zet de Jenkins credential 'figma-code-connect-token'."
    exit 1
fi

quiet_step "npm ci" npm ci --maxsockets 5

echo "validate the Code Connect templates"
npm run libs:code-connect:validate

echo 'code-connect-validate.sh - KLAAR'
