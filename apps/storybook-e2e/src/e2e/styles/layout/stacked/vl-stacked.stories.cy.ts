const stackedLargeUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-stacked--stacked-large&viewMode=story';
const stackedMediumUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-stacked--stacked-medium&viewMode=story';
const stackedSmallUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-stacked--stacked-small&viewMode=story';

describe('cypress-e2e - layout - vl-stacked - large story', () => {
    it('should render', () => {
        cy.visit(stackedLargeUrl);

        cy.viewport(1920, 1080);
        cy.get('.vl-stacked').shouldHaveComputedStyle({ style: 'row-gap', value: '60px' });

        cy.viewport(375, 667);
        cy.get('.vl-stacked').shouldHaveComputedStyle({ style: 'row-gap', value: '30px' });
    });
});

describe('cypress-e2e - layout - vl-stacked - medium story', () => {
    it('should render', () => {
        cy.visit(stackedMediumUrl);

        cy.get('.vl-stacked').shouldHaveComputedStyle({ style: 'row-gap', value: '30px' });
    });
});

describe('cypress-e2e - layout - vl-stacked - small story', () => {
    it('should render', () => {
        cy.visit(stackedSmallUrl);

        cy.get('.vl-stacked').shouldHaveComputedStyle({ style: 'row-gap', value: '15px' });
    });
});
