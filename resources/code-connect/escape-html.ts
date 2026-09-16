/**
 * Tekst uit Figma komt ongefilterd in de voorbeeldcode terecht: `figma.code` escapet gewone strings niet.
 * Een `"` sluit daardoor een attribuut vroegtijdig af, een `<` of `&` maakt de markup ongeldig.
 *
 * Elk `.figma.ts` template haalt zijn tekst hierdoor. De Code Connect CLI bundelt deze helper mee in
 * het template, zodat er maar één versie van deze logica bestaat.
 */
export function escapeHtml(value: string): string {
    return escapeMarkup(value).replace(/"/g, '&quot;');
}

/**
 * Voor een attribuut dat met enkele quotes wordt uitgeschreven: daar breekt een `'` de waarde af en
 * een `"` niet. Escape hier de volledige attribuutwaarde, niet de stukken waaruit ze is opgebouwd:
 * de HTML-parser draait deze escapes terug vóór de waarde zelf nog geparsed wordt.
 */
export function escapeHtmlInSingleQuotes(value: string): string {
    return escapeMarkup(value).replace(/'/g, '&#39;');
}

function escapeMarkup(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
