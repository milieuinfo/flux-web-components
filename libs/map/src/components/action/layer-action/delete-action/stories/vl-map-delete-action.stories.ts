import { story } from '@domg-wc/common-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import '../../../../../vl-map';
import '../../../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../../../../layer-style/vl-map-layer-circle-style/vl-map-layer-circle-style';
import '../../../../layer-style/vl-map-layer-style';
import '../../../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import { mapActionArgs, mapActionArgTypes } from '../../../stories/vl-map-action.stories-arg';
import '../vl-map-delete-action';
import mapDeleteActionDoc from './vl-map-delete-action.stories-doc.mdx';

export default {
    id: 'map-action-layer-action-delete-action',
    title: 'map/action/layer-action/delete-action',
    tags: ['autodocs'],
    args: mapActionArgs,
    argTypes: mapActionArgTypes,
    parameters: {
        docs: {
            page: mapDeleteActionDoc,
        },
    },
} as Meta<typeof mapActionArgs>;

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

export const MapDeleteActionDefault = story(
    mapActionArgs,
    ({ active, defaultActive }) => html`
        <vl-map lambert2008>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-features-layer .features=${features} projection-code="EPSG:31370">
                <vl-map-delete-action .active=${active} ?data-vl-default-active=${defaultActive}></vl-map-delete-action>
                <vl-map-layer-style data-vl-border-size="2"></vl-map-layer-style>
                <vl-map-layer-circle-style data-vl-border-size="2"></vl-map-layer-circle-style>
            </vl-map-features-layer>
        </vl-map>
    `
);
MapDeleteActionDefault.storyName = 'vl-map-delete-action - default';
MapDeleteActionDefault.args = {
    active: true,
};

export const MapDeleteActionCustomStyle = story(
    mapActionArgs,
    ({ active, defaultActive }) => html`
        <vl-map lambert2008>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-features-layer .features=${features} projection-code="EPSG:31370">
                <vl-map-delete-action .active=${active} ?data-vl-default-active=${defaultActive}>
                    <vl-map-layer-style
                        data-vl-text-color="#000"
                        data-vl-color="rgba(255, 230, 21, 0.2)"
                        data-vl-border-color="rgba(255, 230, 21, 1)"
                        data-vl-border-size="2"
                    ></vl-map-layer-style>
                </vl-map-delete-action>
                <vl-map-layer-style data-vl-border-size="2"></vl-map-layer-style>
                <vl-map-layer-circle-style data-vl-border-size="2"></vl-map-layer-circle-style>
            </vl-map-features-layer>
        </vl-map>
    `
);
MapDeleteActionCustomStyle.storyName = 'vl-map-delete-action - custom style';
MapDeleteActionCustomStyle.args = {
    active: true,
};
