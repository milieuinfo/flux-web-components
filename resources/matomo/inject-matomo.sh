#!/usr/bin/env bash
#
# inject-matomo.sh - Injecteer Matomo tracking in een bestaande Storybook build
#
# Gebruik:
#   Eén enkele build:    ./resources/matomo/inject-matomo.sh /pad/naar/storybook-build
#   Specifieke versie:   ./resources/matomo/inject-matomo.sh /pad/naar/release-v2/2.10.0
#   Alle versies:        ./resources/matomo/inject-matomo.sh /pad/naar/release-v2
#   Alle releases:       ./resources/matomo/inject-matomo.sh /pad/naar/flux-builds
#
# matomo-loader.js wordt altijd in elke storybook/ directory geplaatst.
# matomo-tracking.js wordt op één centrale locatie geplaatst afhankelijk van de modus:
#   - Enkele build:  storybook/   (loader vindt via ./)
#   - Versie-dir:    x.y.z/       (loader vindt via ../)
#   - Release-dir:   release-vX/  (loader vindt via ../../, éénmalig voor alle versies)
#   - Builds-root:   release-vX/  (per release, loader vindt via ../../)
#
# voorbeeld
# ./resources/matomo/inject-matomo.sh /Users/kspeltin/Ontwikkeling/OMG/flux-builds/release-v1/1.0.0
# ./resources/matomo/inject-matomo.sh /Users/kspeltin/Ontwikkeling/OMG/flux-builds/release-v2
# ./resources/matomo/inject-matomo.sh /Users/kspeltin/Ontwikkeling/OMG/flux-builds

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
MATOMO_SCRIPT_SOURCE="$REPO_ROOT/apps/storybook/matomo-tracking.js"
MATOMO_LOADER_SOURCE="$REPO_ROOT/apps/storybook/resources/public/matomo-loader.js"
COUNT=0

if [ $# -lt 1 ]; then
    echo "Gebruik: $0 <storybook-build-directory | versie-directory | release-vX-directory | builds-root>"
    echo ""
    echo "Voorbeelden:"
    echo "  $0 ./build/dist/apps/storybook          # één build"
    echo "  $0 /var/www/flux/release-v2/2.10.0      # specifieke versie"
    echo "  $0 /var/www/flux/release-v2             # alle versies in één release"
    echo "  $0 /var/www/flux                        # alle releases"
    exit 1
fi

TARGET_DIR="$(cd "$1" && pwd)"

if [ ! -d "$TARGET_DIR" ]; then
    echo "Fout: Directory '$TARGET_DIR' bestaat niet."
    exit 1
fi

# Voeg bestand toe aan git index als het binnen een repo valt
git_add_if_tracked() {
    local file="$1"
    local dir
    dir="$(dirname "$file")"
    if git -C "$dir" rev-parse --is-inside-work-tree &>/dev/null; then
        git -C "$dir" add "$file"
    fi
}

# Kopieer matomo-tracking.js naar een directory en voeg toe aan git index
copy_js() {
    local js_dir="$1"
    cp "$MATOMO_SCRIPT_SOURCE" "$js_dir/matomo-tracking.js"
    git_add_if_tracked "$js_dir/matomo-tracking.js"
}

# Kopieer matomo-loader.js naar een storybook directory en injecteer de script-tag in index.html
inject_loader() {
    local dir="$1"
    local index_html="$dir/index.html"

    if [ ! -f "$index_html" ]; then
        echo "  Overslaan: geen index.html gevonden in $dir"
        return
    fi

    cp "$MATOMO_LOADER_SOURCE" "$dir/matomo-loader.js"
    git_add_if_tracked "$dir/matomo-loader.js"

    if grep -q 'matomo-loader.js' "$index_html"; then
        echo "  $dir — script-tag al aanwezig, overslaan."
    else
        perl -i -pe '$done || s|<script>|<script defer src="./matomo-loader.js"></script><script>| && ($done=1)' "$index_html"
        echo "  $dir — geïnjecteerd."
    fi
}

# Detecteer geneste storybook/ directories binnen release-vX/ subdirectories
first_nested_storybook="$(find "$TARGET_DIR" -mindepth 2 -maxdepth 4 -type d -name "storybook" -path "*/release-v*/*" 2>/dev/null | head -1)"

# Mode 3 & 4: release-vX-directory of builds-root — geneste storybook/ directories gevonden
if [ -n "$first_nested_storybook" ]; then
    echo "Zoeken naar Storybook builds in $TARGET_DIR ..."
    echo ""

    # matomo-tracking.js één keer in de opgegeven directory plaatsen
    copy_js "$TARGET_DIR"

    while IFS= read -r -d '' storybook_dir; do
        inject_loader "$storybook_dir"
        COUNT=$((COUNT + 1))
    done < <(find "$TARGET_DIR" -mindepth 2 -maxdepth 4 -type d -name "storybook" -path "*/release-v*/*" -print0 | sort -z)

    echo ""
    echo "$COUNT versie(s) verwerkt."

# Mode 2: versie-directory (x.y.z/ met storybook/ subdir met index.html)
elif [ -f "$TARGET_DIR/storybook/index.html" ]; then
    echo "Injecteren in versie-directory: $TARGET_DIR"
    copy_js "$TARGET_DIR"
    inject_loader "$TARGET_DIR/storybook"

# Mode 1: directe Storybook build directory (bevat zelf een index.html)
elif [ -f "$TARGET_DIR/index.html" ]; then
    echo "Injecteren in enkele build: $TARGET_DIR"
    copy_js "$TARGET_DIR"
    inject_loader "$TARGET_DIR"

else
    echo "Geen Storybook builds gevonden in $TARGET_DIR."
    exit 1
fi

echo "Klaar!"
