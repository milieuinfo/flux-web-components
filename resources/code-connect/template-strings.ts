import { readFileSync } from 'fs';
import ts from 'typescript';
import { resolveRelativeImport } from './component-attributes';

/**
 * De tekst die een template uitschrijft, uit zijn strings en die van relatief geïmporteerde helpers. Attributen
 * worden vaak in een interpolatie toegevoegd (`${open ? ' default-open' : ''}`), dus de figma.code literal alleen
 * volstaat niet.
 *
 * Wat het template niet uitschrijft, telt niet mee: commentaar, de argumenten van een functie (laagnamen en
 * Figma-properties zoals `findText('↳ link')` of `getPropertyValue('Top border')`) en de keys van een object
 * (`'duration - interactive'` in een `getEnum`-map). De waarden van zo'n map tellen wel.
 */
export function readStrings(file: string, source = readFileSync(file, 'utf8'), visited = new Set<string>()): string[] {
    if (visited.has(file)) return [];
    visited.add(file);
    const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
    const strings: string[] = [];

    const isArgument = (node: ts.Node) =>
        ts.isCallExpression(node.parent) && node.parent.arguments.includes(node as ts.Expression);
    const isKey = (node: ts.Node) => ts.isPropertyAssignment(node.parent) && node.parent.name === node;

    const visit = (node: ts.Node): void => {
        if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
            const imported = resolveRelativeImport(file, node.moduleSpecifier.text);
            if (imported) strings.push(...readStrings(imported, undefined, visited));
            return;
        }
        if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && (isArgument(node) || isKey(node))) {
            return;
        }
        if (
            ts.isStringLiteral(node) ||
            ts.isNoSubstitutionTemplateLiteral(node) ||
            ts.isTemplateHead(node) ||
            ts.isTemplateMiddle(node) ||
            ts.isTemplateTail(node)
        ) {
            strings.push(node.text);
        }
        ts.forEachChild(node, visit);
    };
    visit(sourceFile);
    return strings;
}

/**
 * Schrijft het template het attribuut uit op deze tag? In markup staat een attribuut na witruimte (`<vl-x attr`, of een
 * interpolatie als `' attr'`) en voor `=`, witruimte, `>` of het einde.
 *
 * In een string met `<vl-` telt een attribuut enkel voor de tag waarin het staat: `<vl-tabs-next><vl-input-field
 * label="...">` mapt `label` voor vl-input-field, niet voor vl-tabs-next. Een string zonder `<vl-`, zoals de
 * interpolatie `' default-open'`, telt voor elke tag van het template, net als de tekst vóór de eerste `<` van een
 * string, die een tag uit een vorige string afmaakt.
 */
export function writes(strings: string[], tag: string, attribute: string): boolean {
    const escaped = attribute.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`\\s${escaped}(=|\\s|>|$)`);
    return strings.some((text) => {
        if (!text.includes('<vl-')) return pattern.test(text);
        if (pattern.test(text.slice(0, text.indexOf('<')))) return true;
        return [...text.matchAll(/<(vl-[a-z0-9-]+)([^<>]*)/g)].some(
            ([, name, attributes]) => name === tag && pattern.test(attributes),
        );
    });
}
