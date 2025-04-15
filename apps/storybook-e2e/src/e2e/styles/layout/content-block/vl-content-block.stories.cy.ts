const contentBlockNextDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=styles-layout-afnemers-content-block--content-block-default&viewMode=story';

describe('story - content-block - default', () => {
    it('should render', () => {
        cy.visit(contentBlockNextDefaultUrl);

        cy.get('.vl-content-block').should('contain', 'Sub title');

        cy.get('.vl-content-block').shouldHaveComputedStyle({
            style: 'padding',
            value: '0px 30px',
        });
    });
});
