#!/bin/bash

# exit on error
set -e

echo 'RUNNING SCRIPT: e2e-tests-storybook.sh'
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "${SCRIPT_DIR}/../../.."
source "${SCRIPT_DIR}/lib/quiet-step.sh"

# De storybook e2e-tests draaien verdeeld over 2 shards die in Jenkins parallel in een eigen pod staan; samen dekken
# ze exact dezelfde specs als voorheen. Dezelfde regel als de shards in unit-component-integrator-tests.sh: de grens
# volgt de mappen onder src/e2e, en beide helften zijn ongeveer even groot:
#
#   shard 1  components (56 specs), ontwerp (10), styles (17)
#   shard 2  elements (38), form (14), map (21), sections (6)
#
# Elke shard start storybook opnieuw voor hij test. Die builds draaien parallel en kosten dus geen extra
# doorlooptijd, maar ze worden ook niet korter: splitsen halveert alleen het e2e-deel. De al gebouwde storybook uit
# build-apps-and-libs hergebruiken kan niet, want die stage draait parallel met deze en Jenkins declarative kent geen
# afhankelijkheden tussen branches van hetzelfde parallel-blok.
SHARD="${1:?geef het shard-nummer mee: 1 of 2}"

E2E_ROOT=apps/storybook-e2e

SHARD_1_DIRS=("${E2E_ROOT}/src/e2e/components"
              "${E2E_ROOT}/src/e2e/ontwerp"
              "${E2E_ROOT}/src/e2e/styles")
SHARD_2_DIRS=("${E2E_ROOT}/src/e2e/elements"
              "${E2E_ROOT}/src/e2e/form"
              "${E2E_ROOT}/src/e2e/map"
              "${E2E_ROOT}/src/e2e/sections")

case "${SHARD}" in
    1) SHARD_DIRS=("${SHARD_1_DIRS[@]}") ;;
    2) SHARD_DIRS=("${SHARD_2_DIRS[@]}") ;;
    *) echo "FOUT: shard moet 1 of 2 zijn, kreeg '${SHARD}'" >&2; exit 1 ;;
esac

# Vangnet. Komt er een nieuwe map onder src/e2e/ bij die in geen enkele shard-map zit, dan draaien die specs nergens
# meer - zonder dat er iets faalt. Deze controle draait in elke shard en stopt de build meteen, met de namen erbij.
ONTBREKENDE_SPECS=$(comm -23 \
    <(find "${E2E_ROOT}/src/e2e" -name '*.cy.ts' | sort) \
    <(find "${SHARD_1_DIRS[@]}" "${SHARD_2_DIRS[@]}" -name '*.cy.ts' | sort))
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

# De --spec waarde is relatief aan apps/storybook-e2e, want daar staat de cypress-config; vandaar dat het
# pad-voorvoegsel er hier weer af gaat.
SPECS=$(printf ',%s/**/*.cy.ts' "${SHARD_DIRS[@]#"${E2E_ROOT}/"}")
SPECS="${SPECS#,}"

# CI=true laat de cypress-config ook JUnit XML schrijven naar test-results, waar de junit-step
# van deze stage ze oppikt (zie apps/storybook-e2e/cypress.config.ts).
# Niet via 'npm run apps:storybook:serve-and-e2e', omdat die de volledige specPattern draait zonder --spec.
echo "serve storybook and run the e2e tests - shard ${SHARD}: ${SPECS}"
env CI=true npx start-server-and-test \
    'npm run apps:storybook:dev' \
    http://localhost:8080 \
    "cd ./${E2E_ROOT} && npx cypress run --e2e --spec '${SPECS}'"
