const progressIndicatorUrl =
    'http://localhost:8080/iframe.html?id=components-block-progress-indicator--progress-indicator-default&viewMode=story';
const progressIndicatorNumericUrl =
    'http://localhost:8080/iframe.html?id=components-block-progress-indicator--progress-indicator-numeric&viewMode=story';
const progressIndicatorFocusedUrl =
    'http://localhost:8080/iframe.html?id=components-block-progress-indicator--progress-indicator-focused&viewMode=story';

describe('cypress-e2e - block components - vl-progress-indicator - default story', () => {
    it('should display story', () => {
        cy.visit(progressIndicatorUrl);
        cy.get('vl-progress-indicator').shadow();
    });
});

describe('cypress-e2e - block components - vl-progress-indicator - numeric story', () => {
    it('should display story', () => {
        cy.visit(progressIndicatorNumericUrl);
        cy.get('vl-progress-indicator').shadow();
    });
});

describe('cypress-e2e - block components - vl-progress-indicator - focused story', () => {
    it('should display story', () => {
        cy.visit(progressIndicatorFocusedUrl);
        cy.get('vl-progress-indicator').shadow();
    });
});
