const varNextColorUrl = 'http://localhost:8080/iframe.html?id=styles-base-intern-var--var-color&viewMode=story';

describe('story - var - color', () => {
    it('should render', () => {
        cy.visit(varNextColorUrl);

        cy.get('.sb-var')
            .shouldHaveComputedStyle({ style: 'background-color', value: 'rgb(247, 249, 252)' })
            .invoke('text')
            .then((text) => {
                expect(text).to.equal('de alternatieve achtergrond en rand kleur');
            });
    });
});
