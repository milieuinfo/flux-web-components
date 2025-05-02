const infoTileUrl = 'http://localhost:8080/iframe.html?id=components-block-info-tile--info-tile-default&viewMode=story';
const infoTileToggleableUrl =
    'http://localhost:8080/iframe.html?id=components-block-info-tile--info-tile-toggleable&viewMode=story';

describe('story vl-info-tile - default', () => {
    it('should display story', () => {
        cy.visit(infoTileUrl);
        cy.get('vl-info-tile');
    });
});

describe('story vl-info-tile - toggleable', () => {
    it('should display story', () => {
        cy.visit(infoTileToggleableUrl);
        cy.get('vl-info-tile');
    });
});
