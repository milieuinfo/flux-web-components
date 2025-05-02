const sideSheetDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-block-side-sheet--side-sheet-default&viewMode=story';
const sideSheetToggleUrl =
    'http://localhost:8080/iframe.html?id=components-block-side-sheet--side-sheet-toggle&viewMode=story';

describe('story - vl-side-sheet - default', () => {
    it('should render', () => {
        cy.visit(sideSheetDefaultUrl);

        cy.get('vl-side-sheet').shadow().find('#vl-side-sheet');
    });
});

describe('story - vl-side-sheet - toggle', () => {
    it('should render', () => {
        cy.visit(sideSheetToggleUrl);

        cy.get('vl-side-sheet').shadow().find('#vl-side-sheet');
    });
});
