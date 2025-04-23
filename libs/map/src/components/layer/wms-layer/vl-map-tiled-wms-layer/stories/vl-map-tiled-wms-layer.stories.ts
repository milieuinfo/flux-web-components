import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../../../../../vl-map';
import '../../../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import { mapWmsLayerArgs, mapWmsLayerArgTypes } from '../../stories/vl-map-wms-layer.stories-arg';
import '../vl-map-tiled-wms-layer';
import mapTiledWmsLayerDoc from './vl-map-tiled-wms-layer.stories-doc.mdx';

export default {
    id: 'map-layer-wms-layer-tiled-wms-layer',
    title: 'map/layer/wms-layer/tiled-wms-layer',
    tags: ['autodocs'],
    args: mapWmsLayerArgs,
    argTypes: mapWmsLayerArgTypes,
    parameters: {
        docs: {
            page: mapTiledWmsLayerDoc,
        },
    },
} as Meta<typeof mapWmsLayerArgs>;

export const MapTiledWmsLayerDefault = story(
    mapWmsLayerArgs,
    ({ hidden, layers, maxResolution, minResolution, name, opacity, styles, url, version }) =>
        html`
            <vl-map>
                <vl-map-tiled-wms-layer
                    ?hidden=${hidden}
                    layers=${layers}
                    max-resolution=${maxResolution}
                    min-resolution=${minResolution}
                    name=${name}
                    opacity=${opacity}
                    styles=${styles}
                    url=${url}
                    version=${version}
                >
                </vl-map-tiled-wms-layer>
            </vl-map>
        `
);
MapTiledWmsLayerDefault.storyName = 'vl-map-tiled-wms-layer - default';
MapTiledWmsLayerDefault.args = {
    layers: 'GEM_GRENS',
    name: 'Gemeentegrenzen',
    url: 'https://geo.api.vlaanderen.be/GRB/wms',
};
