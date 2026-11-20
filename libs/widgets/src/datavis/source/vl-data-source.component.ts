import { BaseLitElement, webComponent } from '@domg-wc/common';
import { ContextProvider } from '@lit/context';
import { CSSResult, html, PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { PERIOD_CHANGE_EVENT } from '../events/period-change.event';
import type { ChartModel, DataState } from '../models/chart.model';
import { classifyDataState } from '../models/classify-data-state';
import { parseChartModelJson } from './chart-model-json';
import { parsePeriodDuration, parsePeriodEnd, toPeriodRange, type Period, type PeriodRange } from './period';
import { buildRequestUrl } from './request-url';
import { dataSourceDefaults } from './vl-data-source.defaults';
import {
    buildSensorThingsDescriptionUrl,
    buildSensorThingsUrl,
    findMeasurements,
    findNextSensorThingsPage,
    findObservationsUrl,
    readSensorThings,
} from './sensorthings';
import { sourceContext, type SourceState } from './source-context';
import { vlDataSourceFluxStyles } from './vl-data-source.flux-css';

export type SourceFormat = 'sample-data' | 'sensorthings';

/**
 * Haalt de data van één bron op voor één periode en deelt ze met de figuren en grafieken erin.
 *
 * @slot - Plaats hier een of meer vl-data-figure componenten.
 */
@webComponent('vl-data-source')
export class VlDataSource extends BaseLitElement {
    static get styles(): CSSResult[] {
        return [vlDataSourceFluxStyles];
    }

    // --- attributes
    /** De URL van de data. */
    @property() src = dataSourceDefaults.src;
    /** De lengte van de periode: `24h`, `7d`, `30d` of `1y`. */
    @property() period = dataSourceDefaults.period;
    /** De laatste dag van de periode, als "2026-08-28"; default vandaag. */
    @property() end = dataSourceDefaults.end;
    @property() format: SourceFormat = dataSourceDefaults.format;

    // --- states and fields
    #provider = new ContextProvider(this, {
        context: sourceContext,
        initialValue: { dataState: { status: 'loading' }, period: this.#readPeriod() },
    });
    #request: AbortController | null = null;
    #once = new Map<string, Promise<string>>();

    constructor() {
        super();
        // `vl-data-period` vraagt een andere periode; het event bubbelt tot hier.
        this.addEventListener(PERIOD_CHANGE_EVENT, (event) => this.#load(event.detail));
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.#request?.abort();
    }

    protected updated(changed: PropertyValues<this>): void {
        if (changed.has('period') || changed.has('end')) {
            this.#load(this.#readPeriod());
        } else if (changed.has('src') || changed.has('format')) {
            // Een andere bron houdt de periode die de gebruiker koos.
            this.#once.clear();
            this.#load(this.#provider.value.period);
        }
    }

    render(): TemplateResult {
        return html`<slot></slot>`;
    }

    #readPeriod(): Period {
        return { duration: parsePeriodDuration(this.period), end: parsePeriodEnd(this.end, new Date()) };
    }

    async #load(period: Period): Promise<void> {
        this.#request?.abort();
        if (!this.src) return;
        const request = new AbortController();
        this.#request = request;
        this.#shareSourceState({ dataState: { status: 'loading' }, period });
        try {
            const model = await this.#fetchModel(toPeriodRange(period), request.signal);
            if (!request.signal.aborted) this.#shareSourceState({ dataState: classifyDataState(model), period });
        } catch (error) {
            if (request.signal.aborted) return;
            const problem = error instanceof Error ? error.message : String(error);
            this.#shareSourceState({ dataState: { status: 'error', problems: [problem] } satisfies DataState, period });
        }
    }

    async #fetchModel(range: PeriodRange, signal: AbortSignal): Promise<ChartModel> {
        if (this.format === 'sensorthings') return this.#fetchSensorThings(range, signal);
        return parseChartModelJson(await fetchJson(buildRequestUrl(this.src, range), signal));
    }

    async #fetchSensorThings(range: PeriodRange, signal: AbortSignal): Promise<ChartModel> {
        const measurements = findMeasurements(
            JSON.parse(await this.#fetchOnce(buildSensorThingsDescriptionUrl(this.src))),
        );
        const pages = await Promise.all(
            measurements.map((datastream) =>
                fetchPages(buildSensorThingsUrl(findObservationsUrl(datastream), range), signal),
            ),
        );
        return readSensorThings(measurements, pages);
    }

    #fetchOnce(url: string): Promise<string> {
        let answer = this.#once.get(url);
        if (!answer) {
            answer = fetchText(url);
            this.#once.set(url, answer);
            // Mislukt het, dan probeert de volgende periode opnieuw.
            answer.catch(() => {
                if (this.#once.get(url) === answer) this.#once.delete(url);
            });
        }
        return answer;
    }

    #shareSourceState(state: SourceState): void {
        this.#provider.setValue(state);
    }
}

async function fetchText(url: string, signal?: AbortSignal): Promise<string> {
    const response = await fetch(url, { signal });
    if (!response.ok) throw new Error(`De bron antwoordde met status ${response.status}.`);
    return response.text();
}

async function fetchJson(url: string, signal?: AbortSignal): Promise<unknown> {
    return JSON.parse(await fetchText(url, signal));
}

/** Alle pagina's van een SensorThings-lijst. */
async function fetchPages(url: string, signal: AbortSignal): Promise<unknown[]> {
    const pages: unknown[] = [];
    for (let next: string | null = url; next; next = findNextSensorThingsPage(pages[pages.length - 1])) {
        pages.push(await fetchJson(next, signal));
    }
    return pages;
}
