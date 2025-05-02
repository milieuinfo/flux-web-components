#!/bin/bash

# exit on error
set -e

# to the folder to generate
cd ../generate-icons

# generate the icons
tsx generate-icon-files.ts
# format the generated files
prettier ../../libs/styles/src/base/icon/vl-icon-mapping.css.ts --write
prettier ../../libs/components/src/block/icon/vl-all-icons.component.ts --write

# back to the initial folder
cd ../bash-scripts
