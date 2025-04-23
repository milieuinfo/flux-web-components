import { html } from 'lit';

const featuresLayer1 = {
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

const layers = ['layer-1', 'layer-2'];

export const component = (active: boolean, defaultActive: boolean) => html`
    <vl-map>
        <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
        <vl-map-features-layer .features=${featuresLayer1} name="layer-1">
            <vl-map-layer-circle-style border-color="#000000"></vl-map-layer-circle-style>
        </vl-map-features-layer>
        <vl-map-features-layer .features=${featuresLayer2} name="layer-2" cluster cluster-distance="100">
            <vl-map-layer-circle-style
                color="rgba(255, 230, 21, 1)"
                border-color="#000000"
                text-color="#000000"
            ></vl-map-layer-circle-style>
        </vl-map-features-layer>
        <vl-map-select-actions .active=${active} .layers=${layers} ?default-active=${defaultActive} cluster>
            <vl-map-layer-circle-style
                color="#0099ff"
                text-color="#ffffff"
                border-color="#ffffff"
            ></vl-map-layer-circle-style>
        </vl-map-select-actions>
    </vl-map>
`;
