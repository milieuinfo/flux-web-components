const stackedNextLargeUrl =
    'http://localhost:8080/iframe.html?id=styles-next-layout-afnemers-stacked--stacked-large&viewMode=story';
const stackedNextMediumUrl =
    'http://localhost:8080/iframe.html?id=styles-next-layout-afnemers-stacked--stacked-medium&viewMode=story';
const stackedNextSmallUrl =
    'http://localhost:8080/iframe.html?id=styles-next-layout-afnemers-stacked--stacked-small&viewMode=story';

describe('story - stacked-next - large', () => {
    it('should render', () => {
        cy.visit(stackedNextLargeUrl);

        cy.viewport(1920, 1080);
        cy.get('.vl-grid-next').shouldHaveComputedStyle({ style: 'row-gap', value: '60px' });

        cy.viewport(375, 667);
        cy.get('.vl-grid-next').shouldHaveComputedStyle({ style: 'row-gap', value: '30px' });
    });
});

describe('story - stacked-next - medium', () => {
    it('should render', () => {
        cy.visit(stackedNextMediumUrl);

        cy.get('.vl-grid-next').shouldHaveComputedStyle({ style: 'row-gap', value: '30px' });
    });
});

describe('story - stacked-next - small', () => {
    it('should render', () => {
        cy.visit(stackedNextSmallUrl);

        cy.get('.vl-grid-next').shouldHaveComputedStyle({ style: 'row-gap', value: '15px' });
    });
});
