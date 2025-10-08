const varColorUrl = 'http://localhost:8080/iframe.html?id=styles-base-var--var-color&viewMode=story';

describe('cypress-e2e - styles - var - color story', () => {
    it('should render', () => {
        cy.visit(varColorUrl);

        cy.get('.sb-var')
            .shouldHaveComputedStyle({ style: 'background-color', value: 'rgb(247, 249, 252)' })
            .invoke('text')
            .then((text) => {
                expect(text).to.equal('de alternatieve achtergrond en rand kleur');
            });
    });
});
