import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const REPO_ROOT = resolve(__dirname, '..', '..');

type WebTypesAttribute = {
    name: string;
    description?: string;
    default?: string;
    value?: { kind?: string; type?: string };
};

type WebTypesEvent = {
    name: string;
    description?: string;
    type?: string;
};

type WebTypesSlot = {
    name: string;
    description?: string;
};

type WebTypesElement = {
    name: string;
    description?: string;
    'doc-url'?: string;
    attributes?: WebTypesAttribute[];
    slots?: WebTypesSlot[];
    js?: {
        events?: WebTypesEvent[];
    };
};

export type MergedComponent = {
    kind: 'Atom' | 'Block' | 'Form' | 'Compliance' | 'Map';
    name: string;
    description: string;
    docUrl: string;
    attributes: WebTypesAttribute[];
    events: WebTypesEvent[];
    slots: WebTypesSlot[];
};

const SOURCES: { kind: MergedComponent['kind']; path: string }[] = [
    { kind: 'Atom', path: 'libs/components/src/atom/atom.web-types.json' },
    { kind: 'Block', path: 'libs/components/src/block/block.web-types.json' },
    { kind: 'Form', path: 'libs/components/src/form/form.web-types.json' },
    { kind: 'Compliance', path: 'libs/components/src/compliance/compliance.web-types.json' },
    { kind: 'Map', path: 'libs/map/map.web-types.json' },
];

const VERSION_PLACEHOLDER = 'DOMG-WC-VERSION';

function readJson<T>(absolutePath: string): T {
    return JSON.parse(readFileSync(absolutePath, 'utf-8')) as T;
}

function resolveVersion(): string {
    const pkg = readJson<{ version: string }>(resolve(REPO_ROOT, 'package.json'));
    return pkg.version;
}

function replaceVersion(value: string | undefined, version: string): string {
    return (value ?? '').split(VERSION_PLACEHOLDER).join(version);
}

export function mergeWebTypes(): { version: string; components: MergedComponent[] } {
    const version = resolveVersion();
    const components: MergedComponent[] = [];

    for (const source of SOURCES) {
        const file = readJson<{ contributions: { html: { elements: WebTypesElement[] } } }>(
            resolve(REPO_ROOT, source.path),
        );
        const elements = file.contributions?.html?.elements ?? [];
        for (const element of elements) {
            components.push({
                kind: source.kind,
                name: element.name,
                description: replaceVersion(element.description, version),
                docUrl: replaceVersion(element['doc-url'], version),
                attributes: (element.attributes ?? []).map((a) => ({
                    ...a,
                    description: replaceVersion(a.description, version),
                })),
                events: (element.js?.events ?? []).map((e) => ({
                    ...e,
                    description: replaceVersion(e.description, version),
                })),
                slots: (element.slots ?? []).map((s) => ({
                    ...s,
                    description: replaceVersion(s.description, version),
                })),
            });
        }
    }

    components.sort((a, b) => {
        if (a.kind !== b.kind) return a.kind.localeCompare(b.kind);
        return a.name.localeCompare(b.name);
    });

    return { version, components };
}
