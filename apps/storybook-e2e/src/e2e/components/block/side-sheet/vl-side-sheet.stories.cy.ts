const sideSheetDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-side-sheet--side-sheet-default&viewMode=story';
const sideSheetToggleUrl =
    'http://localhost:8080/iframe.html?id=components-block-side-sheet--side-sheet-toggle&viewMode=story';
const sideSheetTopUrl =
    'http://localhost:8080/iframe.html?id=components-block-side-sheet--side-sheet-top&viewMode=story';

describe('cypress-e2e - block components - vl-side-sheet - default story', () => {
    it('should render', () => {
        cy.visit(sideSheetDefaultUrl);

        cy.get('vl-side-sheet').shadow().find('#vl-side-sheet');
    });
});

describe('cypress-e2e - block components - vl-side-sheet - toggle story', () => {
    it('should render', () => {
        cy.visit(sideSheetToggleUrl);

        cy.get('vl-side-sheet').shadow().find('#vl-side-sheet');
    });
});

describe('cypress-e2e - block components - vl-side-sheet - top story', () => {
    it('should render', () => {
        cy.visit(sideSheetTopUrl);

        cy.get('vl-side-sheet').shadow().find('#vl-side-sheet');
    });
});
