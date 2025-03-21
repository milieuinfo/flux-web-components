const contentBlockNextDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=styles-next-layout-afnemers-content-block--content-block-default&viewMode=story';

describe('story - content-block-next - default', () => {
    it('should render', () => {
        cy.visit(contentBlockNextDefaultUrl);

        cy.get('.vl-content-block-next').should('contain', 'Sub title');

        cy.get('.vl-content-block-next').shouldHaveComputedStyle({
            style: 'padding',
            value: '0px 30px',
        });
    });
});
