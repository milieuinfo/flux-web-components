const headingNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=styles-next-base-intern-heading--heading-default&viewMode=story';

describe('story - heading-next - default', () => {
    it('should render', () => {
        cy.visit(headingNextDefaultUrl);

        cy.get('.sb-heading-1')
            .shouldHaveComputedStyle({ style: 'font-size', value: '40px' })
            .invoke('text')
            .then((text) => {
                expect(text).to.equal('Heading van grootte 1');
            });
    });
});
