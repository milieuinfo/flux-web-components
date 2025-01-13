const spacerNextDefaultUrl =
    'http://localhost:8080/iframe.html?id=styles-next-layout-afnemers-spacer--spacer-default&viewMode=story';
const spacerNextXXSmallUrl =
    'http://localhost:8080/iframe.html?id=styles-next-layout-afnemers-spacer--spacer-xx-small&viewMode=story';
const spacerNextXSmallUrl =
    'http://localhost:8080/iframe.html?id=styles-next-layout-afnemers-spacer--spacer-x-small&viewMode=story';
const spacerNextSmallUrl =
    'http://localhost:8080/iframe.html?id=styles-next-layout-afnemers-spacer--spacer-small&viewMode=story';
const spacerNextMediumUrl =
    'http://localhost:8080/iframe.html?id=styles-next-layout-afnemers-spacer--spacer-medium&viewMode=story';
const spacerNextLargeUrl =
    'http://localhost:8080/iframe.html?id=styles-next-layout-afnemers-spacer--spacer-large&viewMode=story';
const spacerNextNoneUrl =
    'http://localhost:8080/iframe.html?id=styles-next-layout-afnemers-spacer--spacer-none&viewMode=story';

describe('story - spacer-next - default', () => {
    it('should render', () => {
        cy.visit(spacerNextDefaultUrl);

        cy.get('hr.vl-spacer-next')
            .shouldHaveComputedStyle({ style: 'margin-bottom', value: '20px' });
    });
});

describe('story - spacer-next - xxsmall', () => {
    it('should render', () => {
        cy.visit(spacerNextXXSmallUrl);

        cy.get('hr.vl-spacer-next-xxsmall')
            .shouldHaveComputedStyle({ style: 'margin-bottom', value: '5px' });
    });
});

describe('story - spacer-next - xsmall', () => {
    it('should render', () => {
        cy.visit(spacerNextXSmallUrl);

        cy.get('hr.vl-spacer-next-xsmall')
            .shouldHaveComputedStyle({ style: 'margin-bottom', value: '10px' });
    });
});

describe('story - spacer-next - small', () => {
    it('should render', () => {
        cy.visit(spacerNextSmallUrl);

        cy.get('hr.vl-spacer-next-small')
            .shouldHaveComputedStyle({ style: 'margin-bottom', value: '15px' });
    });
});

describe('story - spacer-next - medium', () => {
    it('should render', () => {
        cy.visit(spacerNextMediumUrl);

        cy.get('hr.vl-spacer-next-medium')
            .shouldHaveComputedStyle({ style: 'margin-bottom', value: '30px' });
    });
});

describe('story - spacer-next - large', () => {
    it('should render', () => {
        cy.visit(spacerNextLargeUrl);

        cy.get('hr.vl-spacer-next-large')
            .shouldHaveComputedStyle({ style: 'margin-bottom', value: '60px' });
    });
});

describe('story - spacer-next - none', () => {
    it('should render', () => {
        cy.visit(spacerNextNoneUrl);

        cy.get('hr.vl-spacer-next-none')
            .shouldHaveComputedStyle({ style: 'margin-bottom', value: '0px' });
    });
});
