const mapWmtsLayerDefaultUrl =
    'http://localhost:8080/iframe.html?id=map-layer-wmts-layer--map-wmts-layer-default&viewMode=story';
const mapWmtsLayerFromCapabilitiesUrl =
    'http://localhost:8080/iframe.html?id=map-layer-wmts-layer--map-wmts-layer-from-capabilities&viewMode=story';

describe('cypress-e2e - map - vl-map-wmts-layer - default story', () => {
    it('should fetch WMTS tiles', () => {
        cy.visit(mapWmtsLayerDefaultUrl);

        cy.intercept('GET', 'https://geo.api.vlaanderen.be/GRB/wmts*').as('getWmts');
        cy.wait('@getWmts');
    });
});

describe('cypress-e2e - map - vl-map-wmts-layer - from-capabilities story', () => {
    it('should fetch WMTS capabilities', () => {
        cy.visit(mapWmtsLayerFromCapabilitiesUrl);

        cy.intercept('GET', 'https://www.dov.vlaanderen.be/geoserver/klimaat/gwc/service/wmts?SERVICE=WMTS&REQUEST=GetCapabilities').as('getCapabilities');
        cy.wait('@getCapabilities');
    });
});
