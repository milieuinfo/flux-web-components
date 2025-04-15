const paddingNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-padding--padding-default&viewMode=story';
const paddingNextSmallUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-padding--padding-small&viewMode=story';
const paddingNextMediumUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-padding--padding-medium&viewMode=story';
const paddingNextNoUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-padding--padding-no&viewMode=story';
const paddingNextNoBottomUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-padding--padding-no-bottom&viewMode=story';
const paddingNextNoTopUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-padding--padding-no-top&viewMode=story';

describe('story - padding - default', () => {
    it('should render', () => {
        cy.visit(paddingNextDefaultUrl);

        cy.get('.sb-container').shouldHaveComputedStyle({ style: 'padding', value: '15px' });
    });
});

describe('story - padding - small', () => {
    it('should render', () => {
        cy.visit(paddingNextSmallUrl);

        cy.get('.sb-container').shouldHaveComputedStyle({ style: 'padding', value: '15px 0px' });
    });
});

describe('story - padding - medium', () => {
    it('should render', () => {
        cy.visit(paddingNextMediumUrl);

        cy.get('.sb-container').shouldHaveComputedStyle({ style: 'padding', value: '30px 0px' });
    });
});

describe('story - padding - no', () => {
    it('should render', () => {
        cy.visit(paddingNextNoUrl);

        cy.get('.sb-container').find('.sb-content').shouldHaveComputedStyle({ style: 'padding', value: '0px' });
    });
});

describe('story - padding - no bottom', () => {
    it('should render', () => {
        cy.visit(paddingNextNoBottomUrl);

        cy.get('.sb-container').shouldHaveComputedStyle({ style: 'padding', value: '15px 15px 0px' });
    });
});

describe('story - padding - no top', () => {
    it('should render', () => {
        cy.visit(paddingNextNoTopUrl);

        cy.get('.sb-container').shouldHaveComputedStyle({ style: 'padding', value: '0px 15px 15px' });
    });
});
