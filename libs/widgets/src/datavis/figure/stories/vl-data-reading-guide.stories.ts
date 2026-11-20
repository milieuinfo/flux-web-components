import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlChartLine } from '../../chart/vl-chart-line.component';
import { twoSeriesModel } from './figure-story-data';
import { VlDataFigure } from '../vl-data-figure.component';
import { VlDataReadingGuide } from '../vl-data-reading-guide.component';
import { dataReadingGuideArgs, dataReadingGuideArgTypes } from './vl-data-reading-guide.stories-arg';
import dataReadingGuideDoc from './vl-data-reading-guide.stories-doc.mdx';

registerWebComponents([VlDataFigure, VlDataReadingGuide, VlChartLine]);

export default {
    id: 'data-visualisation-data-reading-guide',
    title: 'Data visualisation/figure/data-reading-guide',
    tags: ['autodocs'],
    args: dataReadingGuideArgs,
    argTypes: dataReadingGuideArgTypes,
    parameters: {
        docs: {
            page: dataReadingGuideDoc,
        },
    },
} as Meta<typeof dataReadingGuideArgs>;

export const DataReadingGuideDefault = story(
    dataReadingGuideArgs,
    ({ customCSS, defaultSlot }) => html`
        <vl-data-figure headline="In Gent en Antwerpen daalt de concentratie sinds 2020">
            <vl-chart-line .data=${twoSeriesModel}></vl-chart-line>
            <vl-data-reading-guide custom-css=${customCSS}>${unsafeHTML(defaultSlot)}</vl-data-reading-guide>
        </vl-data-figure>
    `,
);
DataReadingGuideDefault.storyName = 'vl-data-reading-guide - default';
DataReadingGuideDefault.args = {
    defaultSlot: '<p>Elke lijn is een meetpunt. Hoe hoger de lijn, hoe meer stof er dat jaar in de lucht zat.</p>',
};
