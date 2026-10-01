#!/bin/bash

# exit on error
set -e

# to the root folder
cd ../..

# structures mag van common, components en styles afhangen, maar niet omgekeerd - anders injecteert
# libs-add-dependencies.sh via depcheck een circulaire dependency in de package.json van die artifacts
if grep -rl --include='*.ts' --include='*.js' '@domg-wc/structures' ./libs/common ./libs/components ./libs/styles ./libs/map; then
    echo "[FOUT] - build-libs - bovenstaande bestanden importeren @domg-wc/structures; die afhankelijkheidsrichting mag niet" >&2
    exit 1
fi

# structures mag niets van map gebruiken, ook niet in stories of testen
if grep -rl --include='*.ts' --include='*.js' '@domg-wc/map' ./libs/structures; then
    echo "[FOUT] - build-libs - bovenstaande bestanden importeren @domg-wc/map; structures mag niets van map gebruiken" >&2
    exit 1
fi

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

# structures
tsc -p ./libs/structures/tsconfig.lib.json
node ./resources/utils-build/copy-structures-js.mjs
echo '[done] - build-libs - structures'

# integrations
tsc -p ./libs/integrations/tsconfig.lib.json
tsc -p ./libs/integrations/tsconfig-map.lib.json
# there is no integrations package to make - it is just an internal library (that should transpile)
echo '[done] - build-libs - integrations'

# back to the initial folder
cd ./resources/bash-scripts
