import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import '../../../../../vl-map';
import '../../../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../../../../layer-style/vl-map-layer-circle-style/vl-map-layer-circle-style';
import '../../../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import '../vl-map-select-action';
import { mapSelectActionArgs, mapSelectActionArgTypes } from './vl-map-select-action.stories-arg';
import mapSelectActionDoc from './vl-map-select-action.stories-doc.mdx';

export default {
    id: 'map-action-layer-action-select-action',
    title: 'map/action/layer-action/select-action',
    tags: ['autodocs'],
    args: mapSelectActionArgs,
    argTypes: mapSelectActionArgTypes,
    parameters: {
        docs: {
            page: mapSelectActionDoc,
        },
    },
} as Meta<typeof mapSelectActionArgs>;

const features = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            id: 1,
            geometry: {
                type: 'Point',
                coordinates: [146055.0, 196908.0],
            },
        },
        {
            type: 'Feature',
            id: 2,
            geometry: {
                type: 'Point',
                coordinates: [149055.0, 199908.0],
            },
        },
        {
            type: 'Feature',
            id: 3,
            geometry: {
                type: 'Point',
                coordinates: [152055.0, 202908.0],
            },
        },
    ],
};

export const MapSelectActionDefault = story(
    mapSelectActionArgs,
    ({ active, defaultActive }) => html`
        <vl-map>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-features-layer .features=${features}>
                <vl-map-select-action .active=${active} default-active=${defaultActive}></vl-map-select-action>
                <vl-map-layer-circle-style border-color="#000000"></vl-map-layer-circle-style>
            </vl-map-features-layer>
        </vl-map>
    `
);
MapSelectActionDefault.storyName = 'vl-map-select-action - default';
MapSelectActionDefault.args = {
    active: true,
};

export const MapSelectActionCustomStyle = story(
    mapSelectActionArgs,
    ({ active, defaultActive }) => html`
        <vl-map>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-features-layer .features=${features}>
                <vl-map-select-action .active=${active} default-active=${defaultActive}>
                    <vl-map-layer-circle-style color="#ff0000" border-color="#000000"></vl-map-layer-circle-style>
                </vl-map-select-action>
                <vl-map-layer-circle-style border-color="#000000"></vl-map-layer-circle-style>
            </vl-map-features-layer>
        </vl-map>
    `
);
MapSelectActionCustomStyle.storyName = 'vl-map-select-action - custom style';
MapSelectActionCustomStyle.args = {
    active: true,
};

export const MapSelectActionClustering = story(
    mapSelectActionArgs,
    ({ active, defaultActive, cluster }) => html`
        <vl-map>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-features-layer .features=${features} cluster cluster-distance="100">
                <vl-map-select-action .active=${active} default-active=${defaultActive} ?cluster=${cluster}>
                    <vl-map-layer-circle-style
                        color="#0099ff"
                        text-color="#ffffff"
                        border-color="#ffffff"
                    ></vl-map-layer-circle-style>
                </vl-map-select-action>
                <vl-map-layer-circle-style border-color="#000000"></vl-map-layer-circle-style>
            </vl-map-features-layer>
        </vl-map>
    `
);
MapSelectActionClustering.storyName = 'vl-map-select-action - clustering';
MapSelectActionClustering.args = {
    active: true,
    cluster: true,
};
