#!/bin/bash

# exit on error
set -e

# to the root folder
cd ../..

# clear build folders
rm -rf ./build/tsc
rm -rf ./build/dist

# styles
tsc -p ./libs/styles/tsconfig.lib.json
node ./resources/utils-build/copy-styles-js.mjs
echo '[done] - build-libs - styles'

# common
tsc -p ./libs/common/tsconfig.lib.json
node ./resources/utils-build/copy-common-js.mjs
echo '[done] - build-libs - common'

# components
tsc -p ./libs/components/tsconfig.lib.json
node ./resources/utils-build/copy-components-js.mjs
echo '[done] - build-libs - components'

# map
tsc -p ./libs/map/tsconfig.lib.json
node ./resources/utils-build/copy-map-js.mjs
echo '[done] - build-libs - map'

# integrations
tsc -p ./libs/integrations/tsconfig.lib.json
# there is no integrations package to make - it is just an internal library (that should transpile)
echo '[done] - build-libs - integrations'

# back to the initial folder
cd ./resources/bash-scripts
