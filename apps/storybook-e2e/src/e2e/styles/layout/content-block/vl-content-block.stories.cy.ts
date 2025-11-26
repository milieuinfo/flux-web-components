const contentBlockDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=styles-layout-content-block--content-block-default&viewMode=story';
const contentBlockFullWidthUrl =
    'http://localhost:8080/iframe.html?args=&id=styles-layout-content-block--content-block-full-width&viewMode=story';

describe('cypress-e2e - layout - vl-content-block - default story', () => {
    it('should render - default', () => {
        cy.visit(contentBlockDefaultUrl);

        cy.get('.vl-content-block').should('contain', 'Sub title');

        cy.get('.vl-content-block').shouldHaveComputedStyle({
            style: 'padding',
            value: '0px 30px',
        });
    });
});

describe('cypress-e2e - layout - vl-content-block - full width story', () => {
    it('should render - full width', () => {
        cy.visit(contentBlockFullWidthUrl);

        cy.get('.vl-content-block').should('have.class', 'vl-content-block--full-width');
    });
});
