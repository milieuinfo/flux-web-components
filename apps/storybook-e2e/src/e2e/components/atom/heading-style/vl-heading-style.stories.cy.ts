const headingDefaultUrl =
    'http://localhost:8080/iframe.html?id=components-atom-heading-style--heading-style-default&viewMode=story';

describe('cypress-e2e - atom components - vl-heading-style - default story', () => {
    it('should render', () => {
        cy.visit(headingDefaultUrl);

        cy.get('.sb-heading-1')
            .shouldHaveComputedStyle({ style: 'font-size', value: '40px' })
            .invoke('text')
            .then((text) => {
                expect(text).to.equal('Heading van grootte 1');
            });
    });
});
