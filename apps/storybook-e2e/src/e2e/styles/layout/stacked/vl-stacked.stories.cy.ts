const stackedLargeUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-stacked--stacked-large&viewMode=story';
const stackedMediumUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-stacked--stacked-medium&viewMode=story';
const stackedSmallUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-stacked--stacked-small&viewMode=story';

describe('story - stacked - large', () => {
    it('should render', () => {
        cy.visit(stackedLargeUrl);

        cy.viewport(1920, 1080);
        cy.get('.vl-grid').shouldHaveComputedStyle({ style: 'row-gap', value: '60px' });

        cy.viewport(375, 667);
        cy.get('.vl-grid').shouldHaveComputedStyle({ style: 'row-gap', value: '30px' });
    });
});

describe('story - stacked - medium', () => {
    it('should render', () => {
        cy.visit(stackedMediumUrl);

        cy.get('.vl-grid').shouldHaveComputedStyle({ style: 'row-gap', value: '30px' });
    });
});

describe('story - stacked - small', () => {
    it('should render', () => {
        cy.visit(stackedSmallUrl);

        cy.get('.vl-grid').shouldHaveComputedStyle({ style: 'row-gap', value: '15px' });
    });
});
