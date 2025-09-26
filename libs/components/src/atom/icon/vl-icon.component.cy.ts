import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlIconComponent } from './vl-icon.component';

registerWebComponents([VlIconComponent]);

describe('component - vl-icon', () => {
    it('should mount', () => {
        cy.mount(html`<vl-icon icon="calendar"></vl-icon>`);

        cy.get('vl-icon').shadow().find('span.vl-icon');
    });

    it('should be accessible', () => {
        cy.mount(html`<vl-icon icon="calendar"></vl-icon>`);
        cy.injectAxe();

        // Test dat het icoon als decoratief beschouwd wordt indien er geen label is meegegeven.
        cy.get('vl-icon').shadow().find('span.vl-icon').should('have.attr', 'aria-hidden', 'true');

        cy.checkA11y('vl-icon');
    });

    it('should set icon', () => {
        cy.mount(html`<vl-icon icon="calendar"></vl-icon>`);

        cy.get('vl-icon').should('have.attr', 'icon', 'calendar');
        cy.get('vl-icon').shadow().find('span.vl-icon').should('have.class', 'vl-icon--calendar');
    });

    it('should set small', () => {
        cy.mount(html`<vl-icon icon="calendar" small></vl-icon>`);

        cy.get('vl-icon').should('have.attr', 'small', '');
        cy.get('vl-icon').shadow().find('span.vl-icon').should('have.class', 'vl-icon--small');
    });

    it('should set large', () => {
        cy.mount(html`<vl-icon icon="calendar" large></vl-icon>`);

        cy.get('vl-icon').should('have.attr', 'large', '');
        cy.get('vl-icon').shadow().find('span.vl-icon').should('have.class', 'vl-icon--large');
    });

    it('should set light', () => {
        cy.mount(html`<vl-icon icon="calendar" light></vl-icon>`);

        cy.get('vl-icon').should('have.attr', 'light', '');
        cy.get('vl-icon').shadow().find('span.vl-icon').should('have.class', 'vl-icon--light');
    });

    it('should set right-margin', () => {
        cy.mount(html`<vl-icon icon="calendar" right-margin></vl-icon>`);

        cy.get('vl-icon').should('have.attr', 'right-margin', '');
        cy.get('vl-icon').shadow().find('span.vl-icon').should('have.class', 'vl-icon--right-margin');
    });

    it('should set left-margin', () => {
        cy.mount(html`<vl-icon icon="calendar" left-margin></vl-icon>`);

        cy.get('vl-icon').should('have.attr', 'left-margin', '');
        cy.get('vl-icon').shadow().find('span.vl-icon').should('have.class', 'vl-icon--left-margin');
    });

    it('should set clickable', () => {
        cy.mount(html`<vl-icon icon="calendar" clickable></vl-icon>`);

        cy.get('vl-icon').should('have.attr', 'clickable', '');
        cy.get('vl-icon').shadow().find('span.vl-icon').should('have.class', 'vl-icon--clickable');
    });

    it('should set label', () => {
        cy.mount(html`<vl-icon icon="calendar" label="Dit is een toegankelijk label"></vl-icon>`);

        cy.get('vl-icon').should('have.attr', 'label', 'Dit is een toegankelijk label');
        cy.get('vl-icon')
            .shadow()
            .find('span.vl-icon')
            .should('have.attr', 'aria-label', 'Dit is een toegankelijk label');
        cy.get('vl-icon').shadow().find('span.vl-icon').should('not.have.attr', 'aria-hidden');
    });

    it('should display icon', () => {
        // Test dat het font correct geladen wordt, niet dat het juiste icoon getoond wordt.
        cy.mount(html`<vl-icon icon="calendar"></vl-icon>`);
        cy.viewport(1000, 1000);

        cy.get('vl-icon')
            .shadow()
            .find('span.vl-icon')
            .shouldHaveComputedStyle({ style: 'width', value: '18px' })
            .shouldHaveComputedStyle({ style: 'height', value: '18px' });
    });
});
