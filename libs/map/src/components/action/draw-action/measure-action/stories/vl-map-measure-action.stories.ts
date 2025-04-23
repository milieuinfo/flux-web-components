import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import '../../../../../vl-map';
import '../../../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../../../../controls/measure-control/vl-map-measure-control';
import '../../../../controls/vl-map-action-controls';
import '../../../../layer-style/vl-map-layer-style';
import '../../../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import '../../../../layer/vector-layer/vl-map-wfs-layer/vl-map-wfs-layer';
import { mapDrawActionArgs, mapDrawActionArgTypes } from '../../stories/vl-map-draw-action.stories-arg';
import '../vl-map-measure-action';
import mapMeasureActionDoc from './vl-map-measure-action.stories-doc.mdx';

export default {
    id: 'map-action-draw-action-measure-action',
    title: 'map/action/draw-action/measure-action',
    tags: ['autodocs'],
    args: mapDrawActionArgs,
    argTypes: mapDrawActionArgTypes,
    parameters: {
        docs: {
            page: mapMeasureActionDoc,
        },
    },
} as Meta<typeof mapDrawActionArgs>;

export const MapMeasureActionDefault = story(
    mapDrawActionArgs,
    ({ active, defaultActive }) => html`
        <vl-map>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-features-layer>
                <vl-map-measure-action .active=${active} default-active=${defaultActive}></vl-map-measure-action>
                <vl-map-layer-style border-size="2"></vl-map-layer-style>
            </vl-map-features-layer>
        </vl-map>
    `
);
MapMeasureActionDefault.storyName = 'vl-map-measure-action - default';
MapMeasureActionDefault.args = {
    active: true,
};

export const MapMeasureActionSnapping = story(
    mapDrawActionArgs,
    ({ active, defaultActive, snapping, snappingPixelTolerance }) => html`
        <vl-map>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-features-layer>
                <vl-map-measure-action
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
                </vl-map-measure-action>
                <vl-map-layer-style border-size="2"></vl-map-layer-style>
            </vl-map-features-layer>
        </vl-map>
    `
);
MapMeasureActionSnapping.storyName = 'vl-map-measure-action - snapping';
MapMeasureActionSnapping.args = {
    active: true,
    snapping: true,
    snappingPixelTolerance: 1000,
};

export const MapMeasureActionControl = story(
    mapDrawActionArgs,
    ({ active, defaultActive }) =>
        html`
            <vl-map>
                <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
                <vl-map-action-controls>
                    <vl-map-measure-control></vl-map-measure-control>
                </vl-map-action-controls>
                <vl-map-features-layer>
                    <vl-map-measure-action .active=${active} default-active=${defaultActive}></vl-map-measure-action>
                    <vl-map-layer-style border-size="2"></vl-map-layer-style>
                </vl-map-features-layer>
            </vl-map>
        `
);
MapMeasureActionControl.storyName = 'vl-map-measure-action - control';
MapMeasureActionControl.args = {
    active: true,
};
