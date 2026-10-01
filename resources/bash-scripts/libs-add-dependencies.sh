#!/bin/bash

# exit on error
set -e

# to the root folder
cd ../..

# clear the dep-to-add folder
rm -rf ./build/dep-to-add

# creëer een folder voor de json bestanden met de dependencies
mkdir -p ./build/dep-to-add

for LIB in common styles components map structures; do
    # depcheck schrijft per library een json bestand weg dat blijft staan, net als het dta bestand hieronder. Daarin is
    # 'missing' de lijst van packages die de gebouwde library importeert maar die nog niet in zijn package.json staan, en
    # 'using' de lijst van alle packages die ze importeert. Door self-imports (styles, components) staat ook de eigen
    # packagenaam in 'missing'; add-dependencies.mjs slaat die met een waarschuwing over.
    # Bewust geen '--oneline': die output zet 'Unused dependencies' vóór 'Missing dependencies', zodat een library met
    # een (nog) ongebruikte dependency in zijn package.template.json (zoals structures) de verkeerde namen doorgaf.
    # depcheck eindigt met exit -1 zodra het iets vindt, dus ook bij een geslaagde run. Een echte fout komt op stderr
    # en laat een leeg json bestand achter, waarop 'node' hieronder faalt. '--reporter=silent' houdt de pnpm-meldingen
    # ('Already up to date') uit het json bestand.
    DEPCHECK=./build/dep-to-add/${LIB}-depcheck.json
    pnpm --reporter=silent exec depcheck ./build/dist/libs/${LIB} --json > ${DEPCHECK} || true
    MISSING=$(node -p "Object.keys(require('${DEPCHECK}').missing).join(' ')")

    # zonder deze controle draait 'pnpm list' hieronder zonder packages, en dat geeft alle dependencies van de root
    # package.json terug - die zouden dan stuk voor stuk in het artifact geïnjecteerd worden
    if [[ -z ${MISSING} ]]; then
        # uitzondering enkel voor structures, zolang die nog geen enkele structuur bevat: de library importeert dan
        # geen enkel package ('using' is leeg) en er valt niets toe te voegen. Ze vervalt vanzelf zodra de eerste
        # structuur iets importeert; vanaf dan geldt de controle ook voor structures.
        if [[ ${LIB} == structures && $(node -p "Object.keys(require('${DEPCHECK}').using).length") == 0 ]]; then
            echo "[warn] - add-dependencies - '${LIB}' importeert nog geen enkel package (lege library), niets toegevoegd"
            continue
        fi

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
