import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import type { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlChartLine } from '../../chart/vl-chart-line.component';
import { catalogueSourceModel, unitInfoModel } from './figure-story-data';
import { VlDataFigure } from '../vl-data-figure.component';
import { VlDataAbout } from '../vl-data-about.component';
import { dataAboutArgs, dataAboutArgTypes } from './vl-data-about.stories-arg';
import dataAboutDoc from './vl-data-about.stories-doc.mdx';

registerWebComponents([VlDataFigure, VlDataAbout, VlChartLine]);

export default {
    id: 'data-visualisation-data-about',
    title: 'Widgets - Datavis/figure/data-about',
    tags: ['autodocs'],
    args: dataAboutArgs,
    argTypes: dataAboutArgTypes,
    parameters: {
        docs: {
            page: dataAboutDoc,
        },
    },
} as Meta<typeof dataAboutArgs>;

export const DataAboutDefault = story(
    dataAboutArgs,
    ({ customCSS, defaultSlot }) => html`
        <vl-data-figure headline="In Gent en Antwerpen daalt de concentratie sinds 2020">
            <vl-chart-line .data=${unitInfoModel}></vl-chart-line>
            <vl-data-about custom-css=${customCSS}>${unsafeHTML(defaultSlot)}</vl-data-about>
        </vl-data-figure>
    `,
);
DataAboutDefault.storyName = 'vl-data-about - default';
DataAboutDefault.args = {
    defaultSlot: '<p>De meetpunten staan langs drukke wegen; ze tonen dus de hoogste concentraties in de stad.</p>',
};

export const DataAboutCatalogue = story(
    dataAboutArgs,
    ({ customCSS }) => html`
        <vl-data-figure
            headline="NH3-concentratie in Gent en Antwerpen"
            subtitle="Met twee bronnen uit de metadatacatalogus"
        >
            <vl-chart-line .data=${catalogueSourceModel}></vl-chart-line>
            <vl-data-about custom-css=${customCSS}></vl-data-about>
        </vl-data-figure>
    `,
);
DataAboutCatalogue.storyName = 'vl-data-about - twee bronnen';
