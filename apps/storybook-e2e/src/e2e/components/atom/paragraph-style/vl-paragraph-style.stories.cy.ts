const paragraphDefaultStylesUrl =
    'http://localhost:8080/iframe.html?id=components-atom-paragraph-style--paragraph-style-default&viewMode=story';

describe('cypress-e2e - atom components - vl-paragraph-style - default story', () => {
    it('should render', () => {
        cy.visit(paragraphDefaultStylesUrl);

        cy.get('p').eq(1).shouldHaveComputedStyle({ style: 'font-size', value: '18px' });
    });
});
