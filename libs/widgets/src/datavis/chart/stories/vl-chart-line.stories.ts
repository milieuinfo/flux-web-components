import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { VLOPS_NH3_SOURCE } from '../../source/stories/catalogue-sources';
import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { VlDataChangeEventDetail } from '../../events/data-change.event';
import type { ChartModel, ChartSeries } from '../../models/chart.model';
import { VlChartLine } from '../vl-chart-line.component';
import { chartLineArgs, chartLineArgTypes } from './vl-chart-line.stories-arg';
import chartLineDoc from './vl-chart-line.stories-doc.mdx';

registerWebComponents([VlChartLine]);

const years = Float64Array.from([2018, 2019, 2020, 2021, 2022, 2023, 2024]);

const buildSeries = (name: string, y: number[]): ChartSeries => ({ name, x: years, y: Float64Array.from(y) });

const buildModel = (series: ChartSeries[], meta: Partial<ChartModel['meta']> = {}): ChartModel => ({
    meta: {
        sources: [VLOPS_NH3_SOURCE],
        isOpenData: true,
        x: { type: 'number', title: 'Jaar' },
        y: { type: 'number', title: 'Concentratie', unit: 'µg/m³' },
        ...meta,
    },
    series,
});

const gent = buildSeries('Meetpunt Gent', [12.5, 13.1, 12.8, 11.9, 11.2, 10.8, 10.1]);
const antwerpen = buildSeries('Meetpunt Antwerpen', [15.2, 14.7, 14.9, 13.8, 13.1, 12.6, 12.2]);

export default {
    id: 'data-visualisation-chart-line',
    title: 'Widgets - Datavis/charts/chart-line',
    tags: ['autodocs'],
    args: chartLineArgs,
    argTypes: chartLineArgTypes,
    parameters: {
        docs: {
            page: chartLineDoc,
        },
    },
} as Meta<typeof chartLineArgs>;

const Template = story(
    chartLineArgs,
    ({ data, onDataChange }) => html`
        <vl-chart-line
            .data=${data}
            @vl-data-change=${(event: CustomEvent<VlDataChangeEventDetail>) => onDataChange(event.detail)}
        ></vl-chart-line>
    `,
);

export const ChartLineDefault = Template.bind({});
ChartLineDefault.storyName = 'vl-chart-line - default';
ChartLineDefault.args = {
    data: buildModel([gent, antwerpen]),
};

/** Zonder `.data` en zonder `vl-data-source` blijft de grafiek laden. */
export const ChartLineLoading = Template.bind({});
ChartLineLoading.storyName = 'vl-chart-line - laden';
ChartLineLoading.args = {
    data: undefined,
};

/** Een onderbreking maakt de toestand `partial`. */
export const ChartLineGap = Template.bind({});
ChartLineGap.storyName = 'vl-chart-line - met een onderbreking';
ChartLineGap.args = {
    data: buildModel([buildSeries('Meetpunt Gent', [12.5, 13.1, NaN, NaN, 11.2, 10.8, 10.1]), antwerpen]),
};

export const ChartLineEmpty = Template.bind({});
ChartLineEmpty.storyName = 'vl-chart-line - geen gegevens';
ChartLineEmpty.args = {
    data: buildModel([]),
};

export const ChartLineError = Template.bind({});
ChartLineError.storyName = 'vl-chart-line - fout';
ChartLineError.args = {
    data: buildModel([gent], { sources: [] }),
};
