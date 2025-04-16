import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlToasterComponent } from './vl-toaster.component';

registerWebComponents([VlToasterComponent]);

describe('component - vl-toaster', () => {
    it('should mount', () => {
        cy.mount(html`<vl-toaster></vl-toaster>`);

        cy.get('vl-toaster').shadow().find('output.vl-toaster');
    });

    it('should be accessible', () => {
        cy.mount(html`<vl-toaster></vl-toaster>`);
        cy.injectAxe();

        cy.checkA11y('vl-toaster');
    });

    it('should set top right by default', () => {
        cy.mount(html`<vl-toaster></vl-toaster>`);

        cy.get('vl-toaster').should('not.have.attr', 'placement');
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'top', value: '0px' });
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'right', value: '0px' });
    });

    it('should set top right', () => {
        cy.mount(html`<vl-toaster placement="top-right"></vl-toaster>`);

        cy.get('vl-toaster').should('have.attr', 'placement', 'top-right');
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'top', value: '0px' });
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'right', value: '0px' });
    });

    it('should set top left', () => {
        cy.mount(html`<vl-toaster placement="top-left"></vl-toaster>`);

        cy.get('vl-toaster').should('have.attr', 'placement', 'top-left');
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'top', value: '0px' });
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'left', value: '0px' });
    });

    it('should set bottom left', () => {
        cy.mount(html`<vl-toaster placement="bottom-left"></vl-toaster>`);

        cy.get('vl-toaster').should('have.attr', 'placement', 'bottom-left');
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'bottom', value: '0px' });
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'left', value: '0px' });
    });

    it('should set bottom right', () => {
        cy.mount(html`<vl-toaster placement="bottom-right"></vl-toaster>`);

        cy.get('vl-toaster').should('have.attr', 'placement', 'bottom-right');
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'bottom', value: '0px' });
        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'right', value: '0px' });
    });

    it('should set z-index', () => {
        cy.mount(html`<vl-toaster></vl-toaster>`);

        cy.get('vl-toaster').shouldHaveComputedStyle({ style: 'z-index', value: '10012' });
    });

    it('should show a toast', () => {
        cy.mount(html`
            <vl-toaster>
                <vl-alert data-vl-title="toast"></vl-alert>
            </vl-toaster>
        `);
        cy.get('vl-toaster').then((toaster) => {
            cy.get('vl-toaster').shadow().find('vl-alert').should('not.be.visible');
            toaster[0].show();
            cy.get('vl-toaster').shadow().find('vl-alert').should('be.visible');
        });
    });

    it('should set fade out', () => {
        cy.mount(html`
            <vl-toaster fade-out>
                <vl-alert data-vl-title="toast"></vl-alert>
            </vl-toaster>
        `);
        cy.get('vl-toaster').should('have.attr', 'fade-out');
        cy.get('vl-toaster').then((toaster) => {
            cy.get('vl-toaster').shadow().find('vl-alert').should('not.be.visible');
            toaster[0].show();
            cy.get('vl-toaster').shadow().find('vl-alert').should('be.visible');
            cy.wait(5000);
            cy.get('vl-toaster').shadow().find('vl-alert').should('not.exist');
        });
    });

    it('should show a dynamically created alert', () => {
        cy.mount(html` <vl-toaster> </vl-toaster> `);
        cy.get('vl-toaster').then((toaster) => {
            cy.get('vl-toaster').shadow().find('vl-alert').should('not.be.visible');
            toaster[0].showAlert({
                title: 'Gelukt',
                message: 'Wij hebben uw melding goed ontvangen en nemen deze spoedig in behandeling.',
                type: 'success',
            });
            cy.get('vl-toaster').shadow().find('vl-alert').should('be.visible');
        });
    });
});
