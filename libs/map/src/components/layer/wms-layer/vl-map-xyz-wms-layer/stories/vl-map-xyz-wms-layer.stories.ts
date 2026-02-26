import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../../../../vl-map';
import '../../../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import { mapWmsLayerArgs, mapWmsLayerArgTypes } from '../../stories/vl-map-wms-layer.stories-arg';
import '../vl-map-xyz-wms-layer';
import mapXYZWmsLayerDoc from './vl-map-xyz-wms-layer.stories-doc.mdx';

export default {
    id: 'map-layer-wms-layer-xyz-wms-layer',
    title: 'map/layer/wms-layer/xyz-wms-layer',
    tags: ['autodocs'],
    args: mapWmsLayerArgs,
    argTypes: mapWmsLayerArgTypes,
    parameters: {
        docs: {
            page: mapXYZWmsLayerDoc,
        },
    },
} as Meta<typeof mapWmsLayerArgs>;

export const MapXYZWmsLayerDefault = story(
    mapWmsLayerArgs,
    ({ hidden, maxResolution, minResolution, name, opacity, styles, url, version }) =>
        html`
            <vl-map lambert2008>
                <vl-map-xyz-wms-layer
                    ?hidden=${hidden}
                    max-resolution=${maxResolution}
                    min-resolution=${minResolution}
                    name=${name}
                    opacity=${opacity}
                    styles=${styles}
                    url=${url}
                    version=${version}
                >
                </vl-map-xyz-wms-layer>
            </vl-map>
        `
);
MapXYZWmsLayerDefault.storyName = 'vl-map-xyz-wms-layer - default';
MapXYZWmsLayerDefault.args = {
    name: 'Openstreetmap',
    url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
};
