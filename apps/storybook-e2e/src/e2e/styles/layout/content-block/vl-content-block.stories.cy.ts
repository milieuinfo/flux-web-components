const contentBlockDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=styles-layout-afnemers-content-block--content-block-default&viewMode=story';
const contentBlockFullWidthUrl =
    'http://localhost:8080/iframe.html?args=&id=styles-layout-afnemers-content-block--content-block-full-width&viewMode=story';

describe('story - content-block', () => {
    it('should render - default', () => {
        cy.visit(contentBlockDefaultUrl);

        cy.get('.vl-content-block').should('contain', 'Sub title');

        cy.get('.vl-content-block').shouldHaveComputedStyle({
            style: 'padding',
            value: '0px 30px',
        });
    });

    it('should render - full width', () => {
        cy.visit(contentBlockFullWidthUrl);

        cy.get('.vl-content-block').should('have.class', 'vl-content-block--full-width');
    });
});
