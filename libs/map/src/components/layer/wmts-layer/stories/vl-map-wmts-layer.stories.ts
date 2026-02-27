import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import '../../../../vl-map';
import '../../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../vl-map-wmts-layer';
import { mapWmtsLayerArgs, mapWmtsLayerArgTypes } from './vl-map-wmts-layer.stories-arg';
import mapWmtsLayerDoc from './vl-map-wmts-layer.stories-doc.mdx';

export default {
    id: 'map-layer-wmts-layer',
    title: 'map/layer/wmts-layer',
    tags: ['autodocs'],
    args: mapWmtsLayerArgs,
    argTypes: mapWmtsLayerArgTypes,
    parameters: {
        docs: {
            page: mapWmtsLayerDoc,
        },
    },
} as Meta<typeof mapWmtsLayerArgs>;

export const MapWmtsLayerDefault = story(
    mapWmtsLayerArgs,
    ({ hidden, layer, maxResolution, minResolution, name, opacity, url, fromCapabilities }) =>
        html`
            <vl-map lambert2008>
                <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
                <vl-map-wmts-layer
                    ?hidden=${hidden}
                    layer=${layer}
                    max-resolution=${maxResolution}
                    min-resolution=${minResolution}
                    name=${name}
                    opacity=${opacity}
                    url=${url}
                    ?from-capabilities=${fromCapabilities}
                >
                </vl-map-wmts-layer>
            </vl-map>
        `
);
MapWmtsLayerDefault.storyName = 'vl-map-wmts-layer - default';
MapWmtsLayerDefault.args = {
    name: 'GRB Wegenkaart',
    layer: 'grb_sel',
    url: 'https://geo.api.vlaanderen.be/GRB/wmts',
};

export const MapWmtsLayerFromCapabilities = story(
    mapWmtsLayerArgs,
    ({ hidden, maxResolution, minResolution, name, opacity }) =>
        html`
            <vl-map>
                <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
                <vl-map-wmts-layer
                    ?hidden=${hidden}
                    layer="klimaat_doorgrondkaart"
                    max-resolution=${maxResolution}
                    min-resolution=${minResolution}
                    name=${name}
                    opacity=${opacity}
                    url="https://www.dov.vlaanderen.be/geoserver/klimaat/gwc/service/wmts"
                    from-capabilities
                >
                </vl-map-wmts-layer>
            </vl-map>
        `
);
MapWmtsLayerFromCapabilities.storyName = 'vl-map-wmts-layer - from-capabilities';
MapWmtsLayerFromCapabilities.args = {
    name: 'DOV Klimaat Doorgrondkaart',
};
