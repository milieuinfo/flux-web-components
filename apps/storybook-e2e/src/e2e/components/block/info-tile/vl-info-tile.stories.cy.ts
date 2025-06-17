const infoTileUrl = 'http://localhost:8080/iframe.html?id=components-block-info-tile--info-tile-default&viewMode=story';
const infoTileSmallUrl = 'http://localhost:8080/iframe.html?id=components-block-info-tile--info-tile-small&viewMode=story';
const infoTileMediumUrl = 'http://localhost:8080/iframe.html?id=components-block-info-tile--info-tile-medium&viewMode=story';
const infoTileLargeUrl = 'http://localhost:8080/iframe.html?id=components-block-info-tile--info-tile-large&viewMode=story';
const infoTileCenteredUrl = 'http://localhost:8080/iframe.html?id=components-block-info-tile--info-tile-centered&viewMode=story';
const infoTileToggleableUrl = 'http://localhost:8080/iframe.html?id=components-block-info-tile--info-tile-toggleable&viewMode=story';
const infoTileMenuSlotUrl = 'http://localhost:8080/iframe.html?id=components-block-info-tile--info-tile-menu-slot&viewMode=story';
const infoTileIconUrl = 'http://localhost:8080/iframe.html?id=components-block-info-tile--info-tile-icon&viewMode=story';
const infoTileBadgeSlotUrl = 'http://localhost:8080/iframe.html?id=components-block-info-tile--info-tile-badge-slot&viewMode=story';
const infoTileFooterSlotUrl = 'http://localhost:8080/iframe.html?id=components-block-info-tile--info-tile-footer-slot&viewMode=story';

describe('story vl-info-tile', () => {
    it('should display story - default', () => {
        cy.visit(infoTileUrl);
        cy.get('vl-info-tile');
    });

    it('should display story - small', () => {
        cy.visit(infoTileSmallUrl);
        cy.get('vl-info-tile');
    });

    it('should display story - medium', () => {
        cy.visit(infoTileMediumUrl);
        cy.get('vl-info-tile');
    });

    it('should display story - large', () => {
        cy.visit(infoTileLargeUrl);
        cy.get('vl-info-tile');
    });

    it('should display story - centered', () => {
        cy.visit(infoTileCenteredUrl);
        cy.get('vl-info-tile');
    });

    it('should display story - toggleable', () => {
        cy.visit(infoTileToggleableUrl);
        cy.get('vl-info-tile');
    });

    it('should display story - menu slot', () => {
        cy.visit(infoTileMenuSlotUrl);
        cy.get('vl-info-tile');
    });

    it('should display story - icon', () => {
        cy.visit(infoTileIconUrl);
        cy.get('vl-info-tile');
    });

    it('should display story - badge slot', () => {
        cy.visit(infoTileBadgeSlotUrl);
        cy.get('vl-info-tile');
    });

    it('should display story - footer slot', () => {
        cy.visit(infoTileFooterSlotUrl);
        cy.get('vl-info-tile');
    });
});
