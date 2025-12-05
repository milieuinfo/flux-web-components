const progressBarUrl =
    'http://localhost:8080/iframe.html?id=components-block-progress-bar--progress-bar-default&viewMode=story';
const progressBarIndeterminateUrl =
    'http://localhost:8080/iframe.html?id=components-block-progress-bar--progress-bar-indeterminate&viewMode=story';
const progressBarErrorUrl =
    'http://localhost:8080/iframe.html?id=components-block-progress-bar--progress-bar-error&viewMode=story';

describe('cypress-e2e - block components - vl-progress-bar - default story', () => {
    it('should display story', () => {
        cy.visit(progressBarUrl);
        cy.get('vl-progress-bar').shadow();
    });
});

describe('cypress-e2e - block components - vl-progress-bar - indetermined story', () => {
    it('should display story', () => {
        cy.visit(progressBarIndeterminateUrl);
        cy.get('vl-progress-bar[indeterminate]').shadow();
    });
});

describe('cypress-e2e - block components - vl-progress-bar - error story', () => {
    it('should display story', () => {
        cy.visit(progressBarErrorUrl);
        cy.get('vl-progress-bar[error]').shadow();
    });
});