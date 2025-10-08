#!/usr/bin/env node

// node ./launch-finish.mjs
// Vereist Node 18+ (fetch aanwezig).

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

function need(name) {
    const v = process.env[name];
    if (!v) {
        console.error(`Missing env var: ${name}`);
        process.exit(1);
    }
    return v;
}

// Verplichte env vars voor de API
const RP_BASE_URL = need("RP_BASE_URL").replace(/\/+$/, ""); // bv. https://rp.example.com/api
const RP_PROJECT  = need("RP_PROJECT"); // bv. my_project
const RP_API_KEY  = need("RP_API_KEY"); // API token

// Pad naar het properties-bestand (default gelijk aan start-launch)
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const RELATIVE_OUT = process.env.RP_PROPS_FILE || "rp-context/rp.properties";
const PROPS_FILE = path.isAbsolute(RELATIVE_OUT) ? RELATIVE_OUT : path.join(SCRIPT_DIR, RELATIVE_OUT);

// Eenvoudige .properties parser (KEY=VALUE), case-insensitive keys
async function readProps(file) {
    const txt = await fs.readFile(file, "utf8");
    const out = {};
    for (const rawLine of txt.split(/\r?\n/)) {
        const line = rawLine.trim();
        if (!line || line.startsWith("#") || line.startsWith(";")) continue;
        const idx = line.indexOf("=");
        if (idx === -1) continue;
        const key = line.slice(0, idx).trim().toUpperCase();
        const val = line.slice(idx + 1).trim();
        out[key] = val;
    }
    return out;
}

function nowIso() {
    return new Date().toISOString();
}

(async () => {
    // 1) Properties lezen en LAUNCH_ID ophalen
    const props = await readProps(PROPS_FILE);
    const LAUNCH_ID = props.LAUNCH_ID || props.RP_LAUNCH_ID;
    if (!LAUNCH_ID) {
        console.error(`LAUNCH_ID niet gevonden in ${PROPS_FILE}`);
        process.exit(1);
    }

    // 2) Launch afwerken
    const url = `${RP_BASE_URL}/${encodeURIComponent(RP_PROJECT)}/launch/${encodeURIComponent(LAUNCH_ID)}/finish`;
    const body = { endTime: nowIso() };

    console.log(`→ Finishing RP launch id=${LAUNCH_ID} @ ${url}`);

    const res = await fetch(url, {
        method: "PUT",
        headers: {
            Authorization: `bearer ${RP_API_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const txt = await res.text().catch(() => "");
        console.error(`Finish launch failed: ${res.status} ${res.statusText}\n${txt}`);
        process.exit(1);
    }

    console.log("✓ Launch finished.");
})().catch(err => {
    console.error("❌ Error:", err?.message || err);
    process.exit(1);
});
