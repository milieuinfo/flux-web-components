#!/usr/bin/env node

// Normaliseert de classname-attributen in de JUnit XML die de test-runs achterlaten in test-results/, zodat het
// Jenkins testrapport op categorie groepeert in plaats van alles in '(root)' te dumpen. Zie test-categories.mjs
// voor de splitsregel.
//
// Draait via een EXIT-trap in de CI bash-scripts, dus ook wanneer een testrun faalt en set -e het script afbreekt -
// precies het geval waarin je het rapport het hardst nodig hebt.
//
// Dit script laat de build NOOIT falen: het draait vlak vóór de junit-step van Jenkins, en een niet-nul exit zou
// daar het testrapport zelf kunnen kosten. Wat het niet herkent, laat het onaangeroerd; die tests komen dan in
// (root) terecht en zijn zo meteen zichtbaar als iets dat hernoemd moet worden.
//
// Werkt op de ge-escapete attribuutwaarde uit de XML. Dat mag: de categorienamen bevatten geen XML-speciale
// tekens, dus de prefix-vergelijking is niet gevoelig voor &amp; en co in de rest van de titel.

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { splitClassname } from './test-categories.mjs';

// Standaard test-results/ op de repo-root, afgeleid van dit bestand en niet van de working directory: het script
// draait uit een EXIT-trap, en dan is niet gegarandeerd waar de shell op dat moment staat.
const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const resultsDir = process.argv[2] ?? join(repoRoot, 'test-results');

let files;
try {
    files = readdirSync(resultsDir).filter((file) => file.endsWith('.xml'));
} catch {
    console.log(`normalize-junit-classnames: geen map '${resultsDir}', niets te doen`);
    process.exit(0);
}

if (files.length === 0) {
    console.log(`normalize-junit-classnames: geen XML-bestanden in '${resultsDir}', niets te doen`);
    process.exit(0);
}

const perCategory = new Map();
const problems = [];
let changedTestcases = 0;
let changedFiles = 0;

for (const file of files) {
    const path = join(resultsDir, file);
    const xml = readFileSync(path, 'utf8');
    let changedInFile = 0;

    const normalized = xml.replace(/classname="([^"]*)"/g, (match, classname) => {
        const result = splitClassname(classname);

        if (result.status === 'gesplitst') {
            changedInFile++;
            perCategory.set(result.category, (perCategory.get(result.category) ?? 0) + 1);
            return `classname="${result.classname}"`;
        }

        if (result.status !== 'ongewijzigd') problems.push({ file, classname, status: result.status });
        return match;
    });

    if (changedInFile > 0) {
        writeFileSync(path, normalized);
        changedTestcases += changedInFile;
        changedFiles++;
    }
}

console.log(`normalize-junit-classnames: ${changedTestcases} testcases aangepast in ${changedFiles} bestanden`);

for (const [category, count] of [...perCategory].sort((a, b) => a[0].localeCompare(b[0]))) {
    console.log(`  ${category.padEnd(48)} ${String(count).padStart(5)}`);
}

if (problems.length > 0) {
    // uniek maken: dezelfde classname komt terug in elk XML-bestand van dezelfde spec
    const unique = [...new Map(problems.map((p) => [p.classname, p])).values()];

    console.warn(`\n  LET OP: ${unique.length} classname(s) zonder bruikbare categorie - die belanden in (root):`);
    for (const { classname, status, file } of unique) {
        console.warn(`    [${status}] ${classname}   (${file})`);
    }
    console.warn(`\n  Voeg de categorie toe aan TEST_CATEGORIES in resources/ci-jenkins/test/test-categories.mjs, of`);
    console.warn(`  hernoem de describe-titel naar '<runner> - <categorie> - <rest>'.`);
}
