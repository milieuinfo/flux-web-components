#!/bin/bash

# exit on error
set -e

# to the folder to generate
cd ../generate-web-types

cd ./wt-validate-completeness
jest ./web-types-completeness.spec.ts

cd ../wt-validate-schema
jest ./web-types-schema.spec.ts

cd ../wt-validate-argtypes
jest ./web-types-argtypes.spec.ts

# back to the run folder
cd ../../bash-scripts
