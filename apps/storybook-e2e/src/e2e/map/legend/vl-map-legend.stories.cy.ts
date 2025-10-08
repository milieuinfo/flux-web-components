const mapLegendMultipleStylesUrl =
    'http://localhost:8080/iframe.html?id=map-legend--map-legend-features-layer-multiple-styles&viewMode=story';
const mapLegendFeaturesLayerUrl =
    'http://localhost:8080/iframe.html?id=map-legend--map-legend-features-layer&viewMode=story';
const mapLegendMultipleFeaturesLayerUrl =
    'http://localhost:8080/iframe.html?id=map-legend--map-legend-multiple-features-layers&viewMode=story';
const mapLegendWfsLayerUrl = 'http://localhost:8080/iframe.html?id=map-legend--map-legend-wfs-layer&viewMode=story';
const mapLegendWmsLayerUrl = 'http://localhost:8080/iframe.html?id=map-legend--map-legend-wms-layer&viewMode=story';
const mapLegendWmsAndWfsLayerUrl =
    'http://localhost:8080/iframe.html?id=map-legend--map-legend-wms-wfs-layer&viewMode=story';
const mapLegendLayoutVerticalUrl =
    'http://localhost:8080/iframe.html?args=&id=map-legend--map-legend-layout-vertical&viewMode=story';

describe('cypress-e2e - map - vl-map-legend - multiple styles story', () => {
    it('should display story', () => {
        cy.visit(mapLegendMultipleStylesUrl);
        cy.get('vl-map-legend').shadow();
    });
});

describe('cypress-e2e - map - vl-map-legend - features layer story', () => {
    it('should display story', () => {
        cy.visit(mapLegendFeaturesLayerUrl);
        cy.get('vl-map-legend').shadow();
    });
});

describe('cypress-e2e - map - vl-map-legend - multiple features layer story', () => {
    it('should display story', () => {
        cy.visit(mapLegendMultipleFeaturesLayerUrl);
        cy.get('vl-map-legend').shadow();
    });
});

describe('cypress-e2e - map - vl-map-legend - wfs layer story', () => {
    it('should display story', () => {
        cy.visit(mapLegendWfsLayerUrl);
        cy.get('vl-map-legend').shadow();
    });
});

describe('cypress-e2e - map - vl-map-legend - wms layer story', () => {
    it('should display story', () => {
        cy.visit(mapLegendWmsLayerUrl);
        cy.get('vl-map-legend').shadow();
    });
});

describe('cypress-e2e - map - vl-map-legend - wms and wfs layer story', () => {
    it('should display story', () => {
        cy.visit(mapLegendWmsAndWfsLayerUrl);
        cy.get('vl-map-legend').shadow();
    });
});

describe('cypress-e2e - map - vl-map-legend - layout vertical story', () => {
    it('should display story', () => {
        cy.visit(mapLegendLayoutVerticalUrl);
        cy.get('vl-map-legend').shadow();
    });
});
