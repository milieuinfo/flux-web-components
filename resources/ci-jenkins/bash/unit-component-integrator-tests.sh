#!/bin/bash

# exit on error
set -e

echo 'RUNNING SCRIPT: unit-component-integrator-tests.sh'
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "${SCRIPT_DIR}/../../.."
source "${SCRIPT_DIR}/lib/quiet-step.sh"

# De component-tests draaien verdeeld over 3 shards die in Jenkins parallel in een eigen pod staan; samen dekken ze
# exact dezelfde specs als voorheen. De grens volgt de mappenstructuur, niet een gewichtsberekening:
#
#   shard 1  de componenten-bibliotheken   components (42 specs), elements (6)
#   shard 2  map en sections               map (40), sections (23)
#   shard 3  de rest                       common (17), form (16), integration (7)
#
# Shard 3 draagt daarnaast al het niet-component werk (jest, de integrator e2e) en krijgt daarom het kleinste deel
# van de component-specs - anders wordt hij de bottleneck en verlies je de winst van het splitsen.
SHARD="${1:?geef het shard-nummer mee: 1, 2 of 3}"

SHARD_1_DIRS=(libs/components libs/elements)
SHARD_2_DIRS=(libs/map libs/sections)
SHARD_3_DIRS=(libs/common libs/form libs/integration)

case "${SHARD}" in
    1) SHARD_DIRS=("${SHARD_1_DIRS[@]}") ;;
    2) SHARD_DIRS=("${SHARD_2_DIRS[@]}") ;;
    3) SHARD_DIRS=("${SHARD_3_DIRS[@]}") ;;
    *) echo "FOUT: shard moet 1, 2 of 3 zijn, kreeg '${SHARD}'" >&2; exit 1 ;;
esac

# Vangnet. Komt er een nieuw package onder libs/ bij dat in geen enkele shard-map zit, dan draaien die specs nergens
# meer - zonder dat er iets faalt. Deze controle draait in elke shard en stopt de build meteen, met de namen erbij.
ONTBREKENDE_SPECS=$(comm -23 \
    <(find libs -name '*.cy.ts' -not -path '*/node_modules/*' | sort) \
    <(find "${SHARD_1_DIRS[@]}" "${SHARD_2_DIRS[@]}" "${SHARD_3_DIRS[@]}" -name '*.cy.ts' -not -path '*/node_modules/*' | sort))
if [[ -n "${ONTBREKENDE_SPECS}" ]]; then
    echo "FOUT: deze specs zitten in geen enkele shard en zouden dus niet meer draaien:" >&2
    echo "${ONTBREKENDE_SPECS}" >&2
    echo "Voeg de map toe aan een van de SHARD_*_DIRS bovenaan dit script." >&2
    exit 1
fi

quiet_step "npm install" npm install --save-exact

echo "create build folder with dummy text file - when everything goes well there is no build folder which fails the build"
# -p: deze stage draait in een eigen workspace, maar -p houdt het script ook bruikbaar bij een lokale herhaalde run waar build/ al bestaat
mkdir -p build
touch build/dummy.txt

# CI=true laat de jest- en cypress-configs ook JUnit XML schrijven naar test-results, waar de junit-step
# van deze stage ze oppikt (zie jest.config.ts in libs/* en de cypress.config.ts bestanden)
if [[ "${SHARD}" == "3" ]]; then
    quiet_step "run all jest (unit) tests" env CI=true npm run libs:jest
fi

# De cypress-run hieronder streamt zijn output naar de console (zie lib/quiet-step.sh): ze duurt lang, bij een crash
# of OOM wil je zien hoe ver hij geraakt was.
# --spec en niet 'npm run libs:component-tests:run', omdat die de volledige specPattern uit cypress.config.ts draait.
SPECS=$(printf ',../../%s/**/*.cy.ts' "${SHARD_DIRS[@]}")
SPECS="${SPECS#,}"
echo "run web component tests - shard ${SHARD} (cypress): ${SPECS}"
(cd ./resources/cypress-component && env CI=true npx cypress run --component --spec "${SPECS}")

if [[ "${SHARD}" == "3" ]]; then
    echo "run the integrator e2e tests (cypress)"
    env CI=true npm run apps:integrator:serve-and-e2e
fi
