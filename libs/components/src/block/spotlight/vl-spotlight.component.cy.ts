import { html } from 'lit';
import { registerWebComponents } from '@domg-wc/common';
import { VlSpotlight } from './index';

registerWebComponents([VlSpotlight]);

describe('cypress-component - block components - vl-spotlight', () => {
    it('should render', () => {
        cy.mount(html`<vl-spotlight></vl-spotlight>`);

        cy.get(`vl-spotlight`).should('be.visible');
    });

    it('should be accessible', () => {
        cy.mount(html`<vl-spotlight></vl-spotlight>`);

        cy.injectAxe();
        cy.checkA11y('vl-spotlight');
    });

    it('should have a title', () => {
        cy.mount(html`
            <vl-spotlight>
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
        `);

        cy.get(`vl-spotlight`).contains('Premies voor renovatie');
    });

    it('should have a subtitle', () => {
        cy.mount(html`
            <vl-spotlight>
                <span slot="title">Premies voor renovatie</span>
                <span slot="subtitle">Artikel 3.3.1</span>
            </vl-spotlight>
        `);

        cy.get(`vl-spotlight`).contains('Artikel 3.3.1');
    });

    it('should have content', () => {
        cy.mount(html`
            <vl-spotlight>
                <span slot="title">Premies voor renovatie</span>
                <span slot="content">Er zijn er verschillende...</span>
            </vl-spotlight>
        `);

        cy.get(`vl-spotlight`).contains('Er zijn er verschillende...');
    });

    it('should have a border by default', () => {
        cy.mount(html`
            <vl-spotlight>
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
        `);

        cy.get(`vl-spotlight`)
            .shadow()
            .find('article')
            .shouldHaveComputedStyle({ pseudo: 'before', style: 'height', value: '2px' })
            .shouldHaveComputedStyle({ pseudo: 'before', style: 'background-color', value: 'rgb(203, 210, 218)' });
    });

    it('should have no border', () => {
        cy.mount(html`
            <vl-spotlight no-border>
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
        `);

        cy.get(`vl-spotlight`).shadow().find('article').should('have.class', 'vl-spotlight--no-border');
    });

    it('should have an external link', () => {
        cy.mount(html`
            <vl-spotlight link="http://www.google.com" external>
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
        `);

        cy.get(`vl-spotlight`)
            .shadow()
            .find('a')
            .should('have.attr', 'href', 'http://www.google.com')
            .and('have.attr', 'target', '_blank')
            .and('have.attr', 'rel', 'noopener noreferrer nofollow');
        cy.get(`vl-spotlight`).shadow().find('span.vl-icon--external').should('exist');
    });

    it('should set aria-label on link when link-label is provided', () => {
        cy.mount(html`
            <vl-spotlight link="https://example.com" link-label="Ga naar voorbeeld - opent in nieuw venster" external>
                <span slot="title">Voorbeeld</span>
            </vl-spotlight>
        `);

        cy.get(`vl-spotlight`).shadow().find('a').should('have.attr', 'aria-label', 'Ga naar voorbeeld - opent in nieuw venster');
    });

    it('should pass the img-alt to the image', () => {
        cy.mount(html`
            <vl-spotlight img-src="dak.jpg" img-alt="Oud pannendak met verweerde dakpannen">
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
        `);

        cy.get('vl-spotlight').shadow().find('img').should('have.attr', 'alt', 'Oud pannendak met verweerde dakpannen');
    });

    it('should warn when img-src is set without img-alt', () => {
        cy.window().then((win) => {
            cy.stub(win.console, 'warn').as('consoleWarn');
        });
        cy.mount(html`
            <vl-spotlight img-src="dak.jpg">
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
        `);

        cy.get('vl-spotlight').shadow().find('img').should('have.attr', 'alt', '');
        cy.get('@consoleWarn').should('have.been.calledOnce').and('have.been.calledWithMatch', 'img-alt');
    });

    it('should not warn when img-alt is set, also when it is empty for a decorative image', () => {
        cy.window().then((win) => {
            cy.stub(win.console, 'warn').as('consoleWarn');
        });
        cy.mount(html`
            <vl-spotlight id="descriptive" img-src="dak.jpg" img-alt="Oud pannendak met verweerde dakpannen">
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
            <vl-spotlight id="decorative" img-src="dak.jpg" img-alt="">
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
            <vl-spotlight id="no-image">
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
        `);

        cy.get('#decorative').shadow().find('img').should('have.attr', 'alt', '');
        cy.get('@consoleWarn').should('not.have.been.called');
    });

    it('should not warn when img-alt is set as a property', () => {
        cy.window().then((win) => {
            cy.stub(win.console, 'warn').as('consoleWarn');
        });
        cy.mount(html`
            <vl-spotlight img-src="dak.jpg" .imgAlt=${'Oud pannendak met verweerde dakpannen'}>
                <span slot="title">Premies voor renovatie</span>
            </vl-spotlight>
        `);

        cy.get('vl-spotlight').shadow().find('img').should('have.attr', 'alt', 'Oud pannendak met verweerde dakpannen');
        cy.get('@consoleWarn').should('not.have.been.called');
    });
});
