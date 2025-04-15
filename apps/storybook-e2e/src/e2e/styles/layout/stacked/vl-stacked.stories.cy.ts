const stackedNextLargeUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-stacked--stacked-large&viewMode=story';
const stackedNextMediumUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-stacked--stacked-medium&viewMode=story';
const stackedNextSmallUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-stacked--stacked-small&viewMode=story';

describe('story - stacked - large', () => {
    it('should render', () => {
        cy.visit(stackedNextLargeUrl);

        cy.viewport(1920, 1080);
        cy.get('.vl-column').eq(1).shouldHaveComputedStyle({ style: 'margin-top', value: '60px' });

        cy.viewport(375, 667);
        cy.get('.vl-column').eq(1).shouldHaveComputedStyle({ style: 'margin-top', value: '30px' });
    });
});

describe('story - stacked - medium', () => {
    it('should render', () => {
        cy.visit(stackedNextMediumUrl);

        cy.get('.vl-column').eq(1).shouldHaveComputedStyle({ style: 'margin-top', value: '30px' });
    });
});

describe('story - stacked - small', () => {
    it('should render', () => {
        cy.visit(stackedNextSmallUrl);

        cy.get('.vl-column').eq(1).shouldHaveComputedStyle({ style: 'margin-top', value: '15px' });
    });
});
