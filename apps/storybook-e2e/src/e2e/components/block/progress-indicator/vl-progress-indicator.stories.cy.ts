const progressIndicatorUrl =
    'http://localhost:8080/iframe.html?id=components-block-progress-indicator--progress-indicator-default&viewMode=story';
const progressIndicatorNumericUrl =
    'http://localhost:8080/iframe.html?id=components-block-progress-indicator--progress-indicator-numeric&viewMode=story';
const progressIndicatorFocusedUrl =
    'http://localhost:8080/iframe.html?id=components-block-progress-indicator--progress-indicator-focused&viewMode=story';
const progressIndicatorLabelsUrl =
    'http://localhost:8080/iframe.html?id=components-block-progress-indicator--progress-indicator-labels&viewMode=story';
const progressIndicatorStaticStepsUrl =
    'http://localhost:8080/iframe.html?id=components-block-progress-indicator--progress-indicator-static-steps&viewMode=story';
const progressIndicatorEnableFutureStepsUrl =
    'http://localhost:8080/iframe.html?id=components-block-progress-indicator--progress-indicator-enable-future-steps&viewMode=story';

describe('cypress-e2e - block components - vl-progress-indicator - default story', () => {
    it('should display story', () => {
        cy.visit(progressIndicatorUrl);
        cy.get('vl-progress-indicator').shadow();
    });
});

describe('cypress-e2e - block components - vl-progress-indicator - numeric story', () => {
    it('should display story', () => {
        cy.visit(progressIndicatorNumericUrl);
        cy.get('vl-progress-indicator[numeric]').shadow();
    });
});

describe('cypress-e2e - block components - vl-progress-indicator - focused story', () => {
    it('should display story', () => {
        cy.visit(progressIndicatorFocusedUrl);
        cy.get('vl-progress-indicator[focus-on-change]').shadow();
    });
});

describe('cypress-e2e - block components - vl-progress-indicator - labels story', () => {
    it('should display story', () => {
        cy.visit(progressIndicatorLabelsUrl);
        cy.get('vl-progress-indicator[show-labels]').shadow();
    });
});

describe('cypress-e2e - block components - vl-progress-indicator - static steps story', () => {
    it('should display story', () => {
        cy.visit(progressIndicatorStaticStepsUrl);
        cy.get('vl-progress-indicator[static-steps]').shadow();
    });
});

describe('cypress-e2e - block components - vl-progress-indicator - enable future steps story', () => {
    it('should display story', () => {
        cy.visit(progressIndicatorEnableFutureStepsUrl);
        cy.get('vl-progress-indicator[enable-future-steps]').shadow();
    });
});
