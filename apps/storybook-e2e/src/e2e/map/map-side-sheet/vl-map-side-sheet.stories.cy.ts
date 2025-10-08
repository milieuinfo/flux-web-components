const mapSideSheetDefaultUrl =
    'http://localhost:8080/iframe.html?id=map-side-sheet-side-sheet--map-side-sheet-default&viewMode=story';

describe('cypress-e2e - map - vl-map-side-sheet - default story', () => {
    it('should render', () => {
        cy.visit(mapSideSheetDefaultUrl);

        cy.get('vl-map-side-sheet').shadow().find('#vl-side-sheet');
    });
});
