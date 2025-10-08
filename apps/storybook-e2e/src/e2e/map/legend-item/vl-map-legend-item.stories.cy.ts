const mapLegendItemDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=map-legend-item--map-legend-item-default&viewMode=story';
const mapLegendItemIconUrl =
    'http://localhost:8080/iframe.html?args=&id=map-legend-item--map-legend-item-icon&viewMode=story';
const mapLegendItemLabelUrl =
    'http://localhost:8080/iframe.html?args=&id=map-legend-item--map-legend-item-label&viewMode=story';
const mapLegendItemIconLabelUrl =
    'http://localhost:8080/iframe.html?args=&id=map-legend-item--map-legend-item-icon-label&viewMode=story';
const mapLegendItemIconTextUrl =
    'http://localhost:8080/iframe.html?args=&id=map-legend-item--map-legend-item-icon-text&viewMode=story';

describe('cypress-e2e - map - vl-map-legend-item - default story', () => {
    it('should display story', () => {
        cy.visit(mapLegendItemDefaultUrl);
        cy.get('vl-map-legend-item').shadow();
    });
});

describe('cypress-e2e - map - vl-map-legend-item - icon story', () => {
    it('should display story', () => {
        cy.visit(mapLegendItemIconUrl);
        cy.get('vl-map-legend-item').shadow();
    });
});

describe('cypress-e2e - map - vl-map-legend-item - label story', () => {
    it('should display story', () => {
        cy.visit(mapLegendItemLabelUrl);
        cy.get('vl-map-legend-item').shadow();
    });
});

describe('cypress-e2e - map - vl-map-legend-item - icon and label story', () => {
    it('should display story', () => {
        cy.visit(mapLegendItemIconLabelUrl);
        cy.get('vl-map-legend-item').shadow();
    });
});

describe('cypress-e2e - map - vl-map-legend-item - icon text story', () => {
    it('should display story', () => {
        cy.visit(mapLegendItemIconTextUrl);
        cy.get('vl-map-legend-item').shadow();
    });
});
