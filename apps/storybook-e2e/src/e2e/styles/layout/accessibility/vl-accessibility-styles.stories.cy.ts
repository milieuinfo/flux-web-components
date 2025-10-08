const visuallyHiddenurl =
    'http://localhost:8080/iframe.html?args=&id=styles-layout-afnemers-accessibility--visually-hidden-default&viewMode=story';

describe('cypress-e2e - layout - vl-accessibility styles - visually hidden story', () => {
    it('should render - vl-visually-hidden', () => {
        cy.visit(visuallyHiddenurl);

        cy.get('.vl-visually-hidden').should('exist');
    });
});
