const marginNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-margin--margin-default&viewMode=story';
const marginNextSmallUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-margin--margin-small&viewMode=story';
const marginNextMediumUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-margin--margin-medium&viewMode=story';
const marginNextNoUrl = 'http://localhost:8080/iframe.html?id=styles-layout-afnemers-margin--margin-no&viewMode=story';
const marginNextNoBottomUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-margin--margin-no-bottom&viewMode=story';
const marginNextNoTopUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-margin--margin-no-top&viewMode=story';

describe('story - margin - default', () => {
    it('should render', () => {
        cy.visit(marginNextDefaultUrl);

        cy.get('.sb-container').find('.sb-content').shouldHaveComputedStyle({ style: 'margin', value: '15px' });
    });
});

describe('story - margin - small', () => {
    it('should render', () => {
        cy.visit(marginNextSmallUrl);

        cy.get('.sb-container').find('.sb-content').shouldHaveComputedStyle({ style: 'margin', value: '15px 0px' });
    });
});

describe('story - margin - medium', () => {
    it('should render', () => {
        cy.visit(marginNextMediumUrl);

        cy.get('.sb-container').find('.sb-content').shouldHaveComputedStyle({ style: 'margin', value: '30px 0px' });
    });
});

describe('story - margin - no', () => {
    it('should render', () => {
        cy.visit(marginNextNoUrl);

        cy.get('.sb-container').find('.sb-content').shouldHaveComputedStyle({ style: 'margin', value: '0px' });
    });
});

describe('story - margin - no bottom', () => {
    it('should render', () => {
        cy.visit(marginNextNoBottomUrl);

        cy.get('.sb-container')
            .find('.sb-content')
            .shouldHaveComputedStyle({ style: 'margin', value: '15px 15px 0px' });
    });
});

describe('story - margin - no top', () => {
    it('should render', () => {
        cy.visit(marginNextNoTopUrl);

        cy.get('.sb-container')
            .find('.sb-content')
            .shouldHaveComputedStyle({ style: 'margin', value: '0px 15px 15px' });
    });
});
