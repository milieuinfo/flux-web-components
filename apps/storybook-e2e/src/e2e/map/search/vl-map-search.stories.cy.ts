const searchUrl = 'http://localhost:8080/iframe.html?id=map-search--map-search-default&viewMode=story';

describe('cypress-e2e - map - vl-map-search - default story', () => {
    it('should position options for extended functionality below select element', () => {
        cy.visit(searchUrl);

        cy.get('vl-map')
            .shadow()
            .find('vl-map-search')
            .shadow()
            .find('vl-search')
            .find('vl-select-location')
            .parent()
            .parent()
            .click();

        cy.get('vl-map')
            .shadow()
            .find('vl-map-search')
            .shadow()
            .find('vl-search')
            .find('vl-select-location')
            .parent()
            .parent()
            .should('not.have.class', 'is-flipped');

        cy.get('vl-map')
            .shadow()
            .find('vl-map-search')
            .shadow()
            .find('vl-search')
            .find('vl-select-location')
            .should('have.attr', 'position', 'bottom');
    });
});
