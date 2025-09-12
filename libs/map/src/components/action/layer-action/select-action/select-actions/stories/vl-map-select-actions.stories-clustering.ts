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
    <vl-map lambert2008>
        <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
        <vl-map-features-layer .features=${featuresLayer1} data-vl-name="layer-1" projection-code="EPSG:31370">
            <vl-map-layer-circle-style data-vl-border-color="#000000"></vl-map-layer-circle-style>
        </vl-map-features-layer>
        <vl-map-features-layer
            .features=${featuresLayer2}
            data-vl-name="layer-2"
            data-vl-cluster
            data-vl-cluster-distance="100"
            projection-code="EPSG:31370"
        >
            <vl-map-layer-circle-style
                data-vl-color="rgba(255, 230, 21, 1)"
                data-vl-border-color="#000000"
                data-vl-text-color="#000000"
            ></vl-map-layer-circle-style>
        </vl-map-features-layer>
        <vl-map-select-actions
            .active=${active}
            .layers=${layers}
            ?data-vl-default-active=${defaultActive}
            data-vl-cluster
        >
            <vl-map-layer-circle-style
                data-vl-color="#0099ff"
                data-vl-text-color="#ffffff"
                data-vl-border-color="#ffffff"
            ></vl-map-layer-circle-style>
        </vl-map-select-actions>
    </vl-map>
`;
