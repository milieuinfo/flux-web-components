import { VlMap, VlMapFeaturesLayer } from '@domg-wc/map';

const mapLayerSwitcherDefaultUrl =
    'http://localhost:8080/iframe.html?id=map-layer-switcher--map-layer-switcher-default&viewMode=story';
const mapLayerSwitcherDynamic =
    'http://localhost:8080/iframe.html?id=map-layer-switcher--map-layer-switcher-dynamic&viewMode=story';

const shouldHaveVisibleLayerFor = (layerName: string): void => {
    cy.runTestFor<VlMapFeaturesLayer>(`vl-map-features-layer[name="${layerName}"]`, (component) => {
        expect(component.visible).to.be.true;
    });
};

const shouldHaveInvisibleLayerFor = (layerName: string): void => {
    cy.runTestFor<VlMapFeaturesLayer>(`vl-map-features-layer[name="${layerName}"]`, (component) => {
        expect(component.visible).to.be.false;
    });
};

const toggleSideSheet = () =>
    cy.get('vl-map-side-sheet').shadow().find('.vl-side-sheet__toggle').click({ force: true });

const clickLayerSwitcherCheckboxOf = (layerName: string): void => {
    cy.get('vl-map')
        .find('vl-map-layer-switcher')
        .shadow()
        .find(`vl-checkbox[layer="${layerName}"]`)
        .shadow()
        .find('input')
        .click({ force: true });
};

const shouldHaveFeatureLayerCount = (count: number) => {
    cy.runTestFor<VlMap>('vl-map#map-dynamic-layers', (map) => {
        expect(map.featuresLayers).to.be.have.length(count);
    });
};

describe('cypress-e2e - map - vl-map-layer-switcher - wc default story', () => {
    it('should show/hide layer when clicking the checkbox linked to a layer', () => {
        const layerName = 'Kaartlaag 1';
        cy.visit(mapLayerSwitcherDefaultUrl);
        shouldHaveVisibleLayerFor(layerName);
        clickLayerSwitcherCheckboxOf(layerName);
        shouldHaveInvisibleLayerFor(layerName);
        clickLayerSwitcherCheckboxOf(layerName);
        shouldHaveVisibleLayerFor(layerName);
    });
});

describe('cypress-e2e - map - vl-map-layer-switcher - wc dynamic story', () => {
    it('should add/remove layers dynamically', () => {
        const layerId = 'zwart';
        const layerName = `Kaartlaag ${layerId}`;
        cy.visit(`${mapLayerSwitcherDynamic}`);
        shouldHaveFeatureLayerCount(0);
        cy.get(`vl-button#add-${layerId}`).click();
        shouldHaveFeatureLayerCount(1);
        shouldHaveVisibleLayerFor(layerName);
        toggleSideSheet();
        clickLayerSwitcherCheckboxOf(layerName);
        shouldHaveInvisibleLayerFor(layerName);
        clickLayerSwitcherCheckboxOf(layerName);
        shouldHaveVisibleLayerFor(layerName);
        cy.get(`vl-button#remove-${layerId}`).click();
        shouldHaveFeatureLayerCount(0);
    });
});
