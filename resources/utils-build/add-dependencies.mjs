#!/usr/bin/env node

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

packageJson.dependencies ??= {};

for (const [name, entry] of Object.entries(toAdd)) {
    if (!entry?.version) {
        console.error(`add-dependencies faalde: geen versie voor '${name}' in '${dependenciesFile}'`);
        process.exit(1);
    }

    packageJson.dependencies[name] = entry.version;
}

writeFileSync(packageFile, `${JSON.stringify(packageJson, null, 2)}\n`);

console.log(`[done] - add-dependencies - ${packageFile} (${Object.keys(toAdd).length} dependencies)`);
