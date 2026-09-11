#!/usr/bin/env node

/**
 * Breidt de 'dependencies' van één package.json uit met de dependencies uit een dta (dependencies-to-add) bestand,
 * zoals 'libs-add-dependencies.sh' die met 'pnpm list <namen> --json --depth 0' aanmaakt: een array met één project,
 * met de gevraagde packages onder dependencies/devDependencies/optionalDependencies en hun geïnstalleerde versie.
 *
 * gebruik: node add-dependencies.mjs <dta-bestand> <package.json> <naam>...
 *
 * Elke opgegeven naam moet met een versie in het dta-bestand staan. 'pnpm list' laat een naam die het niet kent
 * stilzwijgend weg (exit 0), en dan zou de library zonder die dependency gepubliceerd worden.
 *
 * Uitzondering: de eigen packagenaam. Sommige libraries importeren zichzelf bij naam (styles via '@domg-wc/styles',
 * components via '@domg-wc/components/atom' en '/block'), en depcheck rapporteert die naam dan als ontbrekend. Een
 * package is geen dependency van zichzelf, dus die naam wordt met een waarschuwing overgeslagen. Onder 'npm list'
 * gebeurde dat stilzwijgend; de releases 2.18.0 en 2.19.0 zijn zo gebouwd.
 */

import { readFileSync, writeFileSync } from 'node:fs';

const [dependenciesFile, packageFile, ...names] = process.argv.slice(2);

if (!dependenciesFile || !packageFile || names.length === 0) {
    console.error('gebruik: node add-dependencies.mjs <dta-bestand> <package.json> <naam>...');
    process.exit(1);
}

const readJson = (file) => {
    try {
        return JSON.parse(readFileSync(file, 'utf8'));
    } catch (error) {
        console.error(`add-dependencies faalde: kan '${file}' niet lezen - ${error.message}`);
        process.exit(1);
    }
};

const dta = readJson(dependenciesFile);
const project = Array.isArray(dta) ? dta[0] : undefined;

if (!project) {
    console.error(`add-dependencies faalde: '${dependenciesFile}' heeft niet de vorm van 'pnpm list --json' (array)`);
    process.exit(1);
}

const installed = {};

for (const section of ['dependencies', 'devDependencies', 'optionalDependencies']) {
    for (const [name, entry] of Object.entries(project[section] ?? {})) {
        installed[name] = entry?.version;
    }
}

const packageJson = readJson(packageFile);
packageJson.dependencies ??= {};

const skipped = [];

for (const name of names) {
    if (name === packageJson.name) {
        skipped.push(name);
        continue;
    }

    if (!installed[name]) {
        console.error(`add-dependencies faalde: geen versie voor '${name}' in '${dependenciesFile}'`);
        process.exit(1);
    }

    packageJson.dependencies[name] = installed[name];
}

writeFileSync(packageFile, `${JSON.stringify(packageJson, null, 4)}\n`);

for (const name of skipped) {
    console.warn(
        `[warn] - add-dependencies - ${packageFile}: '${name}' is de eigen packagenaam (self-import), overgeslagen`,
    );
}

console.log(
    `[done] - add-dependencies - ${packageFile}: ${names.filter((name) => !skipped.includes(name)).join(', ')}`,
);
