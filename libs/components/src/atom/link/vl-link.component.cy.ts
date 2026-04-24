import { ICON_PLACEMENT, registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlLinkComponent } from './vl-link.component';

registerWebComponents([VlLinkComponent]);

describe('cypress-component - atom components - vl-link', () => {
    it('should mount', () => {
        cy.mount(html`<vl-link></vl-link>`);

        cy.get('vl-link').shadow().find('a');
    });

    it('should be accessible', () => {
        cy.mount(html`<vl-link href="https://www.vlaanderen.be">Vlaanderen</vl-link>`);
        cy.injectAxe();

        cy.checkA11y('vl-link');
    });

    it('should set href', () => {
        cy.mount(html`<vl-link href="https://www.vlaanderen.be"></vl-link>`);

        cy.get('vl-link').should('have.attr', 'href', 'https://www.vlaanderen.be');
        cy.get('vl-link').shadow().find('a').should('have.attr', 'href', 'https://www.vlaanderen.be');
    });

    it('should set bold', () => {
        cy.mount(html`<vl-link bold>Vlaanderen</vl-link>`);

        cy.get('vl-link').should('have.attr', 'bold');
        cy.get('vl-link').shadow().find('a').should('have.class', 'bold');
    });

    it('should set small', () => {
        cy.mount(html`<vl-link small>Vlaanderen</vl-link>`);

        cy.get('vl-link').should('have.attr', 'small');
        cy.get('vl-link').shadow().find('a').should('have.class', 'small');
    });

    it('should set large', () => {
        cy.mount(html`<vl-link large>Vlaanderen</vl-link>`);

        cy.get('vl-link').should('have.attr', 'large');
        cy.get('vl-link').shadow().find('a').should('have.class', 'large');
    });

    it('should set error', () => {
        cy.mount(html`<vl-link error>Vlaanderen</vl-link>`);

        cy.get('vl-link').should('have.attr', 'error');
        cy.get('vl-link').shadow().find('a').should('have.class', 'error');
    });

    it('should set external', () => {
        cy.mount(html`<vl-link external>Vlaanderen</vl-link>`);

        cy.get('vl-link').should('have.attr', 'external');
        cy.get('vl-link').shadow().find('a').should('have.attr', 'target', '_blank');
        cy.get('vl-link').shadow().find('a').should('have.attr', 'rel', 'noopener noreferrer nofollow');
    });

    it('should set aria-label', () => {
        cy.mount(html`<vl-link label="link naar Vlaanderen">Vlaanderen</vl-link>`);

        cy.get('vl-link').shadow().find('a').should('have.attr', 'aria-label', 'link naar Vlaanderen');
    });

    it('should set icon', () => {
        cy.mount(html`<vl-link icon="pin">Vlaanderen</vl-link>`);

        cy.get('vl-link').should('have.attr', 'icon', 'pin');
        cy.get('vl-link')
            .shadow()
            .find('a')
            .find('span.vl-icon')
            .should('have.class', 'vl-icon--pin')
            .should('not.have.class', 'vl-icon--right-margin');

        cy.get('vl-link').invoke('attr', 'icon-placement', 'before');

        cy.get('vl-link').shadow().find('a').find('span.vl-icon').should('have.class', 'vl-icon--right-margin');
    });

    it('should set icon-placement', () => {
        cy.mount(html`<vl-link icon="pin" icon-placement=${ICON_PLACEMENT.AFTER}>Vlaanderen</vl-link>`);

        cy.get('vl-link').should('have.attr', 'icon', 'pin');
        cy.get('vl-link').should('have.attr', 'icon-placement', ICON_PLACEMENT.AFTER);
        cy.get('vl-link')
            .shadow()
            .find('a')
            .find('span.vl-icon')
            .should('have.class', 'vl-icon--pin')
            .should('not.have.class', 'vl-icon--right-margin');

        cy.get('vl-link').invoke('attr', 'icon-placement', 'before');

        cy.get('vl-link').shadow().find('a').find('span.vl-icon').should('have.class', 'vl-icon--right-margin');
    });

    it('should not render icon when no icon value is set', () => {
        cy.mount(html`<vl-link>Vlaanderen</vl-link>`);

        cy.get('vl-link').shadow().find('a').find('span.vl-icon').should('not.exist');
    });

    it('should set content', () => {
        cy.mount(html`<vl-link>Vlaanderen</vl-link>`);

        cy.get('vl-link').shadow().find('a').find('slot');
        cy.get('vl-link').contains('Vlaanderen');
    });

    it('should dispatch vl-click event', () => {
        cy.mount(html`<vl-link href="#vlaanderen">Vlaanderen</vl-link>`);
        cy.createStubForEvent('vl-link', 'vl-click');

        cy.get('vl-link').shadow().find('a').click({ force: true });
        cy.get('@vl-click').should('have.been.calledOnce');
    });
});

describe('cypress-component - atom components - vl-link - button as link', () => {
    it('should mount', () => {
        cy.mount(html`<vl-link button-as-link></vl-link>`);

        cy.get('vl-link').shadow().find('button');
    });

    it('should be accessible', () => {
        cy.mount(html`<vl-link button-as-link href="https://www.vlaanderen.be">Vlaanderen</vl-link>`);
        cy.injectAxe();

        cy.checkA11y('vl-link');
    });

    it('should set aria-label', () => {
        cy.mount(html`<vl-link button-as-link label="registreren">Registratie</vl-link>`);

        cy.get('vl-link').shadow().find('button').should('have.attr', 'aria-label', 'registreren');
    });

    it('should set href', () => {
        cy.mount(html`<vl-link button-as-link href="https://www.vlaanderen.be"></vl-link>`);

        cy.get('vl-link').should('have.attr', 'href', 'https://www.vlaanderen.be');
        cy.get('vl-link').shadow().find('button').should('not.have.attr', 'href');
    });

    it('should set bold', () => {
        cy.mount(html`<vl-link button-as-link bold>Vlaanderen</vl-link>`);

        cy.get('vl-link').should('have.attr', 'bold');
        cy.get('vl-link').shadow().find('button').should('have.class', 'bold');
    });

    it('should set small', () => {
        cy.mount(html`<vl-link button-as-link small>Vlaanderen</vl-link>`);

        cy.get('vl-link').should('have.attr', 'small');
        cy.get('vl-link').shadow().find('button').should('have.class', 'small');
    });

    it('should set large', () => {
        cy.mount(html`<vl-link button-as-link large>Vlaanderen</vl-link>`);

        cy.get('vl-link').should('have.attr', 'large');
        cy.get('vl-link').shadow().find('button').should('have.class', 'large');
    });

    it('should set error', () => {
        cy.mount(html`<vl-link button-as-link error>Vlaanderen</vl-link>`);

        cy.get('vl-link').should('have.attr', 'error');
        cy.get('vl-link').shadow().find('button').should('have.class', 'error');
    });

    it('should set external', () => {
        cy.mount(html`<vl-link button-as-link external>Vlaanderen</vl-link>`);

        cy.get('vl-link').should('have.attr', 'external');
        cy.get('vl-link').shadow().find('button').should('not.have.attr', 'target');
    });

    it('should set icon', () => {
        cy.mount(html`<vl-link button-as-link icon="pin">Vlaanderen</vl-link>`);

        cy.get('vl-link').should('have.attr', 'icon', 'pin');
        cy.get('vl-link')
            .shadow()
            .find('button')
            .find('span.vl-icon')
            .should('have.class', 'vl-icon--pin')
            .should('not.have.class', 'vl-link__icon--before');

        cy.get('vl-link').invoke('attr', 'icon-placement', 'before');

        cy.get('vl-link').shadow().find('button').find('span.vl-icon').should('have.class', 'vl-link__icon--before');
    });

    it('should set icon-placement', () => {
        cy.mount(html`<vl-link button-as-link icon="pin" icon-placement=${ICON_PLACEMENT.AFTER}>Vlaanderen</vl-link>`);

        cy.get('vl-link').should('have.attr', 'icon', 'pin');
        cy.get('vl-link').should('have.attr', 'icon-placement', ICON_PLACEMENT.AFTER);
        cy.get('vl-link')
            .shadow()
            .find('button')
            .find('span.vl-icon')
            .should('have.class', 'vl-icon--pin')
            .should('not.have.class', 'vl-link__icon--before');

        cy.get('vl-link').invoke('attr', 'icon-placement', 'before');

        cy.get('vl-link').shadow().find('button').find('span.vl-icon').should('have.class', 'vl-link__icon--before');
    });

    it('should not render icon when no icon value is set', () => {
        cy.mount(html`<vl-link button-as-link>Vlaanderen</vl-link>`);

        cy.get('vl-link').shadow().find('button').find('span.vl-icon').should('not.exist');
    });

    it('should set content', () => {
        cy.mount(html`<vl-link button-as-link>Vlaanderen</vl-link>`);

        cy.get('vl-link').shadow().find('button').find('slot');
        cy.get('vl-link').contains('Vlaanderen');
    });

    it('should have default type button', () => {
        cy.mount(html`<vl-link button-as-link>Vlaanderen</vl-link>`);

        cy.get('vl-link').shadow().find('button').should('have.attr', 'type', 'button');
    });

    it('should set type submit', () => {
        cy.mount(html`<vl-link button-as-link type="submit">Vlaanderen</vl-link>`);

        cy.get('vl-link').shadow().find('button').should('have.attr', 'type', 'submit');
    });

    it('should set type reset', () => {
        cy.mount(html`<vl-link button-as-link type="reset">Vlaanderen</vl-link>`);

        cy.get('vl-link').shadow().find('button').should('have.attr', 'type', 'reset');
    });

    it('should dispatch vl-click event', () => {
        cy.mount(html`<vl-link button-as-link>Vlaanderen</vl-link>`);
        cy.createStubForEvent('vl-link', 'vl-click');

        cy.get('vl-link').shadow().find('button').click('bottomLeft');
        cy.get('@vl-click').should('have.been.calledOnce');
    });
});
