#!/usr/bin/env node

/**
 * Breidt de 'dependencies' van één package.json uit met de dependencies uit een dta (dependencies-to-add) bestand,
 * zoals 'libs-add-dependencies.sh' die met 'npm list --json' aanmaakt.
 */

import { readFileSync, writeFileSync } from 'node:fs';

const [dependenciesFile, packageFile] = process.argv.slice(2);

if (!dependenciesFile || !packageFile) {
    console.error('gebruik: node add-dependencies.mjs <dta-bestand> <package.json>');
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

const toAdd = readJson(dependenciesFile).dependencies ?? {};
const packageJson = readJson(packageFile);

// elke library heeft minstens één externe dependency, dus een leeg dta bestand betekent dat depcheck of npm list niet
// deed wat we denken - dan mag er geen artifact van gemaakt worden
if (Object.keys(toAdd).length === 0) {
    console.error(`add-dependencies faalde: '${dependenciesFile}' bevat geen enkele dependency`);
    process.exit(1);
}

packageJson.dependencies ??= {};

for (const [name, entry] of Object.entries(toAdd)) {
    if (!entry?.version) {
        console.error(`add-dependencies faalde: geen versie voor '${name}' in '${dependenciesFile}'`);
        process.exit(1);
    }

    packageJson.dependencies[name] = entry.version;
}

writeFileSync(packageFile, `${JSON.stringify(packageJson, null, 4)}\n`);

console.log(`[done] - add-dependencies - ${packageFile}: ${Object.keys(toAdd).join(', ')}`);
