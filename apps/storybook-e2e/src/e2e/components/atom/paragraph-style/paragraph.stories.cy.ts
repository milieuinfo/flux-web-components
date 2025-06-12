const paragraphDefaultStylesUrl =
    'http://localhost:8080/iframe.html?id=components-atom-paragraph-style--paragraph-style-default&viewMode=story';

describe('story - paragraph - default', () => {
    it('should render', () => {
        cy.visit(paragraphDefaultStylesUrl);

        cy.get('p').eq(2).shouldHaveComputedStyle({ style: 'font-size', value: '18px' });
    });
});
