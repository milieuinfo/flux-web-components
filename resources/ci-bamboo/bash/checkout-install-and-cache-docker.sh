#!/bin/bash

# exit on error
set -e

echo
echo ' ------------------------------ '
echo '| CUSTOM BUILD SCRIPTS - BEGIN |'
echo ' ------------------------------ '
echo

echo 'RUNNING SCRIPT: checkout-install-and-cache-docker.sh'
export BUILD_SCRIPT=flux-web-components/resources/ci-bamboo/bash/checkout-install-and-cache.sh
cd resources/ci-bamboo
docker compose run --quiet-pull build

echo
echo ' ------------------------------ '
echo '|  CUSTOM BUILD SCRIPTS - END  |'
echo ' ------------------------------ '
echo
