#!/bin/bash

# exit on error
set -e

# to the folder to generate
cd ../generate-icons

# generate the icons
tsx generate-icon-files.ts
# format the generated files
prettier ../../libs/components/src/atom/icon-style/vl-icon-style-mapping.css.ts --write
prettier ../../libs/components/src/atom/icon/vl-icon-list.ts --write

# back to the initial folder
cd ../bash-scripts
