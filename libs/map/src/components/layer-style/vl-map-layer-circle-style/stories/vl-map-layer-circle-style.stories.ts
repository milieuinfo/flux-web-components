import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../../../../vl-map';
import '../../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import '../vl-map-layer-circle-style';
import { mapLayerCircleStyleArg, mapLayerCircleStyleArgTypes } from './vl-map-layer-circle-style.stories-arg';
import mapLayerCircleStyleDox from './vl-map-layer-circle-style.stories-doc.mdx';

export default {
    id: 'map-layer-style-layer-circle-style',
    title: 'map/layer-style/layer-circle-style',
    tags: ['autodocs'],
    args: mapLayerCircleStyleArg,
    argTypes: mapLayerCircleStyleArgTypes,
    parameters: {
        docs: {
            page: mapLayerCircleStyleDox,
        },
    },
} as Meta<typeof mapLayerCircleStyleArg>;

const Template = story(
    mapLayerCircleStyleArg,
    ({
        borderColor,
        borderSize,
        clusterColor,
        clusterTextColor,
        clusterMultiplier,
        color,
        name,
        size,
        textBackgroundColor,
        textBorderColor,
        textBorderSize,
        textColor,
        textFeatureAttributeName,
        textOffsetX,
        textOffsetY,
        textSize,
    }) => {
        const features = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [147055.0, 197908.0],
                    },
                    properties: {
                        label: 'A',
                    },
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [158755.0, 197208.0],
                    },
                    properties: {
                        label: 'B',
                    },
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [158755.0, 187208.0],
                    },
                    properties: {
                        label: 'C',
                    },
                },
            ],
        };

        return html` <vl-map>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-features-layer .features=${features}>
                <vl-map-layer-circle-style
                    border-color=${borderColor}
                    border-size=${borderSize}
                    cluster-color=${clusterColor}
                    cluster-multiplier=${clusterMultiplier}
                    cluster-text-color=${clusterTextColor}
                    color=${color}
                    name=${name}
                    size=${size}
                    text-background-color=${textBackgroundColor}
                    text-border-color=${textBorderColor}
                    text-border-size=${textBorderSize}
                    text-color=${textColor}
                    text-feature-attribute-name=${textFeatureAttributeName}
                    text-offset-x=${textOffsetX}
                    text-offset-y=${textOffsetY}
                    text-size=${textSize}
                ></vl-map-layer-circle-style>
            </vl-map-features-layer>
        </vl-map>`;
    }
);

export const MapLayerCircleStyleDefault = Template.bind({});
MapLayerCircleStyleDefault.storyName = 'vl-map-layer-circle-style - default';
MapLayerCircleStyleDefault.args = {
    borderColor: 'rgba(0, 0, 0, 1)',
    color: 'rgba(255, 230, 21, 1)',
};

export const MapLayerCircleStyleText = Template.bind({});
MapLayerCircleStyleText.storyName = 'vl-map-layer-circle-style - text';
MapLayerCircleStyleText.args = {
    borderColor: 'rgba(0, 0, 0, 1)',
    color: 'rgba(255, 230, 21, 1)',
    size: 12,
    textFeatureAttributeName: 'label',
    textColor: '#000',
    textSize: '18px',
};

export const MapLayerCircleStyleClustered = story(
    mapLayerCircleStyleArg,
    ({
        borderColor,
        borderSize,
        clusterColor,
        clusterTextColor,
        clusterMultiplier,
        color,
        name,
        size,
        textBackgroundColor,
        textBorderColor,
        textBorderSize,
        textColor,
        textFeatureAttributeName,
        textOffsetX,
        textOffsetY,
        textSize,
    }) => {
        const features = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [147055.0, 197908.0],
                    },
                    properties: {
                        label: 'A',
                    },
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [158755.0, 197208.0],
                    },
                    properties: {
                        label: 'B',
                    },
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [158755.0, 187208.0],
                    },
                    properties: {
                        label: 'C',
                    },
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [159755.0, 187208.0],
                    },
                    properties: {
                        label: 'D',
                    },
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [158955.0, 187208.0],
                    },
                    properties: {
                        label: 'D1',
                    },
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [160855.0, 187208.0],
                    },
                    properties: {
                        label: 'D2',
                    },
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [161855.0, 187208.0],
                    },
                    properties: {
                        label: 'D3',
                    },
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [158955.0, 188208.0],
                    },
                    properties: {
                        label: 'D4',
                    },
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [160855.0, 188208.0],
                    },
                    properties: {
                        label: 'D5',
                    },
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [161855.0, 188208.0],
                    },
                    properties: {
                        label: 'D6',
                    },
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [162855.0, 188208.0],
                    },
                    properties: {
                        label: 'D6',
                    },
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [159755.0, 177208.0],
                    },
                    properties: {
                        label: 'E3',
                    },
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [158755.0, 177208.0],
                    },
                    properties: {
                        label: 'E2',
                    },
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [158755.0, 186208.0],
                    },
                    properties: {
                        label: 'E1',
                    },
                },
            ],
        };

        return html` <vl-map>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-features-layer .features=${features} cluster cluster-distance="100">
                <vl-map-layer-circle-style
                    border-color=${borderColor}
                    border-size=${borderSize}
                    cluster-color=${clusterColor}
                    cluster-text-color=${clusterTextColor}
                    cluster-multiplier=${clusterMultiplier}
                    color=${color}
                    name=${name}
                    size=${size}
                    text-background-color=${textBackgroundColor}
                    text-border-color=${textBorderColor}
                    text-border-size=${textBorderSize}
                    text-color=${textColor}
                    text-feature-attribute-name=${textFeatureAttributeName}
                    text-offset-x=${textOffsetX}
                    text-offset-y=${textOffsetY}
                    text-size=${textSize}
                ></vl-map-layer-circle-style>
            </vl-map-features-layer>
        </vl-map>`;
    }
);
MapLayerCircleStyleClustered.storyName = 'vl-map-layer-circle-style - clustered';
MapLayerCircleStyleClustered.args = {
    borderColor: 'rgba(0, 0,0,1)',
    color: 'rgba(255, 230, 21, 1)',
    size: 12,
    textFeatureAttributeName: 'label',
    textColor: '#000',
    textSize: '18px',
};
