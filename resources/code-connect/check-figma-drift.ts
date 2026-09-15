/**
 * Controleert of de Code Connect templates nog in lijn zijn met Figma én met de componenten.
 *
 * Drift tegenover Figma:
 *  1. Figma heeft een variant option die het template niet mapt (bv. een nieuwe `banner` bij vl-alert).
 *  2. Het template mapt een option die in Figma niet meer bestaat (hernoemd of verwijderd).
 *  3. Figma heeft een VARIANT property die het template helemaal niet leest.
 *
 * Booleans en instance swaps worden niet gecontroleerd: die hebben geen opsomming van waarden, en of
 * ze zinvol gemapt zijn hangt af van het code component. Alleen VARIANT properties zijn objectief te
 * vergelijken.
 *
 * Een template kan een property expliciet overslaan met een header comment:
 *
 *     // unmapped: size, Content
 *
 * Drift tegenover de componenten:
 *  4. Het snippet schrijft een attribuut uit dat het component niet kent. Dat gebeurt wanneer een
 *     attribuut hernoemd of verwijderd wordt zonder dat het template volgt.
 *
 * Het omgekeerde, een nieuw attribuut dat geen enkel template gebruikt, wordt niet gemeld: de meeste
 * attributen hebben bewust geen Figma-tegenhanger. Krijgt Figma er wel een property voor, dan valt
 * dat onder punt 3 hierboven.
 *
 * Een attribuut telt als bekend zodra web-types het kent, of het component bestand het declareert.
 * Beide bronnen zijn nodig: de web-types generator mist onder meer attributen die enkel via
 * getAttribute() gelezen worden, of die zonder expliciete `attribute` in de properties staan.
 *
 * Gebruik:
 *   FIGMA_ACCESS_TOKEN=... npm run libs:code-connect:check
 *   npx tsx resources/code-connect/check-figma-drift.ts --json
 *
 * Vereist dezelfde token scopes als publiceren: Code Connect (write) en File content (read).
 * Exit code 1 bij drift, zodat het als CI step bruikbaar is.
 */
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import ts from 'typescript';

type Template = {
    file: string;
    fileKey: string;
    nodeId: string;
    mappings: Map<string, Set<string>>;
    unmapped: Set<string>;
};

type Finding = { file: string; nodeId: string; kind: string; property: string; values: string[] };

const API = 'https://api.figma.com/v1/files';
const TOKEN = process.env.FIGMA_ACCESS_TOKEN;

/** Attributen die op elk element mogen staan en dus niet tegen een component gecheckt worden. */
const GLOBAL_ATTRIBUTES = new Set([
    'slot',
    'class',
    'id',
    'style',
    'hidden',
    'href',
    'src',
    'alt',
    'target',
    'rel',
    'scope',
    'custom-css',
]);

/** Leest per `getEnum('property', { ... })` welke options het template mapt. */
function readEnumMappings(file: string, source: string): Map<string, Set<string>> {
    const mappings = new Map<string, Set<string>>();
    const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);

    const visit = (node: ts.Node): void => {
        const isGetEnum =
            ts.isCallExpression(node) &&
            ts.isPropertyAccessExpression(node.expression) &&
            node.expression.name.text === 'getEnum';

        if (isGetEnum) {
            const [nameArgument, optionsArgument] = (node as ts.CallExpression).arguments;
            if (
                nameArgument &&
                optionsArgument &&
                ts.isStringLiteral(nameArgument) &&
                ts.isObjectLiteralExpression(optionsArgument)
            ) {
                const options = new Set<string>();
                for (const member of optionsArgument.properties) {
                    const name = member.name;
                    // Identifier (default:), string ('h2 - alt':) en numeriek ('1':) zijn allemaal geldige keys.
                    if (name && (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name))) {
                        options.add(name.text);
                    }
                }
                mappings.set(nameArgument.text, options);
            }
        }

        ts.forEachChild(node, visit);
    };

    visit(sourceFile);
    return mappings;
}

/** Bouwt per tag de attributen die web-types kent. */
function readWebTypes(): Map<string, Set<string>> {
    const perTag = new Map<string, Set<string>>();
    const files = execSync('find libs -name "*.web-types.json"').toString().trim().split('\n').filter(Boolean);

    for (const file of files) {
        const contributions = JSON.parse(readFileSync(file, 'utf8')).contributions;
        for (const element of contributions?.html?.elements || []) {
            const attributes = perTag.get(element.name) ?? new Set<string>();
            for (const attribute of element.attributes || []) attributes.add(attribute.name);
            perTag.set(element.name, attributes);
        }
    }
    return perTag;
}

/** Leidt uit een `@property`/properties-config de attribuutnaam af, of null wanneer er geen is. */
function attributeNameOf(
    propertyName: string,
    config: ts.Expression | undefined,
    sourceFile: ts.SourceFile,
): string | null {
    let attribute = propertyName.toLowerCase();
    if (config && ts.isObjectLiteralExpression(config)) {
        for (const member of config.properties) {
            if (!ts.isPropertyAssignment(member) || member.name.getText(sourceFile) !== 'attribute') continue;
            if (ts.isStringLiteral(member.initializer)) attribute = member.initializer.text;
            if (member.initializer.kind === ts.SyntaxKind.FalseKeyword) return null;
        }
    }
    return attribute;
}

/** Bouwt per tag de attributen die het component bestand zelf declareert. */
function readComponentAttributes(): Map<string, Set<string>> {
    const perTag = new Map<string, Set<string>>();
    const files = execSync('find libs -name "*.component.ts" -not -name "*.cy.ts"')
        .toString()
        .trim()
        .split('\n')
        .filter(Boolean);

    // Per class: wat het bestand zelf declareert, van welke class het erft, en onder welke tags het
    // geregistreerd is. Een component als vl-textarea-rich erft zijn attributen van vl-textarea, dus
    // per bestand kijken volstaat niet.
    const perClass = new Map<string, { attributes: Set<string>; parent?: string; tags: string[] }>();

    for (const file of files) {
        const source = readFileSync(file, 'utf8');
        const tags = [...source.matchAll(/@(?:webComponent|customElement)\('([^']+)'\)/g)].map((m) => m[1]);

        const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
        const attributes = new Set<string>();

        const visit = (node: ts.Node): void => {
            // static get _observedAttributes() { return ['toggle-text', ...] } — het BaseHTMLElement patroon.
            if (ts.isGetAccessor(node) && /^_?observedAttributes$/.test(node.name.getText(sourceFile))) {
                for (const statement of node.body?.statements || []) {
                    if (!ts.isReturnStatement(statement) || !statement.expression) continue;
                    if (!ts.isArrayLiteralExpression(statement.expression)) continue;
                    for (const element of statement.expression.elements) {
                        if (ts.isStringLiteral(element)) attributes.add(element.text);
                    }
                }
            }

            // static get properties() { return { ... } }
            if (ts.isGetAccessor(node) && node.name.getText(sourceFile) === 'properties') {
                for (const statement of node.body?.statements || []) {
                    if (!ts.isReturnStatement(statement) || !statement.expression) continue;
                    if (!ts.isObjectLiteralExpression(statement.expression)) continue;
                    for (const member of statement.expression.properties) {
                        if (!ts.isPropertyAssignment(member)) continue;
                        const name = member.name.getText(sourceFile).replace(/['"]/g, '');
                        const attribute = attributeNameOf(name, member.initializer, sourceFile);
                        if (attribute) attributes.add(attribute);
                    }
                }
            }

            // @property({ ... }) declaraties
            if (ts.isPropertyDeclaration(node)) {
                for (const decorator of ts.getDecorators(node) || []) {
                    if (!ts.isCallExpression(decorator.expression)) continue;
                    if (decorator.expression.expression.getText(sourceFile) !== 'property') continue;
                    const attribute = attributeNameOf(
                        node.name.getText(sourceFile),
                        decorator.expression.arguments[0],
                        sourceFile,
                    );
                    if (attribute) attributes.add(attribute);
                }
            }

            // Attributen die het component rechtstreeks uitleest.
            if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression)) {
                const method = node.expression.name.text;
                const [first] = node.arguments;
                if ((method === 'getAttribute' || method === 'hasAttribute') && first && ts.isStringLiteral(first)) {
                    attributes.add(first.text);
                }
            }

            ts.forEachChild(node, visit);
        };
        visit(sourceFile);

        // Class en parent onthouden, zodat overerving straks opgelost kan worden.
        for (const statement of sourceFile.statements) {
            if (!ts.isClassDeclaration(statement) || !statement.name) continue;
            const parentType = statement.heritageClauses?.find((h) => h.token === ts.SyntaxKind.ExtendsKeyword)
                ?.types?.[0]?.expression;
            const parent = parentType && ts.isIdentifier(parentType) ? parentType.text : undefined;
            perClass.set(statement.name.text, { attributes, parent, tags });
        }
    }

    const resolve = (className: string, seen = new Set<string>()): Set<string> => {
        const entry = perClass.get(className);
        if (!entry || seen.has(className)) return new Set();
        seen.add(className);
        const all = new Set(entry.attributes);
        if (entry.parent) resolve(entry.parent, seen).forEach((a) => all.add(a));
        return all;
    };

    for (const [className, entry] of perClass) {
        if (!entry.tags.length) continue;
        const resolved = resolve(className);
        for (const tag of entry.tags) {
            const existing = perTag.get(tag) ?? new Set<string>();
            resolved.forEach((a) => existing.add(a));
            perTag.set(tag, existing);
        }
    }
    return perTag;
}

/** Haalt per tag de attributen die het snippet uitschrijft. */
function readSnippetUsage(file: string, source: string): Map<string, Set<string>> {
    const perTag = new Map<string, Set<string>>();
    const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);

    // Enkel de letterlijke stukken van de figma.code template literal; de interpolaties zijn waarden.
    let markup = '';
    const visit = (node: ts.Node): void => {
        if (ts.isTaggedTemplateExpression(node) && node.tag.getText(sourceFile).startsWith('figma.')) {
            const template = node.template;
            if (ts.isNoSubstitutionTemplateLiteral(template)) {
                markup += template.text + '\n';
            } else {
                markup += template.head.text + '\n';
                for (const span of template.templateSpans) markup += span.literal.text + '\n';
            }
        }
        ts.forEachChild(node, visit);
    };
    visit(sourceFile);

    for (const match of markup.matchAll(/<(vl-[a-z0-9-]+)((?:\s+[a-z][a-z0-9-]*(?:="[^"]*")?)*)/g)) {
        const attributes = perTag.get(match[1]) ?? new Set<string>();
        for (const attribute of (match[2] || '').matchAll(/\s+([a-z][a-z0-9-]*)/g)) attributes.add(attribute[1]);
        perTag.set(match[1], attributes);
    }
    return perTag;
}

/** Leest per template de Figma node en de options die elke getEnum mapt. */
function readTemplates(): Template[] {
    const files = execSync('find libs -name "*.figma.ts" -not -name "*.figma.batch.ts"')
        .toString()
        .trim()
        .split('\n')
        .filter(Boolean)
        .sort();

    return files.flatMap((file) => {
        const source = readFileSync(file, 'utf8');
        const url = source.match(/^\/\/ url=(\S+)/m)?.[1];
        if (!url) return [];
        const fileKey = url.match(/\/design\/([^/]+)/)?.[1];
        const node = url.match(/node-id=(\d+)-(\d+)/);
        if (!fileKey || !node) return [];

        const mappings = readEnumMappings(file, source);

        // Properties die het template bewust niet mapt, gedeclareerd met `// unmapped: a, b`.
        // Expliciet, zodat een nieuwe property in Figma altijd opvalt en een bewuste keuze vraagt.
        const unmapped = new Set<string>();
        for (const line of source.matchAll(/^\/\/ unmapped:(.*)$/gim)) {
            for (const name of line[1].split(',')) {
                if (name.trim()) unmapped.add(name.trim());
            }
        }

        return [{ file, fileKey, nodeId: `${node[1]}:${node[2]}`, mappings, unmapped }];
    });
}

async function fetchNodes(fileKey: string, ids: string[]): Promise<Record<string, any>> {
    const nodes: Record<string, any> = {};

    // De API beperkt de URL lengte, dus in chunks opvragen.
    for (let i = 0; i < ids.length; i += 40) {
        const chunk = ids.slice(i, i + 40);
        const response = await fetch(`${API}/${fileKey}/nodes?ids=${chunk.join(',')}&depth=1`, {
            headers: { 'X-Figma-Token': TOKEN as string },
        });
        if (!response.ok) {
            throw new Error(`Figma API ${response.status} voor ${fileKey}: ${await response.text()}`);
        }
        const body = (await response.json()) as { nodes: Record<string, { document: any }> };
        for (const [id, wrapper] of Object.entries(body.nodes || {})) {
            if (wrapper?.document) nodes[id] = wrapper.document;
        }
    }

    return nodes;
}

async function main() {
    if (!TOKEN) {
        console.error('FIGMA_ACCESS_TOKEN ontbreekt.');
        process.exit(2);
    }

    const templates = readTemplates();

    const idsPerFile = new Map<string, string[]>();
    for (const template of templates) {
        if (!idsPerFile.has(template.fileKey)) idsPerFile.set(template.fileKey, []);
        idsPerFile.get(template.fileKey)!.push(template.nodeId);
    }

    const nodes: Record<string, any> = {};
    for (const [fileKey, ids] of idsPerFile) {
        Object.assign(nodes, await fetchNodes(fileKey, ids));
    }

    const findings: Finding[] = [];
    let checked = 0;

    // Attributen in het snippet die noch web-types noch het component bestand kent.
    const webTypes = readWebTypes();
    const componentAttributes = readComponentAttributes();
    for (const template of templates) {
        const usage = readSnippetUsage(template.file, readFileSync(template.file, 'utf8'));
        for (const [tag, attributes] of usage) {
            // Het component bestand is de bron van waarheid. web-types is een gegenereerd bestand in
            // de repo: staat dat achter, dan zou het een hernoeming maskeren. Het dient enkel als
            // terugval voor tags waarvan we het component bestand niet vinden.
            const known = componentAttributes.get(tag) ?? webTypes.get(tag);
            if (!known?.size) continue;

            const unknown = [...attributes].filter((a) => !GLOBAL_ATTRIBUTES.has(a) && !known.has(a));
            if (unknown.length) {
                findings.push({
                    file: template.file,
                    nodeId: template.nodeId,
                    kind: 'attribuut bestaat niet op het component',
                    property: tag,
                    values: unknown,
                });
            }
        }
    }

    for (const template of templates) {
        const node = nodes[template.nodeId];
        if (!node) {
            findings.push({
                file: template.file,
                nodeId: template.nodeId,
                kind: 'node bestaat niet',
                property: '-',
                values: [],
            });
            continue;
        }
        checked++;

        const definitions = Object.entries<any>(node.componentPropertyDefinitions || {});
        for (const [property, definition] of definitions) {
            if (definition.type !== 'VARIANT') continue;
            if (template.unmapped.has(property)) continue;

            const options: string[] = definition.variantOptions || [];
            const mapped = template.mappings.get(property);

            if (!mapped) {
                findings.push({
                    file: template.file,
                    nodeId: template.nodeId,
                    kind: 'property niet gelezen',
                    property,
                    values: options,
                });
                continue;
            }

            const missing = options.filter((option) => !mapped.has(option));
            if (missing.length) {
                findings.push({
                    file: template.file,
                    nodeId: template.nodeId,
                    kind: 'option niet gemapt',
                    property,
                    values: missing,
                });
            }

            const stale = [...mapped].filter((option) => !options.includes(option));
            if (stale.length) {
                findings.push({
                    file: template.file,
                    nodeId: template.nodeId,
                    kind: 'option bestaat niet meer',
                    property,
                    values: stale,
                });
            }
        }
    }

    if (process.argv.includes('--json')) {
        console.log(JSON.stringify({ checked, findings }, null, 2));
    } else {
        console.log(`Gecontroleerd: ${checked} van ${templates.length} templates.`);
        if (!findings.length) {
            console.log('Geen drift gevonden.');
        } else {
            console.log(`Drift: ${findings.length}\n`);
            for (const finding of findings) {
                console.log(`${finding.kind} — ${finding.file}`);
                console.log(`  property "${finding.property}": ${finding.values.join(', ') || '-'}`);
            }
        }
    }

    process.exit(findings.length ? 1 : 0);
}

main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(2);
});
