const spacerNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-spacer--spacer-default&viewMode=story';
const spacerNextXXSmallUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-spacer--spacer-xx-small&viewMode=story';
const spacerNextXSmallUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-spacer--spacer-x-small&viewMode=story';
const spacerNextSmallUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-spacer--spacer-small&viewMode=story';
const spacerNextMediumUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-spacer--spacer-medium&viewMode=story';
const spacerNextLargeUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-spacer--spacer-large&viewMode=story';
const spacerNextNoneUrl =
    'http://localhost:8080/iframe.html?id=styles-layout-afnemers-spacer--spacer-none&viewMode=story';

describe('story - spacer - default', () => {
    it('should render', () => {
        cy.visit(spacerNextDefaultUrl);

        cy.get('hr.vl-spacer').shouldHaveComputedStyle({ style: 'margin-bottom', value: '20px' });
    });
});

describe('story - spacer - xxsmall', () => {
    it('should render', () => {
        cy.visit(spacerNextXXSmallUrl);

        cy.get('hr.vl-spacer-xxsmall').shouldHaveComputedStyle({ style: 'margin-bottom', value: '5px' });
    });
});

describe('story - spacer - xsmall', () => {
    it('should render', () => {
        cy.visit(spacerNextXSmallUrl);

        cy.get('hr.vl-spacer-xsmall').shouldHaveComputedStyle({ style: 'margin-bottom', value: '10px' });
    });
});

describe('story - spacer - small', () => {
    it('should render', () => {
        cy.visit(spacerNextSmallUrl);

        cy.get('hr.vl-spacer-small').shouldHaveComputedStyle({ style: 'margin-bottom', value: '15px' });
    });
});

describe('story - spacer - medium', () => {
    it('should render', () => {
        cy.visit(spacerNextMediumUrl);

        cy.get('hr.vl-spacer-medium').shouldHaveComputedStyle({ style: 'margin-bottom', value: '30px' });
    });
});

describe('story - spacer - large', () => {
    it('should render', () => {
        cy.visit(spacerNextLargeUrl);

        cy.get('hr.vl-spacer-large').shouldHaveComputedStyle({ style: 'margin-bottom', value: '60px' });
    });
});

describe('story - spacer - none', () => {
    it('should render', () => {
        cy.visit(spacerNextNoneUrl);

        cy.get('hr.vl-spacer-none').shouldHaveComputedStyle({ style: 'margin-bottom', value: '0px' });
    });
});
