import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent, VlLinkComponent, VlTitleComponent } from '@domg-wc/components/atom';
import {
    VlCheckboxComponent,
    VlDatepickerComponent,
    VlFieldsetComponent,
    VlFormLabelComponent,
    VlFormMessageComponent,
    VlInputFieldComponent,
    VlRadioComponent,
    VlRadioGroupComponent,
    VlSelectComponent,
    VlTextareaComponent,
} from '@domg-wc/components/form';
import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '../flux-button.component';
import '../flux-input.component';
import '../flux-link.component';
import '../flux-form-controls.component';
import '../flux-icon.component';
import '../vl-form-demo.component';

type OverrideRow = { c: string; o: string; v: string; cat: 'token' | 'workaround' | 'rem'; up: string };

// Alle consument-side overrides die we op de flux-* componenten zetten om de
// flux-look (== de echte vl-*) te bereiken, afwijkend van rauw VDS. Gedeeld door
// de globale lijst (één accordion) én de per-voorbeeld patch-notities.
const OVERRIDE_ROWS: OverrideRow[] = [
    { c: 'alle form-controls (fluxLook)', o: '--base-border-radius-selectable-default', v: '0.3rem', cat: 'token', up: '' },
    { c: 'alle form-controls', o: '--base-color-border-default', v: '#8695a8', cat: 'token', up: '' },
    { c: 'alle form-controls', o: '--base-border-focus-spacing-color', v: 'rgba(0,85,204,.65)', cat: 'token', up: '#3' },
    { c: 'alle form-controls', o: 'inset-vertical-s / horizontal-l', v: 'calc(scaled-base * .375 / .625)', cat: 'rem', up: '#4a' },
    { c: 'alle form-controls', o: '--base-color-background-surface-form-element-hover', v: '= enabled (geen grijs)', cat: 'token', up: '' },
    { c: 'flux-button', o: '--vl-form-control-height', v: '3.5rem (35px)', cat: 'token', up: '' },
    { c: 'flux-button', o: '--base-border-width-default', v: '2px', cat: 'token', up: '' },
    { c: 'flux-button', o: 'inset-vertical-s / horizontal-l', v: '0.5rem / 2rem', cat: 'token', up: '' },
    { c: 'flux-button', o: 'line-height (typografie-token)', v: 'normal', cat: 'token', up: '' },
    { c: 'flux-button', o: 'focus-outline (box-shadow → outline)', v: '3px / 2px', cat: 'workaround', up: '#3' },
    { c: 'flux-input', o: 'radius / border / focus-kleur / insets / hover', v: 'zie fluxLook', cat: 'token', up: '' },
    { c: 'flux-input', o: 'focus-outline', v: '3px / 2px', cat: 'workaround', up: '#3' },
    { c: 'flux-link', o: '--base-color-underline-action-*', v: '#0055cc / #0048ad / #002f70', cat: 'token', up: '' },
    { c: 'flux-link', o: 'underline offset + thickness', v: 'auto / auto', cat: 'workaround', up: '#1' },
    { c: 'flux-link', o: 'underline verdwijnt op hover (zoals FWC)', v: 'text-decoration-line: none', cat: 'workaround', up: '#1' },
    { c: 'flux-link', o: 'focus-outline', v: '3px / 2px', cat: 'workaround', up: '#3' },
    { c: 'flux-select', o: 'focus-outline (box-shadow → outline)', v: '3px / 2px', cat: 'workaround', up: '#3' },
    { c: 'flux-select', o: 'tekst + opties grootte (size-modifiers = rauwe rem)', v: 'calc(scaled-base * .875 / 1 / 1.125)', cat: 'rem', up: '#4a' },
    { c: 'flux-checkbox', o: '--base-border-radius-container-2xs', v: '0.3rem', cat: 'token', up: '' },
    { c: 'flux-checkbox', o: 'check + indeterminate kleur wit (VDS-selector vl-icon niet prefix-aware → check bleef donker/onzichtbaar)', v: '#fff', cat: 'workaround', up: '#6' },
    { c: 'flux-checkbox', o: 'check centreren (absoluut inset 0 + flex-center + line-height 1, na box-schaal)', v: 'gecentreerd (dx/dy 0)', cat: 'workaround', up: '#6' },
    { c: 'flux-checkbox', o: 'box-grootte (--checkbox-box-width = rauwe rem, te klein)', v: 'calc(scaled-base * 1) ≈18px', cat: 'rem', up: '#6' },
    { c: 'flux-checkbox', o: 'focus-outline (volle VDS-selector)', v: '3px / 2px', cat: 'workaround', up: '#3' },
    { c: 'flux-radio-group', o: 'radio-box-grootte (.vl-radio__box = hardcoded rem, geen var → adopted-injectie in updated())', v: 'calc(scaled-base * 1.125) ≈18px', cat: 'rem', up: '#6' },
    { c: 'flux-textarea', o: 'focus-outline', v: '3px / 2px', cat: 'workaround', up: '#3' },
    { c: 'flux-datepicker', o: '--base-border-radius-container-xl (popover)', v: '0.3rem', cat: 'token', up: '' },
    { c: 'flux-datepicker', o: 'focus-outline (box-shadow → outline)', v: '3px / 2px', cat: 'workaround', up: '#3' },
    { c: 'flux-datepicker', o: 'kalender-icoon font-alias (aliasVdsIcon + MutationObserver in updated(), omzeilt font-collision)', v: "font-family: 'vds-vlaanderen-icon'", cat: 'workaround', up: '#4b' },
    { c: 'flux-datepicker', o: 'toggle-knop: bg/rand wit i.p.v. blauw (::part(toggle-button) + !important)', v: '#fff / #8695a8', cat: 'workaround', up: '#3' },
    { c: 'flux-datepicker', o: 'toggle-icoon kleur + grootte (rauwe rem/kleur → flux-look)', v: '#0055cc / calc(scaled-base * 1.125)', cat: 'rem', up: '#4a' },
    { c: 'flux-datepicker', o: 'kalender dagcel: ronde radius + grootte', v: '50% + calc(scaled-base * 2.25)', cat: 'workaround', up: '#4a' },
    { c: 'flux-datepicker', o: 'kalender-header select + opties grootte (::part + adopted-injectie)', v: 'calc(scaled-base * .875)', cat: 'rem', up: '#4a' },
    { c: 'flux-icon', o: 'glyph font-alias (omzeilt font-collision)', v: "font-family: 'vds-vlaanderen-icon' + @font-face", cat: 'workaround', up: '#4b' },
    { c: 'flux-icon', o: 'grootte (achter [scaled])', v: 'calc(scaled-base * 1.2)', cat: 'rem', up: '#4a' },
    { c: 'globaal', o: 'vds-scale-compensation.css (~215 tokens)', v: 'calc-brug op --base-*', cat: 'rem', up: '#4a' },
];

const overrideBadge = (cat: OverrideRow['cat']): TemplateResult => {
    const map = {
        token: ['#1a7f37', '#e6f6ec', 'token'],
        workaround: ['#9a6700', '#fff8e1', 'workaround'],
        rem: ['#0055cc', '#eef6ff', 'rem-brug'],
    } as const;
    const [fg, bg, label] = map[cat];
    return html`<span
        style="color: ${fg}; background: ${bg}; padding: 1px 7px; border-radius: 10px; font-size: 11px; font-weight: 600;"
        >${label}</span
    >`;
};

const catCountLabel = (rs: OverrideRow[]): string => {
    const t = rs.filter((r) => r.cat === 'token').length;
    const w = rs.filter((r) => r.cat === 'workaround').length;
    const m = rs.filter((r) => r.cat === 'rem').length;
    const parts: string[] = [];
    if (t) parts.push(`${t} token`);
    if (w) parts.push(`${w} workaround`);
    if (m) parts.push(`${m} rem-brug`);
    return parts.join(' · ');
};

type GapLevel = 'none' | 'low' | 'mid' | 'high' | 'na';

type GapDirection = { lvl: GapLevel; note: string };

type ApiGapRow = {
    vds: string;
    flux: string | null;
    base: string;
    toFlux: GapDirection;
    toVds: GapDirection;
};

const API_GAP_ROWS: ApiGapRow[] = [
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

const gapLevelBadge = (dir: GapDirection): TemplateResult => {
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

type DetailStatus = 'vds' | 'flux' | 'shape';

type ApiDetailCat = 'prop' | 'event' | 'method' | 'slot' | 'part' | 'gedrag';

type ApiDetailRow = {
    comp: string;
    cat: ApiDetailCat;
    feat: string;
    vds: string;
    flux: string;
    status: DetailStatus;
};

const API_DETAIL_ROWS: ApiDetailRow[] = [
    { comp: 'vl-button', cat: 'prop', feat: 'link-rendering als <a>', vds: 'href', flux: 'cta-link', status: 'shape' },
    { comp: 'vl-button', cat: 'prop', feat: 'icoon voor/na label', vds: 'icon-before / icon-after', flux: 'icon + icon-placement', status: 'shape' },
    { comp: 'vl-button', cat: 'prop', feat: 'variant', vds: 'variant enum (primary/secondary/tertiary/ghost)', flux: 'booleans secondary/tertiary/ghost', status: 'shape' },
    { comp: 'vl-button', cat: 'prop', feat: 'size', vds: 'size enum (small/medium/large)', flux: 'large (geen small/medium)', status: 'shape' },
    { comp: 'vl-button', cat: 'prop', feat: 'danger-styling', vds: 'danger', flux: 'nee (enkel error)', status: 'vds' },
    { comp: 'vl-button', cat: 'prop', feat: 'success-styling', vds: 'success', flux: 'nee', status: 'vds' },
    { comp: 'vl-button', cat: 'prop', feat: 'icon-only knop', vds: 'icon-button', flux: 'leeg slot + label', status: 'shape' },
    { comp: 'vl-button', cat: 'prop', feat: 'grow', vds: 'grow enum (hug/fill)', flux: 'block (~fill)', status: 'shape' },
    { comp: 'vl-button', cat: 'prop', feat: 'wide / narrow', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-button', cat: 'prop', feat: 'toggle-knop', vds: 'nee', flux: 'toggle / on / controlled', status: 'flux' },
    { comp: 'vl-button', cat: 'prop', feat: 'download (op link)', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-button', cat: 'prop', feat: 'external (target + rel + icoon)', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-button', cat: 'prop', feat: 'input-group positionering', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-button', cat: 'event', feat: 'vl-click payload', vds: 'detail { originalEvent }', flux: 'geen detail', status: 'shape' },
    { comp: 'vl-button', cat: 'event', feat: 'vl-toggle', vds: 'nee', flux: 'detail { on }', status: 'flux' },
    { comp: 'vl-button', cat: 'method', feat: 'click()', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-button', cat: 'slot', feat: 'icon-before / icon-after', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-button', cat: 'slot', feat: 'loading-icon / loading-text', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-button', cat: 'part', feat: 'link', vds: 'nee (link is ook part=button)', flux: 'ja', status: 'flux' },
    { comp: 'vl-button', cat: 'part', feat: 'icon', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-button', cat: 'part', feat: 'danger / success / loading', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-button', cat: 'gedrag', feat: 'delegatesFocus', vds: 'ja', flux: 'nee', status: 'vds' },

    { comp: 'vl-input', cat: 'prop', feat: 'id-koppeling', vds: 'input-id', flux: 'id', status: 'shape' },
    { comp: 'vl-input', cat: 'prop', feat: 'clearable (wis-knop)', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-input', cat: 'prop', feat: 'loading', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-input', cat: 'prop', feat: 'layout-chrome (size, annotation, indicator, metadata-hidden, label-hidden)', vds: 'ja (VlFormLayoutElement)', flux: 'nee', status: 'vds' },
    { comp: 'vl-input', cat: 'prop', feat: 'grow (hug/fill)', vds: 'ja', flux: 'block', status: 'shape' },
    { comp: 'vl-input', cat: 'prop', feat: 'melding-mechanisme', vds: 'intern (message-prop/slot)', flux: 'los vl-form-message (for + state)', status: 'shape' },
    { comp: 'vl-input', cat: 'prop', feat: 'extra validators', vds: 'nee', flux: 'min-exclusive / max-exclusive / regex', status: 'flux' },
    { comp: 'vl-input', cat: 'prop', feat: 'input-group', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-input', cat: 'prop', feat: 'blur-validation', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-input', cat: 'event', feat: 'vl-valid / vl-reset', vds: 'nee (native validity)', flux: 'ja', status: 'flux' },
    { comp: 'vl-input', cat: 'method', feat: 'validity-getters + formResetCallback', vds: 'ja', flux: 'nee (deels, via mixin)', status: 'vds' },
    { comp: 'vl-input', cat: 'slot', feat: 'prefix / suffix', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-input', cat: 'slot', feat: 'label / message / annotation / indicator', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-input', cat: 'part', feat: 'prefix / suffix / clear-button', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-input', cat: 'part', feat: 'container + chrome-parts', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-input', cat: 'gedrag', feat: 'wis-knop (leegt, herfocust, vl-change)', vds: 'ja', flux: 'nee', status: 'vds' },

    { comp: 'vl-textarea', cat: 'prop', feat: 'resize (none/vertical/horizontal/both)', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-textarea', cat: 'prop', feat: 'loading + layout-chrome (size, annotation, indicator, metadata/label-hidden)', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-textarea', cat: 'prop', feat: 'grow (hug/fill)', vds: 'ja', flux: 'block', status: 'shape' },
    { comp: 'vl-textarea', cat: 'prop', feat: 'character-count (ingebouwde teller)', vds: 'nee (footnote-slot)', flux: 'ja', status: 'flux' },
    { comp: 'vl-textarea', cat: 'prop', feat: 'rows / cols', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-textarea', cat: 'prop', feat: 'blur-validation', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-textarea', cat: 'event', feat: 'vl-input', vds: 'nee (enkel vl-change)', flux: 'ja', status: 'flux' },
    { comp: 'vl-textarea', cat: 'event', feat: 'vl-valid / vl-reset', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-textarea', cat: 'slot', feat: 'footnote', vds: 'ja', flux: 'nee (ingebouwde teller)', status: 'vds' },
    { comp: 'vl-textarea', cat: 'slot', feat: 'label / message / annotation / indicator', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-textarea', cat: 'part', feat: 'footnote + chrome-parts', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-textarea', cat: 'gedrag', feat: 'tekentelling met aria-live', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-textarea', cat: 'gedrag', feat: 'Enter submit uitgezet (submitFormOnEnter=false)', vds: 'n.v.t.', flux: 'ja', status: 'flux' },

    { comp: 'vl-select', cat: 'prop', feat: 'id-koppeling', vds: 'input-id', flux: 'id', status: 'shape' },
    { comp: 'vl-select', cat: 'prop', feat: 'loading + layout-chrome', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-select', cat: 'prop', feat: 'zichtbaar label', vds: 'label-prop + slot', flux: 'enkel aria-label', status: 'shape' },
    { comp: 'vl-select', cat: 'prop', feat: 'grow (hug/fill)', vds: 'ja', flux: 'block', status: 'shape' },
    { comp: 'vl-select', cat: 'prop', feat: 'wisbaar', vds: 'clearable (opt-in)', flux: 'not-deletable (opt-out)', status: 'shape' },
    { comp: 'vl-select', cat: 'prop', feat: 'options programmatisch', vds: 'nee (geslotte <option>)', flux: 'options / initial-options', status: 'flux' },
    { comp: 'vl-select', cat: 'prop', feat: 'blur-validation', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-select', cat: 'event', feat: 'per-toets event', vds: 'native input re-dispatch', flux: 'vl-input', status: 'shape' },
    { comp: 'vl-select', cat: 'event', feat: 'vl-valid / vl-reset', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-select', cat: 'method', feat: 'setCustomValidity', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-select', cat: 'method', feat: 'selectedValue / selectedIndex / selectedOptions', vds: 'ja', flux: 'nee (options-model)', status: 'vds' },
    { comp: 'vl-select', cat: 'slot', feat: 'label / message / annotation / indicator', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-select', cat: 'part', feat: 'select / clear-button', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-select', cat: 'part', feat: 'container + chrome-parts', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-select', cat: 'gedrag', feat: 'data-alt-label (korte label in trigger)', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-select', cat: 'gedrag', feat: 'hug-width (auto-breedte naar langste optie)', vds: 'ja', flux: 'nee', status: 'vds' },

    { comp: 'vl-datepicker', cat: 'prop', feat: 'id-koppeling', vds: 'input-id', flux: 'id', status: 'shape' },
    { comp: 'vl-datepicker', cat: 'prop', feat: 'loading + layout-chrome', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-datepicker', cat: 'prop', feat: 'grow (hug/fill)', vds: 'ja', flux: 'block', status: 'shape' },
    { comp: 'vl-datepicker', cat: 'prop', feat: 'min/max grens', vds: 'min / max', flux: 'min-date / max-date', status: 'shape' },
    { comp: 'vl-datepicker', cat: 'prop', feat: 'type (range / time / date-time)', vds: 'nee (single date)', flux: 'ja', status: 'flux' },
    { comp: 'vl-datepicker', cat: 'prop', feat: 'min-time / max-time / am-pm', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-datepicker', cat: 'prop', feat: 'display-format', vds: 'locale-gedreven Intl', flux: 'format-tokens (flatpickr)', status: 'shape' },
    { comp: 'vl-datepicker', cat: 'prop', feat: 'locale / first-day-of-week', vds: 'ja', flux: 'nee (hardcoded nl)', status: 'vds' },
    { comp: 'vl-datepicker', cat: 'prop', feat: 'months (meerdere naast elkaar)', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-datepicker', cat: 'prop', feat: 'disabledDates', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-datepicker', cat: 'prop', feat: 'outside-days-hidden / today-button-hidden', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-datepicker', cat: 'prop', feat: 'position / static / anchor-positioning', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-datepicker', cat: 'prop', feat: 'pattern / raw-value / disable-mask-validation', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-datepicker', cat: 'event', feat: 'vl-change payload', vds: 'detail { value: Date, formattedValue }', flux: 'detail { value: ISO }', status: 'shape' },
    { comp: 'vl-datepicker', cat: 'event', feat: 'vl-open / vl-close / vl-focus / vl-blur', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-datepicker', cat: 'event', feat: 'vl-valid / vl-reset', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-datepicker', cat: 'method', feat: 'open() / close() / clear()', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-datepicker', cat: 'method', feat: 'goToDate / goToToday / goToPrevious/NextMonth', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-datepicker', cat: 'method', feat: 'setCustomValidity', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-datepicker', cat: 'method', feat: 'getRawValue / getDates', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-datepicker', cat: 'slot', feat: 'label / message / annotation / indicator', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-datepicker', cat: 'slot', feat: 'error-message / suffix', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-datepicker', cat: 'part', feat: 'input / toggle-button / calendar / input-wrapper', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-datepicker', cat: 'gedrag', feat: 'kalender-lib', vds: 'Cally', flux: 'flatpickr', status: 'shape' },
    { comp: 'vl-datepicker', cat: 'gedrag', feat: 'input-masking tijdens typen', vds: 'nee', flux: 'ja (cleave.js)', status: 'flux' },
    { comp: 'vl-datepicker', cat: 'gedrag', feat: '"Vandaag"-shortcut + meerdere maanden', vds: 'ja', flux: 'nee', status: 'vds' },

    { comp: 'vl-checkbox', cat: 'prop', feat: 'value', vds: 'defaultValue (attr value)', flux: 'value', status: 'shape' },
    { comp: 'vl-checkbox', cat: 'prop', feat: 'label-mechanisme', vds: 'prop in shadow gerenderd', flux: 'default-slot (prop = aria-label)', status: 'shape' },
    { comp: 'vl-checkbox', cat: 'prop', feat: 'id-koppeling', vds: 'input-id', flux: 'id (auto)', status: 'shape' },
    { comp: 'vl-checkbox', cat: 'prop', feat: 'readonly', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-checkbox', cat: 'prop', feat: 'loading', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-checkbox', cat: 'prop', feat: 'tile (kaart-layout)', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-checkbox', cat: 'prop', feat: 'label-hidden', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-checkbox', cat: 'prop', feat: 'default-checked (reset-waarde)', vds: 'ja', flux: 'nee (intern snapshot)', status: 'vds' },
    { comp: 'vl-checkbox', cat: 'prop', feat: 'grow (hug/fill)', vds: 'ja', flux: 'block', status: 'shape' },
    { comp: 'vl-checkbox', cat: 'prop', feat: 'switch-variant (role=switch)', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-checkbox', cat: 'prop', feat: 'blur-validation', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-checkbox', cat: 'event', feat: 'vl-change payload', vds: 'detail { value, checked }', flux: 'detail { checked, value?, currentTarget }', status: 'shape' },
    { comp: 'vl-checkbox', cat: 'event', feat: 'vl-input', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-checkbox', cat: 'event', feat: 'vl-valid', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-checkbox', cat: 'slot', feat: 'prefix / suffix / content', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-checkbox', cat: 'part', feat: 'input / checkbox / label / tile / prefix / suffix / content', vds: 'ja', flux: 'nee', status: 'vds' },

    { comp: 'vl-radio-group', cat: 'prop', feat: 'id-koppeling', vds: 'input-id', flux: 'id', status: 'shape' },
    { comp: 'vl-radio-group', cat: 'prop', feat: 'label-render', vds: 'zichtbaar', flux: 'visually-hidden legend', status: 'shape' },
    { comp: 'vl-radio-group', cat: 'prop', feat: 'loading + layout-chrome (annotation, indicator, size, metadata/label-hidden)', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-radio-group', cat: 'prop', feat: 'grow (hug/fill)', vds: 'ja', flux: 'block', status: 'shape' },
    { comp: 'vl-radio-group', cat: 'prop', feat: 'tiles', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-radio-group', cat: 'prop', feat: 'blur-validation', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-radio-group', cat: 'event', feat: 'vl-change op groepsniveau', vds: 'ja', flux: 'nee (niet her-dispatcht)', status: 'vds' },
    { comp: 'vl-radio-group', cat: 'event', feat: 'native input (form-compatibel)', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-radio-group', cat: 'event', feat: 'vl-valid / vl-reset', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-radio-group', cat: 'method', feat: 'focus() (routeert naar checked/eerste enabled)', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-radio-group', cat: 'slot', feat: 'label / message / annotation / indicator', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-radio-group', cat: 'part', feat: 'container / radios', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-radio-group', cat: 'gedrag', feat: 'roving tabindex (expliciet 0/-1)', vds: 'ja', flux: 'nee (delegatesFocus)', status: 'vds' },
    { comp: 'vl-radio-group', cat: 'gedrag', feat: 'state-propagatie met author-override-tracking', vds: 'ja (grondig)', flux: 'ja (simpeler)', status: 'shape' },
    { comp: 'vl-radio-group', cat: 'gedrag', feat: 'vl-radio: event-model', vds: 'group dispatcht change', flux: 'radio dispatcht zelf', status: 'shape' },
    { comp: 'vl-radio-group', cat: 'gedrag', feat: 'vl-radio: a11y-model', vds: 'custom role=radio', flux: 'native <input type=radio>', status: 'shape' },
    { comp: 'vl-radio-group', cat: 'prop', feat: 'vl-radio: tile / grow', vds: 'ja / enum', flux: 'nee / block', status: 'shape' },
    { comp: 'vl-radio-group', cat: 'prop', feat: 'vl-radio: readonly', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-radio-group', cat: 'slot', feat: 'vl-radio: prefix / suffix / content', vds: 'ja', flux: 'nee', status: 'vds' },

    { comp: 'vl-fieldset', cat: 'gedrag', feat: 'base-laag', vds: 'WithFormLayout(VlFormControlElement)', flux: 'BaseLitElement (geen FormControl)', status: 'shape' },
    { comp: 'vl-fieldset', cat: 'prop', feat: 'groepslabel', vds: 'label-prop + slot label', flux: 'slot legend + legend-classes', status: 'shape' },
    { comp: 'vl-fieldset', cat: 'prop', feat: 'disabled/error/success/readonly/loading (+ propagatie)', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-fieldset', cat: 'prop', feat: 'layout-chrome (annotation, indicator, message, size, grow, metadata/label-hidden)', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-fieldset', cat: 'prop', feat: 'validation-/disabled-propagation-blocked', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-fieldset', cat: 'prop', feat: 'border (kader)', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-fieldset', cat: 'prop', feat: 'horizontal (grid-layout)', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-fieldset', cat: 'prop', feat: 'legend-classes', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-fieldset', cat: 'method', feat: 'propagateStateToChildren / slottedElements', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-fieldset', cat: 'slot', feat: 'message / annotation / indicator', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-fieldset', cat: 'part', feat: 'fieldset / label / content / message / annotation / indicator', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-fieldset', cat: 'gedrag', feat: 'state-propagatie naar slotted kinderen', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-fieldset', cat: 'gedrag', feat: 'legende-klik focust eerste control', vds: 'nee', flux: 'ja', status: 'flux' },

    { comp: 'vl-icon', cat: 'prop', feat: 'icon-validatie', vds: 'reflect + dev-warn tegen enum', flux: 'getypeerd, geen runtime-check', status: 'shape' },
    { comp: 'vl-icon', cat: 'prop', feat: 'size', vds: 'enum (small/medium/large)', flux: 'booleans small / large', status: 'shape' },
    { comp: 'vl-icon', cat: 'prop', feat: 'tag (wrapper i/span/div/p)', vds: 'ja', flux: 'nee (altijd span)', status: 'vds' },
    { comp: 'vl-icon', cat: 'prop', feat: 'rotated-half / rotated-full', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-icon', cat: 'prop', feat: 'toegankelijk label', vds: 'native aria-label (delegatie)', flux: 'label-prop naar aria-label', status: 'shape' },
    { comp: 'vl-icon', cat: 'prop', feat: 'left-margin / right-margin', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-icon', cat: 'prop', feat: 'light (kleurvariant)', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-icon', cat: 'prop', feat: 'clickable (gedeprecieerd)', vds: 'nee', flux: 'ja', status: 'flux' },
    { comp: 'vl-icon', cat: 'slot', feat: 'default (inline SVG custom icoon)', vds: 'ja', flux: 'nee (enkel font-glyph)', status: 'vds' },
    { comp: 'vl-icon', cat: 'gedrag', feat: 'dev-warn bij ongeldige icon', vds: 'ja', flux: 'nee', status: 'vds' },
    { comp: 'vl-icon', cat: 'gedrag', feat: 'wrapper-tag-validatie', vds: 'ja', flux: 'nee', status: 'vds' },

    { comp: 'vl-title', cat: 'prop', feat: 'volledige component (type, appearance, underline, alt, no-space-bottom)', vds: 'geen VDS-component (enkel typografie-tokens)', flux: 'ja', status: 'flux' },
];

const detailStatusBadge = (status: DetailStatus): TemplateResult => {
    const map: Record<DetailStatus, readonly [string, string, string]> = {
        vds: ['#0055cc', '#eef6ff', 'enkel VDS'],
        flux: ['#9a6700', '#fff8e1', 'enkel flux'],
        shape: ['#8250df', '#f3eefb', 'andere shape/naam'],
    };
    const [fg, bg, label] = map[status];
    return html`<span
        style="color: ${fg}; background: ${bg}; padding: 1px 7px; border-radius: 10px; font-size: 11px; font-weight: 600; white-space: nowrap;"
        >${label}</span
    >`;
};

const detailCatLabel: Record<ApiDetailCat, string> = {
    prop: 'property',
    event: 'event',
    method: 'method',
    slot: 'slot',
    part: 'part',
    gedrag: 'gedrag',
};

// Zet een aanwezigheids-cel ('ja' / 'nee', eventueel met toelichting tussen haakjes)
// om naar een groene checkmark of rode kruis-icon, met de resterende tekst ernaast.
const renderPresence = (value: string): TemplateResult => {
    const trimmed = value.trim();
    const check = html`<span role="img" aria-label="ja" style="color: #1a7f37; font-weight: 700;">✓</span>`;
    const cross = html`<span role="img" aria-label="nee" style="color: #b3261e; font-weight: 700;">✗</span>`;
    const lead = trimmed.match(/^(ja|nee)(?![a-z])/i);
    if (lead) {
        const icon = lead[1].toLowerCase() === 'ja' ? check : cross;
        const rest = trimmed.slice(lead[1].length).trim();
        return rest ? html`${icon} <span style="color: #555;">${rest}</span>` : icon;
    }
    return html`<span style="color: #555;">${trimmed}</span>`;
};

const vdsFrame = (demo: string, height: number, width: string = '100%'): TemplateResult =>
    html`<iframe
        src="/vds-frame.html?demo=${demo}"
        style="border: 0; width: ${width}; height: ${height}px;"
        title="rauw VDS ${demo}, geïsoleerd in een eigen document (16px-root, eigen font, default vl-prefix)"
    ></iframe>`;

// Selecteer de patches die op een bepaald voorbeeld van toepassing zijn. 'fluxLook'
// matcht de gedeelde form-control-regels (alle form-controls).
const patchesFor = (...keys: string[]): OverrideRow[] =>
    OVERRIDE_ROWS.filter((r) =>
        keys.some((k) => (k === 'fluxLook' ? r.c.startsWith('alle form-controls') : r.c === k))
    );

// Compacte, herhaalbare patch-lijst onder een visueel voorbeeld: wat we op de
// flux-variant zetten om ze op de echte vl-* te doen lijken (afwijkend van rauw VDS).
const renderPatchNotes = (rows: OverrideRow[], subject: TemplateResult | string): TemplateResult => {
    const th = 'text-align: left; padding: 5px 10px; border-bottom: 2px solid #cbd2d9; font-size: 11px;';
    const td = 'padding: 5px 10px; border-bottom: 1px solid #eaecef; font-size: 12px; vertical-align: top;';
    return html`
        <details
            style="border: 1px solid #e1e4e8; border-radius: 6px; margin: 0 0 20px; padding: 0 12px; max-width: 900px; background: #fbfcfd;"
        >
            <summary
                style="cursor: pointer; font-weight: 600; padding: 8px 4px; font-size: 13px; display: flex; gap: 8px; align-items: baseline; flex-wrap: wrap;"
            >
                <span>Patches om ${subject} op <code>vl-</code> te doen lijken (afwijkend van rauw VDS)</span>
                <span style="font-weight: 400; color: #6b7280; font-size: 12px;">
                    ${rows.length} ${rows.length === 1 ? 'wijziging' : 'wijzigingen'} — ${catCountLabel(rows)}
                </span>
            </summary>
            <table style="border-collapse: collapse; width: 100%; margin: 4px 0 12px;">
                <thead>
                    <tr>
                        <th scope="col" style="${th}">Component</th>
                        <th scope="col" style="${th}">Override</th>
                        <th scope="col" style="${th}">Flux-waarde</th>
                        <th scope="col" style="${th}">Categorie</th>
                        <th scope="col" style="${th}">VDS-req</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows.map(
                        (r) => html`<tr>
                            <td style="${td}"><code>${r.c}</code></td>
                            <td style="${td}">${r.o}</td>
                            <td style="${td}"><code>${r.v}</code></td>
                            <td style="${td}">${overrideBadge(r.cat)}</td>
                            <td style="${td}">${r.up || '—'}</td>
                        </tr>`
                    )}
                </tbody>
            </table>
        </details>
    `;
};

const API_DETAIL_INLINED_TAGS = ['vl-button', 'vl-input', 'vl-datepicker', 'vl-checkbox', 'vl-select', 'vl-radio-group', 'vl-icon', 'vl-textarea', 'vl-fieldset', 'vl-title'];

const renderApiDetailAccordion = (vdsTag: string): TemplateResult => {
    const rows = API_DETAIL_ROWS.filter((r) => r.comp === vdsTag);
    if (!rows.length) {
        return html``;
    }
    const fluxTag = API_GAP_ROWS.find((c) => c.vds === vdsTag)?.flux ?? null;
    const v = rows.filter((r) => r.status === 'vds').length;
    const f = rows.filter((r) => r.status === 'flux').length;
    const s = rows.filter((r) => r.status === 'shape').length;
    const th = 'text-align: left; padding: 5px 10px; border-bottom: 2px solid #cbd2d9; font-size: 11px;';
    const td = 'padding: 5px 10px; border-bottom: 1px solid #eaecef; font-size: 12px; vertical-align: top;';
    return html`
        <details
            style="border: 1px solid #e1e4e8; border-radius: 6px; margin: 0 0 20px; padding: 0 12px; max-width: 900px; background: #fbfcfd;"
        >
            <summary
                style="cursor: pointer; font-weight: 600; padding: 8px 4px; font-size: 13px; display: flex; gap: 8px; align-items: baseline; flex-wrap: wrap;"
            >
                <span
                    >API-gap: welke publieke API wijkt af tussen <code>${vdsTag}</code> en
                    ${fluxTag ? html`<code>${fluxTag}</code>` : 'flux'}</span
                >
                <span style="font-weight: 400; color: #6b7280; font-size: 12px;">
                    ${rows.length} ${rows.length === 1 ? 'afwijking' : 'afwijkingen'} (${v} enkel-VDS ·
                    ${f} enkel-flux · ${s} andere shape/naam)
                </span>
            </summary>
            <table style="border-collapse: collapse; width: 100%; margin: 4px 0 12px;">
                <thead>
                    <tr>
                        <th scope="col" style="${th}">Type</th>
                        <th scope="col" style="${th}">Functionaliteit</th>
                        <th scope="col" style="${th}">VDS</th>
                        <th scope="col" style="${th}">flux</th>
                        <th scope="col" style="${th}">Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows.map(
                        (r) => html`<tr>
                            <td style="${td} color: #6b7280;">${detailCatLabel[r.cat]}</td>
                            <td style="${td}">${r.feat}</td>
                            <td style="${td}">${renderPresence(r.vds)}</td>
                            <td style="${td}">${renderPresence(r.flux)}</td>
                            <td style="${td}">${detailStatusBadge(r.status)}</td>
                        </tr>`
                    )}
                </tbody>
            </table>
        </details>
    `;
};

@customElement('app-component')
export class AppComponent extends LitElement {
    @state()
    private iconScaled = true;

    @state()
    private overridesOff = false;

    @state()
    private gapsOff = false;

    static {
        registerWebComponents([
            VlButtonComponent,
            VlLinkComponent,
            VlTitleComponent,
            VlInputFieldComponent,
            VlDatepickerComponent,
            VlCheckboxComponent,
            VlSelectComponent,
            VlRadioGroupComponent,
            VlRadioComponent,
            VlFieldsetComponent,
            VlFormLabelComponent,
            VlFormMessageComponent,
            VlTextareaComponent,
        ]);
    }

    private renderVariantRow(
        name: string,
        vds: TemplateResult,
        flux: TemplateResult,
        vl: TemplateResult,
        patches?: OverrideRow[],
        colRatio = 'repeat(3, minmax(0, 1fr))'
    ): TemplateResult {
        const cell = (label: string, color: string, content: TemplateResult) => html`
            <div style="border: 1px dashed #d0d7de; border-radius: 6px; padding: 12px;">
                <div style="font-size: 12px; color: ${color}; margin-bottom: 8px; font-weight: 600;">
                    ${label}
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px; align-items: flex-start;">
                    ${content}
                </div>
            </div>
        `;
        return html`
            <div style="font-weight: 600; margin: 6px 0;">${name}</div>
            <div
                style="display: grid; grid-template-columns: ${colRatio}; gap: 12px; max-width: 960px; margin-bottom: 8px;"
            >
                ${cell('vds · rauw VDS', '#0055cc', vds)}
                ${cell('flux · erft VDS + tokens', '#0055cc', flux)}
                ${cell('vl · echte flux', '#6b7280', vl)}
            </div>
            ${this.gapsOff
                ? nothing
                : html`${patches && patches.length
                      ? renderPatchNotes(patches, html`<code>flux-${name}</code>`)
                      : ''}
                  ${renderApiDetailAccordion(`vl-${name}`)}`}
        `;
    }

    private renderTitleVariant(): TemplateResult {
        const cell = (label: string, color: string, content: TemplateResult) => html`
            <div style="border: 1px dashed #d0d7de; border-radius: 6px; padding: 12px;">
                <div style="font-size: 12px; color: ${color}; margin-bottom: 8px; font-weight: 600;">
                    ${label}
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px; align-items: flex-start;">
                    ${content}
                </div>
            </div>
        `;
        const note = (text: string) => html`<span style="font-size: 12px; color: #6b7280;">${text}</span>`;
        return html`
            <div style="font-weight: 600; margin: 6px 0;">title</div>
            <div
                style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; max-width: 960px; margin-bottom: 8px;"
            >
                ${cell(
                    'vds · rauw VDS',
                    '#0055cc',
                    note('Geen VDS title-component: VDS levert enkel typografie-tokens, geen web-component.')
                )}
                ${cell(
                    'flux · erft VDS + tokens',
                    '#0055cc',
                    note('Geen flux-title-adapter: er is geen VDS-component om onderliggend te erven.')
                )}
                ${cell(
                    'vl · echte flux',
                    '#6b7280',
                    html`<vl-title type="h3">Titel h3</vl-title><vl-title type="h4">Titel h4</vl-title>`
                )}
            </div>
            ${this.gapsOff ? nothing : renderApiDetailAccordion('vl-title')}
        `;
    }

    private renderIntegrationStatus(): TemplateResult {
        type Comp = { tag: string; flux: string | null; state: 'done' | 'partial' | 'todo'; note: string };
        const comps: Comp[] = [
            { tag: 'vl-button', flux: 'flux-button', state: 'done', note: 'erft VlButton; look + hoogte via tokens' },
            { tag: 'vl-input', flux: 'flux-input', state: 'done', note: 'erft VlInput' },
            { tag: 'vl-link', flux: 'flux-link', state: 'done', note: 'erft VlLink' },
            { tag: 'vl-select', flux: 'flux-select', state: 'done', note: 'erft VlSelect' },
            {
                tag: 'vl-checkbox',
                flux: 'flux-checkbox',
                state: 'done',
                note: 'erft VlCheckbox. Let op: het vinkje is intern een vds-icon, dus het lijdt op deze mixed-page onder dezelfde vlaanderen-icon font-collision als de iconen (kan ontbreken); in een echte flux-op-VDS build toont het wel',
            },
            { tag: 'vl-textarea', flux: 'flux-textarea', state: 'done', note: 'erft VlTextarea' },
            { tag: 'vl-fieldset', flux: 'flux-fieldset', state: 'done', note: 'erft VlFieldset' },
            { tag: 'vl-radio-group', flux: 'flux-radio-group', state: 'done', note: 'erft VlRadioGroup' },
            {
                tag: 'vl-radio',
                flux: null,
                state: 'partial',
                note: 'VlRadio niet los geexporteerd; radios leven als vds-radio in flux-radio-group, tokens cascaden',
            },
            {
                tag: 'vl-box',
                flux: 'vl-padding (style)',
                state: 'partial',
                note: 'layout-primitief; getoond in de layout-sectie, flux gebruikt de vl-padding-style i.p.v. een wrapper',
            },
            {
                tag: 'vl-inline',
                flux: 'vl-group (style)',
                state: 'partial',
                note: 'layout-primitief; getoond in de layout-sectie, flux gebruikt de vl-group-style i.p.v. een wrapper',
            },
            {
                tag: 'vl-stack',
                flux: 'vl-stacked (style)',
                state: 'partial',
                note: 'layout-primitief; getoond in de layout-sectie, flux gebruikt de vl-stacked-style i.p.v. een wrapper',
            },
            {
                tag: 'vl-datepicker',
                flux: 'flux-datepicker',
                state: 'done',
                note: 'erft VlDatepicker; look via tokens + focus-override',
            },
            {
                tag: 'vl-icon',
                flux: 'flux-icon',
                state: 'done',
                note: 'erft VlIcon. Glyphs renderen correct via een font-alias (VDS-font onder unieke naam vds-vlaanderen-icon + !important-override), zodat de vlaanderen-icon-collision met flux omzeild wordt en beide fonts coexisteren. Grootte blijft rem-literal (zie [scaled]-toggle)',
            },
            { tag: 'vl-input-group', flux: null, state: 'todo', note: 'nog geen flux-integratie' },
            { tag: 'vl-markdown', flux: null, state: 'todo', note: 'nog geen flux-integratie' },
        ];
        const icon = (s: Comp['state']) => (s === 'done' ? '✅' : s === 'partial' ? '➖' : '❌');
        const order = { done: 0, partial: 1, todo: 2 };
        const sorted = [...comps].sort((a, b) => order[a.state] - order[b.state]);
        const done = comps.filter((c) => c.state === 'done');
        const partial = comps.filter((c) => c.state === 'partial');
        const todo = comps.filter((c) => c.state === 'todo');
        const th = 'text-align: left; padding: 6px 10px; border-bottom: 2px solid #cbd2d9; font-size: 12px;';
        const td = 'padding: 6px 10px; border-bottom: 1px solid #eaecef; font-size: 13px; vertical-align: top;';
        const summaryStyle = 'cursor: pointer; font-weight: 600; padding: 8px 4px; font-size: 14px;';
        const table = (rows: Comp[], caption: string) => html`
            <table style="border-collapse: collapse; width: 100%; max-width: 760px;">
                <caption style="text-align: left; font-size: 12px; color: #6b7280; padding: 4px 0;">
                    ${caption}
                </caption>
                <thead>
                    <tr>
                        <th scope="col" style="${th}">Status</th>
                        <th scope="col" style="${th}">VDS-component</th>
                        <th scope="col" style="${th}">flux-component</th>
                        <th scope="col" style="${th}">Nota</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows.map(
                        (c) => html`<tr>
                            <td style="${td} text-align: center;">${icon(c.state)}</td>
                            <td style="${td}"><code>${c.tag}</code></td>
                            <td style="${td}">${c.flux ? html`<code>${c.flux}</code>` : '—'}</td>
                            <td style="${td} color: #555;">${c.note}</td>
                        </tr>`
                    )}
                </tbody>
            </table>
        `;
        return html`
            <section class="vl-section" aria-label="VDS-componenten integratie-status">
                <div class="vl-content-block vl-content-block--full-width">
                    <vl-title type="h2">VDS-componenten: integratie-status</vl-title>
                    <p>
                        Alle ${comps.length} VDS web-componenten (geregistreerd via
                        <code>defineAll('vds')</code>, bron: het package-manifest
                        <code>custom-elements.json</code>). <b>${done.length}</b> geïntegreerd als
                        <code>flux-*</code> (erven de VDS-klasse + flux-tokens), <b>${partial.length}</b>
                        onrechtstreeks / via een style, <b>${todo.length}</b> nog niet.
                        Legende: ✅ geïntegreerd · ➖ onrechtstreeks (via een ander flux-component of een
                        layout-style) · ❌ nog niet.
                    </p>
                    <details>
                        <summary style="${summaryStyle}">
                            Alle ${comps.length} VDS-componenten (${done.length} ✅ · ${partial.length} ➖ ·
                            ${todo.length} ❌)
                        </summary>
                        ${table(sorted, 'gesorteerd: geïntegreerd, dan onrechtstreeks, dan nog niet')}
                    </details>
                </div>
            </section>
        `;
    }

    private renderOverridesList(): TemplateResult {
        const rows = OVERRIDE_ROWS;
        const nToken = rows.filter((r) => r.cat === 'token').length;
        const nWork = rows.filter((r) => r.cat === 'workaround').length;
        const nRem = rows.filter((r) => r.cat === 'rem').length;
        const th = 'text-align: left; padding: 6px 10px; border-bottom: 2px solid #cbd2d9; font-size: 12px;';
        const td = 'padding: 6px 10px; border-bottom: 1px solid #eaecef; font-size: 12px; vertical-align: top;';
        return html`
            <section class="vl-section" aria-label="Lokale overrides consument-side">
                <div class="vl-content-block vl-content-block--full-width">
                    <vl-title type="h2">Lokale overrides (consument-side)</vl-title>
                    <p>
                        Alles wat we in de playground zelf op de <code>flux-*</code> componenten zetten om de
                        flux-look te bereiken. Drie categorieën:
                        <b style="color: #1a7f37;">token</b> (idiomatisch, publiek <code>--base-*</code> token),
                        <b style="color: #9a6700;">workaround</b> (VDS-CSS overschreven omdat er geen token was),
                        <b style="color: #0055cc;">rem-brug</b> (scale-compensatie voor de 10px-root). De
                        <b>workarounds</b> horen upstream (kolom "VDS-req", zie
                        <code>VDS-UPSTREAM-REQUESTS.md</code>). De <code>Rauw VDS tonen</code>-knop (floating,
                        rechtsonder) schakelt al deze overrides in één keer uit. Dezelfde patches staan — per
                        component herhaald — ook onder elk visueel voorbeeld hieronder.
                        Totaal: ${rows.length} (${nToken} token · ${nWork} workaround · ${nRem} rem-brug).
                    </p>
                    <details>
                        <summary style="cursor: pointer; font-weight: 600; padding: 8px 4px; font-size: 14px;">
                            Volledige lijst (${rows.length})
                        </summary>
                        <table style="border-collapse: collapse; width: 100%; max-width: 860px;">
                            <thead>
                                <tr>
                                    <th scope="col" style="${th}">Component</th>
                                    <th scope="col" style="${th}">Override</th>
                                    <th scope="col" style="${th}">Flux-waarde</th>
                                    <th scope="col" style="${th}">Categorie</th>
                                    <th scope="col" style="${th}">VDS-req</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${rows.map(
                                    (r) => html`<tr>
                                        <td style="${td}"><code>${r.c}</code></td>
                                        <td style="${td}">${r.o}</td>
                                        <td style="${td}"><code>${r.v}</code></td>
                                        <td style="${td}">${overrideBadge(r.cat)}</td>
                                        <td style="${td}">${r.up || '—'}</td>
                                    </tr>`
                                )}
                            </tbody>
                        </table>
                    </details>
                </div>
            </section>
        `;
    }

    private renderApiGaps(): TemplateResult {
        const rows = API_GAP_ROWS;
        const th = 'text-align: left; padding: 6px 10px; border-bottom: 2px solid #cbd2d9; font-size: 12px;';
        const td = 'padding: 6px 10px; border-bottom: 1px solid #eaecef; font-size: 12px; vertical-align: top;';
        const summaryStyle = 'cursor: pointer; font-weight: 600; padding: 8px 4px; font-size: 14px;';
        return html`
            <section class="vl-section" aria-label="API en functionaliteit gap-analyse VDS flux">
                <div class="vl-content-block vl-content-block--full-width">
                    <vl-title type="h2">API-gap: functionaliteit (los van styling)</vl-title>
                    <p>
                        Per-component vergelijking van de <b>publieke API en het gedrag</b> (properties,
                        events, methods, slots, parts) tussen de VDS-componenten en onze flux-componenten.
                        Dit staat los van de styling/token-pariteit (die zit in de
                        <code>Lokale overrides</code>-sectie hierboven en in
                        <code>VDS-UPSTREAM-REQUESTS.md</code>). De volledige rij-per-rij tabellen staan in
                        <code>FLUX-704-API-GAPS.md</code>; dit is de samenvatting per component.
                    </p>
                    <p style="font-size: 13px;">
                        <b>Kernpatroon:</b> de flux form-velden erven van <code>FormControl</code>
                        (<code>@open-wc/form-control</code>), de VDS form-velden van
                        <code>VlFormLayoutElement</code>. Die VDS-keten bundelt label, annotation, indicator,
                        message, size en grow met hun slots en parts. Zodra een <code>flux-*</code> component
                        effectief van de VDS-klasse erft, valt dat hele pakket
                        <b>grotendeels gratis</b> binnen. De echte keuzes zitten in de rijen met een andere
                        shape/naam (bv. enum <code>size</code> vs losse booleans, <code>grow=fill</code> vs
                        <code>block</code>, <code>input-id</code> vs <code>id</code>) en in de
                        <code>enkel-flux</code>-functionaliteit (upstream-request of in de derivative houden).
                    </p>
                    <p style="font-size: 12px; color: #57606a;">
                        De twee richting-kolommen tonen per component <b>in welke mate</b> er een gap is, en
                        naar welke kant. <b>flux moet overnemen</b> = functionaliteit die enkel in VDS zit
                        (via overerving/derivative of flux-API uitbreiden). <b>upstream vragen bij VDS</b> =
                        functionaliteit die enkel bij flux zit (feature-request bij VDS, of bewust in onze
                        derivative houden). Niveau-legende: ${gapLevelBadge({ lvl: 'none', note: '' })}
                        ${gapLevelBadge({ lvl: 'low', note: '' })} ${gapLevelBadge({ lvl: 'mid', note: '' })}
                        ${gapLevelBadge({ lvl: 'high', note: '' })} ${gapLevelBadge({ lvl: 'na', note: '' })}
                    </p>
                    <details>
                        <summary style="${summaryStyle}">Samenvatting per component (${rows.length})</summary>
                        <div style="overflow-x: auto;">
                            <table style="border-collapse: collapse; width: 100%; max-width: 1040px;">
                                <thead>
                                    <tr>
                                        <th scope="col" style="${th}">VDS-component</th>
                                        <th scope="col" style="${th}">flux-component</th>
                                        <th scope="col" style="${th}">Base-klasse (VDS / flux)</th>
                                        <th scope="col" style="${th}">
                                            flux moet overnemen<br /><span style="font-weight: 400; color: #6b7280;"
                                                >enkel in VDS</span
                                            >
                                        </th>
                                        <th scope="col" style="${th}">
                                            upstream vragen bij VDS<br /><span
                                                style="font-weight: 400; color: #6b7280;"
                                                >enkel in flux</span
                                            >
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${rows.map(
                                        (r) => html`<tr>
                                            <td style="${td}"><code>${r.vds}</code></td>
                                            <td style="${td}">
                                                ${r.flux ? html`<code>${r.flux}</code>` : '—'}
                                            </td>
                                            <td style="${td} color: #555;">${r.base}</td>
                                            <td style="${td} width: 27%;">${gapLevelBadge(r.toFlux)}</td>
                                            <td style="${td} width: 27%;">${gapLevelBadge(r.toVds)}</td>
                                        </tr>`
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </details>
                </div>
            </section>
        `;
    }

    private renderApiGapDetails(): TemplateResult {
        const total = API_DETAIL_ROWS.length;
        const nVds = API_DETAIL_ROWS.filter((r) => r.status === 'vds').length;
        const nFlux = API_DETAIL_ROWS.filter((r) => r.status === 'flux').length;
        const nShape = API_DETAIL_ROWS.filter((r) => r.status === 'shape').length;
        const orphans = API_GAP_ROWS.filter(
            (c) => !API_DETAIL_INLINED_TAGS.includes(c.vds) && API_DETAIL_ROWS.some((r) => r.comp === c.vds)
        );
        return html`
            <section class="vl-section" aria-label="API-gap detail legende en overige componenten">
                <div class="vl-content-block vl-content-block--full-width">
                    <vl-title type="h2">API-gap: detail per component (welke API wijkt af)</vl-title>
                    <p>
                        Per component een uitklapbare lijst van elke publieke API die <b>niet 1-op-1
                        overeenkomt</b> tussen VDS en flux (rijen die volledig gelijk zijn, staan er bewust
                        niet in). De detail-accordions staan <b>inline onder hun component-voorbeeld</b> in de
                        sectie "Drie varianten naast elkaar" hieronder (net als de token-patch-lijsten). Hier
                        staat de legende plus de totalen. Volledige onderbouwing (ook de overlap-rijen) staat
                        in <code>FLUX-704-API-GAPS.md</code>.
                    </p>
                    <p style="font-size: 12px; color: #57606a;">
                        Status: ${detailStatusBadge('vds')} = zit enkel in VDS (flux moet overnemen via
                        overerving/derivative) · ${detailStatusBadge('flux')} = zit enkel in flux
                        (upstream-request bij VDS, of in onze derivative houden) · ${detailStatusBadge('shape')}
                        = in beide aanwezig maar met een andere attribuut-naam, API-shape of mechanisme (af te
                        stemmen). Totaal ${total} afwijkingen over alle componenten: ${nVds} enkel-VDS ·
                        ${nFlux} enkel-flux · ${nShape} andere shape/naam.
                    </p>
                    ${orphans.length
                        ? html`
                              <p style="font-size: 13px; font-weight: 600; margin-top: 12px;">
                                  Componenten zonder los voorbeeld
                              </p>
                              ${orphans.map((c) => renderApiDetailAccordion(c.vds))}
                          `
                        : nothing}
                </div>
            </section>
        `;
    }

    private renderIconShowcase(): TemplateResult {
        const icons = [
            'calendar',
            'folder',
            'user',
            'mail',
            'search',
            'info-circle',
            'warning',
            'check',
            'phone',
            'location',
            'cog',
            'bell',
        ];
        const iconCell = 'display: flex; align-items: center; justify-content: center; padding: 10px; border: 1px dashed #d0d7de; border-radius: 6px;';
        const colHead = (label: string, color: string) =>
            html`<div style="font-weight: 600; font-size: 12px; color: ${color};">${label}</div>`;
        return html`
            <section class="vl-section" aria-label="icon vergelijking vds flux vl">
                <div class="vl-content-block vl-content-block--full-width">
                    <vl-title type="h2">icon (vds · flux · vl)</vl-title>
                    <p>
                        <code>flux-icon</code> erft <code>VlIcon</code>. Een selectie iconen, elk in
                        <code>vds-icon</code> · <code>flux-icon</code> · de echte flux <code>vl-icon</code>
                        (grootte <code>large</code>). De <code>vds-icon</code>-kolom staat, net als de andere
                        vds-rijen, in een <b>geïsoleerd iframe</b> (16px-root, VDS' eigen font, default
                        <code>vl-</code>-prefix), zodat VDS z'n iconen toont zoals bedoeld i.p.v. gebroken door
                        de flux-host-collision. Zo tonen alle drie de kolommen de juiste glyphs; de accordion
                        hieronder legt uit waaróm dat in de gedeelde flux-host nodig is.
                    </p>
                    <details open style="max-width: 900px; margin: 0 0 12px;">
                        <summary style="cursor: pointer; font-weight: 600; font-size: 13px; margin-bottom: 8px;">
                            Hoe laadt elke kolom z'n icon-font? (3 mechanismen)
                        </summary>
                        <div style="overflow-x: auto;">
                            <table
                                style="border-collapse: collapse; font-size: 12px; line-height: 1.5; min-width: 720px;"
                            >
                                <thead>
                                    <tr style="background: #f6f8fa; text-align: left;">
                                        <th style="border: 1px solid #e1e4e8; padding: 6px 10px;">kolom</th>
                                        <th style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            waar/hoe geladen
                                        </th>
                                        <th style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            <code>@font-face</code>-naam
                                        </th>
                                        <th style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            codepoint (calendar)
                                        </th>
                                        <th style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            override op de glyph
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            <b><code>vds-icon</code></b><br />(rauw, in iframe)
                                        </td>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            apart document (<code>vds-frame.ts</code>): <code>defineAll()</code>
                                            met default <code>vl-</code>-prefix + VDS' font-CSS
                                            (<code>…/iconfont/vlaanderen-icon.css</code>), 16px-root, geen flux
                                        </td>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            <code>vlaanderen-icon</code><br />(= VDS' font)
                                        </td>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            <code>.vl-vi-calendar</code> = <code>U+f2c4</code>
                                        </td>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            geen — geïsoleerd, dus geen collision
                                        </td>
                                    </tr>
                                    <tr style="background: #fbfcfd;">
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            <b><code>flux-icon</code></b><br />(erft <code>VlIcon</code>)
                                        </td>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            VDS' font, maar op documentniveau geladen onder een UNIEKE naam
                                            (<code>vds-iconfont-alias.ts</code>) om de naam-collision te ontwijken
                                        </td>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            <code>vds-vlaanderen-icon</code><br />(= VDS' font, hernoemd)
                                        </td>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            <code>.vl-vi-calendar</code> = <code>U+f2c4</code><br />(erft VDS'
                                            codepoint-map)
                                        </td>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            in flux-icon's shadow:
                                            <code>:host [class*='vl-vi-']::before { font-family:
                                            'vds-vlaanderen-icon' !important }</code>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            <b><code>vl-icon</code></b><br />(echte flux)
                                        </td>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            flux' eigen font op documentniveau (<code>flux-iconfont.ts</code>, CDN),
                                            geïnjecteerd als LAATSTE <code>@font-face</code> zodat het bij gelijke
                                            naam de collision wint
                                        </td>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            <code>vlaanderen-icon</code><br />(= flux' eigen font)
                                        </td>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            <code>.vl-icon--calendar</code> = <code>U+f14b</code><br />(flux' eigen
                                            codepoint-map)
                                        </td>
                                        <td style="border: 1px solid #e1e4e8; padding: 6px 10px;">
                                            geen — gebruikt de documentbrede <code>vlaanderen-icon</code> die flux wint
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p style="font-size: 12px; color: #555; margin: 8px 0 0;">
                            Kern: er zijn twee gelijknamige <code>vlaanderen-icon</code>-fonts (flux + VDS) met
                            verschillende codepoint-maps. Op de gedeelde pagina laten we ze coexisteren door VDS'
                            font onder de alias <code>vds-vlaanderen-icon</code> te zetten (voor <code>flux-icon</code>)
                            en flux' font de plain naam te laten winnen (voor <code>vl-icon</code>); de rauwe
                            <code>vds-icon</code> ontwijkt de collision door isolatie in een iframe.
                        </p>
                    </details>
                    <details
                        style="max-width: 620px; margin: 0 0 12px; border-left: 3px solid #d9a441;
                               background: #fffdf5; color: #6b5a1e; border-radius: 4px;"
                    >
                        <summary style="cursor: pointer; font-weight: 600; padding: 8px 12px; font-size: 12px;">
                            Waarom zien de iconen er (deels) anders uit? (font-collision + alias-fix)
                        </summary>
                        <div style="padding: 0 12px 10px; font-size: 12px; line-height: 1.55;">
                        <b>Font-collision, opgelost via een alias:</b> flux en VDS shippen allebei een font met
                        dezelfde naam <code>vlaanderen-icon</code> maar met verschillende codepoint-maps (VDS
                        <code>f101–f316</code>, flux overlapt). Beide full-range → er wint er één (die van flux), dus de
                        VDS-codepoints (die <code>flux-icon</code> gebruikt) mappen op verkeerde glyphs. <b>Fix op
                        <code>flux-icon</code>:</b> we laden VDS' font onder een UNIEKE naam
                        <code>vds-vlaanderen-icon</code> (document-niveau, geen collision) en overrulen op flux-icon
                        de <code>font-family</code> van de glyph naar die alias (met <code>:host</code>-specificiteit
                        + <code>!important</code>, om VDS' eigen <code>!important</code> te verslaan). Zo rendert
                        <code>flux-icon</code> correct én blijft <code>vl-icon</code> (flux' font) correct: <b>beide
                        fonts bestaan naast elkaar</b>. De <b>rauwe <code>vds-icon</code>-kolom</b> en het
                        <b>checkbox-vinkje</b> (intern een <code>&lt;vds-icon icon="check"&gt;</code>) tonen nog de
                        collision: dat is de VDS-icon-tag zelf, waarvan de glyph in een geneste shadow zit die we van
                        buitenaf niet bereiken (in een flux-op-VDS build speelt dat niet). Los hiervan blijft de
                        VDS-icon-GROOTTE een rem-literal (zie de grootte-toggle).
                        <br /><b>Waarom staat de fix op <code>flux-icon</code> en niet op de rauwe
                        <code>vds-icon</code> — lijkt dat niet omgekeerd?</b> Nee: we kunnen enkel de componenten
                        bijsturen die we <b>zélf definiëren</b> (<code>flux-icon</code> erft <code>VlIcon</code>, dus
                        we voegen een regel toe aan zíjn shadow); de rauwe <code>vds-icon</code> en de echte
                        <code>vl-icon</code> subclassen we niet, dus die houden wat de cascade kiest. Bovendien is dit
                        <b>puur een playground-artefact</b>: enkel hier laden we naast VDS' font óók flux' legacy
                        <code>vlaanderen-icon</code>-font (voor de <code>vl-icon</code>-referentiekolom), waardoor twee
                        gelijknamige fonts botsen. In een echte flux-op-VDS build is er maar één
                        <code>vlaanderen-icon</code> (die van VDS), dus rendert <code>flux-icon</code> daar
                        <b>standaard correct, zonder enige override</b> — de alias is louter steiger om de twee fonts
                        hier naast elkaar te tonen.
                        </div>
                    </details>
                    <label
                        style="display: inline-flex; align-items: center; gap: 8px; margin: 0 0 12px;
                               padding: 8px 12px; border: 1px solid #cbd2d9; border-radius: 6px;
                               background: #fafbfc; font-size: 13px; cursor: pointer;"
                    >
                        <input
                            type="checkbox"
                            .checked=${!this.iconScaled}
                            @change=${(e: Event) => (this.iconScaled = !(e.target as HTMLInputElement).checked)}
                        />
                        <span>
                            <b>Toon rauwe VDS-grootte</b> op de <code>flux-icon</code>-kolom:
                            ${this.iconScaled
                                ? 'UIT — grootte-fix actief, font-size via calc(scaled-base) ≈ 19px (matcht vl-icon).'
                                : 'AAN — rauwe VDS-rem 1.2rem = 12px (het probleem).'}
                            Enkel de GROOTTE; de glyphs zijn standaard al correct via de alias.
                        </span>
                    </label>
                    <div
                        style="display: grid; grid-template-columns: 130px 1fr 1fr 1fr; gap: 8px;
                               max-width: 620px; align-items: center;"
                    >
                        <div></div>
                        ${colHead('vds-icon', '#0055cc')} ${colHead('flux-icon', '#0055cc')}
                        ${colHead('vl-icon (echte flux)', '#6b7280')}
                        ${icons.map(
                            (name) => html`
                                <code style="font-size: 11px; color: #555;">${name}</code>
                                <div style="${iconCell}">
                                    <iframe
                                        src="/vds-frame.html?demo=icon&name=${name}"
                                        style="border: 0; width: 100%; height: 34px;"
                                        title="rauw VDS ${name}, geïsoleerd (16px-root, VDS-font, default vl-prefix)"
                                    ></iframe>
                                </div>
                                <div style="${iconCell}">
                                    <flux-icon icon="${name}" size="large" ?scaled=${this.iconScaled}></flux-icon>
                                </div>
                                <div style="${iconCell}"><vl-icon icon="${name}" size="large"></vl-icon></div>
                            `
                        )}
                    </div>
                    <p style="margin-top: 14px; font-size: 13px; color: #555; display: flex; align-items: center; gap: 6px;">
                        Groottes (<code>flux-icon</code>):
                        <flux-icon icon="calendar" size="small"></flux-icon> small ·
                        <flux-icon icon="calendar" size="medium"></flux-icon> medium ·
                        <flux-icon icon="calendar" size="large"></flux-icon> large
                    </p>
                    ${this.gapsOff
                        ? nothing
                        : html`${renderPatchNotes(patchesFor('flux-icon'), html`<code>flux-icon</code>`)}
                          ${renderApiDetailAccordion('vl-icon')}`}
                </div>
            </section>
        `;
    }

    render() {
        const boxVds = `<vds-box padding="l" background-color="subtle"
          border-color="default" border-radius="m" as="section">
  <strong>Kaart-titel</strong>
  <p>Padding, achtergrond, border en radius via tokens.</p>
</vds-box>`;
        const boxFlux = `<!-- flux heeft geen surface-component: padding via de vl-padding-utility,
     achtergrond/border/radius blijven eigen CSS (flux kent enkel padding-styles). -->
<div class="vl-padding--medium"
     style="background: #eef1f5; border: 1px solid #cbd2d9; border-radius: 6px;">
  <strong>Kaart-titel</strong>
  <p>Padding via flux' vl-padding, rest via CSS.</p>
</div>`;
        const inlineVds = `<vds-inline gap="m" align-block="center">
  <vds-button variant="primary">Opslaan</vds-button>
  <vds-button variant="secondary">Annuleren</vds-button>
</vds-inline>`;
        const inlineFlux = `<div class="vl-group vl-group--align-center">
  <vl-button>Opslaan</vl-button>
  <vl-button secondary>Annuleren</vl-button>
</div>`;
        const inlineFluxBtn = `<div class="vl-group vl-group--align-center">
  <flux-button>Opslaan</flux-button>
  <flux-button secondary>Annuleren</flux-button>
</div>`;
        const stackVds = `<vds-stack gap="s">
  <vds-button variant="primary">Eén</vds-button>
  <vds-button variant="secondary">Twee</vds-button>
  <vds-button variant="tertiary">Drie</vds-button>
</vds-stack>`;
        const stackFlux = `<div class="vl-stacked vl-stacked-small">
  <vl-button>Eén</vl-button>
  <vl-button secondary>Twee</vl-button>
  <vl-button tertiary>Drie</vl-button>
</div>`;
        const stackFluxBtn = `<div class="vl-stacked vl-stacked-small">
  <flux-button>Eén</flux-button>
  <flux-button secondary>Twee</flux-button>
  <flux-button tertiary>Drie</flux-button>
</div>`;

        return html`
            <main class="vl-region">
                <label
                    title="Zet alle consument-side flux-overrides aan/uit (flux-look ↔ rauw VDS)"
                    style="position: fixed; right: 20px; bottom: 20px; z-index: 1000;
                           display: inline-flex; align-items: center; gap: 8px;
                           padding: 10px 16px; border-radius: 999px; cursor: pointer;
                           font-size: 13px; font-weight: 600; user-select: none;
                           box-shadow: 0 2px 12px rgba(0, 0, 0, 0.18);
                           border: 1px solid ${this.overridesOff ? '#d9a441' : '#99c2ff'};
                           background: ${this.overridesOff ? '#fff3d6' : '#ffffff'};
                           color: ${this.overridesOff ? '#6b5a1e' : '#0055cc'};"
                >
                    <input
                        type="checkbox"
                        .checked=${this.overridesOff}
                        @change=${(e: Event) => (this.overridesOff = (e.target as HTMLInputElement).checked)}
                    />
                    ${this.overridesOff ? 'Rauw VDS (overrides UIT)' : 'Rauw VDS tonen'}
                </label>
                <div class="vl-content-block vl-content-block--full-width">
                    <vl-title type="h1">FLUX-704 — flux atomen bovenop VDS</vl-title>
                    <p>
                        Upstream <code>@govflanders/vl-ui-design-system-web-components</code> via
                        <code>defineAll('vds')</code>. flux <code>vl-*</code> en VDS
                        <code>vds-*</code> leven samen op één pagina zonder registry-collision.
                    </p>
                    <label
                        title="Toon of verberg alle gap-analyse (token-overrides + API-gaps), globaal en inline onder elk voorbeeld"
                        style="display: inline-flex; align-items: center; gap: 8px;
                               padding: 8px 14px; border-radius: 999px; cursor: pointer;
                               font-size: 13px; font-weight: 600; user-select: none;
                               border: 1px solid ${this.gapsOff ? '#cbd2d9' : '#99c2ff'};
                               background: ${this.gapsOff ? '#f4f6f8' : '#ffffff'};
                               color: ${this.gapsOff ? '#57606a' : '#0055cc'};"
                    >
                        <input
                            type="checkbox"
                            .checked=${!this.gapsOff}
                            @change=${(e: Event) => (this.gapsOff = !(e.target as HTMLInputElement).checked)}
                        />
                        ${this.gapsOff ? 'Gap-analyse: uit' : 'Gap-analyse tonen (token + API)'}
                    </label>
                </div>

                ${this.renderIntegrationStatus()}
                ${this.gapsOff
                    ? nothing
                    : html`${this.renderOverridesList()} ${this.renderApiGaps()}
                      ${this.renderApiGapDetails()}`}

                <section class="vl-section" aria-label="Componenten in drie varianten">
                    <div class="vl-content-block vl-content-block--full-width">
                        <vl-title type="h2">Drie varianten naast elkaar (vds · flux · vl)</vl-title>

                        <div
                            style="max-width: 900px; margin: 12px 0 16px; padding: 12px 16px;
                                   border: 1px solid #cbd2d9; border-radius: 6px; background: #fafbfc; font-size: 13px;"
                        >
                            <strong>Legende</strong>
                            <ul style="margin: 8px 0 0; padding-left: 18px; line-height: 1.6;">
                                <li>
                                    <code style="color: #0055cc;">vds-*</code> — <b>rauw VDS</b>: exact zoals
                                    VDS het vandaag definieert, geen aanpassing. Getoond in een
                                    <b>geïsoleerd iframe</b> (eigen document: 16px-root, VDS' eigen
                                    icon-font, default <code>vl-</code>-prefix), want in de flux-host
                                    zou rauw VDS gebroken ogen door de flux-omgeving (font-collision,
                                    10px-root, prefix-bug) en niet door VDS zelf.
                                </li>
                                <li>
                                    <code style="color: #0055cc;">flux-*</code> — <b>ons doelproduct</b>: erft
                                    de VDS-klasse en zet de flux-look via design-tokens op
                                    <code>:host</code> (geen extra shadow-laag).
                                </li>
                                <li>
                                    <code style="color: #0055cc;">vl-*</code> — <b>onze echte flux
                                    web-component</b>, ongewijzigd, zoals vóór FLUX-704.
                                </li>
                            </ul>
                        </div>

                        <details
                            style="max-width: 900px; margin: 0 0 16px; border-left: 3px solid #99c2ff;
                                   background: #f4f9ff; border-radius: 4px;"
                        >
                            <summary style="cursor: pointer; font-weight: 600; padding: 8px 12px; font-size: 12px;">
                                De iframe-tactiek: waarom &amp; hoe de <code>vds-*</code>-kolommen geïsoleerd staan
                            </summary>
                            <div style="padding: 0 12px 10px; font-size: 12px; line-height: 1.55;">
                                <b>Probleem:</b> op déze pagina draaien flux en VDS samen. Rauw VDS oogt daardoor
                                gebroken door <b>drie host-artefacten</b> die van ONZE omgeving komen, niet van VDS
                                zelf: (1) de <b>font-collision</b> (flux en VDS shippen allebei een
                                <code>vlaanderen-icon</code>-font met verschillende codepoint-maps), (2) de
                                <b>10px-root</b> (flux zet de root op 62.5%, VDS is voor 16px ontworpen → alles te
                                klein), en (3) de <b>prefix-selector-bug</b> (interne VDS-CSS die
                                <code>vl-icon</code> hardcodeert matcht niet onder de <code>vds-</code>-prefix).
                                <br /><br />
                                <b>Tactiek:</b> elke <code>vds-*</code>-cel is een <code>&lt;iframe&gt;</code> naar een
                                aparte mini-pagina (<code>vds-frame.html</code>, eigen webpack-entry
                                <code>vds-frame.ts</code>). Dat is een <b>volledig apart document</b> met een eigen
                                DOM, CSS-scope en font-registratie. Daarin doen we <code>defineAll()</code> met de
                                <b>default <code>vl-</code>-prefix</b>, laden we <b>VDS' eigen font + thema</b>, en
                                laten we de root op de <b>browser-default 16px</b> — <b>zonder flux erbij</b>. Zo
                                vallen alle drie de artefacten weg en toont VDS zich <b>zoals bedoeld</b>, terwijl de
                                kolom eerlijk "rauw VDS" blijft.
                                <br /><br />
                                <b>Trade-off / kanttekening:</b> het is puur een <b>demonstratie-truc</b> voor déze
                                gemengde playground. Een echte flux-op-VDS build (enkel VDS, zonder flux' legacy font
                                en op een 16px-root) heeft de iframe níét nodig. Omdat het een los document is, is er
                                ook geen live token-/styling-interactie met de flux-pagina eromheen, en popovers
                                (bv. de datepicker-kalender) worden begrensd door de iframe-rand — vandaar dat die
                                cel hoger/breder staat.
                            </div>
                        </details>

                        ${this.renderVariantRow(
                            'button',
                            vdsFrame('button', 65),
                            html`<flux-button>Primair</flux-button
                                ><flux-button secondary>Secundair</flux-button>`,
                            html`<vl-button>Primair</vl-button
                                ><vl-button secondary>Secundair</vl-button>`,
                            patchesFor('flux-button')
                        )}
                        ${this.renderVariantRow(
                            'input',
                            vdsFrame('input', 105),
                            html`<flux-input label="Naam" placeholder="flux-input"></flux-input>`,
                            html`<vl-form-label block for="cmp-vl-input" label="Naam"></vl-form-label
                                ><vl-input-field
                                    id="cmp-vl-input"
                                    aria-label="Naam"
                                    placeholder="flux"
                                ></vl-input-field>`,
                            patchesFor('fluxLook', 'flux-input')
                        )}
                        ${this.renderVariantRow(
                            'link',
                            vdsFrame('link', 50),
                            html`<flux-link href="https://www.vlaanderen.be">flux-link</flux-link>`,
                            html`<vl-link href="https://www.vlaanderen.be">flux link</vl-link>`,
                            patchesFor('flux-link')
                        )}
                        ${this.renderVariantRow(
                            'datepicker',
                            vdsFrame('datepicker', 520),
                            html`<flux-datepicker label="Datum"></flux-datepicker>`,
                            html`<vl-form-label block for="cmp-vl-dp" label="Datum"></vl-form-label
                                ><vl-datepicker id="cmp-vl-dp" label="Datum"></vl-datepicker>`,
                            patchesFor('fluxLook', 'flux-datepicker'),
                            'minmax(0, 1.8fr) minmax(0, 1fr) minmax(0, 1fr)'
                        )}
                        ${this.renderVariantRow(
                            'checkbox',
                            vdsFrame('checkbox', 50),
                            html`<flux-checkbox label="Ik ga akkoord" checked></flux-checkbox>`,
                            html`<vl-checkbox checked>Ik ga akkoord</vl-checkbox>`,
                            patchesFor('fluxLook', 'flux-checkbox')
                        )}
                        ${this.renderVariantRow(
                            'select',
                            vdsFrame('select', 300),
                            html`<flux-select label="Provincie">
                                <option value="antwerpen">Antwerpen</option>
                                <option value="limburg">Limburg</option>
                                <option value="oost-vlaanderen">Oost-Vlaanderen</option>
                            </flux-select>`,
                            html`<vl-form-label block for="cmp-vl-select" label="Provincie"></vl-form-label
                                ><vl-select
                                    id="cmp-vl-select"
                                    label="Provincie"
                                    .options=${[
                                        { value: 'antwerpen', label: 'Antwerpen' },
                                        { value: 'limburg', label: 'Limburg' },
                                        { value: 'oost-vlaanderen', label: 'Oost-Vlaanderen' },
                                    ]}
                                ></vl-select>`,
                            patchesFor('fluxLook', 'flux-select')
                        )}
                        ${this.renderVariantRow(
                            'radio-group',
                            vdsFrame('radio-group', 120),
                            html`<flux-radio-group label="Contactvoorkeur">
                                <vds-radio value="email" label="E-mail"></vds-radio>
                                <vds-radio value="post" label="Post"></vds-radio>
                            </flux-radio-group>`,
                            html`<vl-form-label block for="cmp-vl-radio" label="Contactvoorkeur"></vl-form-label
                                ><vl-radio-group id="cmp-vl-radio" label="Contactvoorkeur">
                                    <vl-radio value="email" label="E-mail">E-mail</vl-radio>
                                    <vl-radio value="post" label="Post">Post</vl-radio>
                                </vl-radio-group>`,
                            patchesFor('fluxLook', 'flux-radio-group')
                        )}
                        ${this.renderVariantRow(
                            'textarea',
                            vdsFrame('textarea', 130),
                            html`<flux-textarea label="Bericht" placeholder="flux-textarea"></flux-textarea>`,
                            html`<vl-form-label block for="cmp-vl-textarea" label="Bericht"></vl-form-label
                                ><vl-textarea
                                    id="cmp-vl-textarea"
                                    aria-label="Bericht"
                                    placeholder="flux"
                                ></vl-textarea>`,
                            patchesFor('fluxLook', 'flux-textarea')
                        )}
                        ${this.renderVariantRow(
                            'fieldset',
                            vdsFrame('fieldset', 150),
                            html`<flux-fieldset label="Voorkeuren">
                                <flux-checkbox label="Sport" checked></flux-checkbox>
                                <flux-checkbox label="Cultuur"></flux-checkbox>
                            </flux-fieldset>`,
                            html`<vl-fieldset>
                                <span slot="legend">Voorkeuren</span>
                                <vl-checkbox checked>Sport</vl-checkbox>
                                <vl-checkbox>Cultuur</vl-checkbox>
                            </vl-fieldset>`
                        )}
                        ${this.renderTitleVariant()}
                    </div>
                </section>

                <section class="vl-section" aria-label="VDS layout-primitieven">
                    <div class="vl-content-block vl-content-block--full-width">
                        <vl-title type="h2">VDS layout-primitieven (box · inline · stack)</vl-title>
                        <p>
                            VDS levert drie declaratieve layout-web-<b>componenten</b>. flux heeft die
                            niet als component, maar wél een eigen set layout-<b>styles</b>
                            (<code>vl-group</code>, <code>vl-stacked</code>, <code>vl-padding</code>,
                            globaal geladen via <code>autoRegisterStyles</code>). Waar er knoppen in
                            zitten (inline · stack) tonen we dezelfde 3 tiers als hierboven:
                            <code>vds-*</code> (rauw VDS) · <code>flux-*</code> (erft VDS + tokens) ·
                            <code>vl-*</code> (echte flux), telkens in de bijhorende layout. vl-box heeft
                            geen knoppen en blijft VDS-component naast de flux <code>vl-padding</code>-style.
                        </p>

                        <vl-title type="h3">vl-box — surface / padding-primitief</vl-title>
                        <p style="color: #555; font-size: 13px; margin: 4px 0 10px;">
                            Padded/surfaced container. Props: <code>padding</code> (+
                            <code>-inline</code>/<code>-block</code>/<code>-start</code>/<code>-end</code>),
                            <code>background-color</code>, <code>border-color</code>,
                            <code>border-radius</code>, <code>as</code> (semantisch element zoals
                            section/article). Alle waarden mappen op design-tokens. Voor kaarten,
                            panelen en semantische secties.
                        </p>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start; margin-bottom: 24px;">
                            <div>
                                <div style="font-weight: 600; margin-bottom: 6px; color: #0055cc;">
                                    VDS · vds-box
                                </div>
                                <vds-box
                                    padding="l"
                                    background-color="subtle"
                                    border-color="default"
                                    border-radius="m"
                                    as="section"
                                >
                                    <strong>Kaart-titel</strong>
                                    <p style="margin: 6px 0 0;">
                                        Padding, achtergrond, border en radius via tokens.
                                    </p>
                                </vds-box>
                                <pre style="margin: 8px 0 0; padding: 10px 12px; background: #f6f8fa; border: 1px solid #e1e4e8; border-radius: 6px; font-size: 12px; line-height: 1.5; overflow: auto;">${boxVds}</pre>
                            </div>
                            <div>
                                <div style="font-weight: 600; margin-bottom: 6px; color: #6b7280;">
                                    flux · vl-padding (geen surface-component)
                                </div>
                                <div
                                    class="vl-padding--medium"
                                    style="background: #eef1f5; border: 1px solid #cbd2d9; border-radius: 6px;"
                                >
                                    <strong>Kaart-titel</strong>
                                    <p style="margin: 6px 0 0;">
                                        Padding via flux' <code>vl-padding</code>; achtergrond/border/radius
                                        blijven eigen CSS (flux kent geen surface-component).
                                    </p>
                                </div>
                                <pre style="margin: 8px 0 0; padding: 10px 12px; background: #f6f8fa; border: 1px solid #e1e4e8; border-radius: 6px; font-size: 12px; line-height: 1.5; overflow: auto;">${boxFlux}</pre>
                            </div>
                        </div>

                        <vl-title type="h3">vl-inline — horizontale flex met token-gap</vl-title>
                        <p style="color: #555; font-size: 13px; margin: 4px 0 10px;">
                            Legt kinderen op een rij. Props: <code>gap</code> (token-schaal),
                            <code>align-block</code> (verticaal uitlijnen), <code>align-inline</code>
                            (horizontaal verdelen, bv. space-between), <code>wrap</code>,
                            <code>grow</code>, <code>reverse-order</code>. Voor knoppenrijen,
                            tag-lijsten en toolbars.
                        </p>
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; align-items: start; margin-bottom: 24px;">
                            <div>
                                <div style="font-weight: 600; margin-bottom: 6px; color: #0055cc;">
                                    VDS · vds-inline + vds-button
                                </div>
                                <div style="padding: 12px; border: 1px dashed #d0d7de; border-radius: 6px;">
                                    <vds-inline gap="m" align-block="center">
                                        <vds-button variant="primary">Opslaan</vds-button>
                                        <vds-button variant="secondary">Annuleren</vds-button>
                                    </vds-inline>
                                </div>
                                <pre style="margin: 8px 0 0; padding: 10px 12px; background: #f6f8fa; border: 1px solid #e1e4e8; border-radius: 6px; font-size: 12px; line-height: 1.5; overflow: auto;">${inlineVds}</pre>
                            </div>
                            <div>
                                <div style="font-weight: 600; margin-bottom: 6px; color: #0055cc;">
                                    flux · vl-group + flux-button
                                </div>
                                <div style="padding: 12px; border: 1px dashed #d0d7de; border-radius: 6px;">
                                    <div class="vl-group vl-group--align-center">
                                        <flux-button>Opslaan</flux-button>
                                        <flux-button secondary>Annuleren</flux-button>
                                    </div>
                                </div>
                                <pre style="margin: 8px 0 0; padding: 10px 12px; background: #f6f8fa; border: 1px solid #e1e4e8; border-radius: 6px; font-size: 12px; line-height: 1.5; overflow: auto;">${inlineFluxBtn}</pre>
                            </div>
                            <div>
                                <div style="font-weight: 600; margin-bottom: 6px; color: #6b7280;">
                                    vl · vl-group + vl-button (echte flux)
                                </div>
                                <div style="padding: 12px; border: 1px dashed #d0d7de; border-radius: 6px;">
                                    <div class="vl-group vl-group--align-center">
                                        <vl-button>Opslaan</vl-button>
                                        <vl-button secondary>Annuleren</vl-button>
                                    </div>
                                </div>
                                <pre style="margin: 8px 0 0; padding: 10px 12px; background: #f6f8fa; border: 1px solid #e1e4e8; border-radius: 6px; font-size: 12px; line-height: 1.5; overflow: auto;">${inlineFlux}</pre>
                            </div>
                        </div>

                        <vl-title type="h3">vl-stack — verticale flex met token-gap</vl-title>
                        <p style="color: #555; font-size: 13px; margin: 4px 0 10px;">
                            Stapelt kinderen verticaal. Props: <code>gap</code>,
                            <code>align-block</code> (verticaal verdelen), <code>align-inline</code>
                            (horizontaal uitlijnen), <code>grow</code>, <code>as</code>. Voor
                            form-rijen, kaartinhoud en verticale lijsten.
                        </p>
                        <p
                            style="max-width: 900px; margin: 0 0 12px; padding: 8px 12px; font-size: 12px;
                                   border-left: 3px solid #d9a441; background: #fffdf5; color: #6b5a1e;"
                        >
                            <b>Noot:</b> <code>vl-stacked</code> is
                            <code>display: flex; flex-direction: column</code>, dus met de flex-default
                            <code>align-items: stretch</code> rekken ALLE kinderen (zowel
                            <code>flux-button</code> als de echte <code>vl-button</code>) full-width, identiek.
                            Om ze te laten huggen zet je op de stack <code>align-items: flex-start</code>, wat
                            hier gebeurt zodat flux en vl gelijk staan (knoppen op natuurlijke breedte).
                        </p>
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; align-items: start; margin-bottom: 8px;">
                            <div>
                                <div style="font-weight: 600; margin-bottom: 6px; color: #0055cc;">
                                    VDS · vds-stack + vds-button
                                </div>
                                <div style="padding: 12px; border: 1px dashed #d0d7de; border-radius: 6px;">
                                    <vds-stack gap="s">
                                        <vds-button variant="primary">Eén</vds-button>
                                        <vds-button variant="secondary">Twee</vds-button>
                                        <vds-button variant="tertiary">Drie</vds-button>
                                    </vds-stack>
                                </div>
                                <pre style="margin: 8px 0 0; padding: 10px 12px; background: #f6f8fa; border: 1px solid #e1e4e8; border-radius: 6px; font-size: 12px; line-height: 1.5; overflow: auto;">${stackVds}</pre>
                            </div>
                            <div>
                                <div style="font-weight: 600; margin-bottom: 6px; color: #0055cc;">
                                    flux · vl-stacked + flux-button
                                </div>
                                <div style="padding: 12px; border: 1px dashed #d0d7de; border-radius: 6px;">
                                    <div class="vl-stacked vl-stacked-small" style="align-items: flex-start;">
                                        <flux-button>Eén</flux-button>
                                        <flux-button secondary>Twee</flux-button>
                                        <flux-button tertiary>Drie</flux-button>
                                    </div>
                                </div>
                                <pre style="margin: 8px 0 0; padding: 10px 12px; background: #f6f8fa; border: 1px solid #e1e4e8; border-radius: 6px; font-size: 12px; line-height: 1.5; overflow: auto;">${stackFluxBtn}</pre>
                            </div>
                            <div>
                                <div style="font-weight: 600; margin-bottom: 6px; color: #6b7280;">
                                    vl · vl-stacked + vl-button (echte flux)
                                </div>
                                <div style="padding: 12px; border: 1px dashed #d0d7de; border-radius: 6px;">
                                    <div class="vl-stacked vl-stacked-small" style="align-items: flex-start;">
                                        <vl-button>Eén</vl-button>
                                        <vl-button secondary>Twee</vl-button>
                                        <vl-button tertiary>Drie</vl-button>
                                    </div>
                                </div>
                                <pre style="margin: 8px 0 0; padding: 10px 12px; background: #f6f8fa; border: 1px solid #e1e4e8; border-radius: 6px; font-size: 12px; line-height: 1.5; overflow: auto;">${stackFlux}</pre>
                            </div>
                        </div>
                        ${this.gapsOff
                            ? nothing
                            : renderPatchNotes(patchesFor('flux-button'), html`de <code>flux-button</code> in deze layout`)}
                    </div>
                </section>

                <section class="vl-section" aria-label="Form in drie varianten">
                    <div class="vl-content-block vl-content-block--full-width">
                        <vl-title type="h2">Form in drie varianten (vds · flux · vl)</vl-title>
                        <p>
                            Dezelfde rijke form in drie smaken: links rauwe <code>vds-*</code> velden, in het
                            midden de <code>flux-*</code> doelproducten (erven de VDS-klasse + flux-tokens),
                            rechts de echte <code>vl-*</code> flux-web-componenten (<code>libs/components</code>).
                            Alle drie zijn een echte native <code>&lt;form&gt;</code>: de velden zijn
                            <code>formAssociated</code>, dus <code>new FormData(form)</code> leest de waarden via
                            <code>name</code>. Let op de structurele verschillen: vds/flux zetten label + melding
                            als props op het veld, terwijl de echte <code>vl-*</code> ze als aparte componenten
                            componeert (<code>vl-form-label for="id"</code>, <code>vl-form-message</code>). Vullen
                            en Verzenden gebeurt via de gedeelde <code>getFormValue</code>/<code>setFormValue</code>
                            utils die over de drie tag-families heen werken.
                        </p>
                        <div
                            style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; align-items: start; max-width: 1200px;"
                        >
                            <div>
                                <div style="font-weight: 600; margin-bottom: 8px; color: #0055cc;">
                                    vds-form · rauw VDS
                                </div>
                                <vds-form-demo></vds-form-demo>
                            </div>
                            <div>
                                <div style="font-weight: 600; margin-bottom: 8px; color: #0055cc;">
                                    flux-form · erft VDS + tokens
                                </div>
                                <flux-form-demo></flux-form-demo>
                            </div>
                            <div>
                                <div style="font-weight: 600; margin-bottom: 8px; color: #0055cc;">
                                    vl-form · echte flux
                                </div>
                                <vl-form-demo></vl-form-demo>
                            </div>
                        </div>
                        ${this.gapsOff
                            ? nothing
                            : renderPatchNotes(
                                  patchesFor(
                                      'fluxLook',
                                      'flux-button',
                                      'flux-input',
                                      'flux-select',
                                      'flux-checkbox',
                                      'flux-textarea',
                                      'flux-datepicker'
                                  ),
                                  html`de <code>flux-*</code> formvelden`
                              )}
                    </div>
                </section>

                ${this.renderIconShowcase()}
            </main>
        `;
    }

    protected updated(): void {
        const off = this.overridesOff;
        const sel =
            'flux-button, flux-input, flux-link, flux-datepicker, flux-select, flux-checkbox, flux-textarea, flux-fieldset, flux-radio-group';
        this.querySelectorAll(sel).forEach((el) => el.toggleAttribute('bare', off));
        const form = this.querySelector('flux-form-demo');
        form?.shadowRoot?.querySelectorAll(sel).forEach((el) => el.toggleAttribute('bare', off));
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }
}
