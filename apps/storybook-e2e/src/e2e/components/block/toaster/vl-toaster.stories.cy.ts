const toasterDefaultUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-toaster--toaster-default&viewMode=story';
const toasterDefaultSlottUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-toaster--toaster-default-slot&viewMode=story';
const toasterShowAlertUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-toaster--toaster-show-alert&viewMode=story';
const toasterFadeOutStoryUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-toaster--toaster-fade-out&viewMode=story';
const toasterFadeOutPerToastStoryUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-toaster--toaster-fade-out-per-toast&viewMode=story';
const toasterModalUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-toaster--toaster-modal&viewMode=story';
const toasterInModalUrl =
    'http://localhost:8080/iframe.html?args=&id=components-block-toaster--toaster-in-modal&viewMode=story';

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

describe('cypress-e2e - block components - vl-toaster - fade out per toast story', () => {
    it('should render', () => {
        cy.visit(toasterFadeOutPerToastStoryUrl);

        cy.get('vl-toaster').shadow().find('output');
    });

    it('should show a toast with the fade-out attribute and a persistent toast', () => {
        cy.visit(toasterFadeOutPerToastStoryUrl);

        cy.get('vl-button#button-saved').shadow().find('button').click({ force: true });
        cy.get('vl-button#button-not-saved').shadow().find('button').click({ force: true });

        cy.get('vl-toaster').shadow().find('vl-alert[title-label="Bewaard"]').should('have.attr', 'fade-out');
        cy.get('vl-toaster').shadow().find('vl-alert[title-label="Niet bewaard"]').should('have.attr', 'persistent');
    });
});

describe('cypress-e2e - block components - vl-toaster - modal story', () => {
    it('should show the toast of the page toaster above the open modal', () => {
        cy.visit(toasterModalUrl);

        cy.get('vl-button#button-modal-open').shadow().find('button').click({ force: true });
        cy.get('vl-modal-next').should('have.attr', 'open');
        cy.get('vl-button#button-modal-save').shadow().find('button').click({ force: true });

        cy.get('vl-toaster').shadow().find('output').find('vl-alert').should('have.attr', 'title', 'Bewaard');
        cy.get('vl-toaster')
            .shadow()
            .find('output')
            .should(($output) => expect($output[0].matches(':popover-open')).to.equal(true));
    });
});

describe('cypress-e2e - block components - vl-toaster - in modal story', () => {
    it('should show a closable toast in the toaster inside the modal', () => {
        cy.visit(toasterInModalUrl);

        cy.get('vl-button#button-in-modal-open').shadow().find('button').click({ force: true });
        cy.get('vl-modal-next').should('have.attr', 'open');
        cy.get('vl-button#button-in-modal-save').shadow().find('button').click({ force: true });

        cy.get('vl-modal-next vl-toaster').shadow().find('vl-alert').should('be.visible');
        cy.get('vl-modal-next vl-toaster').shadow().find('vl-alert').shadow().find('button#close').click();
        cy.get('vl-modal-next vl-toaster').shadow().find('vl-alert').should('not.exist');
    });
});
