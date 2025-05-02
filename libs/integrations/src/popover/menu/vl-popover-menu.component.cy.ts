// import { parseFormData } from '@domg-wc/components/form';
import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlPopoverMenuComponent } from './vl-popover-menu.component';

registerWebComponents([VlPopoverMenuComponent]);

describe('integrations - popover menu', () => {
    it('should render', () => {
        cy.mount(html`<vl-popover-menu></vl-popover-menu>`);

        cy.get('vl-popover-menu').find('vl-popover').shadow();
    });

    it('should open and close menu', () => {
        cy.mount(html`<vl-popover-menu></vl-popover-menu>`);

        cy.get('vl-popover-menu').find('#btn-acties').click();
        cy.get('vl-popover-menu').find('vl-popover').should('be.visible');
        cy.get('vl-popover-menu').find('#btn-acties').click();
        cy.get('vl-popover-menu').find('vl-popover').should('not.be.visible');
        cy.get('vl-popover-menu').find('#btn-acties').click();
        cy.get('vl-popover-menu').find('vl-popover').should('be.visible');
        cy.get('body').click();
        cy.get('vl-popover-menu').find('vl-popover').should('not.be.visible');
    });
});
