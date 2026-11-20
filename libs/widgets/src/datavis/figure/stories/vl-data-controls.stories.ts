import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlChartLine } from '../../chart/vl-chart-line.component';
import { twoSeriesModel } from './figure-story-data';
import { VlDataFigure } from '../vl-data-figure.component';
import { VlDataControls } from '../vl-data-controls.component';
import { VlDataDownload } from '../vl-data-download.component';
import { VlDataFullscreen } from '../vl-data-fullscreen.component';
import { dataControlsArgs, dataControlsArgTypes } from './vl-data-controls.stories-arg';
import dataControlsDoc from './vl-data-controls.stories-doc.mdx';

registerWebComponents([VlDataFigure, VlDataControls, VlDataDownload, VlDataFullscreen, VlChartLine]);

export default {
    id: 'data-visualisation-data-controls',
    title: 'Data visualisation/figure/data-controls',
    tags: ['autodocs'],
    args: dataControlsArgs,
    argTypes: dataControlsArgTypes,
    parameters: {
        docs: {
            page: dataControlsDoc,
        },
    },
} as Meta<typeof dataControlsArgs>;

const Template = story(
    dataControlsArgs,
    ({ customCSS, defaultSlot }) => html`
        <vl-data-figure headline="In Gent en Antwerpen daalt de concentratie sinds 2020">
            <vl-data-controls custom-css=${customCSS}>${unsafeHTML(defaultSlot)}</vl-data-controls>
            <vl-chart-line .data=${twoSeriesModel}></vl-chart-line>
        </vl-data-figure>
    `,
);

export const DataControlsDefault = Template.bind({});
DataControlsDefault.storyName = 'vl-data-controls - default';
DataControlsDefault.args = {
    defaultSlot:
        '<vl-data-fullscreen></vl-data-fullscreen>' +
        '<vl-data-download format="png"></vl-data-download>' +
        '<vl-data-download format="csv"></vl-data-download>',
};
