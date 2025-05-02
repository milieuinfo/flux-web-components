const url = 'http://localhost:8080/iframe.html?id=ontwerp-map-niet-lambert-72-lagen--demo&viewMode=story';

describe('story - map niet-lambert-72 lagen', () => {
    it('should render', () => {
        cy.visit(url);

        cy.get('vl-map-non-lambert-72-sources').shadow();
    });
});
