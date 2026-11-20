import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { VlChartLine } from '../../chart/vl-chart-line.component';
import { twoSeriesModel } from './figure-story-data';
import { VlDataFigure } from '../vl-data-figure.component';
import { VlDataControls } from '../vl-data-controls.component';
import { VlDataDownload } from '../vl-data-download.component';
import { dataDownloadArgs, dataDownloadArgTypes } from './vl-data-download.stories-arg';
import dataDownloadDoc from './vl-data-download.stories-doc.mdx';

registerWebComponents([VlDataFigure, VlDataControls, VlDataDownload, VlChartLine]);

export default {
    id: 'data-visualisation-data-download',
    title: 'Widgets - Datavis/figure/data-download',
    tags: ['autodocs'],
    args: dataDownloadArgs,
    argTypes: dataDownloadArgTypes,
    parameters: {
        docs: {
            page: dataDownloadDoc,
        },
    },
} as Meta<typeof dataDownloadArgs>;

// In een eigen rij, anders staat de PNG-knop van de standaardrij ernaast.
const Template = story(
    dataDownloadArgs,
    ({ customCSS, format, showLabel }) => html`
        <vl-data-figure headline="In Gent en Antwerpen daalt de concentratie sinds 2020">
            <vl-data-controls>
                <vl-data-download custom-css=${customCSS} format=${format} ?show-label=${showLabel}></vl-data-download>
            </vl-data-controls>
            <vl-chart-line .data=${twoSeriesModel}></vl-chart-line>
        </vl-data-figure>
    `,
);

export const DataDownloadDefault = Template.bind({});
DataDownloadDefault.storyName = 'vl-data-download - default';

export const DataDownloadCsv = Template.bind({});
DataDownloadCsv.storyName = 'vl-data-download - csv';
DataDownloadCsv.args = {
    format: 'csv',
};

export const DataDownloadShowLabel = Template.bind({});
DataDownloadShowLabel.storyName = 'vl-data-download - met tekst';
DataDownloadShowLabel.args = {
    showLabel: true,
};
