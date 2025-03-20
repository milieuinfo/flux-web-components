import { html } from 'lit-html';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlCookieConsent } from './vl-cookie-consent.section';

registerWebComponents([VlCookieConsent]);

const mountDefault = () => {
    return cy.mount(
        html`<vl-cookie-consent
            matomo-id="12345"
            matomo-url="fake-matomo-url"
            owner="test"
            link="test-link"
        ></vl-cookie-consent>`
    );
};

describe('component vl-cookie-consent', () => {
    beforeEach(() => {
        mountDefault();
    });

    it('should mount', () => {
        cy.get('vl-cookie-consent').shadow();
    });

    it('should be accessible', () => {
        cy.injectAxe();
        cy.checkA11y('vl-cookie-consent');
    });

    it('should render with some basic styling from DV - vl-form-grid-stack should have the correct style', () => {
        cy.get('vl-cookie-consent')
            .shadow()
            .find('vl-modal')
            .find('div[is="vl-form-grid"]')
            .should('have.css', 'margin-top', '-15px');
    });
});

describe('component vl-cookie-consent - content', () => {
    it('should contain the `Cookie-toestemming`', () => {
        mountDefault();

        cy.get('vl-cookie-consent').shadow().find('vl-modal').shadow().find('h2').contains('Cookie-toestemming');
    });

    it('should contain the given matomo id & matomo url', () => {
        mountDefault();

        cy.get('vl-cookie-consent').should('have.attr', 'matomo-id', '12345');
        cy.get('vl-cookie-consent').should('have.attr', 'matomo-url', 'fake-matomo-url');
        cy.get('vl-cookie-consent').should('have.attr', 'owner', 'test');
        cy.get('vl-cookie-consent').should('have.attr', 'link', 'test-link');
    });

    it('should emit event on close', () => {
        mountDefault();

        cy.createStubForEvent('vl-cookie-consent', 'vl-close');
        cy.get('vl-cookie-consent').shadow().find('vl-modal').find('vl-button-next[slot="button"]').click();
        cy.get('@vl-close').should('have.been.calledOnce');
    });
});
