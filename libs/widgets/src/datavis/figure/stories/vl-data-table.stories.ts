import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { VlChartLine } from '../../chart/vl-chart-line.component';
import { twoSeriesModel } from './figure-story-data';
import { VlDataFigure } from '../vl-data-figure.component';
import { VlDataTable } from '../vl-data-table.component';
import { dataTableArgs, dataTableArgTypes } from './vl-data-table.stories-arg';
import dataTableDoc from './vl-data-table.stories-doc.mdx';

registerWebComponents([VlDataFigure, VlDataTable, VlChartLine]);

export default {
    id: 'data-visualisation-data-table',
    title: 'Widgets - Datavis/figure/data-table',
    tags: ['autodocs'],
    args: dataTableArgs,
    argTypes: dataTableArgTypes,
    parameters: {
        docs: {
            page: dataTableDoc,
        },
    },
} as Meta<typeof dataTableArgs>;

const DataTableTemplate = story(
    dataTableArgs,
    ({ rowsPerPage, customCSS }) => html`
        <vl-data-figure>
            <vl-chart-line .data=${twoSeriesModel}></vl-chart-line>
            <vl-data-table rows-per-page=${rowsPerPage} custom-css=${customCSS}></vl-data-table>
        </vl-data-figure>
    `,
);

export const DataTableDefault = DataTableTemplate.bind({});
DataTableDefault.storyName = 'vl-data-table - default';

export const DataTableWithPager = DataTableTemplate.bind({});
DataTableWithPager.storyName = 'vl-data-table - met pager';
DataTableWithPager.args = {
    rowsPerPage: 3,
};
