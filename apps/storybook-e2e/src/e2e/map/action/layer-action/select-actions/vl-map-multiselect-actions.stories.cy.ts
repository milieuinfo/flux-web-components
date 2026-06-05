describe('cypress-e2e - map - vl-map-multiselect-actions - default story', () => {
    const mapMultiselectActionUrl =
        'http://localhost:8080/iframe.html?args=&id=map-action-layer-action-select-action-multiselect-actions--map-multiselect-actions-default&viewMode=story';

    beforeEach(() => {
        cy.visit(mapMultiselectActionUrl);
    });

    it('should render a map', () => {
        cy.get('vl-map').shadow().find('div#map');
    });

    it('should render vl-map-multiselect-actions', () => {
        cy.get('vl-map').find('vl-map-multiselect-actions');
    });
});

describe('cypress-e2e - map - vl-map-multiselect-actions - multilayer visibility story', () => {
    const mapMultiselectActionMultilayerUrl =
        'http://localhost:8080/iframe.html?args=&id=map-action-layer-action-select-action-multiselect-actions--map-multiselect-actions-multilayer-visibility&viewMode=story';

    beforeEach(() => {
        cy.visit(mapMultiselectActionMultilayerUrl);
    });

    it('should render a map', () => {
        cy.get('vl-map').shadow().find('div#map');
    });

    it('should render vl-map-multiselect-actions', () => {
        cy.get('vl-map').find('vl-map-multiselect-actions');
    });
});
