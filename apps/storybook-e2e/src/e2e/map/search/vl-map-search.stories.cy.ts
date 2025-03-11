const searchUrl = 'http://localhost:8080/iframe.html?id=map-search--map-search-default&viewMode=story';

describe('story vl-map-search default', () => {
    it('should position options for extended functionality below select element', () => {
        cy.visit(searchUrl);

        cy.get('vl-map')
            .shadow()
            .find('vl-map-search')
            .shadow()
            .find('vl-search')
            .find('vl-select-location-next')
            .parent()
            .parent()
            .click();

        cy.get('vl-map')
            .shadow()
            .find('vl-map-search')
            .shadow()
            .find('vl-search')
            .find('vl-select-location-next')
            .parent()
            .parent()
            .should('not.have.class', 'is-flipped');

        cy.get('vl-map')
            .shadow()
            .find('vl-map-search')
            .shadow()
            .find('vl-search')
            .find('vl-select-location-next')
            .should('have.attr', 'position', 'bottom');
    });
});
