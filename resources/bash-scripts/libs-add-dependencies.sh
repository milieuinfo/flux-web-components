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
npm list $(npx depcheck ./build/dist/libs/form --oneline | tail -n +2) --json --depth 0 > ./build/dep-to-add/form-dta.json
npm list $(npx depcheck ./build/dist/libs/map --oneline | tail -n +2) --json --depth 0 > ./build/dep-to-add/map-dta.json
npm list $(npx depcheck ./build/dist/libs/sections --oneline | tail -n +2) --json --depth 0 > ./build/dep-to-add/sections-dta.json

# breidt de package.json's van de libraries uit met de ontbrekende dependencies
cd ./build/dist/libs/common
jq -r '.dependencies | to_entries[] | "jq '\''.dependencies[\"\(.key)\"]=\"\(.value.version)\"'\'' package.json > tmp.json && mv tmp.json package.json"' ../../../dep-to-add/common-dta.json | bash
cd ../styles
jq -r '.dependencies | to_entries[] | "jq '\''.dependencies[\"\(.key)\"]=\"\(.value.version)\"'\'' package.json > tmp.json && mv tmp.json package.json"' ../../../dep-to-add/styles-dta.json | bash
cd ../components
jq -r '.dependencies | to_entries[] | "jq '\''.dependencies[\"\(.key)\"]=\"\(.value.version)\"'\'' package.json > tmp.json && mv tmp.json package.json"' ../../../dep-to-add/components-dta.json | bash
cd ../form
jq -r '.dependencies | to_entries[] | "jq '\''.dependencies[\"\(.key)\"]=\"\(.value.version)\"'\'' package.json > tmp.json && mv tmp.json package.json"' ../../../dep-to-add/form-dta.json | bash
cd ../map
jq -r '.dependencies | to_entries[] | "jq '\''.dependencies[\"\(.key)\"]=\"\(.value.version)\"'\'' package.json > tmp.json && mv tmp.json package.json"' ../../../dep-to-add/map-dta.json | bash
cd ../sections
jq -r '.dependencies | to_entries[] | "jq '\''.dependencies[\"\(.key)\"]=\"\(.value.version)\"'\'' package.json > tmp.json && mv tmp.json package.json"' ../../../dep-to-add/sections-dta.json | bash


# back to the root folder
cd ../../../..
