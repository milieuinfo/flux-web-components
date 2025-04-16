#!/bin/bash

# exit on error
set -e

# to the folder to pack
cd ../../build/dist/libs

# in de package.json en *.web-types.json bestanden - daar waar nodig - de juiste versie zetten
TO_REPLACE=DOMG-WC-VERSION
if [[ $2 ]]; then
    RELEASE_VERSION=$2
    echo "RELEASE_VERSION=$RELEASE_VERSION"
else
    echo "[FOUT] - geen 2e argument meegegeven dat de RELEASE_VERSION specifieert"
    exit 1;
fi

# de OSX versie is als volgt: sed -i '' "s,${TO_REPLACE},${RELEASE_VERSION}," **/package.json
# maar die '' geeft een probleem in een 'normale' linux omgeving
if [[ "$(uname)" == "Darwin" ]]; then
    sed -i '' "s,${TO_REPLACE},${RELEASE_VERSION}," ./**/package.json
    sed -i '' "s,${TO_REPLACE},${RELEASE_VERSION}," ./**/*.web-types.json
else
    sed -i "s,${TO_REPLACE},${RELEASE_VERSION}," ./**/package.json
    sed -i "s,${TO_REPLACE},${RELEASE_VERSION}," ./**/*.web-types.json
fi
echo "RELEASE_VERSION gezet in de package.json en *.web-types.json bestanden"

# om tree-shaking correct te laten werken moeten sideEffects in de root-barrel-file uitgeschakeld worden
#  -> het lijkt niet mogelijk om dit via een exclude te doen - dit werkt niet: ["!(./index.js)"]
#  -> dus expliciet specifieren van alle files in minimum 1 subfolder + eventueel de 'andere' root-files
cd ./common
npm pkg set sideEffects='["./*/**"]' --json >/dev/null
echo '[done] - set sideEffects - common'
if [[ $1 == "develop" ]]; then
    npm pkg set publishConfig.registry='https://repo.omgeving.vlaanderen.be/artifactory/api/npm/snapshot-npm/'
    echo '[done] - set publishConfig to snapshot-npm - common'
fi
npm pack &> /dev/null
echo '[done] - pack - common'

cd ../styles
npm pkg set sideEffects='["./*/**"]' --json >/dev/null
echo '[done] - set sideEffects - styles'
if [[ $1 == "develop" ]]; then
    npm pkg set publishConfig.registry='https://repo.omgeving.vlaanderen.be/artifactory/api/npm/snapshot-npm/'
    echo '[done] - set publishConfig to snapshot-npm - styles'
fi
npm pack &> /dev/null
echo '[done] - pack - styles'

cd ../components
npm pkg set sideEffects='["./*/**"]' --json >/dev/null
echo '[done] - set sideEffects - components'
if [[ $1 == "develop" ]]; then
    npm pkg set publishConfig.registry='https://repo.omgeving.vlaanderen.be/artifactory/api/npm/snapshot-npm/'
    echo '[done] - set publishConfig to snapshot-npm - components'
fi
npm pack &> /dev/null
echo '[done] - pack - components'

cd ../form
npm pkg set sideEffects='["./*/**"]' --json >/dev/null
echo '[done] - set sideEffects - form'
if [[ $1 == "develop" ]]; then
    npm pkg set publishConfig.registry='https://repo.omgeving.vlaanderen.be/artifactory/api/npm/snapshot-npm/'
    echo '[done] - set publishConfig to snapshot-npm - form'
fi
npm pack &> /dev/null
echo '[done] - pack - form'

cd ../sections
npm pkg set sideEffects='["./*/**"]' --json >/dev/null
echo '[done] - set sideEffects - sections'
if [[ $1 == "develop" ]]; then
    npm pkg set publishConfig.registry='https://repo.omgeving.vlaanderen.be/artifactory/api/npm/snapshot-npm/'
    echo '[done] - set publishConfig to snapshot-npm - sections'
fi
npm pack &> /dev/null
echo '[done] - pack - sections'

cd ../map
npm pkg set sideEffects='["./*/**", "./vl-map.*"]' --json >/dev/null
echo '[done] - set sideEffects - map'
if [[ $1 == "develop" ]]; then
    npm pkg set publishConfig.registry='https://repo.omgeving.vlaanderen.be/artifactory/api/npm/snapshot-npm/'
    echo '[done] - set publishConfig to snapshot-npm - map'
fi
npm pack &> /dev/null
echo '[done] - pack - map'

cd ..
