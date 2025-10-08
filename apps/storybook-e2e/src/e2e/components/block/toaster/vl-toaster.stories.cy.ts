const toasterDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-toaster--toaster-default&viewMode=story';
const toasterDefaultSlottUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-toaster--toaster-default-slot&viewMode=story';
const toasterShowAlertUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-toaster--toaster-show-alert&viewMode=story';
const toasterFadeOutStoryUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-toaster--toaster-fade-out&viewMode=story';

describe('cypress-e2e - block components - vl-toaster - default story', () => {
    it('should render', () => {
        cy.visit(toasterDefaultUrl);

        cy.get('vl-toaster').shadow().find('output');
    });
});

describe('cypress-e2e - block components - vl-toaster - default slot story', () => {
    it('should render', () => {
        cy.visit(toasterDefaultSlottUrl);

        cy.get('vl-toaster').shadow().find('output');
    });
});

describe('cypress-e2e - block components - vl-toaster - show alert story', () => {
    it('should render', () => {
        cy.visit(toasterShowAlertUrl);

        cy.get('vl-toaster').shadow().find('output');
    });
});

describe('cypress-e2e - block components - vl-toaster - fade out story', () => {
    it('should render', () => {
        cy.visit(toasterFadeOutStoryUrl);

        cy.get('vl-toaster').shadow().find('output');
    });
});
