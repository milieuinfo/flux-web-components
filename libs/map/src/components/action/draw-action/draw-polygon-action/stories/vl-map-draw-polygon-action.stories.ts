import { story } from '@domg-wc/common-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import '../../../../../vl-map';
import '../../../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../../../../layer-style/vl-map-layer-style';
import '../../../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import '../../../../layer/vector-layer/vl-map-wfs-layer/vl-map-wfs-layer';
import { mapDrawActionArgs, mapDrawActionArgTypes } from '../../stories/vl-map-draw-action.stories-arg';
import '../vl-map-draw-polygon-action';
import mapDrawPolygonDoc from './vl-map-draw-polygon-action.stories-doc.mdx';

export default {
    id: 'map-action-draw-action-draw-polygon-action',
    title: 'map/action/draw-action/draw-polygon-action',
    tags: ['autodocs'],
    args: mapDrawActionArgs,
    argTypes: mapDrawActionArgTypes,
    parameters: {
        docs: {
            page: mapDrawPolygonDoc,
        },
    },
} as Meta<typeof mapDrawActionArgs>;

export const MapDrawPolygonActionDefault = story(
    mapDrawActionArgs,
    ({ active, defaultActive }) => html`
        <vl-map lambert2008>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-features-layer>
                <vl-map-draw-polygon-action
                    .active=${active}
                    data-vl-default-active=${defaultActive}
                ></vl-map-draw-polygon-action>
                <vl-map-layer-style data-vl-border-size="2"></vl-map-layer-style>
            </vl-map-features-layer>
        </vl-map>
    `
);
MapDrawPolygonActionDefault.storyName = 'vl-map-draw-polygon-action - default';
MapDrawPolygonActionDefault.args = {
    active: true,
};

export const MapDrawPolygonActionSnapping = story(
    mapDrawActionArgs,
    ({ active, defaultActive, snapping, snappingPixelTolerance }) => html`
        <vl-map lambert2008>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-features-layer>
                <vl-map-draw-polygon-action
                    .active=${active}
                    ?data-vl-default-active=${defaultActive}
                    ?data-vl-snapping=${snapping}
                    data-vl-snapping-pixel-tolerance=${snappingPixelTolerance}
                >
                    <vl-map-wfs-layer
                        data-vl-name="Stromend waterlichamen"
                        data-vl-url="https://geoserver.vmm.be/geoserver/vmm/wfs"
                        data-vl-layers="owl_l"
                        data-vl-max-resolution="4"
                    >
                    </vl-map-wfs-layer>
                </vl-map-draw-polygon-action>
                <vl-map-layer-style data-vl-border-size="2"></vl-map-layer-style>
            </vl-map-features-layer>
        </vl-map>
    `
);
MapDrawPolygonActionSnapping.storyName = 'vl-map-draw-polygon-action - snapping';
MapDrawPolygonActionSnapping.args = {
    active: true,
    snapping: true,
    snappingPixelTolerance: 1000,
};
