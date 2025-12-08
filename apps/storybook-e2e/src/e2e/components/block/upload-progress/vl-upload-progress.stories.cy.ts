const uploadProgressUrl =
    'http://localhost:8080/iframe.html?id=components-block-upload-progress--upload-progress-default&viewMode=story';
const uploadProgressIndeterminateUrl =
    'http://localhost:8080/iframe.html?id=components-block-upload-progress--upload-progress-indeterminate&viewMode=story';
const uploadProgressErrorUrl =
    'http://localhost:8080/iframe.html?id=components-block-upload-progress--upload-progress-error&viewMode=story';

describe('cypress-e2e - block components - vl-upload-progress - default story', () => {
    it('should display story', () => {
        cy.visit(uploadProgressUrl);
        cy.get('vl-upload-progress').shadow();
    });
});

describe('cypress-e2e - block components - vl-upload-progress - indeterminate story', () => {
    it('should display story', () => {
        cy.visit(uploadProgressIndeterminateUrl);
        cy.get('vl-upload-progress[indeterminate]').shadow();
    });
});

describe('cypress-e2e - block components - vl-upload-progress - error story', () => {
    it('should display story', () => {
        cy.visit(uploadProgressErrorUrl);
        cy.get('vl-upload-progress[error]').shadow();
    });
});
