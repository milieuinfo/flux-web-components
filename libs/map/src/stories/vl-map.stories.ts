import '@domg-wc/components/block';
import { story } from '@resources/utils-storybook';
// deze imports van alle elements, components en map werken IN de monorepo
// -> buiten de monorepo werkt dat niet omdat sideEffects disabled worden voor de root-barrel file in de artifacts
import { registerWebComponents } from '@domg-wc/common';
import { VlTitleComponent } from '@domg-wc/components/atom';
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
import '../components/legend/vl-map-legend';
import { LEGEND_PLACEMENT } from '../components/legend/vl-map-legend.defaults';
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

registerWebComponents([VlTitleComponent]);

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
            ?allow-fullscreen=${allowFullscreen}
            ?disable-escape-key=${disableEscape}
            ?disable-rotation=${disableRotation}
            ?disable-mouse-wheel-zoom=${disableMousewheelZoom}
            ?disable-keyboard=${disableKeyboard}
            ?no-border=${noBorder}
            ?full-height=${fullHeight}
            zoomInTooltip="Zoom in"
            zoomOutTooltip="Zoom uit"
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
                sub-title=${'Voor lager, middelbaar en hoger onderwijs'}
                title=${'School- en studietoelagen'}
                margin-bottom=${'none'}
                ?disable-back-link=${true}
            ></vl-functional-header>
            <vl-map
                ?allow-fullscreen=${allowFullscreen}
                ?disable-escape-key=${disableEscape}
                ?disable-rotation=${disableRotation}
                ?disable-mouse-wheel-zoom=${disableMousewheelZoom}
                ?disable-keyboard=${disableKeyboard}
                ?no-border=${noBorder}
                ?full-height=${fullHeight}
                zoomInTooltip="Zoom in"
                zoomOutTooltip="Zoom uit"
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
            lambert2008
            ?allow-fullscreen=${allowFullscreen}
            ?disable-escape-key=${disableEscape}
            ?disable-rotation=${disableRotation}
            ?disable-mouse-wheel-zoom=${disableMousewheelZoom}
            ?disable-keyboard=${disableKeyboard}
            ?no-border=${noBorder}
            ?full-height=${fullHeight}
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
                <vl-title type="h6">Layers</vl-title>

                <vl-map-layer-switcher></vl-map-layer-switcher>
                <vl-input-slider value=${100} @vl-change-value=${handleOpacitySliderChange}></vl-input-slider>

                <hr />

                <vl-title type="h6">Measure</vl-title>

                <div>
                    <vl-button
                        @click=${() => {
                            getActionElement('measure').active = true;
                        }}
                    >
                        Start
                    </vl-button>
                    <vl-button
                        @click=${() => {
                            getActionElement('measure').active = false;
                        }}
                    >
                        Stop
                    </vl-button>
                </div>

                <hr />

                <div style=${toggleGroupStyling}>
                    <vl-title type="h6">Shapes</vl-title>

                    <div style="margin-bottom: 2rem;">
                        <vl-button
                            toggle
                            class="modify-toggle-button"
                            @click=${() => {
                                getActionElement('modify').active = getToggleButton('modify').on;
                            }}
                        >
                            Modify
                        </vl-button>
                        <vl-button
                            toggle
                            class="delete-toggle-button"
                            @click=${() => {
                                getActionElement('delete').active = getToggleButton('delete').on;
                            }}
                        >
                            Delete
                        </vl-button>
                    </div>

                    <div style=${toggleItemStyling}>
                        <vl-button
                            toggle
                            icon="pencil"
                            label="Toggle draw point action"
                            class="draw-point-toggle-button"
                            @click=${() => {
                                getActionElement('draw-point').active = getToggleButton('draw-point').on;
                            }}
                        >
                        </vl-button>
                        <p>Draw point</p>
                    </div>

                    <div style=${toggleItemStyling}>
                        <vl-button
                            toggle
                            icon="pencil"
                            label="Toggle draw line action"
                            class="draw-line-toggle-button"
                            @click=${() => {
                                getActionElement('draw-line').active = getToggleButton('draw-line').on;
                            }}
                        >
                        </vl-button>
                        <p>Draw line</p>
                    </div>

                    <div style=${toggleItemStyling}>
                        <vl-button
                            toggle
                            icon="pencil"
                            label="Toggle draw polygon action"
                            class="draw-polygon-toggle-button"
                            @click=${() => {
                                getActionElement('draw-polygon').active = getToggleButton('draw-polygon').on;
                            }}
                        >
                        </vl-button>
                        <p>Draw Polygon</p>
                    </div>
                </div>
            </vl-map-side-sheet>

            <vl-map-overview-map></vl-map-overview-map>

            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-baselayer-grb></vl-map-baselayer-grb>
            <vl-map-baselayer-grb-ortho></vl-map-baselayer-grb-ortho>

            <vl-map-features-layer name="Shapes" .features=${features} projection-code="EPSG:31370">
                <vl-map-layer-style name="Shapes" border-color=${purple} color=${purple}></vl-map-layer-style>
                <vl-map-layer-circle-style border-color=${purple} color=${purple}></vl-map-layer-circle-style>

                <vl-map-draw-point-action class="draw-point-action action"></vl-map-draw-point-action>
                <vl-map-draw-line-action class="draw-line-action action"></vl-map-draw-line-action>
                <vl-map-draw-polygon-action class="draw-polygon-action action"></vl-map-draw-polygon-action>

                <vl-map-modify-action class="modify-action action"></vl-map-modify-action>
                <vl-map-delete-action class="delete-action action"></vl-map-delete-action>
                <vl-map-select-action class="select-action action" default-active></vl-map-select-action>
            </vl-map-features-layer>

            <vl-map-features-layer name="Measurements" projection-code="EPSG:31370">
                <vl-map-layer-style
                    color="rgba(6, 163, 247, 1)"
                    border-size="2"
                    border-color="rgba(6, 163, 247, 1)"
                ></vl-map-layer-style>
                <vl-map-measure-action class="measure-action action"></vl-map-measure-action>
            </vl-map-features-layer>
            <vl-map-legend placement=${LEGEND_PLACEMENT.BOTTOM_RIGHT} right="140px"></vl-map-legend>
        </vl-map>
    `
);
MapPlayground.storyName = 'vl-map - playground';

export const MapPlaygroundLB72 = story(
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
            ?allow-fullscreen=${allowFullscreen}
            ?disable-escape-key=${disableEscape}
            ?disable-rotation=${disableRotation}
            ?disable-mouse-wheel-zoom=${disableMousewheelZoom}
            ?disable-keyboard=${disableKeyboard}
            ?no-border=${noBorder}
            ?full-height=${fullHeight}
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
                <vl-title type="h6">Layers</vl-title>

                <vl-map-layer-switcher></vl-map-layer-switcher>
                <vl-input-slider value=${100} @vl-change-value=${handleOpacitySliderChange}></vl-input-slider>

                <hr />

                <vl-title type="h6">Measure</vl-title>

                <div>
                    <vl-button
                        @click=${() => {
                            getActionElement('measure').active = true;
                        }}
                    >
                        Start
                    </vl-button>
                    <vl-button
                        @click=${() => {
                            getActionElement('measure').active = false;
                        }}
                    >
                        Stop
                    </vl-button>
                </div>

                <hr />

                <div style=${toggleGroupStyling}>
                    <vl-title type="h6">Shapes</vl-title>

                    <div style="margin-bottom: 2rem;">
                        <vl-button
                            toggle
                            class="modify-toggle-button"
                            @click=${() => {
                                getActionElement('modify').active = getToggleButton('modify').on;
                            }}
                        >
                            Modify
                        </vl-button>
                        <vl-button
                            toggle
                            class="delete-toggle-button"
                            @click=${() => {
                                getActionElement('delete').active = getToggleButton('delete').on;
                            }}
                        >
                            Delete
                        </vl-button>
                    </div>

                    <div style=${toggleItemStyling}>
                        <vl-button
                            toggle
                            icon="pencil"
                            label="Toggle draw point action"
                            class="draw-point-toggle-button"
                            @click=${() => {
                                getActionElement('draw-point').active = getToggleButton('draw-point').on;
                            }}
                        >
                        </vl-button>
                        <p>Draw point</p>
                    </div>

                    <div style=${toggleItemStyling}>
                        <vl-button
                            toggle
                            icon="pencil"
                            label="Toggle draw line action"
                            class="draw-line-toggle-button"
                            @click=${() => {
                                getActionElement('draw-line').active = getToggleButton('draw-line').on;
                            }}
                        >
                        </vl-button>
                        <p>Draw line</p>
                    </div>

                    <div style=${toggleItemStyling}>
                        <vl-button
                            toggle
                            icon="pencil"
                            label="Toggle draw polygon action"
                            class="draw-polygon-toggle-button"
                            @click=${() => {
                                getActionElement('draw-polygon').active = getToggleButton('draw-polygon').on;
                            }}
                        >
                        </vl-button>
                        <p>Draw Polygon</p>
                    </div>
                </div>
            </vl-map-side-sheet>

            <vl-map-overview-map></vl-map-overview-map>

            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-baselayer-grb></vl-map-baselayer-grb>
            <vl-map-baselayer-grb-ortho></vl-map-baselayer-grb-ortho>

            <vl-map-features-layer name="Shapes" .features=${features}>
                <vl-map-layer-style name="Shapes" border-color=${purple} color=${purple}></vl-map-layer-style>
                <vl-map-layer-circle-style border-color=${purple} color=${purple}></vl-map-layer-circle-style>

                <vl-map-draw-point-action class="draw-point-action action"></vl-map-draw-point-action>
                <vl-map-draw-line-action class="draw-line-action action"></vl-map-draw-line-action>
                <vl-map-draw-polygon-action class="draw-polygon-action action"></vl-map-draw-polygon-action>

                <vl-map-modify-action class="modify-action action"></vl-map-modify-action>
                <vl-map-delete-action class="delete-action action"></vl-map-delete-action>
                <vl-map-select-action class="select-action action" default-active></vl-map-select-action>
            </vl-map-features-layer>

            <vl-map-features-layer name="Measurements">
                <vl-map-layer-style
                    color="rgba(6, 163, 247, 1)"
                    border-size="2"
                    border-color="rgba(6, 163, 247, 1)"
                ></vl-map-layer-style>
                <vl-map-measure-action class="measure-action action"></vl-map-measure-action>
            </vl-map-features-layer>
            <vl-map-legend placement=${LEGEND_PLACEMENT.BOTTOM_RIGHT} right="140px"></vl-map-legend>
        </vl-map>
    `
);
MapPlaygroundLB72.storyName = 'vl-map - playground - Lambert 72';

