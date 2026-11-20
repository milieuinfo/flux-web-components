import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { VlChartLine } from '../../chart/vl-chart-line.component';
import { twoSeriesModel } from './figure-story-data';
import { VlDataFigure } from '../vl-data-figure.component';
import { VlDataControls } from '../vl-data-controls.component';
import { VlDataFullscreen } from '../vl-data-fullscreen.component';
import { dataFullscreenArgs, dataFullscreenArgTypes } from './vl-data-fullscreen.stories-arg';
import dataFullscreenDoc from './vl-data-fullscreen.stories-doc.mdx';

registerWebComponents([VlDataFigure, VlDataControls, VlDataFullscreen, VlChartLine]);

export default {
    id: 'data-visualisation-data-fullscreen',
    title: 'Data visualisation/figure/data-fullscreen',
    tags: ['autodocs'],
    args: dataFullscreenArgs,
    argTypes: dataFullscreenArgTypes,
    parameters: {
        docs: {
            page: dataFullscreenDoc,
        },
    },
} as Meta<typeof dataFullscreenArgs>;

// In een eigen rij, anders staat de knop van de standaardrij ernaast.
export const DataFullscreenDefault = story(
    dataFullscreenArgs,
    ({ customCSS, showLabel }) => html`
        <vl-data-figure headline="In Gent en Antwerpen daalt de concentratie sinds 2020">
            <vl-data-controls>
                <vl-data-fullscreen custom-css=${customCSS} ?show-label=${showLabel}></vl-data-fullscreen>
            </vl-data-controls>
            <vl-chart-line .data=${twoSeriesModel}></vl-chart-line>
        </vl-data-figure>
    `,
);
DataFullscreenDefault.storyName = 'vl-data-fullscreen - default';
