import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../../../../../vl-map';
import '../../../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import { mapWmsLayerArgs, mapWmsLayerArgTypes } from '../../stories/vl-map-wms-layer.stories-arg';
import '../vl-map-image-wms-layer';
import mapImageWmsLayerDoc from './vl-map-image-wms-layer.stories-doc.mdx';

export default {
    id: 'map-layer-wms-layer-image-wms-layer',
    title: 'map/layer/wms-layer/image-wms-layer',
    tags: ['autodocs'],
    args: mapWmsLayerArgs,
    argTypes: mapWmsLayerArgTypes,
    parameters: {
        docs: {
            page: mapImageWmsLayerDoc,
        },
    },
} as Meta<typeof mapWmsLayerArgs>;

export const MapImageWmsLayerDefault = story(
    mapWmsLayerArgs,
    ({ hidden, layers, maxResolution, minResolution, name, opacity, styles, url, version }) =>
        html`
            <vl-map>
                <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
                <vl-map-image-wms-layer
                    ?data-vl-hidden=${hidden}
                    data-vl-layers=${layers}
                    data-vl-max-resolution=${maxResolution}
                    data-vl-min-resolution=${minResolution}
                    data-vl-name=${name}
                    data-vl-opacity=${opacity}
                    data-vl-styles=${styles}
                    data-vl-url=${url}
                    data-vl-version=${version}
                >
                </vl-map-image-wms-layer>
            </vl-map>
        `
);
MapImageWmsLayerDefault.storyName = 'vl-map-image-wms-layer - default';
MapImageWmsLayerDefault.args = {
    name: 'Beschermingszones',
    layers: 'grondwater:beschermingszones_2014',
    url: 'https://www.dov.vlaanderen.be/geoserver/wms',
};
