#!/bin/bash

# exit on error
set -e

# to the root folder
cd ../..
ROOT="$(pwd)"

MODE=$1
if [[ $2 ]]; then
    RELEASE_VERSION=$2
    echo "RELEASE_VERSION=$RELEASE_VERSION"
else
    echo "[FOUT] - geen 2e argument meegegeven dat de RELEASE_VERSION specifieert"
    exit 1;
fi

LIBS="styles common components map"

for lib in $LIBS; do
    (cd "libs/$lib" && pnpm pkg set version="$RELEASE_VERSION" >/dev/null)
    echo "[done] - set version - $lib"
    if [[ $MODE == "develop" ]]; then
        (cd "libs/$lib" && pnpm pkg set publishConfig.registry='https://repo.omgeving.vlaanderen.be/artifactory/api/npm/snapshot-npm/' >/dev/null)
        echo "[done] - set publishConfig to snapshot-npm - $lib"
    fi
done

TO_REPLACE=DOMG-WC-VERSION
cd ./build/dist/libs
if [[ "$(uname)" == "Darwin" ]]; then
    sed -i '' "s,${TO_REPLACE},${RELEASE_VERSION}," ./**/*.web-types.json
else
    sed -i "s,${TO_REPLACE},${RELEASE_VERSION}," ./**/*.web-types.json
fi
echo "RELEASE_VERSION gezet in de *.web-types.json bestanden"
cd ../../..

for lib in $LIBS; do
    cp "libs/$lib/package.json" "build/dist/libs/$lib/package.json"
    (cd "build/dist/libs/$lib" && pnpm pkg delete publishConfig.directory >/dev/null)
    (cd "libs/$lib" && pnpm pack --pack-destination "$ROOT/build/dist/libs/$lib" >/dev/null)
    echo "[done] - pack - $lib"
done
