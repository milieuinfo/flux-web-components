const toasterDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-toaster--toaster-default&viewMode=story';
const toasterDefaultSlottUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-toaster--toaster-default-slot&viewMode=story';
const toasterShowAlertUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-toaster--toaster-show-alert&viewMode=story';
const toasterFadeOutStoryUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-toaster--toaster-fade-out&viewMode=story';

describe('story - vl-toaster', () => {
    it('should render', () => {
        cy.visit(toasterDefaultUrl);

        cy.get('vl-toaster').shadow().find('output');
    });
});

describe('story - vl-toaster - default slot', () => {
    it('should render', () => {
        cy.visit(toasterDefaultSlottUrl);

        cy.get('vl-toaster').shadow().find('output');
    });
});

describe('story - vl-toaster - show alert', () => {
    it('should render', () => {
        cy.visit(toasterShowAlertUrl);

        cy.get('vl-toaster').shadow().find('output');
    });
});

describe('story - vl-toaster - fade out', () => {
    it('should render', () => {
        cy.visit(toasterFadeOutStoryUrl);

        cy.get('vl-toaster').shadow().find('output');
    });
});
