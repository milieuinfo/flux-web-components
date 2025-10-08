const mapTiledWmsLayerUrl =
    'http://localhost:8080/iframe.html?id=map-layer-wms-layer-tiled-wms-layer--map-tiled-wms-layer-default&viewMode=story';

describe('cypress-e2e - map - vl-map-tiled-wms-layer - dom default story', () => {
    const wmsUrl = 'https://geo.api.vlaanderen.be/GRB/wms';

    it('should fetch WMS layer', () => {
        cy.visit(mapTiledWmsLayerUrl);

        cy.intercept('GET', `${wmsUrl}*`).as('getWms');
        cy.wait('@getWms');
    });
});
