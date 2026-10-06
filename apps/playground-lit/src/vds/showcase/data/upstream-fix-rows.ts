import { html, nothing, TemplateResult } from 'lit';

export type FixPriority = 'hoog' | 'midden' | 'laag';

export type UpstreamFix = {
    nr: number;
    vds: string;
    flux: string[];
    title: string;
    problem: string;
    impact: string;
    workaround: string;
    ask: string;
    prio: FixPriority;
};

export const UPSTREAM_FIXES: UpstreamFix[] = [
    {
        nr: 7,
        vds: 'vl-tabs, vl-tab, vl-tabpanel',
        flux: ['flux-tabs'],
        title: 'Tabs zoeken hun kinderen op de exacte tagnaam',
        problem: 'vl-tabs vindt tabs en panelen via :scope > ${VlTab.elementName}. Een component die van VlTab erft onder een eigen tag wordt nooit gevonden.',
        impact: 'Erven is onmogelijk. flux-tabs moet delegeren in plaats van de VDS-klasse uit te breiden.',
        workaround: 'flux-tabs rendert vds-tabs, vds-tab en vds-tabpanel in zijn eigen shadow DOM en plaatst de panes via named slots.',
        ask: 'Kinderen zoeken op type (instanceof), zoals vl-input-group al doet. vl-radio-group heeft hetzelfde patroon.',
        prio: 'hoog',
    },
    {
        nr: 8,
        vds: 'vl-table',
        flux: ['flux-table'],
        title: 'Table-styles hardcoden de tagnaam vl-table',
        problem: 'De styling van de native <table> zit in een document-sheet met selector vl-table table. Die sheet wordt in het hele document geïnjecteerd.',
        impact: 'Onder een prefix of in een afgeleide is de tabel ongestyled, en de sheet stylet ook de echte flux vl-table mee.',
        workaround: 'flux-table injecteert een kopie van lightStyles met flux-table als selector en haalt de VDS-sheet weer uit document.adoptedStyleSheets.',
        ask: 'lightStyles opbouwen met de runtime elementName van de component.',
        prio: 'hoog',
    },
    {
        nr: 9,
        vds: 'vl-informative-tag, vl-removable-tag, vl-selectable-tag, vl-clickable-tag',
        flux: ['flux-pill'],
        title: 'Tags: achtergrond en rand delen één token, geen publieke vormtokens',
        problem: 'Statuskleuren lopen via private variabelen op het element zelf. Bij de informative-tag gebruikt de rand dezelfde token als de achtergrond. Hoogte, padding en radius hebben geen token.',
        impact: 'De flux-look (wit met grijze rand) is niet via tokens te bereiken.',
        workaround: 'flux-pill stylet kleur, rand, hoogte, padding en radius volledig via ::part(base).',
        ask: 'Publieke tokens per status voor achtergrond, rand en tekst, plus radius en hoogte.',
        prio: 'midden',
    },
    {
        nr: 10,
        vds: 'vl-collapsible, vl-section-message',
        flux: ['flux-accordion', 'flux-alert'],
        title: 'Enkel named slots, geen default slot',
        problem: 'Inhoud moet in slot content (collapsible) of body (section-message). Inhoud zonder slot-attribuut wordt niet getoond.',
        impact: 'flux gebruikt de default slot, dus bestaande afnemer-markup toont geen inhoud.',
        workaround: 'De adapters zetten slot-attributen op de light DOM van de afnemer, bewaakt door een MutationObserver. Dat wijzigt markup die niet van ons is.',
        ask: 'De default slot laten vallen op content respectievelijk body.',
        prio: 'midden',
    },
    {
        nr: 11,
        vds: 'tags tegenover messages en avatar',
        flux: ['flux-alert'],
        title: 'Statusnaam wisselt tussen error en danger',
        problem: 'De tags gebruiken status="error", section-, banner-, inline-message en avatar gebruiken status="danger".',
        impact: 'Dezelfde betekenis heeft binnen VDS twee namen; flux gebruikt overal error.',
        workaround: 'flux-alert mapt error op danger.',
        ask: 'Eén naam voor alle componenten, of beide waarden aanvaarden.',
        prio: 'laag',
    },
    {
        nr: 12,
        vds: 'vl-removable-tag, vl-selectable-tag',
        flux: ['flux-pill'],
        title: 'Tags geven hun icoon nog size="small" mee',
        problem: 'Sinds 0.11 kent vl-icon enkel s/m/l, maar beide tags zetten intern size="small" op hun kruisje en vinkje. Die waarde matcht niet meer, dus het icoon valt terug op de standaardmaat.',
        impact: 'Het kruisje en het vinkje hebben niet de bedoelde grootte; achtergebleven van de breaking change in 0.11.',
        workaround: 'flux-pill zet na elke render size en icon op de geneste iconen.',
        ask: 'size="s" gebruiken in beide tags.',
        prio: 'laag',
    },
    {
        nr: 13,
        vds: 'vl-markdown',
        flux: ['flux-markdown'],
        title: 'Markdown rendert HTML zonder sanitizing',
        problem: 'vl-markdown zet de uitvoer van marked via unsafeHTML in de shadow DOM. Ruwe HTML in de markdown blijft staan, inclusief event-handlers zoals onerror.',
        impact: 'Markdown uit een onbetrouwbare bron (gebruikersinvoer, CMS) voert script uit op de pagina: XSS. Gemeten in de playground: <img src="x" onerror="..."> loopt zowel in rauw VDS als in flux-markdown.',
        workaround: 'Geen in de adapter. Afnemers mogen enkel markdown uit een betrouwbare bron meegeven.',
        ask: 'De HTML saniteren (bijvoorbeeld DOMPurify) of ruwe HTML in marked uitschakelen, eventueel met een opt-in attribuut voor vertrouwde inhoud.',
        prio: 'hoog',
    },
];

export const ALSO_AFFECTED = [
    { nr: '3', what: 'focus-offset en -kleur niet getokeniseerd', where: 'alle nieuwe interactieve componenten' },
    { nr: '4a', what: 'rem-literals schalen niet mee met de flux-root', where: 'flux-separator (dikte, wave- en tilt-hoogte), iconen' },
    { nr: '4b', what: 'icon-font-collision', where: 'elke geneste vds-icon (collapsible, tags, messages, tabs)' },
];

export const fixesFor = (fluxTag: string): UpstreamFix[] => UPSTREAM_FIXES.filter((f) => f.flux.includes(fluxTag));

export const prioBadge = (prio: FixPriority): TemplateResult => {
    const map: Record<FixPriority, readonly [string, string]> = {
        hoog: ['#b3261e', '#fdecea'],
        midden: ['#9a6700', '#fff8e1'],
        laag: ['#57606a', '#eef1f4'],
    };
    const [fg, bg] = map[prio];
    return html`<span
        style="color: ${fg}; background: ${bg}; padding: 1px 7px; border-radius: 10px; font-size: 11px; font-weight: 600; white-space: nowrap;"
        >${prio}</span
    >`;
};

export const fixNumbers = (fixes: UpstreamFix[]): TemplateResult | typeof nothing =>
    fixes.length
        ? html`${fixes.map(
              (f) =>
                  html`<span
                      style="display: inline-block; margin: 0 4px 2px 0; padding: 1px 7px; border-radius: 10px; font-size: 11px; font-weight: 600; color: #b3261e; background: #fdecea; white-space: nowrap;"
                      >#${f.nr}</span
                  >`
          )}`
        : nothing;

export const renderFixCallout = (fixes: UpstreamFix[]): TemplateResult | typeof nothing =>
    fixes.length
        ? html`<div
              style="max-width: 900px; margin: 0 0 12px; padding: 8px 12px; border-left: 3px solid #b3261e; background: #fdf6f5; border-radius: 4px; font-size: 12px;"
          >
              <b>Upstream te fixen in VDS:</b>
              <ul style="margin: 4px 0 0; padding-left: 18px; line-height: 1.5; list-style: disc;">
                  ${fixes.map(
                      (f) => html`<li>
                          ${prioBadge(f.prio)} <b>#${f.nr}</b> ${f.title}. <span style="color: #555;"
                              >Zolang: ${f.workaround}</span
                          >
                      </li>`
                  )}
              </ul>
          </div>`
        : nothing;
