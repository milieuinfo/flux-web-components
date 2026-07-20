#!/bin/bash

# exit on error
set -e

echo 'RUNNING SCRIPT: build-apps-and-libs.sh'
cd flux-web-components

# jq moet beschikbaar zijn om libs-add-dependencies.sh correct uit te kunnen voeren
apt-get -y update; apt-get -y install jq

# pnpm beschikbaar maken via corepack (gepind via het packageManager-veld in package.json)
corepack enable

echo "pnpm install - to force the clean"
set +e
pnpm install --frozen-lockfile 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "pnpm install - success"
  else
    echo "pnpm install - error - buffer-stderr.txt" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e

echo 'BUILDING - BEGIN'

echo "generate web-types"
set +e
pnpm run libs:web-types:generate 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "generate web-types - success"
  else
    echo "generate web-types - error - buffer-stderr.txt" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e

echo "validate the generated web-types"
pnpm run libs:web-types:validate

echo "build libraries"
set +e
pnpm run libs:build 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "build libraries - success"
  else
    echo "build libraries - error - buffer-stderr.txt" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e

echo "add library dependencies"
set +e
pnpm run libs:add-dependencies 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "add library dependencies - success"
  else
    echo "add library dependencies - error - buffer-stderr.txt" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e

echo "build storybook"
set +e
pnpm run apps:storybook:build 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "build storybook - success"
  else
    echo "build storybook - error - buffer-stderr.txt" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e

echo "build integrator"
set +e
pnpm run apps:integrator:build 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "build integrator - success"
  else
    echo "build integrator - error - buffer-stderr.txt" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e

echo "build playground-lit"
set +e
pnpm run apps:playground-lit:build 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "build playground-lit - success"
  else
    echo "build playground-lit - error - buffer-stderr.txt" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e

echo "build playground-native"
set +e
pnpm run apps:playground-native:build 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "build playground-native - success"
  else
    echo "build playground-native - error - buffer-stderr.txt" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e

echo "build playground-react"
set +e
pnpm run apps:playground-react:build 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "build playground-react - success"
  else
    echo "build playground-react - error - buffer-stderr.txt" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e

echo "build fat-lib"
set +e
pnpm run fat-lib:build 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "build fat-lib - success"
  else
    echo "build fat-lib - error - buffer-stderr.txt" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e

echo "build fat-lib-min"
set +e
pnpm run fat-lib:build-min 2> buffer-stderr.txt 1> buffer-stdout.txt
if [[ $? -eq 0 ]]
  then
    echo "build fat-lib-min - success"
  else
    echo "build fat-lib-min - error - buffer-stderr.txt" >&2
    cat buffer-stderr.txt >&2
    cat buffer-stdout.txt >&2
    set -e
    exit 1
fi
set -e

echo 'BUILDING - END'
