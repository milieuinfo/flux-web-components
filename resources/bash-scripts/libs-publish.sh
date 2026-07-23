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

cd ./common-utilities
pnpm publish domg-wc-common-utilities-${RELEASE_VERSION}.tgz --no-git-checks
echo "[done] - publish - @domg-wc/common-utilities-${RELEASE_VERSION}"

cd ../common-storybook
pnpm publish domg-wc-common-storybook-${RELEASE_VERSION}.tgz --no-git-checks
echo "[done] - publish - @domg-wc/common-storybook"

cd ../elements
pnpm publish domg-wc-elements-${RELEASE_VERSION}.tgz --no-git-checks
echo "[done] - publish - @domg-wc/elements-${RELEASE_VERSION}"

cd ../components
pnpm publish domg-wc-components-${RELEASE_VERSION}.tgz --no-git-checks
echo "[done] - publish - @domg-wc/components-${RELEASE_VERSION}"

cd ../form
pnpm publish domg-wc-form-${RELEASE_VERSION}.tgz --no-git-checks
echo "[done] - publish - @domg-wc/form-${RELEASE_VERSION}"

cd ../sections
pnpm publish domg-wc-sections-${RELEASE_VERSION}.tgz --no-git-checks
echo "[done] - publish - @domg-wc/sections-${RELEASE_VERSION}"

cd ../map
pnpm publish domg-wc-map-${RELEASE_VERSION}.tgz --no-git-checks
echo "[done] - publish - @domg-wc/map-${RELEASE_VERSION}"
