import { BaseLitElement, webComponent } from '@domg-wc/common';
import { ContextConsumer } from '@lit/context';
import { CSSResult, nothing, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { findModel } from '../models/chart.model';
import { figureContext } from './figure-context';
import { renderControlButton } from './control-button';
import { controlStyles, findControlVisibility } from './control-visibility';
import { buildCsv } from './csv';
import { buildFileName, downloadFile } from './download-file';
import { dataDownloadDefaults } from './vl-data-download.defaults';

export type DownloadFormat = 'png' | 'csv';

const LABELS: Record<DownloadFormat, string> = {
    png: 'Download grafiek (PNG)',
    csv: 'Download cijfers (CSV)',
};

const ICONS: Record<DownloadFormat, string> = {
    png: 'file-download',
    csv: 'data-download',
};

/**
 * Bewaart de grafiek van de figuur als PNG of de cijfers als CSV. De bestandsnaam komt van de `headline` van de figuur.
 */
@webComponent('vl-data-download')
export class VlDataDownload extends BaseLitElement {
    static get styles(): CSSResult[] {
        return [controlStyles];
    }

    // --- attributes
    @property() format: DownloadFormat = dataDownloadDefaults.format;
    @property({ type: Boolean, attribute: 'show-label' }) showLabel = dataDownloadDefaults.showLabel;

    // --- states and fields
    #figure = new ContextConsumer(this, { context: figureContext, subscribe: true });

    render(): TemplateResult | typeof nothing {
        const figure = this.#figure.value;
        if (!figure) return nothing;
        const visibility = findControlVisibility(figure.dataState);
        return renderControlButton({
            icon: ICONS[this.format] ?? ICONS.png,
            label: LABELS[this.format] ?? LABELS.png,
            visibility,
            showsLabel: this.showLabel,
            onClick: () => this.#onDownload(),
        });
    }

    async #onDownload(): Promise<void> {
        const figure = this.#figure.value;
        if (!figure) return;
        const model = findModel(figure.dataState);
        if (!model) return;
        const fileName = buildFileName(figure.headline);
        if (this.format === 'csv') {
            const csv = new Blob([buildCsv(model)], { type: 'text/csv;charset=utf-8' });
            downloadFile(csv, `${fileName}.csv`);
            return;
        }
        const png = await figure.visual?.buildPng(figure.headline);
        if (png) downloadFile(png, `${fileName}.png`);
    }
}
