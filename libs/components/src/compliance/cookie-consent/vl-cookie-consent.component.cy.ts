import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlLinkComponent } from '../../atom/link';
import { matomoShadowDomLinkTracking } from './util/matomo-shadow-dom-link-tracking.util';
import { matomoWindow } from './util/matomo-window.util';
import { VlCookieConsent } from './vl-cookie-consent.component';

registerWebComponents([VlCookieConsent, VlLinkComponent]);

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

describe('cypress-component - compliance components - vl-cookie-consent', () => {
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
});

describe('cypress-component - compliance components - vl-cookie-consent - content', () => {
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

    it('should focus the dialog itself so the text is read before the first link', () => {
        mountDefault();

        cy.get('vl-cookie-consent').shadow().find('vl-modal').shadow().find('dialog').should('have.focus');
    });

    it('should emit event on close', () => {
        mountDefault();

        cy.createStubForEvent('vl-cookie-consent', 'vl-close');
        cy.get('vl-cookie-consent').shadow().find('vl-modal').find('vl-button[slot="button"]').click();
        cy.get('@vl-close').should('have.been.called');
    });
});

describe('cypress-component - compliance components - vl-cookie-consent - matomo shadow DOM link tracking', () => {
    const DOCUMENT_URL = 'https://www.example.com/document/123';
    const EXTERNAL_URL = 'https://www.example.com/pagina';

    const paqCommands = (name: string) => (matomoWindow()._paq ?? []).filter(([command]) => command === name);

    const mountWithLinks = (cookieConsent: unknown) =>
        cy.mount(html`
            ${cookieConsent}
            <div id="links" @click=${(event: Event) => event.preventDefault()}>
                <vl-link id="document-link" class="matomo_download" href=${DOCUMENT_URL}>Document</vl-link>
                <vl-link id="external-link" href=${EXTERNAL_URL}>Externe pagina</vl-link>
            </div>
        `);

    const mountWithAttribute = () =>
        mountWithLinks(html`
            <vl-cookie-consent
                auto-open-disabled
                matomo-id="12345"
                matomo-url="fake-matomo-url"
                matomo-shadow-dom-link-tracking
            ></vl-cookie-consent>
        `);

    const clickLink = (id: string) => cy.get(`#${id}`).shadow().find('a').click({ force: true });

    // de tracking van een vorige test blijft anders actief: de util en window._paq leven door binnen deze spec
    beforeEach(() => {
        matomoShadowDomLinkTracking.disable();
    });

    it('should not track links in the shadow DOM without the matomo-shadow-dom-link-tracking attribute', () => {
        const commandsBefore = matomoWindow()._paq?.length ?? 0;
        mountWithLinks(html`
            <vl-cookie-consent auto-open-disabled matomo-id="12345" matomo-url="fake-matomo-url"></vl-cookie-consent>
        `);

        clickLink('document-link');

        cy.then(() => {
            const commands = (matomoWindow()._paq ?? []).slice(commandsBefore).map(([command]) => command);
            expect(commands).to.deep.equal(['setTrackerUrl', 'setSiteId', 'trackPageView', 'enableLinkTracking']);
        });
    });

    it('should add one Matomo listener with the matomo-shadow-dom-link-tracking attribute', () => {
        mountWithAttribute();
        mountWithAttribute();

        cy.then(() => expect(paqCommands('addListener')).to.have.length(1));
    });

    it('should track a link in the shadow DOM with the Matomo class of the component', () => {
        mountWithAttribute();

        clickLink('document-link');

        cy.then(() => expect(paqCommands('trackLink').pop()).to.deep.equal(['trackLink', DOCUMENT_URL, 'download']));
    });

    it('should pass a click on a link in the shadow DOM to the link tracking handlers of Matomo', () => {
        const matomoHandler = cy.stub().as('matomoHandler');
        mountWithAttribute();
        // wat Matomo bij het laden doet met het object uit het 'addListener' commando
        cy.then(() => {
            const [, listenerTarget] = paqCommands('addListener')[0];
            (listenerTarget as EventTarget).addEventListener('click', matomoHandler);
        });

        clickLink('external-link');

        cy.get('@matomoHandler').should('have.been.calledOnce');
        cy.get('#external-link')
            .shadow()
            .find('a')
            .then(($link) => expect(matomoHandler.firstCall.args[0].target).to.equal($link[0]));
    });

    it('should warn when the matomo-shadow-dom-link-tracking attribute is set without matomo-id and matomo-url', () => {
        cy.window().then((win) => cy.spy(win.console, 'warn').as('consoleWarn'));
        const listenersBefore = paqCommands('addListener').length;

        mountWithLinks(html`
            <vl-cookie-consent auto-open-disabled matomo-shadow-dom-link-tracking></vl-cookie-consent>
        `);

        cy.get('@consoleWarn').should('have.been.calledWithMatch', 'matomo-shadow-dom-link-tracking');
        cy.then(() => expect(paqCommands('addListener')).to.have.length(listenersBefore));
    });
});
