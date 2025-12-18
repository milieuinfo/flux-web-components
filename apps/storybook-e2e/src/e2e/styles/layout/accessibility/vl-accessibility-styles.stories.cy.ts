const visuallyHiddenurl =
    'http://localhost:8080/iframe.html?args=&id=styles-layout-accessibility--visually-hidden-default&viewMode=story';
const skipLinkurl =
    'http://localhost:8080/iframe.html?args=&id=styles-layout-accessibility--skip-link-default&viewMode=story';

describe('cypress-e2e - layout - vl-accessibility styles - visually hidden story', () => {
    it('should render - vl-visually-hidden', () => {
        cy.visit(visuallyHiddenurl);

        cy.get('.vl-visually-hidden').should('exist');
    });
});

describe('cypress-e2e - layout - vl-accessibility styles - skip link story', () => {
    it('should render - vl-skip-link', () => {
        cy.visit(skipLinkurl);

        cy.get('.vl-skip-link').should('exist');
    });
});
