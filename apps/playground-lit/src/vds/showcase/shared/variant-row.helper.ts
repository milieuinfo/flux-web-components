import { html, nothing, TemplateResult } from 'lit';

import { OverrideRow, renderPatchNotes } from '../data/override-rows';
import { renderApiDetailAccordion } from '../data/api-detail-rows';
import { renderFixCallout, UpstreamFix } from '../data/upstream-fix-rows';

export type VariantRow = {
    name: string;
    vds: TemplateResult;
    flux: TemplateResult;
    vl: TemplateResult;
    patches?: OverrideRow[];
    fixes?: UpstreamFix[];
    fluxTag?: string;
    detailKey?: string;
    colRatio?: string;
    gapsOff: boolean;
};

export const note = (text: string): TemplateResult =>
    html`<span style="font-size: 12px; color: #6b7280;">${text}</span>`;

const cell = (label: string, color: string, content: TemplateResult): TemplateResult => html`
    <div style="border: 1px dashed #d0d7de; border-radius: 6px; padding: 12px; min-width: 0;">
        <div style="font-size: 12px; color: ${color}; margin-bottom: 8px; font-weight: 600;">${label}</div>
        <div style="display: flex; flex-direction: column; gap: 6px; align-items: flex-start;">${content}</div>
    </div>
`;

export const renderVariantRow = ({
    name,
    vds,
    flux,
    vl,
    patches,
    fixes = [],
    fluxTag = `flux-${name}`,
    detailKey = `vl-${name}`,
    colRatio = 'repeat(3, minmax(0, 1fr))',
    gapsOff,
}: VariantRow): TemplateResult => html`
    <div style="font-weight: 600; margin: 6px 0;">${name}</div>
    <div style="display: grid; grid-template-columns: ${colRatio}; gap: 12px; max-width: 960px; margin-bottom: 8px;">
        ${cell('vds · rauw VDS', '#0055cc', vds)} ${cell('flux · erft VDS + tokens', '#0055cc', flux)}
        ${cell('vl · echte flux', '#6b7280', vl)}
    </div>
    ${gapsOff
        ? nothing
        : html`${renderFixCallout(fixes)}
          ${patches && patches.length ? renderPatchNotes(patches, html`<code>${fluxTag}</code>`) : ''}
          ${renderApiDetailAccordion(detailKey)}`}
`;
