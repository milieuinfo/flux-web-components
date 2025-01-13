const stackedNextLargeUrl =
    'http://localhost:8080/iframe.html?id=styles-next-layout-afnemers-stacked--stacked-large&viewMode=story';
const stackedNextSmallUrl =
    'http://localhost:8080/iframe.html?id=styles-next-layout-afnemers-stacked--stacked-small&viewMode=story';

describe('story - separator-next - default', () => {
    it('should render', () => {
        cy.visit(stackedNextLargeUrl);

        cy.get('.vl-column-next').eq(1).shouldHaveComputedStyle({ style: 'margin-top', value: '60px' });
    });
});

describe('story - separator-next - dashed', () => {
    it('should render', () => {
        cy.visit(stackedNextSmallUrl);

        cy.get('.vl-column-next').eq(1).shouldHaveComputedStyle({ style: 'margin-top', value: '15px' });
    });
});
