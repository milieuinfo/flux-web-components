import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import '../../../../../vl-map';
import '../../../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../../../../layer-style/vl-map-layer-circle-style/vl-map-layer-circle-style';
import '../../../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import '../../../../layer/vector-layer/vl-map-wfs-layer/vl-map-wfs-layer';
import { mapDrawActionArgs, mapDrawActionArgTypes } from '../../stories/vl-map-draw-action.stories-arg';
import '../vl-map-draw-point-action';
import mapDrawPointActionDoc from './vl-map-draw-point-action.stories-doc.mdx';

export default {
    id: 'map-action-draw-action-draw-point-action',
    title: 'map/action/draw-action/draw-point-action',
    tags: ['autodocs'],
    args: mapDrawActionArgs,
    argTypes: mapDrawActionArgTypes,
    parameters: {
        docs: {
            page: mapDrawPointActionDoc,
        },
    },
} as Meta<typeof mapDrawActionArgs>;

export const MapDrawPointActionDefault = story(
    mapDrawActionArgs,
    ({ active, defaultActive }) => html`
        <vl-map lambert2008>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-features-layer>
                <vl-map-draw-point-action .active=${active} default-active=${defaultActive}></vl-map-draw-point-action>
                <vl-map-layer-circle-style border-size="2"></vl-map-layer-circle-style>
            </vl-map-features-layer>
        </vl-map>
    `
);
MapDrawPointActionDefault.storyName = 'vl-map-draw-point-action - default';
MapDrawPointActionDefault.args = {
    active: true,
};

export const MapDrawPointActionSnapping = story(
    mapDrawActionArgs,
    ({ active, defaultActive, snapping, snappingPixelTolerance }) => html`
        <vl-map lambert2008>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-features-layer>
                <vl-map-draw-point-action
                    .active=${active}
                    ?default-active=${defaultActive}
                    ?snapping=${snapping}
                    snapping-pixel-tolerance=${snappingPixelTolerance}
                >
                    <vl-map-wfs-layer
                        name="Stromend waterlichamen"
                        url="https://geoserver.vmm.be/geoserver/vmm/wfs"
                        layers="owl_l"
                        max-resolution="4"
                    >
                    </vl-map-wfs-layer>
                </vl-map-draw-point-action>
                <vl-map-layer-circle-style border-size="2"></vl-map-layer-circle-style>
            </vl-map-features-layer>
        </vl-map>
    `
);
MapDrawPointActionSnapping.storyName = 'vl-map-draw-point-action - snapping';
MapDrawPointActionSnapping.args = {
    active: true,
    snapping: true,
    snappingPixelTolerance: 1000,
};
