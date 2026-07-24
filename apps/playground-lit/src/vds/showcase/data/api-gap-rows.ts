import { html, nothing, TemplateResult } from 'lit';

export type GapLevel = 'none' | 'low' | 'mid' | 'high' | 'na';

export type GapDirection = { lvl: GapLevel; note: string };

export type ApiGapRow = {
    vds: string;
    flux: string | null;
    base: string;
    toFlux: GapDirection;
    toVds: GapDirection;
};

export const API_GAP_ROWS: ApiGapRow[] = [
    {
        vds: 'vl-button',
        flux: 'flux-button',
        base: 'VlElementWithAria / BaseLitElement',
        toFlux: { lvl: 'mid', note: 'danger, success, size=small, loading-slots/parts, icon-slots, click(), delegatesFocus; variant/size/grow als enum' },
        toVds: { lvl: 'mid', note: 'wide/narrow, toggle (on/controlled + vl-toggle), download, external, input-group' },
    },
    {
        vds: 'vl-input',
        flux: 'flux-input',
        base: 'VlFormLayoutElement / FormControl',
        toFlux: { lvl: 'high', note: 'hele layout-chrome (label, size, grow, annotation, indicator, message), clearable, loading, prefix/suffix-slots+parts' },
        toVds: { lvl: 'low', note: 'min/max-exclusive, regex-validators, input-group (grotendeels consument-side)' },
    },
    {
        vds: 'vl-textarea',
        flux: 'flux-textarea',
        base: 'VlFormLayoutElement / FormControl',
        toFlux: { lvl: 'high', note: 'layout-chrome (zoals input) plus resize en footnote-slot' },
        toVds: { lvl: 'mid', note: 'character-count (ingebouwde teller), rows, cols' },
    },
    {
        vds: 'vl-select',
        flux: 'flux-select',
        base: 'VlFormLayoutElement / FormControl',
        toFlux: { lvl: 'high', note: 'layout-chrome, selectedIndex, setCustomValidity, clear-button, data-alt-label, hug-width' },
        toVds: { lvl: 'low', note: 'programmatisch options-model, not-deletable (inverse van VDS clearable)' },
    },
    {
        vds: 'vl-datepicker',
        flux: 'flux-datepicker',
        base: 'VlFormLayoutElement / FormControl',
        toFlux: { lvl: 'high', note: 'imperatieve API (open/close/goToDate), vl-open/close/focus/blur, locale, months, disabledDates, today/outside-days' },
        toVds: { lvl: 'high', note: 'type=range, type=time, input-masking, am-pm, position, static, anchor-positioning' },
    },
    {
        vds: 'vl-checkbox',
        flux: 'flux-checkbox',
        base: 'VlFormAssociatedElement / FormControl',
        toFlux: { lvl: 'mid', note: 'readonly, loading, tile, default-checked, label-hidden, prefix/suffix/content-slots+parts' },
        toVds: { lvl: 'mid', note: 'switch-variant (role=switch), block' },
    },
    {
        vds: 'vl-radio-group',
        flux: 'flux-radio-group',
        base: 'VlFormLayoutElement / FormControl',
        toFlux: { lvl: 'high', note: 'layout-chrome, tiles, roving-tabindex, group-vl-change, focus-routing, container/radios-parts' },
        toVds: { lvl: 'low', note: 'block (concept = VDS grow=fill)' },
    },
    {
        vds: 'vl-fieldset',
        flux: 'flux-fieldset',
        base: 'WithFormLayout(VlFormControlElement) / BaseLitElement',
        toFlux: { lvl: 'high', note: 'flux mist de FormControl-laag volledig; plus state-propagatie naar kinderen, layout-chrome, parts' },
        toVds: { lvl: 'mid', note: 'border, horizontal (grid), legend-classes, legende-klik-focust-eerste-control' },
    },
    {
        vds: 'vl-icon',
        flux: 'flux-icon',
        base: 'VlElementWithAria / BaseLitElement',
        toFlux: { lvl: 'mid', note: 'tag (wrapper), rotate, inline-SVG-slot, dev-warn, size als enum' },
        toVds: { lvl: 'mid', note: 'left/right-margin, light (clickable is gedeprecieerd, niet naar VDS)' },
    },
    {
        vds: 'vl-title',
        flux: 'flux-title',
        base: 'geen VDS-component / BaseLitElement',
        toFlux: { lvl: 'na', note: 'geen VDS-title-component' },
        toVds: { lvl: 'na', note: 'VDS levert enkel typografie-tokens; flux-title blijft een eigen component' },
    },
];

export const gapLevelBadge = (dir: GapDirection): TemplateResult => {
    const map: Record<GapLevel, readonly [string, string, string]> = {
        none: ['#57606a', '#eef1f4', 'geen'],
        low: ['#1a7f37', '#e6f6ec', 'laag'],
        mid: ['#9a6700', '#fff8e1', 'midden'],
        high: ['#b3261e', '#fdecea', 'hoog'],
        na: ['#6b7280', '#f0f1f2', 'n.v.t.'],
    };
    const [fg, bg, label] = map[dir.lvl];
    return html`<span
            style="color: ${fg}; background: ${bg}; padding: 1px 7px; border-radius: 10px; font-size: 11px; font-weight: 600; white-space: nowrap;"
            >${label}</span
        >${dir.note ? html`<div style="margin-top: 3px; color: #555;">${dir.note}</div>` : nothing}`;
};
