#!/bin/bash

# to the root folder
cd ../..

# run this script with: bash ./jest-run.sh

# Er zijn geen Jest testen onder libs/styles !
#cd ./libs/styles
#echo "run jest tests styles"
#set +e
#jest 2> buffer-stderr.txt 1> buffer-stdout.txt
#if [[ $? -eq 0 ]]
#  then
#    echo "run jest tests styles - success"
#  else
#    echo "run jest tests styles - error - buffer-stderr.txt" >&2
#    cat buffer-stderr.txt >&2
#    cat buffer-stdout.txt >&2
#    set -e
#    exit 1
#fi
#set -e
#cd ../..

cd ./libs/common
echo "run jest tests common"
set +e
jest 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "run jest tests common - success"
  else
    echo "run jest tests common - error - buffer-stderr.txt" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e
cd ../..

cd ./libs/components
echo "run jest tests components"
set +e
jest 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "run jest tests components - success"
  else
    echo "run jest tests components - error - buffer-stderr.txt" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e
cd ../..

# Er zijn geen Jest testen onder libs/integrations !
#cd ./libs/integrations
#echo "run jest tests integrations"
#set +e
#jest 2> buffer-stderr.txt 1> buffer-stdout.txt
#if [[ $? -eq 0 ]]
#  then
#    echo "run jest tests integrations - success"
#  else
#    echo "run jest tests integrations - error - buffer-stderr.txt" >&2
#    cat buffer-stderr.txt >&2
#    cat buffer-stdout.txt >&2
#    set -e
#    exit 1
#fi
#set -e
#cd ../..

cd ./libs/map
echo "run jest tests map"
set +e
jest 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "run jest tests map - success"
  else
    echo "run jest tests map - error - buffer-stderr.txt" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e
cd ../..

# back to the initial folder
cd ./resources/bash-scripts
