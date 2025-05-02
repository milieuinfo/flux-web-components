const progressBarUrl =
    'http://localhost:8080/iframe.html?id=components-block-progress-bar--progress-bar-default&viewMode=story';
const progressBarNumericUrl =
    'http://localhost:8080/iframe.html?id=components-block-progress-bar--progress-bar-numeric&viewMode=story';
const progressBarFocusedUrl =
    'http://localhost:8080/iframe.html?id=components-block-progress-bar--progress-bar-focused&viewMode=story';

describe('story vl-progress-bar - default', () => {
    it('should display story', () => {
        cy.visit(progressBarUrl);
        cy.get('vl-progress-bar').shadow();
    });
});

describe('story vl-progress-bar numeric', () => {
    it('should display story', () => {
        cy.visit(progressBarNumericUrl);
        cy.get('vl-progress-bar').shadow();
    });
});

describe('story vl-progress-bar focused', () => {
    it('should display story', () => {
        cy.visit(progressBarFocusedUrl);
        cy.get('vl-progress-bar').shadow();
    });
});
