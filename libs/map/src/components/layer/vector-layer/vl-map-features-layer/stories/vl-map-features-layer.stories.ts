import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import '../../../../../vl-map';
import '../../../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../../../../layer-style/vl-map-layer-style';
import '../vl-map-features-layer';
import { mapFeaturesLayerArgs, mapFeaturesLayerArgTypes } from './vl-map-features-layer.stories-arg';
import mapFeaturesLayerDoc from './vl-map-features-layer.stories-doc.mdx';

const redPolygonFeatures = JSON.stringify({
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            id: 10,
            geometry: {
                type: 'Polygon',
                coordinates: [[[80000, 180000], [120000, 180000], [120000, 210000], [80000, 210000], [80000, 180000]]],
            },
        },
    ],
});

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
        zIndex,
    }) => html`
        <vl-map lambert2008>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-features-layer
                ?auto-extent=${autoExtent}
                auto-extent-max-zoom=${autoExtentMaxZoom}
                ?cluster=${cluster}
                cluster-distance=${clusterDistance}
                features=${features}
                .features=${featuresProp}
                ?hidden=${hidden}
                max-resolution=${maxResolution}
                min-resolution=${minResolution}
                name=${name}
                opacity=${opacity}
                projection-code="EPSG:31370"
                z-index=${zIndex}
            >
                <vl-map-layer-style border-size="2"></vl-map-layer-style>
                <vl-map-layer-circle-style></vl-map-layer-circle-style>
            </vl-map-features-layer>
            <vl-map-features-layer
                name="rode laag"
                features=${redPolygonFeatures}
                projection-code="EPSG:31370"
                z-index="1"
            >
                <vl-map-layer-style
                    color="rgba(204, 40, 40, 0.6)"
                    border-color="rgba(204, 40, 40, 1)"
                    border-size="2"
                ></vl-map-layer-style>
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
