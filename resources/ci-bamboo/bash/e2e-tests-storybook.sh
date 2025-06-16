#!/bin/bash

# exit on error
set -e

echo 'RUNNING SCRIPT: e2e-tests-storybook.sh'
cd flux-web-components

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
mkdir build
touch build/dummy.txt

echo "serve storybook and run the e2e tests"
npm run apps:storybook:serve-and-e2e
