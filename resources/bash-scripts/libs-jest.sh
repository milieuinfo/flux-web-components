#!/bin/bash

# exit on error
#set -e

# to the root folder
cd ../..

# run this script with: bash ./jest-run.sh

cd ./libs/styles
jest
cd ../..

cd ./libs/common
jest
cd ../..

cd ./libs/components
jest
cd ../..

cd ./libs/integrations
jest
cd ../..

cd ./libs/map
jest
cd ../..

# back to the initial folder
cd ./resources/bash-scripts
