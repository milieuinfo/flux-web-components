#!/bin/bash

# exit on error
set -e

# to the root folder
cd ../..

# clear build folders
rm -rf ./build/tsc
rm -rf ./build/dist

# common
tsc -p ./libs/common/tsconfig.lib.json
node ./resources/utils-build/copy-common-js.mjs
echo '[done] - build-libs - common'

# styles
tsc -p ./libs/styles/tsconfig.lib.json
node ./resources/utils-build/copy-styles-js.mjs
echo '[done] - build-libs - styles'

# components
tsc -p ./libs/components/tsconfig.lib.json
node ./resources/utils-build/copy-components-js.mjs
echo '[done] - build-libs - components'

# form
tsc -p ./libs/form/tsconfig.lib.json
node ./resources/utils-build/copy-form-js.mjs
echo '[done] - build-libs - form'

# map
tsc -p ./libs/map/tsconfig.lib.json
node ./resources/utils-build/copy-map-js.mjs
echo '[done] - build-libs - map'

## sections
tsc -p ./libs/sections/tsconfig.lib.json
node ./resources/utils-build/copy-sections-js.mjs
echo '[done] - build-libs - sections'

# integration
tsc -p ./libs/integration/tsconfig.lib.json
# there is no integration package to make - it is just an internal library (that should transpile)
echo '[done] - build-libs - integration'

# back to the initial folder
cd ./resources/bash-scripts
