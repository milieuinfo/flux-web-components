#!/bin/bash

# exit on error
set -e

echo 'RUNNING SCRIPT: e2e-tests-storybook.sh'
cd flux-web-components

# pnpm beschikbaar maken via corepack (gepind via het packageManager-veld in package.json)
corepack enable

echo "pnpm install - to force the clean"
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

echo "serve storybook and run the e2e tests"
pnpm run apps:storybook:serve-and-e2e
