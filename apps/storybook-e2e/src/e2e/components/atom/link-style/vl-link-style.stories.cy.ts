const linkDefaultStylesUrl =
    'http://localhost:8080/iframe.html?id=components-atom-link-style--link-style-default&viewMode=story';

describe('cypress-e2e - atom components - vl-link-style - default story', () => {
    it('should render', () => {
        cy.visit(linkDefaultStylesUrl);

        cy.get('.sb-link')
            .first()
            .find('a')
            .shouldHaveComputedStyle({ style: 'color', value: 'rgb(0, 85, 204)' })
            .invoke('text')
            .then((text) => {
                expect(text).to.equal('link - default');
            });
    });
});
