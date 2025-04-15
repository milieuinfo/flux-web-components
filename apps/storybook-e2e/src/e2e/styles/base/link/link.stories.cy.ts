const linkNextDefaultStylesUrl =
    'http://localhost:8080/iframe.html?id=styles-base-intern-link--link-default&viewMode=story';

describe('story - link - default', () => {
    it('should render', () => {
        cy.visit(linkNextDefaultStylesUrl);

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
