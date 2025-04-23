import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../../../vl-map';
import '../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import '../vl-map-layer-style';
import { mapLayerStyleArg, mapLayerStyleArgTypes } from './vl-map-layer-style.stories-arg';
import mapLayerStyleDoc from './vl-map-layer-style.stories-doc.mdx';

export default {
    id: 'map-layer-style',
    title: 'map/layer-style',
    tags: ['autodocs'],
    args: mapLayerStyleArg,
    argTypes: mapLayerStyleArgTypes,
    parameters: {
        docs: {
            page: mapLayerStyleDoc,
        },
    },
} as Meta<typeof mapLayerStyleArg>;

const Template = story(
    mapLayerStyleArg,
    ({
        borderColor,
        borderSize,
        color,
        name,
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
                        type: 'Polygon',
                        coordinates: [
                            [
                                [147055.0, 197908.0],
                                [157055.0, 197908.0],
                                [157055.0, 187908.0],
                                [147055.0, 187908.0],
                                [147055.0, 197908.0],
                            ],
                        ],
                    },
                    properties: { label: 'Text' },
                },
            ],
        };

        return html` <vl-map>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-features-layer .features=${features}>
                <vl-map-layer-style
                    border-color=${borderColor}
                    border-size=${borderSize}
                    color=${color}
                    name=${name}
                    text-background-color=${textBackgroundColor}
                    text-border-color=${textBorderColor}
                    text-border-size=${textBorderSize}
                    text-color=${textColor}
                    text-feature-attribute-name=${textFeatureAttributeName}
                    text-offset-x=${textOffsetX}
                    text-offset-y=${textOffsetY}
                    text-size=${textSize}
                >
                </vl-map-layer-style>
            </vl-map-features-layer>
        </vl-map>`;
    }
);
export const MapLayerStyleDefault = Template.bind({});
MapLayerStyleDefault.storyName = 'vl-map-layer-style - default';

export const MapLayerStyleText = Template.bind({});
MapLayerStyleText.storyName = 'vl-map-layer-style - text';
MapLayerStyleText.args = {
    textColor: 'rgba(255, 255, 255, 1)',
    textFeatureAttributeName: 'label',
    textSize: '12px',
};

export const MapLayerStyleLegend = story(
    mapLayerStyleArg,
    ({
        borderColor,
        borderSize,
        color,
        name,
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
                        type: 'Polygon',
                        coordinates: [
                            [
                                [147055.0, 197908.0],
                                [157055.0, 197908.0],
                                [157055.0, 187908.0],
                                [147055.0, 187908.0],
                                [147055.0, 197908.0],
                            ],
                        ],
                    },
                    properties: { label: 'Text' },
                },
            ],
        };

        return html` <vl-map>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-features-layer .features=${features}>
                <vl-map-layer-style
                    border-color=${borderColor}
                    border-size=${borderSize}
                    color=${color}
                    name=${name}
                    text-background-color=${textBackgroundColor}
                    text-border-color=${textBorderColor}
                    text-border-size=${textBorderSize}
                    text-color=${textColor}
                    text-feature-attribute-name=${textFeatureAttributeName}
                    text-offset-x=${textOffsetX}
                    text-offset-y=${textOffsetY}
                    text-size=${textSize}
                >
                </vl-map-layer-style>
            </vl-map-features-layer>
            <vl-map-legend></vl-map-legend>
        </vl-map>`;
    }
);
MapLayerStyleLegend.storyName = 'vl-map-layer-style - legend';
MapLayerStyleLegend.args = {
    name: 'Laag 1',
};
