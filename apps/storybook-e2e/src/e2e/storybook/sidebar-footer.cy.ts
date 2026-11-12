describe('cypress-e2e - storybook - manager - sidebar footer', () => {
    it('should show the custom footer with a link and logo in the sidebar', () => {
        cy.visit('/');
        cy.get('.sidebar-container #sb-custom-sidebar-footer').should('be.visible');
        cy.get('#sb-custom-sidebar-footer a[href="https://omgeving.vlaanderen.be"]')
            .should('be.visible')
            .find('img')
            .should('be.visible')
            .and('have.attr', 'alt', 'Vlaanderen is kwaliteitsvolle omgeving - Vlaanderen.be')
            .and(($img) => {
                expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0);
            });
    });
});
