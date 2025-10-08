const popoverDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-popover--popover-default&viewMode=story';
const popoverHoverUrl = 'http://localhost:8080/iframe.html?id=components-block-popover--popover-hover&viewMode=story';
const popoverActionsUrl =
    'http://localhost:8080/iframe.html?id=components-block-popover--popover-actions&viewMode=story';

describe('cypress-e2e - block components - vl-popover - default story', () => {
    it('should render', () => {
        cy.visit(popoverDefaultUrl);
    });
});

describe('cypress-e2e - block components - vl-popover - hover story', () => {
    it('should render', () => {
        cy.visit(popoverHoverUrl);
    });
});

describe('cypress-e2e - block components - vl-popover - actions story', () => {
    it('should render', () => {
        cy.visit(popoverActionsUrl);
    });
});
