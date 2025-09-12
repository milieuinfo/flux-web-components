import { story } from '@domg-wc/common-storybook';
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
        <vl-map lambert2008>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-features-layer .features=${features} projection-code="EPSG:31370">
                <vl-map-select-action .active=${active} data-vl-default-active=${defaultActive}></vl-map-select-action>
                <vl-map-layer-circle-style data-vl-border-color="#000000"></vl-map-layer-circle-style>
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
        <vl-map lambert2008>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-features-layer .features=${features} projection-code="EPSG:31370">
                <vl-map-select-action .active=${active} data-vl-default-active=${defaultActive}>
                    <vl-map-layer-circle-style
                        data-vl-color="#ff0000"
                        data-vl-border-color="#000000"
                    ></vl-map-layer-circle-style>
                </vl-map-select-action>
                <vl-map-layer-circle-style data-vl-border-color="#000000"></vl-map-layer-circle-style>
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
        <vl-map lambert2008>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-features-layer
                .features=${features}
                data-vl-cluster
                data-vl-cluster-distance="100"
                projection-code="EPSG:31370"
            >
                <vl-map-select-action
                    .active=${active}
                    data-vl-default-active=${defaultActive}
                    ?data-vl-cluster=${cluster}
                >
                    <vl-map-layer-circle-style
                        data-vl-color="#0099ff"
                        data-vl-text-color="#ffffff"
                        data-vl-border-color="#ffffff"
                    ></vl-map-layer-circle-style>
                </vl-map-select-action>
                <vl-map-layer-circle-style data-vl-border-color="#000000"></vl-map-layer-circle-style>
            </vl-map-features-layer>
        </vl-map>
    `
);
MapSelectActionClustering.storyName = 'vl-map-select-action - clustering';
MapSelectActionClustering.args = {
    active: true,
    cluster: true,
};
