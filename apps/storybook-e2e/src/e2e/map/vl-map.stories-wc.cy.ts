import { VlMapFeaturesLayer } from '@domg-wc/map';

const mapPlaygroundUrl = 'http://localhost:8080/iframe.html?id=map-map--map-playground&viewMode=story';

describe('cypress-e2e - map - vl-map - wc playground story', () => {
    it('should adjust opacity of shapes layer', () => {
        cy.visit(mapPlaygroundUrl);

        cy.runTestFor<VlMapFeaturesLayer>('vl-map-features-layer[name="Shapes"]', (shapesLayer) => {
            expect(shapesLayer.opacity).to.equal(1);
        });

        cy.createStubForEvent('vl-input-slider', 'vl-change-value');
        cy.get('vl-input-slider').invoke('attr', 'value', 50);
        cy.get('@vl-change-value').should('have.been.calledOnce');

        cy.runTestFor<VlMapFeaturesLayer>('vl-map-features-layer[name="Shapes"]', (shapesLayer) => {
            expect(shapesLayer.opacity).to.equal(0.5);
        });
    });
});
