import { html, nothing, type TemplateResult } from 'lit';
import { findSourceHref, isOpenData, nameSource, type ChartMeta, type ChartSource } from '../models/chart.model';

// consts worden ook gebruikt door de PNG-export functies.
export const SOURCE_LABELS = { one: 'Bron:', many: 'Bronnen:' };
export const OPEN_DATA_LABEL = 'Vlaamse Open Data';
export const OPEN_DATA_HREF = 'https://www.vlaanderen.be/digitaal-vlaanderen/onze-diensten-en-platformen/open-data';

export function renderSourceRow(meta: ChartMeta | undefined): TemplateResult | typeof nothing {
    if (!meta) return nothing;
    return html`<div class="source-row">
        <div class="source">
            <vl-text annotation small>${labelSources(meta.sources)}</vl-text>
            <ul class="source-list">
                ${meta.sources.map(renderSourceItem)}
            </ul>
        </div>
        ${isOpenData(meta) ? renderOpenDataMark() : nothing}
    </div>`;
}

export function labelSources(sources: ChartSource[]): string {
    return sources.length === 1 ? SOURCE_LABELS.one : SOURCE_LABELS.many;
}

/** Per bron: de titel als link naar de metadata, de eigenaar eronder tonen. */
function renderSourceItem(source: ChartSource): TemplateResult {
    const href = findSourceHref(source);
    const name = nameSource(source);
    const title = href ? html`<vl-link href=${href} external small>${name}</vl-link>` : name;
    return html`<li>
        <vl-text annotation small>${title}</vl-text>
        ${source.owner ? html`<vl-text class="source-owner" annotation small>${source.owner}</vl-text>` : nothing}
    </li>`;
}

/** vl-link bewust niet gebruik, in plaats daarvan gewone <a> tag om als
 *  grijze variant zonder linkstijl weer te geven. */
function renderOpenDataMark(): TemplateResult {
    return html`<p class="open-data-mark">
        <a href=${OPEN_DATA_HREF}>
            <vl-text annotation small><vl-icon icon="vlaanderen" right-margin></vl-icon>${OPEN_DATA_LABEL}</vl-text>
        </a>
    </p>`;
}
