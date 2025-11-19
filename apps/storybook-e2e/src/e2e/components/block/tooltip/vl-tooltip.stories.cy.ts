const tooltipDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-tooltip--tooltip-default&viewMode=story';
const tooltipAsLabelUrl =
    'http://localhost:8080/iframe.html?id=components-block-tooltip--tooltip-as-label&viewMode=story';

describe('cypress-e2e - block components - vl-tooltip - default story', () => {
    it('should render', () => {
        cy.visit(tooltipDefaultUrl);
        cy.get('vl-tooltip').should('exist');
    });
});

describe('cypress-e2e - block components - vl-tooltip - as label story', () => {
    it('should render', () => {
        cy.visit(tooltipAsLabelUrl);
        cy.get('vl-tooltip').should('exist');
    });
});

