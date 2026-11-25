import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { VENTILUS_SOURCE } from '../../source/stories/catalogue-sources';
import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { ChartModel } from '../../models/chart.model';
import { VlChartLine } from '../vl-chart-line.component';
import { VlChartReference } from '../vl-chart-reference.component';
import { chartReferenceArgs, chartReferenceArgTypes } from './vl-chart-reference.stories-arg';
import chartReferenceDoc from './vl-chart-reference.stories-doc.mdx';

registerWebComponents([VlChartLine, VlChartReference]);

export default {
    id: 'data-visualisation-chart-reference',
    title: 'Widgets - Datavis/charts/chart-reference',
    tags: ['autodocs'],
    args: chartReferenceArgs,
    argTypes: chartReferenceArgTypes,
    parameters: {
        docs: {
            page: chartReferenceDoc,
        },
    },
} as Meta<typeof chartReferenceArgs>;

const HOUR_IN_MS = 60 * 60 * 1000;
const start = new Date(2025, 11, 1).getTime();
const fluxDensity = [0.21, 0.2, 0.19, 0.19, 0.2, 0.23, 0.27, 0.31, 0.33, 0.32, 0.3, 0.29];

/** Een halve dag van een ELF-meetpunt, elk uur: ruim onder de Vlaamse streefwaarde. */
const elfModel: ChartModel = {
    meta: {
        sources: [VENTILUS_SOURCE],
        x: { type: 'time' },
        y: { type: 'number', title: 'Magnetische fluxdichtheid', unit: 'µT' },
    },
    series: [
        {
            name: 'Meetpunt Beringen',
            x: Float64Array.from(fluxDensity, (_, hour) => start + hour * HOUR_IN_MS),
            y: Float64Array.from(fluxDensity),
        },
    ],
};

export const ChartReferenceDefault = story(
    chartReferenceArgs,
    ({ customCSS, value, label, inView }) => html`
        <vl-chart-line .data=${elfModel}>
            <vl-chart-reference
                custom-css=${customCSS}
                value=${value}
                label=${label}
                ?in-view=${inView}
            ></vl-chart-reference>
        </vl-chart-line>
    `,
);
ChartReferenceDefault.storyName = 'vl-chart-reference - default';
ChartReferenceDefault.args = {
    value: 0.4,
    label: 'Vlaamse streefwaarde',
    inView: true,
};

export const ChartReferenceFarAway = story(
    chartReferenceArgs,
    () => html`
        <vl-chart-line .data=${elfModel}>
            <vl-chart-reference value="0.4" label="Vlaamse streefwaarde" in-view></vl-chart-reference>
            <vl-chart-reference value="100" label="EU-referentieniveau"></vl-chart-reference>
        </vl-chart-line>
    `,
);
ChartReferenceFarAway.storyName = 'vl-chart-reference - ver boven de data';
ChartReferenceFarAway.parameters = { controls: { disable: true } };
