#!/bin/bash

# exit on error
set -e

# to the root folder
cd ../..

# clear the dep-to-add folder
rm -rf ./build/dep-to-add

# creëer een folder voor de json bestanden met de dependencies
mkdir -p ./build/dep-to-add

for LIB in common styles components map; do
    # depcheck lijst de packages op die de gebouwde library importeert maar die nog niet in zijn package.json staan:
    # regel 1 is de titel 'Missing dependencies', regel 2 zijn de namen. Door self-imports (styles, components) staat
    # ook de eigen packagenaam in die lijst; add-dependencies.mjs slaat die met een waarschuwing over.
    MISSING=$(pnpm exec depcheck ./build/dist/libs/${LIB} --oneline | tail -n +2)

    # zonder deze controle draait 'pnpm list' hieronder zonder packages, en dat geeft alle dependencies van de root
    # package.json terug - die zouden dan stuk voor stuk in het artifact geïnjecteerd worden
    if [[ -z ${MISSING} ]]; then
        echo "[FOUT] - depcheck vond geen ontbrekende dependencies voor '${LIB}' - is deze stap al gedraaid sinds de laatste 'pnpm run libs:build'?" >&2
        exit 1
    fi

    # maak het dta (dependencies-to-add) bestand met de versies waarmee in deze repo gebouwd is - dat bestand blijft
    # staan, zodat achteraf te controleren is wat er precies geïnjecteerd werd. 'pnpm list' leest de geïnstalleerde
    # versies read-only (geen install, geen scripts). Een naam die het niet kent, laat het stilzwijgend weg (exit 0);
    # daarom krijgt add-dependencies.mjs de namen mee en faalt het zodra er één zonder versie is.
    # NB: 'npm list' kan hier niet meer: 'devEngines' in package.json laat npm elk commando in deze map weigeren
    # (EBADDEVENGINES, exit 1).
    pnpm list ${MISSING} --json --depth 0 > ./build/dep-to-add/${LIB}-dta.json

    # breidt de package.json van de library uit met de ontbrekende dependencies
    node ./resources/utils-build/add-dependencies.mjs \
        ./build/dep-to-add/${LIB}-dta.json \
        ./build/dist/libs/${LIB}/package.json \
        ${MISSING}
done

# back to the initial folder
cd ./resources/bash-scripts
