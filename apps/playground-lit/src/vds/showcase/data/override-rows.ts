import { html, TemplateResult } from 'lit';

export type OverrideRow = { c: string; o: string; v: string; cat: 'token' | 'workaround' | 'rem'; up: string };

// Alle consument-side overrides die we op de flux-* componenten zetten om de
// flux-look (== de echte vl-*) te bereiken, afwijkend van rauw VDS. Gedeeld door
// de globale lijst (één accordion) én de per-voorbeeld patch-notities.
export const OVERRIDE_ROWS: OverrideRow[] = [
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

export const overrideBadge = (cat: OverrideRow['cat']): TemplateResult => {
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

export const catCountLabel = (rs: OverrideRow[]): string => {
    const t = rs.filter((r) => r.cat === 'token').length;
    const w = rs.filter((r) => r.cat === 'workaround').length;
    const m = rs.filter((r) => r.cat === 'rem').length;
    const parts: string[] = [];
    if (t) parts.push(`${t} token`);
    if (w) parts.push(`${w} workaround`);
    if (m) parts.push(`${m} rem-brug`);
    return parts.join(' · ');
};

export const patchesFor = (...keys: string[]): OverrideRow[] =>
    OVERRIDE_ROWS.filter((r) =>
        keys.some((k) => (k === 'fluxLook' ? r.c.startsWith('alle form-controls') : r.c === k))
    );

// Compacte, herhaalbare patch-lijst onder een visueel voorbeeld: wat we op de
// flux-variant zetten om ze op de echte vl-* te doen lijken (afwijkend van rauw VDS).
export const renderPatchNotes = (rows: OverrideRow[], subject: TemplateResult | string): TemplateResult => {
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
