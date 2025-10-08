const mapNonLambert72Url = 'http://localhost:8080/iframe.html?id=ontwerp-map-niet-lambert-72-lagen--demo&viewMode=story';

describe('cypress-e2e - ontwerp - map - niet-lambert-72 lagen story', () => {
    it('should render', () => {
        cy.visit(mapNonLambert72Url);

        cy.get('vl-map-non-lambert-72-sources').shadow();
    });
});
