import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import '../../../../../vl-map';
import '../../../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../vl-map-wfs-layer';
import { mapWfsLayerArgs, mapWfsLayerArgTypes } from './vl-map-wfs-layer.stories-arg';
import mapWfsLayerDoc from './vl-map-wfs-layer.stories-doc.mdx';

export default {
    id: 'map-layer-vector-layer-wfs-layer',
    title: 'map/layer/vector-layer/wfs-layer',
    tags: ['autodocs'],
    args: mapWfsLayerArgs,
    argTypes: mapWfsLayerArgTypes,
    parameters: {
        docs: {
            page: mapWfsLayerDoc,
        },
    },
} as Meta<typeof mapWfsLayerArgs>;

export const MapWfsLayerDefault = story(
    mapWfsLayerArgs,
    ({ hidden, layers, maxResolution, minResolution, name, opacity, url }) =>
        html`
            <vl-map lambert2008>
                <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
                <vl-map-wfs-layer
                    ?hidden=${hidden}
                    layers=${layers}
                    max-resolution=${maxResolution}
                    min-resolution=${minResolution}
                    name=${name}
                    opacity=${opacity}
                    url=${url}
                    projection-code="EPSG:31370"
                >
                </vl-map-wfs-layer>
            </vl-map>
        `
);
MapWfsLayerDefault.storyName = 'vl-map-wfs-layer - default';
MapWfsLayerDefault.args = {
    layers: 'owl_l',
    name: 'Oppervlaktewaterlichamen',
    url: 'https://geoserver.vmm.be/geoserver/vmm/wfs',
};
