#!/bin/bash

# exit on error
set -e

echo 'RUNNING SCRIPT: unit-component-integrator-tests.sh'
cd "$(dirname "$0")/../../.."

echo "npm install - no 'ci' to avoid the clean"
set +e
npm install --save-exact 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "npm install - success"
  else
    echo "npm install - error - buffer-stderr.txt" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e

echo "create build folder with dummy text file - when everything goes well there is no build folder which fails the build"
# -p: deze stage draait in een eigen workspace, maar -p houdt het script ook
# bruikbaar bij een lokale herhaalde run waar build/ al bestaat
mkdir -p build
touch build/dummy.txt

echo "run all jest (unit) tests"
set +e
# CI=true laat de jest-configs ook JUnit XML schrijven naar test-results/,
# waar de junit-step van deze stage ze oppikt (zie jest.config.ts in libs/*)
CI=true npm run libs:jest 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "run all jest (unit) tests - success"
  else
    echo "run all jest (unit) tests - error - buffer-stderr.txt" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e

echo "run all web component tests (cypress)"
set +e
npm run libs:component-tests:run 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "run all web component tests (cypress) - success"
  else
    echo "run all web component tests (cypress) - error - buffer-stderr.txt" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e

echo "run the integrator e2e tests (cypress)"
set +e
npm run apps:integrator:serve-and-e2e 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "run the integrator e2e tests (cypress) - success"
  else
    echo "run the integrator e2e tests (cypress) - error - buffer-stderr.txt" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e
