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
    addFn: (id: string) => void,
    toggleFn: (id: string) => void,
    removeFn: (id: string) => void
) => {
    return layerIds.map(
        (id) =>
            html`
                <section class="vl-group vl-margin--small" id=${id}>
                    <vl-button id=${`add-${id}`} @click=${() => addFn(id)} icon="add"> Voeg laag ${id} toe </vl-button>
                    <vl-button
                        toggle
                        data-layer=${`Kaartlaag ${id}`}
                        on
                        id=${`toggle-${id}`}
                        @click=${() => toggleFn(id)}
                        icon="view-add"
                        hidden
                    >
                        Toggle laag ${id} zichtbaarheid
                    </vl-button>
                    <vl-button id=${`remove-${id}`} @click=${() => removeFn(id)} error icon="bin" hidden>
                        Verwijder laag ${id}
                    </vl-button>
                </section>
            `
    );
};
