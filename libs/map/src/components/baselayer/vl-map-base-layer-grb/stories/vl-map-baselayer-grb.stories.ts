import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../../../../vl-map';
import { mapBaselayerArgs, mapBaselayerArgTypes } from '../../stories/vl-map-baselayer.stories-arg';
import '../vl-map-base-layer-grb';
import mapBaselayerGrbDoc from './vl-map-baselayer-grb.stories-doc.mdx';

export default {
    id: 'map-baselayer-baselayer-grb',
    title: 'map/baselayer/baselayer-grb',
    tags: ['autodocs'],
    args: mapBaselayerArgs,
    argTypes: mapBaselayerArgTypes,
    parameters: {
        docs: {
            page: mapBaselayerGrbDoc,
        },
        controls: {
            hideNoControlsWarning: true,
        },
    },
} as Meta<typeof mapBaselayerArgs>;

export const MapBaselayerGrbDefault = story(
    {},
    () => html`
        <vl-map>
            <vl-map-baselayer-grb></vl-map-baselayer-grb>
        </vl-map>
    `
);
MapBaselayerGrbDefault.storyName = 'vl-map-baselayer-grb - default';

export const MapBaselayerGrbBackgroundLayer = story(
    {},
    () => html`
        <vl-map>
            <vl-map-baselayer-grb background-layer></vl-map-baselayer-grb>
        </vl-map>
    `
);
MapBaselayerGrbBackgroundLayer.storyName = 'vl-map-baselayer-grb - background layer';
