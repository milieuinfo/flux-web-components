import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlPopoverActionComponent } from './vl-popover-action.component';

registerWebComponents([VlPopoverActionComponent]);

describe('component vl-popover-action - default', () => {
    it('should mount', () => {
        cy.mount(html` <vl-popover-action icon="search">Zoeken</vl-popover-action> `);
        cy.get('vl-popover-action');
    });

    it('should be accessible', () => {
        cy.mount(html` <vl-popover-action icon="search">Zoeken</vl-popover-action> `);

        cy.injectAxe();
        cy.get('vl-popover-action').click();
        cy.checkA11y('vl-popover-action');
    });

    it('should set selected', () => {
        cy.mount(html` <vl-popover-action icon="search">Zoeken</vl-popover-action> `);

        cy.injectAxe();
        cy.get('vl-popover-action').should('not.have.attr', 'aria-selected', 'true');
        cy.get('vl-popover-action')
            .shouldHaveComputedStyle({ not: true, style: 'border-left-width', value: '3px' })
            .shouldHaveComputedStyle({ not: true, style: 'border-left-style', value: 'solid' });

        cy.get('vl-popover-action').invoke('attr', 'selected', '');
        cy.get('vl-popover-action').should('have.attr', 'aria-selected', 'true');
        cy.get('vl-popover-action')
            .shouldHaveComputedStyle({ style: 'border-left-color', value: 'rgb(0, 85, 204)' })
            .shouldHaveComputedStyle({ style: 'border-left-width', value: '3px' })
            .shouldHaveComputedStyle({ style: 'border-left-style', value: 'solid' });
        cy.checkA11y('vl-popover-action');

        cy.get('vl-popover-action').invoke('removeAttr', 'selected');
        cy.get('vl-popover-action').should('not.have.attr', 'aria-selected', 'true');
        cy.get('vl-popover-action')
            .shouldHaveComputedStyle({ not: true, style: 'border-left-width', value: '3px' })
            .shouldHaveComputedStyle({ not: true, style: 'border-left-style', value: 'solid' });
    });
});
