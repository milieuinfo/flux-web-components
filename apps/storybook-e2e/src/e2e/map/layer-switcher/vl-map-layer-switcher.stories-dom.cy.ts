const mapLayerSwitcherDefaultUrl =
    'http://localhost:8080/iframe.html?id=map-layer-switcher--map-layer-switcher-default&viewMode=story';
const mapLayerSwitcherSpecialisedUrl =
    'http://localhost:8080/iframe.html?id=map-layer-switcher--map-layer-switcher-subselection&viewMode=story';

describe('cypress-e2e - map - vl-map-layer-switcher - dom default story', () => {
    it('should display all layers', () => {
        const layers = ['Kaartlaag 1', 'Kaartlaag 2', 'Kaartlaag 3'];

        cy.visit(mapLayerSwitcherDefaultUrl);

        cy.get('vl-map')
            .find('vl-map-layer-switcher')
            .shadow()
            .find('vl-checkbox')
            .should('have.length', 3)
            .each((checkbox: HTMLInputElement, index) => {
                cy.wrap(checkbox).should('contain.text', layers[index]);
            });
    });
});

describe('cypress-e2e - map - vl-map-layer-switcher - subselection story', () => {
    it('should display a subselection of layers', () => {
        const layers = ['Kaartlaag 1', 'Kaartlaag 2'];

        cy.visit(mapLayerSwitcherSpecialisedUrl);

        cy.get('vl-map')
            .find('vl-map-layer-switcher')
            .shadow()
            .find('vl-checkbox')
            .should('have.length', 2)
            .each((checkbox: HTMLInputElement, index) => {
                cy.wrap(checkbox).should('contain.text', layers[index]);
            });
    });
});
