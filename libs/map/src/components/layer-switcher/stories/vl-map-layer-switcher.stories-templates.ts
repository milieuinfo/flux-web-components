import { html } from 'lit-html';

export const mapLayersToAddOrRemove = () => {
    const features1 = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: { type: 'Point', coordinates: [149055.0, 199908.0] },
            },
        ],
    };
    const features2 = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: { type: 'Point', coordinates: [154055.0, 199908.0] },
            },
        ],
    };
    const features3 = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: { type: 'Point', coordinates: [159055.0, 199908.0] },
            },
        ],
    };
    return html`
        <vl-map-features-layer name="Kaartlaag zwart" .features=${features1} id="zwart">
            <vl-map-layer-circle-style color="black"></vl-map-layer-circle-style>
        </vl-map-features-layer>
        <vl-map-features-layer name="Kaartlaag geel" .features=${features2} id="geel">
            <vl-map-layer-circle-style color="yellow"></vl-map-layer-circle-style>
        </vl-map-features-layer>
        <vl-map-features-layer name="Kaartlaag rood" .features=${features3} id="rood">
            <vl-map-layer-circle-style color="red"></vl-map-layer-circle-style>
        </vl-map-features-layer>
    `;
};

export const storyControlTemplates = (
    layerIds: string[],
    addFn: (id: string, event: Event) => void,
    removeFn: (id: string, event: Event) => void
) => {
    return layerIds.map(
        (id) =>
            html`
                <section id=${id}>
                    <button
                        id=${`add-${id}`}
                        @click=${(event: Event) => {
                            addFn(id, event);
                        }}
                    >
                        toevoegen ${id} laag
                    </button>
                    <button
                        id=${`remove-${id}`}
                        disabled
                        @click=${(event: Event) => {
                            removeFn(id, event);
                        }}
                    >
                        verwijderen ${id} laag
                    </button>
                </section>
            `
    );
};
