import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../../../../../vl-map';
import '../../../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../vl-map-features-layer';
import { mapFeaturesLayerArgs, mapFeaturesLayerArgTypes } from './vl-map-features-layer.stories-arg';
import mapFeaturesLayerDoc from './vl-map-features-layer.stories-doc.mdx';

export default {
    id: 'map-layer-vector-layer-features-layer',
    title: 'map/layer/vector-layer/features-layer',
    tags: ['autodocs'],
    args: mapFeaturesLayerArgs,
    argTypes: mapFeaturesLayerArgTypes,
    parameters: {
        docs: {
            page: mapFeaturesLayerDoc,
        },
    },
} as Meta<typeof mapFeaturesLayerArgs>;

export const MapFeaturesLayerDefault = story(
    mapFeaturesLayerArgs,
    ({
        autoExtent,
        autoExtentMaxZoom,
        cluster,
        clusterDistance,
        features,
        hidden,
        maxResolution,
        minResolution,
        name,
        opacity,
        featuresProp,
    }) => html`
        <vl-map>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-features-layer
                ?data-vl-auto-extent=${autoExtent}
                data-vl-auto-extent-max-zoom=${autoExtentMaxZoom}
                ?data-vl-cluster=${cluster}
                data-vl-cluster-distance=${clusterDistance}
                data-vl-features=${features}
                .features=${featuresProp}
                ?data-vl-hidden=${hidden}
                data-vl-max-resolution=${maxResolution}
                data-vl-min-resolution=${minResolution}
                data-vl-name=${name}
                data-vl-opacity=${opacity}
            >
                <vl-map-layer-style data-vl-border-size="2"></vl-map-layer-style>
                <vl-map-layer-circle-style></vl-map-layer-circle-style>
            </vl-map-features-layer>
        </vl-map>
    `
);
MapFeaturesLayerDefault.storyName = 'vl-map-features-layer - default';
MapFeaturesLayerDefault.args = {
    featuresProp: {
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
    },
};
