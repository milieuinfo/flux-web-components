// import { parseFormData } from '@domg-wc/components/form';
import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlPopoverMenuInfoTileComponent } from './vl-popover-menu-info-tile.component';

registerWebComponents([VlPopoverMenuInfoTileComponent]);

describe('integrations - popover menu info tile', () => {
    it('should render', () => {
        cy.mount(html`<vl-popover-menu-info-tile></vl-popover-menu-info-tile>`);

        cy.get('vl-popover-menu-info-tile').find('vl-info-tile').shadow();
    });

    it('should open and close the menu', () => {
        cy.mount(html`<vl-popover-menu-info-tile></vl-popover-menu-info-tile>`);

        cy.get('vl-popover-menu-info-tile').find('#btn-acties').click();
        cy.get('vl-popover-menu-info-tile').find('vl-popover[for="btn-acties"]').should('be.visible');
        cy.get('vl-popover-menu-info-tile').find('#btn-acties').click();
        cy.get('vl-popover-menu-info-tile').find('vl-popover[for="btn-acties"]').should('not.be.visible');
        cy.get('vl-popover-menu-info-tile').find('#btn-acties').click();
        cy.get('vl-popover-menu-info-tile').find('vl-popover[for="btn-acties"]').should('be.visible');
        cy.get('body').click();
        cy.get('vl-popover-menu-info-tile').find('vl-popover[for="btn-acties"]').should('not.be.visible');
    });

    it('should open and close the tile', () => {
        cy.mount(html`<vl-popover-menu-info-tile></vl-popover-menu-info-tile>`);

        cy.get('vl-popover-menu-info-tile')
            .find('vl-info-tile')
            .shadow()
            .find('.vl-info-tile__content')
            .shouldHaveComputedStyle({ style: 'visibility', value: 'hidden' });
        cy.get('vl-popover-menu-info-tile').find('vl-info-tile').shadow().find('button.vl-toggle').click();
        cy.get('vl-popover-menu-info-tile')
            .find('vl-info-tile')
            .shadow()
            .find('.vl-info-tile__content')
            .shouldHaveComputedStyle({ style: 'visibility', value: 'visible' });
        cy.get('vl-popover-menu-info-tile').find('vl-info-tile').shadow().find('button.vl-toggle').click();
        cy.get('vl-popover-menu-info-tile')
            .find('vl-info-tile')
            .shadow()
            .find('.vl-info-tile__content')
            .shouldHaveComputedStyle({ style: 'visibility', value: 'hidden' });
    });
});
