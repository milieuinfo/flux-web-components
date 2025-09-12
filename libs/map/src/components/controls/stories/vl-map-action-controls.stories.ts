import { defaultArgs, defaultArgTypes, story } from '@domg-wc/common-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../../../vl-map';
import '../../action/draw-action/draw-polygon-action/vl-map-draw-polygon-action';
import '../../action/layer-action/delete-action/vl-map-delete-action';
import '../../action/layer-action/modify-action/vl-map-modify-action';
import '../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import '../vl-map-action-controls';
import mapActionControls from './vl-map-action-controls.stories-doc.mdx';

export default {
    id: 'map-controls-action-controls',
    title: 'map/controls/action-controls',
    tags: ['autodocs'],
    args: defaultArgs,
    argTypes: defaultArgTypes(),
    parameters: {
        docs: {
            page: mapActionControls,
        },
        controls: {
            hideNoControlsWarning: true,
        },
    },
} as Meta<typeof defaultArgs>;

export const MapActionControlsDefault = story(
    {},
    () => html`
        <vl-map lambert2008>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-features-layer>
                <vl-map-draw-polygon-action id="draw-action"></vl-map-draw-polygon-action>
                <vl-map-modify-action id="modify-action"></vl-map-modify-action>
                <vl-map-delete-action id="delete-action"></vl-map-delete-action>
            </vl-map-features-layer>
            <vl-map-action-controls>
                <vl-map-action-control data-vl-action-id="draw-action" data-vl-label="Teken"></vl-map-action-control>
                <vl-map-action-control
                    data-vl-action-id="modify-action"
                    data-vl-label="Editeer"
                ></vl-map-action-control>
                <vl-map-action-control
                    data-vl-action-id="delete-action"
                    data-vl-label="Verwijder"
                ></vl-map-action-control>
            </vl-map-action-controls>
        </vl-map>
    `
);

MapActionControlsDefault.storyName = 'vl-map-action-controls - default';
