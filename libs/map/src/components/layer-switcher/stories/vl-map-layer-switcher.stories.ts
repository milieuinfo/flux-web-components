import { story } from '@domg-wc/common-storybook';
import { VlButtonComponent } from '@domg-wc/components/next/button';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../../../vl-map';
import '../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../../layer-style/vl-map-layer-circle-style/vl-map-layer-circle-style';
import '../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import '../../side-sheet/vl-map-side-sheet';
import '../vl-map-layer-switcher';
import { mapLayerSwitcherArgs, mapLayerSwitcherArgTypes } from './vl-map-layer-switcher.stories-arg';
import mapLayerSwitcherDoc from './vl-map-layer-switcher.stories-doc.mdx';
import { mapLayersToAddOrRemove, storyControlTemplates } from './vl-map-layer-switcher.stories-templates';
import { dynamicLayerSwitcherImplementation } from './vl-map-layer-switcher.stories-utils';

export default {
    id: 'map-layer-switcher',
    title: 'map/layer-switcher',
    tags: ['autodocs'],
    args: mapLayerSwitcherArgs,
    argTypes: mapLayerSwitcherArgTypes,
    parameters: {
        docs: {
            page: mapLayerSwitcherDoc,
        },
    },
} as Meta<typeof mapLayerSwitcherArgs>;

const features1 = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [149055.0, 199908.0] },
        },
    ],
};
const features2 = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [154055.0, 199908.0] },
        },
    ],
};
const features3 = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [159055.0, 199908.0] },
        },
    ],
};

const Template = story(
    mapLayerSwitcherArgs,
    ({ title, layers }) => html`
        <vl-map lambert2008>
            <vl-map-side-sheet>
                <vl-map-layer-switcher data-vl-title=${title} .layers=${layers}></vl-map-layer-switcher>
            </vl-map-side-sheet>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-features-layer data-vl-name="Kaartlaag 1" .features=${features1} projection-code="EPSG:31370">
                <vl-map-layer-circle-style data-vl-color="black"></vl-map-layer-circle-style>
            </vl-map-features-layer>
            <vl-map-features-layer data-vl-name="Kaartlaag 2" .features=${features2} projection-code="EPSG:31370">
                <vl-map-layer-circle-style data-vl-color="yellow"></vl-map-layer-circle-style>
            </vl-map-features-layer>
            <vl-map-features-layer data-vl-name="Kaartlaag 3" .features=${features3} projection-code="EPSG:31370">
                <vl-map-layer-circle-style data-vl-color="red"></vl-map-layer-circle-style>
            </vl-map-features-layer>
            </vl-map-wmts-layer>
            </vl-map-wfs-layer>
        </vl-map>
    `
);

export const MapLayerSwitcherDefault = Template.bind({});
MapLayerSwitcherDefault.storyName = 'vl-map-layer-switcher - default';

export const MapLayerSwitcherSubselection = Template.bind({});
MapLayerSwitcherSubselection.storyName = 'vl-map-layer-switcher - subselection';
MapLayerSwitcherSubselection.args = {
    layers: ['Kaartlaag 1', 'Kaartlaag 2'],
};

export const MapLayerSwitcherResolutions = story(
    mapLayerSwitcherArgs,
    ({ title, layers }) => html`
        <vl-map lambert2008>
            <vl-map-side-sheet>
                <vl-map-layer-switcher data-vl-title=${title} .layers=${layers}></vl-map-layer-switcher>
            </vl-map-side-sheet>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-features-layer
                data-vl-name="Kaartlaag met resolutie 1"
                data-vl-min-resolution="0"
                data-vl-max-resolution="90"
                .features=${features1}
                projection-code="EPSG:31370"
            >
                <vl-map-layer-circle-style data-vl-color="black"></vl-map-layer-circle-style>
            </vl-map-features-layer>
            <vl-map-features-layer
                data-vl-name="Kaartlaag met resolutie 2"
                data-vl-min-resolution="90"
                data-vl-max-resolution="180"
                .features=${features2}
                projection-code="EPSG:31370"
            >
                <vl-map-layer-circle-style data-vl-color="yellow"></vl-map-layer-circle-style>
            </vl-map-features-layer>
            <vl-map-features-layer
                data-vl-name="Kaartlaag met resolutie 3"
                data-vl-min-resolution="180"
                data-vl-max-resolution="270"
                .features=${features3}
                projection-code="EPSG:31370"
            >
                <vl-map-layer-circle-style data-vl-color="red"></vl-map-layer-circle-style>
            </vl-map-features-layer>
        </vl-map>
    `
);
MapLayerSwitcherResolutions.storyName = 'vl-map-layer-switcher - resolutions';

export const MapLayerSwitcherDynamic = story(mapLayerSwitcherArgs, ({ title, layers }) => {
    const layerIds = ['zwart', 'geel', 'rood'];
    const { handleAddLayerForId, handleToggleLayerForId, handleRemoveLayerForId } =
        dynamicLayerSwitcherImplementation();

    return html`
        ${storyControlTemplates(layerIds, handleAddLayerForId, handleToggleLayerForId, handleRemoveLayerForId)}
        ${mapLayersToAddOrRemove()}
        <vl-map
            id="map-dynamic-layers"
            @vl-change=${(e) => {
                const toggleButton = document.querySelector<VlButtonComponent>(
                    `vl-button-next[data-layer="${e.detail?.currentTarget?.label}"]`
                );
                if (toggleButton) {
                    toggleButton.on = e.detail.checked;
                }
            }}
        >
            <vl-map-side-sheet>
                <vl-map-layer-switcher data-vl-title=${title} .layers=${layers}></vl-map-layer-switcher>
            </vl-map-side-sheet>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
        </vl-map>
    `;
});
MapLayerSwitcherDynamic.storyName = 'vl-map-layer-switcher - dynamic layers';
