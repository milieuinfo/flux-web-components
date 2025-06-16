#!/bin/bash

# exit on error
set -e

echo
echo ' ------------------------------ '
echo '| CUSTOM BUILD SCRIPTS - BEGIN |'
echo ' ------------------------------ '
echo

echo "RUNNING SCRIPT: e2e-tests-storybook-docker.sh"
export BUILD_SCRIPT=flux-web-components/resources/ci-bamboo/bash/e2e-tests-storybook.sh
cd resources/ci-bamboo
docker compose run --quiet-pull build

echo
echo ' ------------------------------ '
echo '|  CUSTOM BUILD SCRIPTS - END  |'
echo ' ------------------------------ '
echo
