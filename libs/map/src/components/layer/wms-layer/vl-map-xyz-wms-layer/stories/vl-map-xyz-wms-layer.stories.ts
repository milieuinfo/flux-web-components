import { story } from '@domg-wc/common-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
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
            <vl-map>
                <vl-map-xyz-wms-layer
                    ?data-vl-hidden=${hidden}
                    data-vl-max-resolution=${maxResolution}
                    data-vl-min-resolution=${minResolution}
                    data-vl-name=${name}
                    data-vl-opacity=${opacity}
                    data-vl-styles=${styles}
                    data-vl-url=${url}
                    data-vl-version=${version}
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
