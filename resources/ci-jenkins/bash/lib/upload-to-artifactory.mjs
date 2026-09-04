#!/usr/bin/env node

// Upload een bestand naar artifactory met een PUT.
//
//   node upload-to-artifactory.mjs <bestand> <doel-url>
//
// Een PUT en geen 'npm publish' omdat er bij de fat-lib tgz geen package.json hoort.
//
// Dit gebeurt via node en niet via curl: curl zit niet meer in de cypress docker-image, en
// 'apt-get install curl' werkt op de Jenkins-pod niet omdat die geen egress heeft naar
// deb.debian.org (apt-get update haalt dan geen enkele package-index op en apt kan de naam
// 'curl' niet resolven). Node is er sowieso - het is een cypress-image en pnpm install draait in
// de pijplijn - en heeft fetch() globaal sinds Node 18.

import { readFileSync } from 'node:fs';

const need = (name) => {
    const value = process.env[name];
    if (!value) {
        console.error(`upload faalde: ontbrekende env var ${name}`);
        process.exit(1);
    }
    return value;
};

const [file, url] = process.argv.slice(2);
if (!file || !url) {
    console.error('gebruik: node upload-to-artifactory.mjs <bestand> <doel-url>');
    process.exit(1);
}

const login = need('ACD_REPOSITORY_DEBIAN_LOGIN');
const password = need('ACD_REPOSITORY_PASSWORD');
const auth = Buffer.from(`${login}:${password}`).toString('base64');

let body;
try {
    body = readFileSync(file);
} catch (error) {
    console.error(`upload faalde: kan '${file}' niet lezen - ${error.message}`);
    process.exit(1);
}

let response;
try {
    response = await fetch(url, {
        method: 'PUT',
        headers: { Authorization: `Basic ${auth}` },
        body,
    });
} catch (error) {
    console.error(`upload faalde: geen antwoord van ${url} - ${error.message}`);
    process.exit(1);
}

if (!response.ok) {
    // de response body bevat de reden (bv. onvoldoende rechten op het pad)
    const details = await response.text().catch(() => '');
    console.error(`upload faalde: HTTP ${response.status} ${response.statusText}\n${details}`);
    process.exit(1);
}

console.log(`upload OK: HTTP ${response.status}`);
