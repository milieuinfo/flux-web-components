const marginDefaultUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-margin--margin-default&viewMode=story';
const marginSmallUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-margin--margin-small&viewMode=story';
const marginMediumUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-margin--margin-medium&viewMode=story';
const marginNoUrl = 'http://localhost:8080/iframe.html?id=styles-layout-afnemers-margin--margin-no&viewMode=story';
const marginNoBottomUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-margin--margin-no-bottom&viewMode=story';
const marginNoTopUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-margin--margin-no-top&viewMode=story';

describe('cypress-e2e - layout - vl-margin - default story', () => {
    it('should render', () => {
        cy.visit(marginDefaultUrl);

        cy.get('.sb-container').find('.sb-content').shouldHaveComputedStyle({ style: 'margin', value: '15px' });
    });
});

describe('cypress-e2e - layout - vl-margin - small story', () => {
    it('should render', () => {
        cy.visit(marginSmallUrl);

        cy.get('.sb-container').find('.sb-content').shouldHaveComputedStyle({ style: 'margin', value: '15px 0px' });
    });
});

describe('cypress-e2e - layout - vl-margin - medium story', () => {
    it('should render', () => {
        cy.visit(marginMediumUrl);

        cy.get('.sb-container').find('.sb-content').shouldHaveComputedStyle({ style: 'margin', value: '30px 0px' });
    });
});

describe('cypress-e2e - layout - vl-margin - no story', () => {
    it('should render', () => {
        cy.visit(marginNoUrl);

        cy.get('.sb-container').find('.sb-content').shouldHaveComputedStyle({ style: 'margin', value: '0px' });
    });
});

describe('cypress-e2e - layout - vl-margin - no bottom story', () => {
    it('should render', () => {
        cy.visit(marginNoBottomUrl);

        cy.get('.sb-container')
            .find('.sb-content')
            .shouldHaveComputedStyle({ style: 'margin', value: '15px 15px 0px' });
    });
});

describe('cypress-e2e - layout - vl-margin - no top story', () => {
    it('should render', () => {
        cy.visit(marginNoTopUrl);

        cy.get('.sb-container')
            .find('.sb-content')
            .shouldHaveComputedStyle({ style: 'margin', value: '0px 15px 15px' });
    });
});
