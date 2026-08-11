#!/bin/bash

# exit on error
set -e

# to the root folder
cd ../..

# clear the dep-to-add folder
rm -rf ./build/dep-to-add

# creëer een folder voor de json bestanden met de dependencies
mkdir -p ./build/dep-to-add

# maak de dependency bestanden voor elke bibliotheek
npm list $(npx depcheck ./build/dist/libs/common --oneline | tail -n +2) --json --depth 0 > ./build/dep-to-add/common-dta.json
npm list $(npx depcheck ./build/dist/libs/styles --oneline | tail -n +2) --json --depth 0 > ./build/dep-to-add/styles-dta.json
npm list $(npx depcheck ./build/dist/libs/components --oneline | tail -n +2) --json --depth 0 > ./build/dep-to-add/components-dta.json
npm list $(npx depcheck ./build/dist/libs/map --oneline | tail -n +2) --json --depth 0 > ./build/dep-to-add/map-dta.json

# breidt de package.json's van de libraries uit met de ontbrekende dependencies
for LIB in common styles components map; do
    node ./resources/utils-build/add-dependencies.mjs \
        ./build/dep-to-add/${LIB}-dta.json \
        ./build/dist/libs/${LIB}/package.json
done
