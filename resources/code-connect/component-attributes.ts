/**
 * Welke attributen een component kent, gedeeld door de Code Connect checks.
 *
 * Een attribuut telt als bekend zodra web-types het kent, of het component bestand het declareert. Beide bronnen
 * zijn nodig: de web-types generator mist onder meer attributen die enkel via getAttribute() gelezen worden, of die
 * zonder expliciete `attribute` in de properties staan.
 */
import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import ts from 'typescript';

/** Attributen die op elk element mogen staan en dus niet tegen een component gecheckt worden. */
export const GLOBAL_ATTRIBUTES = new Set([
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

/** Het bestand achter een relatieve import, of null als het er niet is. */
export function resolveRelativeImport(file: string, specifier: string): string | null {
    if (!specifier.startsWith('.')) return null;
    const base = resolve(dirname(file), specifier);
    return [`${base}.ts`, `${base}/index.ts`].find((candidate) => existsSync(candidate)) ?? null;
}

/** Bouwt per tag de attributen die web-types kent. */
export function readWebTypes(): Map<string, Set<string>> {
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

/**
 * Leidt uit een `@property`/properties-config de attribuutnaam af, of null wanneer er geen is.
 *
 * Met `publicOnly` telt een property zonder expliciete `attribute` enkel mee als haar naam al een attribuutnaam is
 * (`selected`, niet `firstValidItemIndex`), en telt `state: true` niet mee. Lit registreert die andere ook als
 * attribuut, maar het zijn interne properties die niemand als attribuut zet.
 */
function attributeNameOf(
    propertyName: string,
    config: ts.Expression | undefined,
    sourceFile: ts.SourceFile,
    publicOnly = false,
): string | null {
    let attribute: string | null = propertyName.toLowerCase();
    let explicit = false;
    if (config && ts.isObjectLiteralExpression(config)) {
        for (const member of config.properties) {
            if (!ts.isPropertyAssignment(member)) continue;
            const key = member.name.getText(sourceFile);
            if (key === 'state' && member.initializer.kind === ts.SyntaxKind.TrueKeyword && publicOnly) return null;
            if (key !== 'attribute') continue;
            if (ts.isStringLiteral(member.initializer)) {
                attribute = member.initializer.text;
                explicit = true;
            }
            if (member.initializer.kind === ts.SyntaxKind.FalseKeyword) return null;
        }
    }
    if (publicOnly && !explicit && propertyName !== attribute) attribute = null;
    return attribute;
}

/** Bouwt per tag de attributen die het component bestand zelf declareert; `publicOnly`: zie attributeNameOf. */
export function readComponentAttributes(publicOnly = false): Map<string, Set<string>> {
    const perTag = new Map<string, Set<string>>();
    const files = execSync('find libs -name "*.component.ts" -not -name "*.cy.ts"')
        .toString()
        .trim()
        .split('\n')
        .filter(Boolean)
        .sort();

    // Per class: wat het bestand zelf declareert, van welke class het erft, en onder welke tags het
    // geregistreerd is. Een component als vl-textarea-rich erft zijn attributen van vl-textarea, dus
    // per bestand kijken volstaat niet.
    type ClassEntry = { attributes: Set<string>; parent?: string; tags: string[] };
    const classes: ClassEntry[] = [];
    const perClass = new Map<string, ClassEntry>();

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
                        const attribute = attributeNameOf(name, member.initializer, sourceFile, publicOnly);
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
                        publicOnly,
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
            const entry = { attributes, parent, tags };
            classes.push(entry);
            if (!perClass.has(statement.name.text)) perClass.set(statement.name.text, entry);
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

    // Per klasse, niet per naam: twee klassen kunnen dezelfde naam dragen (bv. VlSideNavigationComponent in
    // side-navigation en in next/side-navigation), en elk registreert haar eigen tags met haar eigen attributen.
    for (const entry of classes) {
        if (!entry.tags.length) continue;
        const resolved = new Set(entry.attributes);
        if (entry.parent) resolve(entry.parent).forEach((a) => resolved.add(a));
        for (const tag of entry.tags) {
            const existing = perTag.get(tag) ?? new Set<string>();
            resolved.forEach((a) => existing.add(a));
            perTag.set(tag, existing);
        }
    }
    return perTag;
}
