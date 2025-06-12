const spacerDefaultUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-spacer--spacer-default&viewMode=story';
const spacerXXSmallUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-spacer--spacer-xx-small&viewMode=story';
const spacerXSmallUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-spacer--spacer-x-small&viewMode=story';
const spacerSmallUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-spacer--spacer-small&viewMode=story';
const spacerMediumUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-spacer--spacer-medium&viewMode=story';
const spacerLargeUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-spacer--spacer-large&viewMode=story';
const spacerNoneUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-spacer--spacer-none&viewMode=story';

describe('story - spacer - default', () => {
    it('should render', () => {
        cy.visit(spacerDefaultUrl);

        cy.get('hr.vl-spacer').shouldHaveComputedStyle({ style: 'margin-bottom', value: '20px' });
    });
});

describe('story - spacer - xxsmall', () => {
    it('should render', () => {
        cy.visit(spacerXXSmallUrl);

        cy.get('hr.vl-spacer-xxsmall').shouldHaveComputedStyle({ style: 'margin-bottom', value: '5px' });
    });
});

describe('story - spacer - xsmall', () => {
    it('should render', () => {
        cy.visit(spacerXSmallUrl);

        cy.get('hr.vl-spacer-xsmall').shouldHaveComputedStyle({ style: 'margin-bottom', value: '10px' });
    });
});

describe('story - spacer - small', () => {
    it('should render', () => {
        cy.visit(spacerSmallUrl);

        cy.get('hr.vl-spacer-small').shouldHaveComputedStyle({ style: 'margin-bottom', value: '15px' });
    });
});

describe('story - spacer - medium', () => {
    it('should render', () => {
        cy.visit(spacerMediumUrl);

        cy.get('hr.vl-spacer-medium').shouldHaveComputedStyle({ style: 'margin-bottom', value: '30px' });
    });
});

describe('story - spacer - large', () => {
    it('should render', () => {
        cy.visit(spacerLargeUrl);

        cy.get('hr.vl-spacer-large').shouldHaveComputedStyle({ style: 'margin-bottom', value: '60px' });
    });
});

describe('story - spacer - none', () => {
    it('should render', () => {
        cy.visit(spacerNoneUrl);

        cy.get('hr.vl-spacer-none').shouldHaveComputedStyle({ style: 'margin-bottom', value: '0px' });
    });
});
