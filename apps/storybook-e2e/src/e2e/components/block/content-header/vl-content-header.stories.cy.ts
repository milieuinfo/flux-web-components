const contentHeaderUrl =
    'http://localhost:8080/iframe.html?id=components-block-content-header--content-header-default&viewMode=story';

describe('story vl-content-header', () => {
    it('should be accessible', () => {
        cy.visitWithA11y(`${contentHeaderUrl}`);
        cy.get('vl-content-header')
            .find('a')
            .eq(0)
            .should('contain.text', 'Context')
            .next()
            .should('contain.text', 'Vlaanderen');
    });

    it('should contain a context link and title link', () => {
        cy.visit(`${contentHeaderUrl}`);
        cy.get('vl-content-header')
            .find('a')
            .eq(0)
            .should('contain.text', 'Context')
            .next()
            .should('contain.text', 'Vlaanderen');
    });

    it('should contain an image', () => {
        cy.visit(`${contentHeaderUrl}`);
        cy.get('vl-content-header').get('img');
    });
});
