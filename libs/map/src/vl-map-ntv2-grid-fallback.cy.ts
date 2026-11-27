import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import type OlPoint from 'ol/geom/Point';
import { VlMapFeaturesLayer } from './components/layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import { NTV2_GRID_URL } from './utils/lambert-transformation';
import { VlMap } from './vl-map';

registerWebComponents([VlMap, VlMapFeaturesLayer]);

const lambert72Feature = JSON.stringify({
    type: 'FeatureCollection',
    features: [{ type: 'Feature', id: 1, geometry: { type: 'Point', coordinates: [153055, 203908] }, properties: {} }],
});

// Een mislukte download blijft page-globaal gelden, dus deze test staat in een eigen spec.
describe('cypress-component - map - vl-map - ntv2-grid - when the grid cannot be loaded', () => {
    it('should keep the Helmert transformation and log exactly one console.error', () => {
        cy.intercept('GET', NTV2_GRID_URL, { statusCode: 404 }).as('grid');
        cy.window().then((win) => cy.spy(win.console, 'error').as('consoleError'));
        cy.mount(html`
            <vl-map lambert2008 ntv2-grid>
                <vl-map-features-layer
                    projection-code="EPSG:31370"
                    features=${lambert72Feature}
                ></vl-map-features-layer>
                <vl-map-features-layer
                    projection-code="EPSG:31370"
                    features=${lambert72Feature}
                ></vl-map-features-layer>
            </vl-map>
        `);

        cy.get<VlMapFeaturesLayer>('vl-map-features-layer', { timeout: 10000 })
            .should(($layers) => {
                expect($layers).to.have.length(2);
                $layers.toArray().forEach((layer) => expect(layer.features).to.have.length(1));
            })
            .then(($layers) => {
                $layers.toArray().forEach((layer) => {
                    const coordinates = (layer.getFeature(1).getGeometry() as OlPoint).getCoordinates();
                    expect(coordinates).to.deep.equal([653050.623011303, 703908.5023996672]);
                });
            });
        cy.get('@grid.all').should('have.length', 1);
        cy.get('@consoleError').should('have.been.calledOnce').and('have.been.calledWithMatch', NTV2_GRID_URL);
        cy.get<VlMap>('vl-map').its('0.lambertTransformation').should('equal', 'helmert');
    });
});
