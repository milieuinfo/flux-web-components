import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { VlChartLine } from '../../chart/vl-chart-line.component';
import { VlDataFigure } from '../../figure/vl-data-figure.component';
import { VlDataPeriod } from '../vl-data-period.component';
import { VlDataSource } from '../vl-data-source.component';
import { ELF_SENSORTHINGS_END, ELF_SENSORTHINGS_SRC, ELF_SRC, elfHandlers } from './elf-story-data';
import { dataSourceArgs, dataSourceArgTypes } from './vl-data-source.stories-arg';
import dataSourceDoc from './vl-data-source.stories-doc.mdx';

registerWebComponents([VlDataSource, VlDataPeriod, VlDataFigure, VlChartLine]);

export default {
    id: 'data-visualisation-data-source',
    title: 'Data visualisation/source/data-source',
    tags: ['autodocs'],
    args: dataSourceArgs,
    argTypes: dataSourceArgTypes,
    parameters: {
        msw: { handlers: elfHandlers },
        docs: {
            page: dataSourceDoc,
        },
    },
} as Meta<typeof dataSourceArgs>;

// De mock-SensorThings API antwoordt met de voorbeelddata van Beringen, voor elke periode dezelfde.
export const DataSourceDefault = story(
    dataSourceArgs,
    ({ customCSS, format, src, period, end }) => html`
        <vl-data-source custom-css=${customCSS} format=${format} src=${src} period=${period} end=${end}>
            <vl-data-figure headline="Magnetische fluxdichtheid" subtitle="Meetpunt Beringen, sensor SENS-269">
                <vl-chart-line></vl-chart-line>
            </vl-data-figure>
        </vl-data-source>
    `,
);
DataSourceDefault.storyName = 'vl-data-source - sensorplatform (sensorthings)';
DataSourceDefault.args = { src: ELF_SENSORTHINGS_SRC, end: ELF_SENSORTHINGS_END };

// De mock-API antwoordt met het ChartModel in JSON, per periode: hier kies je echt een andere periode.
export const DataSourceSampleData = story(
    dataSourceArgs,
    ({ customCSS, format, src, period, end }) => html`
        <vl-data-source custom-css=${customCSS} format=${format} src=${src} period=${period} end=${end}>
            <vl-data-figure headline="Magnetische veldsterkte" subtitle="Temse, sensor ELF_L_0004, 380 kV">
                <vl-data-period></vl-data-period>
                <vl-chart-line></vl-chart-line>
            </vl-data-figure>
        </vl-data-source>
    `,
);
DataSourceSampleData.storyName = 'vl-data-source - voorbeelddata (sample-data)';
DataSourceSampleData.args = { format: 'sample-data', src: ELF_SRC };
