import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { VlAccordionComponent, VlPagerComponent, VlTableComponent } from '@domg-wc/components/block';
import { ContextConsumer } from '@lit/context';
import { CSSResult, html, nothing, PropertyValues, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { VlDataDownload } from './vl-data-download.component';
import { explanationStyles } from './explanation.flux-css';
import { findModel, type ChartModel } from '../models/chart.model';
import { figureContext } from './figure-context';
import { joinFigureZone } from './figure-zones';
import { buildDataTable, type DataTable } from './data-table';
import { dataTableDefaults } from './vl-data-table.defaults';
import { vlDataTableFluxStyles } from './vl-data-table.flux-css';

registerWebComponents([VlAccordionComponent, VlDataDownload, VlPagerComponent, VlTableComponent]);

const TOGGLE_TEXT = 'Bekijk de cijfers';
const GAP_NOTE = 'Een lege cel betekent: geen gegevens.';

/**
 * De cijfers van de grafiek als tabel: het tekstalternatief, dat vl-data-figure altijd toevoegt.
 */
@webComponent('vl-data-table')
export class VlDataTable extends BaseLitElement {
    static get styles(): CSSResult[] {
        return [explanationStyles, vlDataTableFluxStyles];
    }

    // --- attributes
    @property({ type: Number, attribute: 'rows-per-page' }) rowsPerPage = dataTableDefaults.rowsPerPage;

    // --- states and fields
    @state() private page = 1;
    #figure = new ContextConsumer(this, { context: figureContext, subscribe: true });
    #model: ChartModel | null = null;

    connectedCallback(): void {
        super.connectedCallback();
        joinFigureZone(this, 'explanations');
    }

    protected willUpdate(changed: PropertyValues<this>): void {
        const model = findModel(this.#figure.value?.dataState);
        if (model !== this.#model || changed.has('rowsPerPage')) this.page = 1;
        this.#model = model;
    }

    render(): TemplateResult | typeof nothing {
        if (!this.#model) return nothing;
        const table = buildDataTable(this.#model);
        return html`<vl-accordion class="explanation" toggle-text=${TOGGLE_TEXT} content-padding="none">
            <vl-data-download slot="menu" format="csv" show-label></vl-data-download>
            ${table.hasGaps ? html`<p class="gap-note">${GAP_NOTE}</p>` : nothing} ${this.#renderTable(table)}
            ${this.#renderPager(table.rows.length)}
        </vl-accordion>`;
    }

    #renderTable(table: DataTable): TemplateResult {
        return html`<vl-table matrix>
            <table>
                <caption>
                    ${table.caption}
                </caption>
                <thead>
                    <tr>
                        <th scope="col">${table.rowHeaderTitle}</th>
                        ${table.columns.map((name) => html`<th scope="col" class="numeric">${name}</th>`)}
                    </tr>
                </thead>
                <tbody>
                    ${this.#rowsOnPage(table).map(
                        (row) =>
                            html`<tr>
                                <th scope="row">${row.header}</th>
                                ${row.cells.map((cell) => html`<td class="numeric">${cell}</td>`)}
                            </tr>`,
                    )}
                </tbody>
            </table>
        </vl-table>`;
    }

    get #rowsPerPage(): number {
        return Math.max(1, Math.floor(this.rowsPerPage) || dataTableDefaults.rowsPerPage);
    }

    #rowsOnPage(table: DataTable): DataTable['rows'] {
        const start = (this.page - 1) * this.#rowsPerPage;
        return table.rows.slice(start, start + this.#rowsPerPage);
    }

    #renderPager(rowCount: number): TemplateResult | typeof nothing {
        if (rowCount <= this.#rowsPerPage) return nothing;
        return html`<vl-pager
            class="pager"
            total-items=${rowCount}
            items-per-page=${this.#rowsPerPage}
            current-page=${this.page}
            @change=${(event: CustomEvent<{ currentPage: number }>) => (this.page = event.detail.currentPage)}
        ></vl-pager>`;
    }
}
