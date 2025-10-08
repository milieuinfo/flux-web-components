const mapDrawActionStyleUrl =
    'http://localhost:8080/iframe.html?args=&id=map-action-draw-action-draw-action-style--map-draw-action-style-default&viewMode=story';

describe('cypress-e2e - map - vl-map-draw-action-style - default story', () => {
    it('should mount the component', () => {
        cy.visit(mapDrawActionStyleUrl);
        cy.get('vl-map-draw-action-style').then(($styleElement) => {
            const drawActionElementStyle = $styleElement[0].parentNode.style;

            expect(drawActionElementStyle.getFill().getColor()).to.eq('rgba(255, 105, 180, 0.8)');
        });
    });
});
