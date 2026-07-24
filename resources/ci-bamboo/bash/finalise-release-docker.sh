#!/bin/bash

# exit on error
set -e

echo
echo ' ------------------------------ '
echo '| CUSTOM BUILD SCRIPTS - BEGIN |'
echo ' ------------------------------ '
echo

echo 'RUNNING SCRIPT: finalise-release-docker.sh'
export BUILD_SCRIPT=flux-web-components/resources/ci-bamboo/bash/finalise-release.sh
cd resources/ci-bamboo
docker compose run --quiet-pull build

echo
echo ' ------------------------------ '
echo '|  CUSTOM BUILD SCRIPTS - END  |'
echo ' ------------------------------ '
echo
