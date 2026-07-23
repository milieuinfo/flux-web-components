#!/bin/bash

# exit on error
set -e

echo 'RUNNING SCRIPT: unit-component-integrator-tests.sh'
cd flux-web-components

corepack enable

echo "pnpm install"
set +e
pnpm install --frozen-lockfile 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "pnpm install - success"
  else
    echo "pnpm install - error - buffer-stderr.txt" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e

echo "create build folder with dummy text file - when everything goes well there is no build folder which fails the build"
mkdir build
touch build/dummy.txt

echo "run all jest (unit) tests"
set +e
pnpm run libs:jest 2> buffer-stderr.txt 1> buffer-stdout.txt
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
pnpm run libs:component-tests:run 2> buffer-stderr.txt 1> buffer-stdout.txt
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
pnpm run apps:integrator:serve-and-e2e 2> buffer-stderr.txt 1> buffer-stdout.txt
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
