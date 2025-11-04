const popoverDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-popover--popover-default&viewMode=story';
const popoverTooltipUrl =
    'http://localhost:8080/iframe.html?id=components-block-popover--popover-tooltip&viewMode=story';
const popoverActionsUrl =
    'http://localhost:8080/iframe.html?id=components-block-popover--popover-actions&viewMode=story';

describe('cypress-e2e - block components - vl-popover - default story', () => {
    it('should render', () => {
        cy.visit(popoverDefaultUrl);
    });
});

describe('cypress-e2e - block components - vl-popover - tooltip story', () => {
    it('should render', () => {
        cy.visit(popoverTooltipUrl);
    });
});

describe('cypress-e2e - block components - vl-popover - actions story', () => {
    it('should render', () => {
        cy.visit(popoverActionsUrl);
    });
});
