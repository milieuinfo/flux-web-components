import { VlMapTiledWmsLayer } from '@domg-wc/map';

const mapTiledWmsLayerUrl =
    'http://localhost:8080/iframe.html?id=map-layer-wms-layer-tiled-wms-layer--map-tiled-wms-layer-default&viewMode=story';

describe('story vl-map-tiled-wms-layer default', () => {
    const wmsUrl = 'https://geo.api.vlaanderen.be/GRB/wms';

    it('should fetch new WMS layer on change url attribute', () => {
        cy.visit(mapTiledWmsLayerUrl);

        cy.intercept('GET', `${wmsUrl}*`).as('getWms');
        cy.wait('@getWms');

        cy.runTestFor<VlMapTiledWmsLayer>('vl-map-tiled-wms-layer', (component) => {
            const newWmsUrl = 'https://www.dov.vlaanderen.be/geoserver/wms2';

            cy.intercept('GET', `${newWmsUrl}*`).as('getWithNewUrl');
            component.setAttribute('url', newWmsUrl);
            cy.wait('@getWithNewUrl');
        });
    });

    it('should fetch new WMS layer on change layers attribute', () => {
        cy.visit(mapTiledWmsLayerUrl);

        cy.intercept('GET', `${wmsUrl}*`).as('getWms');
        cy.wait('@getWms');

        cy.runTestFor<VlMapTiledWmsLayer>('vl-map-tiled-wms-layer', (component) => {
            const newLayers = 'test-layers';

            cy.intercept('GET', `${wmsUrl}*${newLayers}*`).as('getWithNewLayers');
            component.setAttribute('layers', newLayers);
            cy.wait('@getWithNewLayers');
        });
    });

    it('should fetch new WMS layer on change version attribute', () => {
        cy.visit(mapTiledWmsLayerUrl);

        cy.intercept('GET', `${wmsUrl}*`).as('getWms');
        cy.wait('@getWms');

        cy.runTestFor<VlMapTiledWmsLayer>('vl-map-tiled-wms-layer', (component) => {
            const newVersion = 'test-version';

            cy.intercept('GET', `${wmsUrl}*${newVersion}*`).as('getWithNewVersion');
            component.setAttribute('version', newVersion);
            cy.wait('@getWithNewVersion');
        });
    });

    it('should fetch new WMS layer on change styles attribute', () => {
        cy.visit(mapTiledWmsLayerUrl);

        cy.intercept('GET', `${wmsUrl}*`).as('getWms');
        cy.wait('@getWms');

        cy.runTestFor<VlMapTiledWmsLayer>('vl-map-tiled-wms-layer', (component) => {
            const newStyles = 'test-styles';

            cy.intercept('GET', `${wmsUrl}*${newStyles}*`).as('getWithNewStyles');
            component.setAttribute('styles', newStyles);
            cy.wait('@getWithNewStyles');
        });
    });
});
