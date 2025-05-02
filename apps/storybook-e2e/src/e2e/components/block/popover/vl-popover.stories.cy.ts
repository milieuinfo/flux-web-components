const popoverDefaultUrl = 'http://localhost:8080/iframe.html?id=components-block-popover--popover-default&viewMode=story';
const popoverHoverUrl = 'http://localhost:8080/iframe.html?id=components-block-popover--popover-hover&viewMode=story';
const popoverActionsUrl = 'http://localhost:8080/iframe.html?id=components-block-popover--popover-actions&viewMode=story';

describe('story vl-popover default', () => {
    it('should render', () => {
        cy.visit(popoverDefaultUrl);
    });
});

describe('story vl-popover hover', () => {
    it('should render', () => {
        cy.visit(popoverHoverUrl);
    });
});

describe('story vl-popover actions', () => {
    it('should render', () => {
        cy.visit(popoverActionsUrl);
    });
});
