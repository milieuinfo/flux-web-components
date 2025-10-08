const mapCurrentLocation =
    'http://localhost:8080/iframe.html?args=&id=map-current-location--map-current-location-default&viewMode=story';

describe('cypress-e2e - map - vl-map-current-location - default story', () => {
    it('should have a map', () => {
        cy.visit(`${mapCurrentLocation}`);
        cy.get('vl-map').shadow().find('div#map');
    });

    it('should have a current location control', () => {
        cy.visit(`${mapCurrentLocation}`);
        cy.get('vl-map').find('vl-map-current-location');
    });

    it('should be able to zoom in', () => {
        cy.visit(`${mapCurrentLocation}`);
        cy.get('vl-map').shadow().find('button.ol-zoom-in').click();
    });

    it('should have a current location that is visible & clickable', () => {
        cy.visit(`${mapCurrentLocation}`);
        cy.get('vl-map').find('vl-map-current-location').shadow().find('button').click();
    });
});
