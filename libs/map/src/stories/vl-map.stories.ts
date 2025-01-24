import { story } from '@domg-wc/common-storybook';
import '@domg-wc/components';
// deze imports van alle elements, components en map werken IN de monorepo
// -> buiten de monorepo werkt dat niet omdat sideEffects disabled worden voor de root-barrel file in de artifacts
import '@domg-wc/elements';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import '../components/action/draw-action/draw-line-action/vl-map-draw-line-action';
import '../components/action/draw-action/draw-point-action/vl-map-draw-point-action';
import '../components/action/draw-action/draw-polygon-action/vl-map-draw-polygon-action';
import '../components/action/draw-action/measure-action/vl-map-measure-action';
import '../components/action/layer-action/delete-action/vl-map-delete-action';
import '../components/action/layer-action/modify-action/vl-map-modify-action';
import '../components/action/layer-action/select-action/vl-map-select-action';
import '../components/baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../components/baselayer/vl-map-base-layer-grb-ortho/vl-map-base-layer-grb-ortho';
import '../components/baselayer/vl-map-base-layer-grb/vl-map-base-layer-grb';
import '../components/controls/measure-control/vl-map-measure-control';
import '../components/controls/vl-map-action-controls';
import '../components/layer-style/vl-map-layer-circle-style/vl-map-layer-circle-style';
import '../components/layer-style/vl-map-layer-style';
import '../components/layer-switcher/vl-map-layer-switcher';
import '../components/layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import { LEGEND_PLACEMENT } from '../components/legend/vl-map-legend.defaults';
import '../components/legend/vl-map-legend';
import '../components/overview-map/vl-map-overview-map';
import '../components/side-sheet/vl-map-side-sheet';
import '../vl-map';
import { mapArgs, mapArgTypes } from './vl-map.stories-arg';
import mapDoc from './vl-map.stories-doc.mdx';
import {
    getActionElement,
    getToggleButton,
    handleActiveActionChange,
    handleLayerVisibleChange,
    handleOpacitySliderChange,
} from './vl-map.stories-util';

export default {
    id: 'map-map',
    title: 'map/map',
    tags: ['autodocs'],
    args: mapArgs,
    argTypes: mapArgTypes,
    parameters: {
        docs: {
            page: mapDoc,
        },
    },
} as Meta<typeof mapArgs>;

export const MapDefault = story(
    mapArgs,
    ({
        allowFullscreen,
        disableEscape,
        disableRotation,
        disableMousewheelZoom,
        disableKeyboard,
        noBorder,
        fullHeight,
    }) => html`
        <vl-map
            ?data-vl-allow-fullscreen=${allowFullscreen}
            ?data-vl-disable-escape-key=${disableEscape}
            ?data-vl-disable-rotation=${disableRotation}
            ?data-vl-disable-mouse-wheel-zoom=${disableMousewheelZoom}
            ?data-vl-disable-keyboard=${disableKeyboard}
            ?data-vl-no-border=${noBorder}
            ?data-vl-full-height=${fullHeight}
            data-vl-zoomInTooltip="Zoom in"
            data-vl-zoomOutTooltip="Zoom uit"
        >
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
        </vl-map>
    `
);
MapDefault.storyName = 'vl-map - default';

export const MapFullHeight = story(
    mapArgs,
    ({
        allowFullscreen,
        disableEscape,
        disableRotation,
        disableMousewheelZoom,
        disableKeyboard,
        noBorder,
        fullHeight,
    }) => html`
        <div style="height: 800px; display: flex; flex-direction: column; border: 1px solid black">
            <vl-functional-header
                data-vl-sub-title=${'Voor lager, middelbaar en hoger onderwijs'}
                data-vl-title=${'School- en studietoelagen'}
                data-vl-margin-bottom=${'none'}
                ?data-vl-disable-back-link=${true}
            ></vl-functional-header>
            <vl-map
                ?data-vl-allow-fullscreen=${allowFullscreen}
                ?data-vl-disable-escape-key=${disableEscape}
                ?data-vl-disable-rotation=${disableRotation}
                ?data-vl-disable-mouse-wheel-zoom=${disableMousewheelZoom}
                ?data-vl-disable-keyboard=${disableKeyboard}
                ?data-vl-no-border=${noBorder}
                ?data-vl-full-height=${fullHeight}
                data-vl-zoomInTooltip="Zoom in"
                data-vl-zoomOutTooltip="Zoom uit"
            >
                <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            </vl-map>
        </div>
    `
);
MapFullHeight.storyName = 'vl-map - full height';
MapFullHeight.args = {
    noBorder: true,
    fullHeight: true,
};

const purple = 'rgba(102, 51, 153, 0.6)';
const toggleGroupStyling = 'width: 100%;';
const toggleItemStyling = 'display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem;';

const features = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            id: 1,
            geometry: { type: 'Point', coordinates: [210000, 190000] },
        },
        {
            type: 'Feature',
            id: 2,
            geometry: {
                type: 'LineString',
                coordinates: [
                    [170000, 170000],
                    [150000, 206000],
                ],
            },
        },
        {
            type: 'Feature',
            id: 3,
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [44000, 171000],
                        [100000, 171000],
                        [100000, 205000],
                        [44000, 205000],
                        [44000, 171000],
                    ],
                ],
            },
        },
    ],
};

export const MapPlayground = story(
    mapArgs,
    ({
        allowFullscreen,
        disableEscape,
        disableRotation,
        disableMousewheelZoom,
        disableKeyboard,
        noBorder,
        fullHeight,
        activeActionChange,
        layerVisibleChange,
    }) => html`
        <vl-map
            ?data-vl-allow-fullscreen=${allowFullscreen}
            ?data-vl-disable-escape-key=${disableEscape}
            ?data-vl-disable-rotation=${disableRotation}
            ?data-vl-disable-mouse-wheel-zoom=${disableMousewheelZoom}
            ?data-vl-disable-keyboard=${disableKeyboard}
            ?data-vl-no-border=${noBorder}
            ?data-vl-full-height=${fullHeight}
            @vl-active-action-changed=${(event) => {
                activeActionChange({ previous: event.detail.previous });
                activeActionChange({ current: event.detail.current });
                handleActiveActionChange(event);
            }}
            @vl-layer-visible-changed=${(event) => {
                layerVisibleChange(event.detail);
                handleLayerVisibleChange(event);
            }}
        >
            <vl-map-action-controls>
                <vl-map-measure-control></vl-map-measure-control>
            </vl-map-action-controls>

            <vl-map-side-sheet>
                <h6 is="vl-h6">Layers</h6>

                <vl-map-layer-switcher></vl-map-layer-switcher>
                <vl-input-slider data-vl-value=${100} @vl-change-value=${handleOpacitySliderChange}></vl-input-slider>

                <hr />

                <h6 is="vl-h6">Measure</h6>

                <div>
                    <vl-button-next
                        @click=${() => {
                            getActionElement('measure').active = true;
                        }}
                    >
                        Start
                    </vl-button-next>
                    <vl-button-next
                        @click=${() => {
                            getActionElement('measure').active = false;
                        }}
                    >
                        Stop
                    </vl-button-next>
                </div>

                <hr />

                <div style=${toggleGroupStyling}>
                    <h6 is="vl-h6">Shapes</h6>

                    <div style="margin-bottom: 2rem;">
                        <vl-button-next
                            toggle
                            class="modify-toggle-button"
                            @click=${() => {
                                getActionElement('modify').active = getToggleButton('modify').on;
                            }}
                        >
                            Modify
                        </vl-button-next>
                        <vl-button-next
                            toggle
                            class="delete-toggle-button"
                            @click=${() => {
                                getActionElement('delete').active = getToggleButton('delete').on;
                            }}
                        >
                            Delete
                        </vl-button-next>
                    </div>

                    <div style=${toggleItemStyling}>
                        <vl-button-next
                            toggle
                            icon="pencil"
                            label="Toggle draw point action"
                            class="draw-point-toggle-button"
                            @click=${() => {
                                getActionElement('draw-point').active =  getToggleButton('draw-point').on;
                            }}
                        >
                        </vl-button-next>
                        <p>Draw point</p>
                    </div>

                    <div style=${toggleItemStyling}>
                        <vl-button-next
                            toggle
                            icon="pencil"
                            label="Toggle draw line action"
                            class="draw-line-toggle-button"
                            @click=${() => {
                                getActionElement('draw-line').active = getToggleButton('draw-line').on;
                            }}
                        >
                        </vl-button-next>
                        <p>Draw line</p>
                    </div>

                    <div style=${toggleItemStyling}>
                        <vl-button-next
                            toggle
                            icon="pencil"
                            label="Toggle draw polygon action"
                            class="draw-polygon-toggle-button"
                            @click=${() => {
                                getActionElement('draw-polygon').active = getToggleButton('draw-polygon').on;
                            }}
                        >
                        </vl-button-next>
                        <p>Draw Polygon</p>
                    </div>
                </div>
            </vl-map-side-sheet>

            <vl-map-overview-map></vl-map-overview-map>

            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-baselayer-grb></vl-map-baselayer-grb>
            <vl-map-baselayer-grb-ortho></vl-map-baselayer-grb-ortho>

            <vl-map-features-layer data-vl-name="Shapes" .features=${features}>
                <vl-map-layer-style
                    data-vl-name="Shapes"
                    data-vl-border-color=${purple}
                    data-vl-color=${purple}
                ></vl-map-layer-style>
                <vl-map-layer-circle-style
                    data-vl-border-color=${purple}
                    data-vl-color=${purple}
                ></vl-map-layer-circle-style>

                <vl-map-draw-point-action class="draw-point-action action"></vl-map-draw-point-action>
                <vl-map-draw-line-action class="draw-line-action action"></vl-map-draw-line-action>
                <vl-map-draw-polygon-action class="draw-polygon-action action"></vl-map-draw-polygon-action>

                <vl-map-modify-action class="modify-action action"></vl-map-modify-action>
                <vl-map-delete-action class="delete-action action"></vl-map-delete-action>
                <vl-map-select-action class="select-action action" data-vl-default-active></vl-map-select-action>
            </vl-map-features-layer>

            <vl-map-features-layer data-vl-name="Measurements">
                <vl-map-layer-style
                    data-vl-color="rgba(6, 163, 247, 1)"
                    data-vl-border-size="2"
                    data-vl-border-color="rgba(6, 163, 247, 1)"
                ></vl-map-layer-style>
                <vl-map-measure-action class="measure-action action"></vl-map-measure-action>
            </vl-map-features-layer>
            <vl-map-legend data-vl-placement=${LEGEND_PLACEMENT.BOTTOM_RIGHT} right="140px"></vl-map-legend>
        </vl-map>
    `
);
MapPlayground.storyName = 'vl-map - playground';
