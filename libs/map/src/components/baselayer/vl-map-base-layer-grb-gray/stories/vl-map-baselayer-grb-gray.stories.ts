import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../../../../vl-map';
import { mapBaselayerArgs, mapBaselayerArgTypes } from '../../stories/vl-map-baselayer.stories-arg';
import '../vl-map-base-layer-grb-gray';
import mapBaselayerGrbGrayDoc from './vl-map-baselayer-grb-gray.stories-doc.mdx';

export default {
    id: 'map-baselayer-baselayer-grb-gray',
    title: 'map/baselayer/baselayer-grb-gray',
    tags: ['autodocs'],
    args: mapBaselayerArgs,
    argTypes: mapBaselayerArgTypes,
    parameters: {
        docs: {
            page: mapBaselayerGrbGrayDoc,
        },
        controls: {
            hideNoControlsWarning: true,
        },
    },
} as Meta<typeof mapBaselayerArgs>;

export const MapBaselayerGrbGrayDefault = story(
    {},
    () => html`
        <vl-map>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
        </vl-map>
    `
);
MapBaselayerGrbGrayDefault.storyName = 'vl-map-baselayer-grb-gray - default';

export const MapBaselayerGrbGrayBackgroundLayer = story(
    {},
    () => html`
        <vl-map>
            <vl-map-baselayer-grb-gray background-layer></vl-map-baselayer-grb-gray>
        </vl-map>
    `
);
MapBaselayerGrbGrayBackgroundLayer.storyName = 'vl-map-baselayer-grb-gray - background layer';
