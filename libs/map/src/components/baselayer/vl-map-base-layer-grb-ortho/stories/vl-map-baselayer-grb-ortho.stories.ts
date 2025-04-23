import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../../../../vl-map';
import { mapBaselayerArgs, mapBaselayerArgTypes } from '../../stories/vl-map-baselayer.stories-arg';
import '../vl-map-base-layer-grb-ortho';
import mapBaselayerGrbOrthoDoc from './vl-map-baselayer-grb-ortho.stories-doc.mdx';

export default {
    id: 'map-baselayer-baselayer-grb-ortho',
    title: 'map/baselayer/baselayer-grb-ortho',
    tags: ['autodocs'],
    args: mapBaselayerArgs,
    argTypes: mapBaselayerArgTypes,
    parameters: {
        docs: {
            page: mapBaselayerGrbOrthoDoc,
        },
        controls: {
            hideNoControlsWarning: true,
        },
    },
} as Meta<typeof mapBaselayerArgs>;

export const MapBaselayerGrbOrthoDefault = story(
    {},
    () => html`
        <vl-map>
            <vl-map-baselayer-grb-ortho></vl-map-baselayer-grb-ortho>
        </vl-map>
    `
);
MapBaselayerGrbOrthoDefault.storyName = 'vl-map-baselayer-grb-ortho - default';

export const MapBaselayerGrbOrthoBackgroundLayer = story(
    {},
    () => html`
        <vl-map>
            <vl-map-baselayer-grb-ortho background-layer></vl-map-baselayer-grb-ortho>
        </vl-map>
    `
);
MapBaselayerGrbOrthoBackgroundLayer.storyName = 'vl-map-baselayer-grb-ortho - background layer';
