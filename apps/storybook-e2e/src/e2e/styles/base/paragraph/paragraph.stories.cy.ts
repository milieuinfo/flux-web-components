const paragraphNextDefaultStylesUrl =
    'http://localhost:8080/iframe.html?id=styles-next-base-intern-paragraph--paragraph-default&viewMode=story';

describe('story - paragraph-next - default', () => {
    it('should render', () => {
        cy.visit(paragraphNextDefaultStylesUrl);

        cy.get('p')
            .eq(2)
            .shouldHaveComputedStyle({ style: 'font-size', value: '18px' });
    });
});
