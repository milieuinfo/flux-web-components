#!/bin/bash

# exit on error
set -e

# to the folder to publish
cd ../../build/dist/libs

if [[ $1 ]]; then
    RELEASE_VERSION=$1
    echo "RELEASE_VERSION=$RELEASE_VERSION"
else
    echo "[FOUT] - geen argument meegegeven dat de RELEASE_VERSION specifieert"
    exit 1;
fi

cd ./common
pnpm publish domg-wc-common-${RELEASE_VERSION}.tgz --no-git-checks
echo "[done] - publish - @domg-wc/common-${RELEASE_VERSION}"

cd ../styles
pnpm publish domg-wc-styles-${RELEASE_VERSION}.tgz --no-git-checks
echo "[done] - publish - @domg-wc/styles-${RELEASE_VERSION}"

cd ../components
pnpm publish domg-wc-components-${RELEASE_VERSION}.tgz --no-git-checks
echo "[done] - publish - @domg-wc/components-${RELEASE_VERSION}"

cd ../map
pnpm publish domg-wc-map-${RELEASE_VERSION}.tgz --no-git-checks
echo "[done] - publish - @domg-wc/map-${RELEASE_VERSION}"
