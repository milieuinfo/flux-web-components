#!/bin/bash

# exit on error
set -e

echo 'RUNNING SCRIPT: e2e-tests-storybook.sh'
cd "$(dirname "$0")/../../.."

echo "npm ci - to force the clean"
set +e
npm ci --maxsockets 5 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "npm ci - success"
  else
    echo "npm ci - error - buffer-stderr.txt" >&2
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

echo "serve storybook and run the e2e tests"
npm run apps:storybook:serve-and-e2e
