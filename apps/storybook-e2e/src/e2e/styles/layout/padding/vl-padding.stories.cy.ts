const paddingDefaultUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-padding--padding-default&viewMode=story';
const paddingSmallUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-padding--padding-small&viewMode=story';
const paddingMediumUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-padding--padding-medium&viewMode=story';
const paddingNoUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-padding--padding-no&viewMode=story';
const paddingNoBottomUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-padding--padding-no-bottom&viewMode=story';
const paddingNoTopUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-padding--padding-no-top&viewMode=story';

describe('cypress-e2e - layout - vl-padding - default story', () => {
    it('should render', () => {
        cy.visit(paddingDefaultUrl);

        cy.get('.sb-container').shouldHaveComputedStyle({ style: 'padding', value: '15px' });
    });
});

describe('cypress-e2e - layout - vl-padding - small story', () => {
    it('should render', () => {
        cy.visit(paddingSmallUrl);

        cy.get('.sb-container').shouldHaveComputedStyle({ style: 'padding', value: '15px 0px' });
    });
});

describe('cypress-e2e - layout - vl-padding - medium story', () => {
    it('should render', () => {
        cy.visit(paddingMediumUrl);

        cy.get('.sb-container').shouldHaveComputedStyle({ style: 'padding', value: '30px 0px' });
    });
});

describe('cypress-e2e - layout - vl-padding - no story', () => {
    it('should render', () => {
        cy.visit(paddingNoUrl);

        cy.get('.sb-container').find('.sb-content').shouldHaveComputedStyle({ style: 'padding', value: '0px' });
    });
});

describe('cypress-e2e - layout - vl-padding - no bottom story', () => {
    it('should render', () => {
        cy.visit(paddingNoBottomUrl);

        cy.get('.sb-container').shouldHaveComputedStyle({ style: 'padding', value: '15px 15px 0px' });
    });
});

describe('cypress-e2e - layout - vl-padding - no top story', () => {
    it('should render', () => {
        cy.visit(paddingNoTopUrl);

        cy.get('.sb-container').shouldHaveComputedStyle({ style: 'padding', value: '0px 15px 15px' });
    });
});
