const tooltipDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-tooltip--tooltip-default&viewMode=story';

describe('cypress-e2e - block components - vl-tooltip - default story', () => {
    it('should render', () => {
        cy.visit(tooltipDefaultUrl);
    });
});

