const mapNonLambert72Url = 'http://localhost:8080/iframe.html?id=patronen-kaart-niet-lambert-72-lagen--kaart-niet-lambert-72-lagen&viewMode=story';

describe('cypress-e2e - patronen - kaart - niet-lambert-72 lagen story', () => {
    it('should render', () => {
        cy.visit(mapNonLambert72Url);

        cy.get('vl-map-non-lambert-72-sources').shadow();
    });
});
