import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { mergeWebTypes, type MergedComponent } from './merge-web-types';

const REPO_ROOT = resolve(__dirname, '..', '..');
const OUTPUT_DIR = resolve(REPO_ROOT, 'apps/storybook/resources/public');
const LEAN_FILE = resolve(OUTPUT_DIR, 'llms.txt');
const FULL_FILE = resolve(OUTPUT_DIR, 'llms-full.txt');

const KIND_ORDER: MergedComponent['kind'][] = ['Atom', 'Block', 'Form', 'Compliance', 'Map'];

function stripInlineMarkup(text: string): string {
    return text
        .replace(/<br\s*\/?\s*>/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function firstSentence(text: string): string {
    const stripped = stripInlineMarkup(text);
    const match = stripped.match(/^(.+?[.!?])(?=\s|$)/);
    return match ? match[1] : stripped;
}

function escapeTableCell(text: string): string {
    return stripInlineMarkup(text).replace(/\|/g, '\\|');
}

function formatAttributeType(attr: MergedComponent['attributes'][number]): string {
    if (attr.value?.type) return attr.value.type;
    const def = (attr.default ?? '').toLowerCase();
    if (def === 'true' || def === 'false') return 'boolean';
    if (def !== '' && !isNaN(Number(def))) return 'number';
    return 'string';
}

function buildLean(version: string, components: MergedComponent[]): string {
    const lines: string[] = [];
    lines.push(`# Flux Web Components (v${version})`);
    lines.push('');
    lines.push(
        'Componenten-bibliotheek voor Vlaamse overheid (DOMG), Lit-gebaseerd. ' +
            'Web components met `vl-` prefix.',
    );
    lines.push('');
    lines.push(
        `Volledige API-referentie: https://flux.omgeving.vlaanderen.be/release-v2/${version}/storybook/llms-full.txt`,
    );
    lines.push('');
    lines.push(
        `Storybook docs: https://flux.omgeving.vlaanderen.be/release-v2/${version}/storybook/`,
    );
    lines.push('');

    for (const kind of KIND_ORDER) {
        const items = components.filter((c) => c.kind === kind);
        if (items.length === 0) continue;
        lines.push(`## ${kind}`);
        lines.push('');
        for (const c of items) {
            const summary = firstSentence(c.description);
            lines.push(`- [${c.name}](${c.docUrl}): ${summary}`);
        }
        lines.push('');
    }

    return lines.join('\n');
}

function buildFull(version: string, components: MergedComponent[]): string {
    const lines: string[] = [];
    lines.push(`# Flux Web Components (v${version}) - Full API reference`);
    lines.push('');
    lines.push(
        'Volledige API per component (attributes, events, slots). Geen code-snippets. ' +
            'Voor voorbeelden, zie Storybook-pagina per component.',
    );
    lines.push('');

    for (const kind of KIND_ORDER) {
        const items = components.filter((c) => c.kind === kind);
        if (items.length === 0) continue;
        lines.push(`# ${kind}`);
        lines.push('');
        for (const c of items) {
            lines.push(`## ${c.name}`);
            lines.push('');
            lines.push(`Storybook: ${c.docUrl}`);
            lines.push('');
            lines.push(stripInlineMarkup(c.description));
            lines.push('');

            if (c.attributes.length > 0) {
                lines.push('### Attributes');
                lines.push('');
                lines.push('| name | type | default | description |');
                lines.push('|------|------|---------|-------------|');
                for (const a of c.attributes) {
                    const type = formatAttributeType(a).replace(/\|/g, '\\|');
                    const def = a.default ?? '';
                    const desc = escapeTableCell(a.description ?? '');
                    lines.push(`| \`${a.name}\` | \`${type}\` | ${def === '' ? '' : `\`${def}\``} | ${desc} |`);
                }
                lines.push('');
            }

            if (c.events.length > 0) {
                lines.push('### Events');
                lines.push('');
                for (const e of c.events) {
                    const typeSuffix = e.type ? ` *(payload: \`${e.type}\`)*` : '';
                    lines.push(`- \`${e.name}\`${typeSuffix}: ${stripInlineMarkup(e.description ?? '')}`);
                }
                lines.push('');
            }

            if (c.slots.length > 0) {
                lines.push('### Slots');
                lines.push('');
                for (const s of c.slots) {
                    const slotName = s.name === '' ? '(default)' : `\`${s.name}\``;
                    lines.push(`- ${slotName}: ${stripInlineMarkup(s.description ?? '')}`);
                }
                lines.push('');
            }
        }
    }

    return lines.join('\n');
}

function main(): void {
    const { version, components } = mergeWebTypes();
    mkdirSync(dirname(LEAN_FILE), { recursive: true });
    const lean = buildLean(version, components);
    const full = buildFull(version, components);
    writeFileSync(LEAN_FILE, lean + '\n', 'utf-8');
    writeFileSync(FULL_FILE, full + '\n', 'utf-8');
    console.log(`llms-generate: wrote ${components.length} components to`);
    console.log(`  ${LEAN_FILE} (${lean.length} chars)`);
    console.log(`  ${FULL_FILE} (${full.length} chars)`);
}

main();
