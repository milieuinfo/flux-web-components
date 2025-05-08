const progressBarUrl =
    'http://localhost:8080/iframe.html?id=components-block-progress-indicator--progress-indicator-default&viewMode=story';
const progressBarNumericUrl =
    'http://localhost:8080/iframe.html?id=components-block-progress-indicator--progress-indicator-numeric&viewMode=story';
const progressBarFocusedUrl =
    'http://localhost:8080/iframe.html?id=components-block-progress-indicator--progress-indicator-focused&viewMode=story';

describe('story vl-progress-indicator - default', () => {
    it('should display story', () => {
        cy.visit(progressBarUrl);
        cy.get('vl-progress-indicator').shadow();
    });
});

describe('story vl-progress-indicator numeric', () => {
    it('should display story', () => {
        cy.visit(progressBarNumericUrl);
        cy.get('vl-progress-indicator').shadow();
    });
});

describe('story vl-progress-indicator focused', () => {
    it('should display story', () => {
        cy.visit(progressBarFocusedUrl);
        cy.get('vl-progress-indicator').shadow();
    });
});
