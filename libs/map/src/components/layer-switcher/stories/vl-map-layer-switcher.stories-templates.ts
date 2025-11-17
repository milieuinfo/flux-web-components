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
        <vl-map-features-layer data-vl-name="Kaartlaag zwart" .features=${features1} id="zwart">
            <vl-map-layer-circle-style data-vl-color="black"></vl-map-layer-circle-style>
        </vl-map-features-layer>
        <vl-map-features-layer data-vl-name="Kaartlaag geel" .features=${features2} id="geel">
            <vl-map-layer-circle-style data-vl-color="yellow"></vl-map-layer-circle-style>
        </vl-map-features-layer>
        <vl-map-features-layer data-vl-name="Kaartlaag rood" .features=${features3} id="rood">
            <vl-map-layer-circle-style data-vl-color="red"></vl-map-layer-circle-style>
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
                <section class="vl-group-next vl-margin-next--small" id=${id}>
                    <vl-button-next id=${`add-${id}`} @click=${() => addFn(id)} icon="add">
                        Voeg laag ${id} toe
                    </vl-button-next>
                    <vl-button-next
                        toggle
                        data-layer=${`Kaartlaag ${id}`}
                        on
                        id=${`toggle-${id}`}
                        @click=${() => toggleFn(id)}
                        icon="view-add"
                        hidden
                    >
                        Toggle laag ${id} zichtbaarheid
                    </vl-button-next>
                    <vl-button-next id=${`remove-${id}`} @click=${() => removeFn(id)} error icon="bin" hidden>
                        Verwijder laag ${id}
                    </vl-button-next>
                </section>
            `
    );
};
