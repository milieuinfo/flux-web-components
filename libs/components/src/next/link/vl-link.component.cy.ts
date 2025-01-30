import { html } from 'lit';
import { ICON_PLACEMENT, registerWebComponents } from '@domg-wc/common-utilities';
import { VlLinkComponent } from './vl-link.component';

registerWebComponents([VlLinkComponent]);

describe('component - vl-link-next - default', () => {
    it('should mount', () => {
        cy.mount(html`<vl-link-next></vl-link-next>`);

        cy.get('vl-link-next').shadow().find('a');
    });

    it('should be accessible', () => {
        cy.mount(html`<vl-link-next href="https://www.vlaanderen.be">Vlaanderen</vl-link-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-link-next');
    });

    it('should set href', () => {
        cy.mount(html`<vl-link-next href="https://www.vlaanderen.be"></vl-link-next>`);

        cy.get('vl-link-next').should('have.attr', 'href', 'https://www.vlaanderen.be');
        cy.get('vl-link-next').shadow().find('a').should('have.attr', 'href', 'https://www.vlaanderen.be');
    });

    it('should set bold', () => {
        cy.mount(html`<vl-link-next bold>Vlaanderen</vl-link-next>`);

        cy.get('vl-link-next').should('have.attr', 'bold');
        cy.get('vl-link-next').shadow().find('a').should('have.class', 'bold');
    });

    it('should set small', () => {
        cy.mount(html`<vl-link-next small>Vlaanderen</vl-link-next>`);

        cy.get('vl-link-next').should('have.attr', 'small');
        cy.get('vl-link-next').shadow().find('a').should('have.class', 'small');
    });

    it('should set large', () => {
        cy.mount(html`<vl-link-next large>Vlaanderen</vl-link-next>`);

        cy.get('vl-link-next').should('have.attr', 'large');
        cy.get('vl-link-next').shadow().find('a').should('have.class', 'large');
    });

    it('should set error', () => {
        cy.mount(html`<vl-link-next error>Vlaanderen</vl-link-next>`);

        cy.get('vl-link-next').should('have.attr', 'error');
        cy.get('vl-link-next').shadow().find('a').should('have.class', 'error');
    });

    it('should set external', () => {
        cy.mount(html`<vl-link-next external>Vlaanderen</vl-link-next>`);

        cy.get('vl-link-next').should('have.attr', 'external');
        cy.get('vl-link-next').shadow().find('a').should('have.attr', 'target', '_blank');
    });

    it('should set icon', () => {
        cy.mount(html`<vl-link-next icon="pin">Vlaanderen</vl-link-next>`);

        cy.get('vl-link-next').should('have.attr', 'icon', 'pin');
        cy.get('vl-link-next')
            .shadow()
            .find('a')
            .find('span.vl-icon')
            .should('have.class', 'vl-icon--pin')
            .should('not.have.class', 'vl-icon--right-margin');

        cy.get('vl-link-next').invoke('attr', 'icon-placement', 'before');

        cy.get('vl-link-next').shadow().find('a').find('span.vl-icon').should('have.class', 'vl-icon--right-margin');
    });

    it('should set icon-placement', () => {
        cy.mount(html`<vl-link-next icon="pin" icon-placement=${ICON_PLACEMENT.AFTER}>Vlaanderen</vl-link-next>`);

        cy.get('vl-link-next').should('have.attr', 'icon', 'pin');
        cy.get('vl-link-next').should('have.attr', 'icon-placement', ICON_PLACEMENT.AFTER);
        cy.get('vl-link-next')
            .shadow()
            .find('a')
            .find('span.vl-icon')
            .should('have.class', 'vl-icon--pin')
            .should('not.have.class', 'vl-icon--right-margin');

        cy.get('vl-link-next').invoke('attr', 'icon-placement', 'before');

        cy.get('vl-link-next').shadow().find('a').find('span.vl-icon').should('have.class', 'vl-icon--right-margin');
    });

    it('should not render icon when no icon value is set', () => {
        cy.mount(html`<vl-link-next>Vlaanderen</vl-link-next>`);

        cy.get('vl-link-next').shadow().find('a').find('span.vl-icon').should('not.exist');
    });

    it('should set content', () => {
        cy.mount(html`<vl-link-next>Vlaanderen</vl-link-next>`);

        cy.get('vl-link-next').shadow().find('a').find('slot');
        cy.get('vl-link-next').contains('Vlaanderen');
    });
});

describe('component - vl-link-next - button as link', () => {
    it('should mount', () => {
        cy.mount(html`<vl-link-next button-as-link></vl-link-next>`);

        cy.get('vl-link-next').shadow().find('button');
    });

    it('should be accessible', () => {
        cy.mount(html`<vl-link-next button-as-link href="https://www.vlaanderen.be">Vlaanderen</vl-link-next>`);
        cy.injectAxe();

        cy.checkA11y('vl-link-next');
    });

    it('should set href', () => {
        cy.mount(html`<vl-link-next button-as-link href="https://www.vlaanderen.be"></vl-link-next>`);

        cy.get('vl-link-next').should('have.attr', 'href', 'https://www.vlaanderen.be');
        cy.get('vl-link-next').shadow().find('button').should('not.have.attr', 'href');
    });

    it('should set bold', () => {
        cy.mount(html`<vl-link-next button-as-link bold>Vlaanderen</vl-link-next>`);

        cy.get('vl-link-next').should('have.attr', 'bold');
        cy.get('vl-link-next').shadow().find('button').should('have.class', 'bold');
    });

    it('should set small', () => {
        cy.mount(html`<vl-link-next button-as-link small>Vlaanderen</vl-link-next>`);

        cy.get('vl-link-next').should('have.attr', 'small');
        cy.get('vl-link-next').shadow().find('button').should('have.class', 'small');
    });

    it('should set large', () => {
        cy.mount(html`<vl-link-next button-as-link large>Vlaanderen</vl-link-next>`);

        cy.get('vl-link-next').should('have.attr', 'large');
        cy.get('vl-link-next').shadow().find('button').should('have.class', 'large');
    });

    it('should set error', () => {
        cy.mount(html`<vl-link-next button-as-link error>Vlaanderen</vl-link-next>`);

        cy.get('vl-link-next').should('have.attr', 'error');
        cy.get('vl-link-next').shadow().find('button').should('have.class', 'error');
    });

    it('should set external', () => {
        cy.mount(html`<vl-link-next button-as-link external>Vlaanderen</vl-link-next>`);

        cy.get('vl-link-next').should('have.attr', 'external');
        cy.get('vl-link-next').shadow().find('button').should('not.have.attr', 'target');
    });

    it('should set icon', () => {
        cy.mount(html`<vl-link-next button-as-link icon="pin">Vlaanderen</vl-link-next>`);

        cy.get('vl-link-next').should('have.attr', 'icon', 'pin');
        cy.get('vl-link-next')
            .shadow()
            .find('button')
            .find('span.vl-icon')
            .should('have.class', 'vl-icon--pin')
            .should('not.have.class', 'vl-icon--right-margin');

        cy.get('vl-link-next').invoke('attr', 'icon-placement', 'before');

        cy.get('vl-link-next')
            .shadow()
            .find('button')
            .find('span.vl-icon')
            .should('have.class', 'vl-icon--right-margin');
    });

    it('should set icon-placement', () => {
        cy.mount(
            html`<vl-link-next button-as-link icon="pin" icon-placement=${ICON_PLACEMENT.AFTER}
                >Vlaanderen</vl-link-next
            >`
        );

        cy.get('vl-link-next').should('have.attr', 'icon', 'pin');
        cy.get('vl-link-next').should('have.attr', 'icon-placement', ICON_PLACEMENT.AFTER);
        cy.get('vl-link-next')
            .shadow()
            .find('button')
            .find('span.vl-icon')
            .should('have.class', 'vl-icon--pin')
            .should('not.have.class', 'vl-icon--right-margin');

        cy.get('vl-link-next').invoke('attr', 'icon-placement', 'before');

        cy.get('vl-link-next')
            .shadow()
            .find('button')
            .find('span.vl-icon')
            .should('have.class', 'vl-icon--right-margin');
    });

    it('should not render icon when no icon value is set', () => {
        cy.mount(html`<vl-link-next button-as-link>Vlaanderen</vl-link-next>`);

        cy.get('vl-link-next').shadow().find('button').find('span.vl-icon').should('not.exist');
    });

    it('should set content', () => {
        cy.mount(html`<vl-link-next button-as-link>Vlaanderen</vl-link-next>`);

        cy.get('vl-link-next').shadow().find('button').find('slot');
        cy.get('vl-link-next').contains('Vlaanderen');
    });
});
