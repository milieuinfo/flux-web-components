/**
 * Controleert of elk attribuut van een component een bewuste plaats heeft in zijn Code Connect template.
 *
 * Een component telt mee zodra een template het uitschrijft (`<vl-...` in een string). Elk publiek attribuut van zo'n
 * component (de argTypes van de stories en het component bestand) moet dan in een van die templates staan:
 *  1. gemapt: het template schrijft het attribuut uit op die tag;
 *  2. of in een header comment, omdat Figma het (nog) niet toont:   // code-only vl-step: heading-level, icon-aria-label
 *
 * Een nieuw attribuut dat nergens staat, laat de controle falen. Zo valt het op wanneer een attribuut bijkomt
 * zonder dat iemand beslist of Figma het moet tonen.
 *
 * De controle leest enkel de code, niet Figma. Een template mag dus een variant mappen die in Figma nog niet
 * bestaat; dat de templates in lijn zijn met Figma, controleert check-figma-drift.ts.
 *
 * Een header comment met een attribuut dat het component niet (meer) kent, of dat het template al uitschrijft,
 * faalt ook, zodat de lijsten niet verouderen.
 *
 * Gebruik:
 *   pnpm run figma:code-connect:check-attributes
 *
 * Exit code 1 bij een bevinding, zodat het als CI step bruikbaar is.
 */
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { readArgTypeAttributes } from './argtype-attributes';
import { GLOBAL_ATTRIBUTES, readComponentAttributes } from './component-attributes';
import { readStrings, writes } from './template-strings';

type Declarations = Map<string, Set<string>>;

type Template = {
    file: string;
    strings: string[];
    tags: Set<string>;
    codeOnly: Declarations;
};

/** Attributen van het platform, die op elk element horen en dus geen beslissing per component vragen. */
const isPlatformAttribute = (name: string) =>
    GLOBAL_ATTRIBUTES.has(name) || /^(aria-|data-)/.test(name) || ['role', 'tabindex', 'title', 'lang'].includes(name);

/** Leest de header comments `// code-only <tag>: a, b`; een tag mag over meerdere regels verdeeld staan. */
function readCodeOnly(source: string): Declarations {
    const declarations: Declarations = new Map();
    for (const line of source.matchAll(/^\/\/ code-only (vl-[a-z0-9-]+):(.*)$/gm)) {
        const attributes = declarations.get(line[1]) ?? new Set<string>();
        for (const name of line[2].split(',')) {
            if (name.trim()) attributes.add(name.trim());
        }
        declarations.set(line[1], attributes);
    }
    return declarations;
}

function readTemplates(): Template[] {
    return execSync('find libs -name "*.figma.ts" -not -name "*.figma.batch.ts"')
        .toString()
        .trim()
        .split('\n')
        .filter(Boolean)
        .sort()
        .map((file) => {
            const source = readFileSync(file, 'utf8');
            const strings = readStrings(file);
            const tags = new Set(strings.flatMap((text) => [...text.matchAll(/<(vl-[a-z0-9-]+)/g)].map((m) => m[1])));
            return {
                file,
                strings,
                tags,
                codeOnly: readCodeOnly(source),
            };
        });
}

function main() {
    const templates = readTemplates();
    const componentAttributes = readComponentAttributes();
    const publicAttributes = readComponentAttributes(true);
    const argTypes = readArgTypeAttributes();
    const findings: string[] = [];

    // Per tag: welke templates het uitschrijven. Een tag als vl-button komt in meerdere templates voor; een
    // attribuut is in orde zodra één ervan het mapt of declareert.
    const templatesPerTag = new Map<string, Template[]>();
    for (const template of templates) {
        for (const tag of new Set([...template.tags, ...template.codeOnly.keys()])) {
            templatesPerTag.set(tag, [...(templatesPerTag.get(tag) ?? []), template]);
        }
    }

    for (const [tag, owners] of [...templatesPerTag].sort(([a], [b]) => a.localeCompare(b))) {
        // Te beslissen is de publieke API: de argTypes samen met wat het component bestand publiek declareert. Beide
        // zijn nodig: niet elk component heeft argTypes (bv. vl-duration-step), en het component bestand registreert
        // ook interne properties, die `publicOnly` weglaat. Wat in een header comment mag staan, is ruimer: alles wat
        // een van beide kent.
        const required = new Set([...(argTypes.get(tag) ?? []), ...(publicAttributes.get(tag) ?? [])]);
        const known = new Set([...required, ...(componentAttributes.get(tag) ?? [])]);
        const files = owners.map((template) => template.file.split('/').pop()).join(', ');

        for (const template of owners) {
            for (const attribute of template.codeOnly.get(tag) ?? []) {
                if (!known.has(attribute)) {
                    findings.push(
                        `${tag}: '${attribute}' staat in // code-only van ${template.file}, ` +
                            `maar het component kent dat attribuut niet. Verwijder het daar.`,
                    );
                } else if (writes(template.strings, tag, attribute)) {
                    findings.push(
                        `${tag}: '${attribute}' staat in // code-only van ${template.file}, ` +
                            `maar het template schrijft het al uit. Verwijder het uit // code-only.`,
                    );
                }
            }
        }

        for (const attribute of [...required].sort()) {
            if (isPlatformAttribute(attribute)) continue;
            const covered = owners.some(
                (template) => writes(template.strings, tag, attribute) || template.codeOnly.get(tag)?.has(attribute),
            );
            if (!covered) {
                findings.push(
                    `${tag}: attribuut '${attribute}' staat niet in ${files}. Map het, ` +
                        `of zet het in // code-only ${tag}: als Figma het (nog) niet toont.`,
                );
            }
        }
    }

    console.log(`Gecontroleerd: ${templatesPerTag.size} componenten in ${templates.length} templates.`);
    if (!findings.length) {
        console.log('Elk attribuut staat in een template.');
    } else {
        console.log(`Bevindingen: ${findings.length}\n`);
        for (const finding of findings) console.log(finding);
    }
    process.exit(findings.length ? 1 : 0);
}

main();
