#!/usr/bin/env node

// node ./launch-start.mjs
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

// script directory bepalen
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));

// Verplichte env vars
const RP_BASE_URL = need("RP_BASE_URL").replace(/\/+$/, ""); // bv. https://rp.example.com/api
const RP_PROJECT  = need("RP_PROJECT"); // bv. my_project
const RP_API_KEY  = need("RP_API_KEY"); // API token

// Optionele env vars
const RP_LAUNCH_NAME = process.env.RP_LAUNCH_NAME || `CI Launch ${new Date().toISOString()}`;
const RP_LAUNCH_MODE = (process.env.RP_LAUNCH_MODE || "DEFAULT").toUpperCase() === "DEBUG" ? "DEBUG" : "DEFAULT";

// Standaard relatief t.o.v. SCRIPT_DIR
const RELATIVE_OUT = process.env.RP_PROPS_FILE || "rp-context/rp.properties";
const RP_PROPS_FILE  = path.isAbsolute(RELATIVE_OUT) ? RELATIVE_OUT : path.join(SCRIPT_DIR, RELATIVE_OUT);

// (optioneel) attributen als "key=value,key2=value2" in RP_ATTRS
function parseAttrs(s) {
    if (!s) return [];
    return s.split(",").map(x => x.trim()).filter(Boolean).map(kv => {
        const i = kv.indexOf("=");
        if (i === -1) return { value: kv };
        const key = kv.slice(0, i);
        const value = kv.slice(i + 1);
        return key ? { key, value } : { value };
    });
}
const attributes = parseAttrs(process.env.RP_ATTRS);

async function startLaunch() {
    const body = {
        name: RP_LAUNCH_NAME,
        mode: RP_LAUNCH_MODE,
        startTime: new Date().toISOString(),
        attributes, // mag leeg zijn
    };

    const res = await fetch(`${RP_BASE_URL}/${encodeURIComponent(RP_PROJECT)}/launch`, {
        method: "POST",
        headers: {
            Authorization: `bearer ${RP_API_KEY}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const txt = await res.text().catch(() => "");
        console.error(`Start launch failed: ${res.status} ${res.statusText}\n${txt}`);
        process.exit(1);
    }
    return res.json();
}

function toProperties(obj) {
    const lines = [];
    for (const [k, v] of Object.entries(obj)) {
        lines.push(`${k.toUpperCase()}=${v == null ? "" : String(v)}`);
    }
    return lines.join("\n") + "\n";
}

async function saveProperties(filePath, data) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, toProperties(data), "utf8");
}

(async () => {
    console.log(`→ Starting launch: "${RP_LAUNCH_NAME}" (mode=${RP_LAUNCH_MODE}) in ${RP_PROJECT}`);

    const started = await startLaunch(); // verwacht { id, uuid?, number? }
    const props = {
        launch_id: started.id,
        launch_uuid: started.uuid ?? "",
        launch_number: started.number ?? "",
        rp_project: RP_PROJECT,
        rp_base: RP_BASE_URL,
        launch_name: RP_LAUNCH_NAME,
        launch_mode: RP_LAUNCH_MODE
    };

    await saveProperties(RP_PROPS_FILE, props);
    console.log(`✓ Launch started: id=${props.launch_id}${props.launch_uuid ? ` uuid=${props.launch_uuid}` : ""}`);
    console.log(`✓ Saved to ${RP_PROPS_FILE}`);
})().catch(err => {
    console.error("❌ Error:", err?.message || err);
    process.exit(1);
});
