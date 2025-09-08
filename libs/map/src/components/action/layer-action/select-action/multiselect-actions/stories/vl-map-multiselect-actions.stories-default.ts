import { html } from 'lit';

const featuresLayer1 = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            id: 1,
            geometry: {
                type: 'Point',
                coordinates: [175000, 184000],
            },
        },
    ],
};

const featuresLayer2 = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            id: 2,
            geometry: {
                type: 'Point',
                coordinates: [175000, 185000],
            },
        },
    ],
};

const featuresLayer3 = {
    type: 'Feature',
    id: 3,
    geometry: {
        type: 'Polygon',
        coordinates: [
            [
                [144000, 171000],
                [200000, 171000],
                [200000, 205000],
                [144000, 205000],
                [144000, 171000],
            ],
        ],
    },
};

const layers = ['layer-1', 'layer-2', 'layer-3'];

export const component = (active: boolean, defaultActive: boolean) => html`
    <vl-map lambert2008>
        <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
        <vl-map-features-layer name="layer-3" .features=${featuresLayer3} projection-code="EPSG:31370">
            <vl-map-layer-style border-size="2"></vl-map-layer-style>
            <vl-map-layer-circle-style></vl-map-layer-circle-style>
        </vl-map-features-layer>
        <vl-map-features-layer .features=${featuresLayer1} name="layer-1" projection-code="EPSG:31370">
            <vl-map-layer-circle-style color="rgba(0, 255, 21, 1)" border-color="#000000"></vl-map-layer-circle-style>
        </vl-map-features-layer>
        <vl-map-features-layer .features=${featuresLayer2} name="layer-2" projection-code="EPSG:31370">
            <vl-map-layer-circle-style color="rgba(255, 230, 21, 1)" border-color="#000000"></vl-map-layer-circle-style>
        </vl-map-features-layer>
        <vl-map-multiselect-actions .active=${active} .layers=${layers} ?default-active=${defaultActive}>
        </vl-map-multiselect-actions>
    </vl-map>
`;
