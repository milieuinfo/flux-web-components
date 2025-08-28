import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../../../../vl-map';
import '../../../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../../../../layer-style/vl-map-layer-style';
import '../../../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import '../../../../layer/vector-layer/vl-map-wfs-layer/vl-map-wfs-layer';
import { mapDrawActionArgs, mapDrawActionArgTypes } from '../../stories/vl-map-draw-action.stories-arg';
import '../vl-map-draw-line-action';
import mapDrawActionDoc from './vl-map-draw-line-action.stories-doc.mdx';

export default {
    id: 'map-action-draw-action-draw-line-action',
    title: 'map/action/draw-action/draw-line-action',
    tags: ['autodocs'],
    args: mapDrawActionArgs,
    argTypes: mapDrawActionArgTypes,
    parameters: {
        docs: {
            page: mapDrawActionDoc,
        },
    },
} as Meta<typeof mapDrawActionArgs>;

export const MapDrawLineActionDefault = story(
    mapDrawActionArgs,
    ({ active, defaultActive }) => html`
        <vl-map lambert2008>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-features-layer>
                <vl-map-draw-line-action .active=${active} ?default-active=${defaultActive}> </vl-map-draw-line-action>
                <vl-map-layer-style border-size="2"></vl-map-layer-style>
            </vl-map-features-layer>
        </vl-map>
    `
);
MapDrawLineActionDefault.storyName = 'vl-map-draw-line-action - default';
MapDrawLineActionDefault.args = {
    active: true,
};

export const MapDrawLineActionSnapping = story(
    mapDrawActionArgs,
    ({ active, defaultActive, snapping, snappingPixelTolerance }) => html`
        <vl-map lambert2008>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-features-layer>
                <vl-map-draw-line-action
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
                </vl-map-draw-line-action>
                <vl-map-layer-style border-size="2"></vl-map-layer-style>
            </vl-map-features-layer>
        </vl-map>
    `
);
MapDrawLineActionSnapping.storyName = 'vl-map-draw-line-action - snapping';
MapDrawLineActionSnapping.args = {
    active: true,
    snapping: true,
    snappingPixelTolerance: 1000,
};
