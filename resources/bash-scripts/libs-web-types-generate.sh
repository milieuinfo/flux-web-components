#!/bin/bash

# exit on error
set -e

# to the folder to generate
cd ../generate-web-types

# generate the web-types
tsx web-types.generator.ts

# check if any error logs were generated
error_files=$(find ../../libs -name "*.web-types.errors.log" 2>/dev/null)
if [ -n "$error_files" ]; then
    echo "=================================================="
    echo "web-types - errors found"
    echo "=================================================="
    for f in $error_files; do
        echo "file: $f"
        cat "$f"
        echo "=================================================="
    done
    cd ../bash-scripts
    exit 1
fi

# back to the initial folder
cd ../bash-scripts
