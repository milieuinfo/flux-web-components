const visuallyHiddenurl =
    'http://localhost:8080/iframe.html?args=&id=styles-layout-afnemers-accessibility--visually-hidden-default&viewMode=story';

describe('story - accessibility styles', () => {
    it('should render - vl-visually-hidden', () => {
        cy.visit(visuallyHiddenurl);

        cy.get('.vl-visually-hidden').should('exist');
    });
});
