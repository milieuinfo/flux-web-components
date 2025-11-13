import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlButtonComponent } from '../../atom/button';
import { VlTooltipComponent } from './vl-tooltip.component';

registerWebComponents([VlTooltipComponent, VlButtonComponent]);

const mountDefault = () => {
    cy.mount(html`
        <vl-button id="btn-acties">Hover over me</vl-button>
        <vl-tooltip id="tooltip-default" for="btn-acties"> Een boodschap die context geeft. </vl-tooltip>
    `);
};

const mountDelay = () => {
    cy.mount(html`
        <vl-button id="btn-delay">Hover me</vl-button>
        <vl-tooltip id="tooltip-delay" for="btn-delay">Een korte uitleg</vl-tooltip>
    `);
};

describe('cypress-component - block components - vl-tooltip', () => {
    beforeEach(() => {
        mountDefault();
    });

    it('should be accessible', () => {
        cy.injectAxe();
        cy.get('#btn-acties').trigger('mouseover');

        cy.get('#btn-acties').should('not.have.attr', 'aria-haspopup', 'true');
        cy.get('#btn-acties').should('not.have.attr', 'aria-controls', 'tooltip-default');
        cy.get('#btn-acties').should('have.attr', 'aria-describedby', 'tooltip-default');
        cy.checkA11y('vl-tooltip');
    });

    it('should have the correct layout', () => {
        cy.get('#btn-acties').trigger('focus');
        cy.get('vl-tooltip').shadow().find('.popover-content').shouldHaveComputedStyle({
            style: 'font-size',
            value: '14px',
        });
        cy.get('vl-tooltip').shadow().find('.popover-content').shouldHaveComputedStyle({
            style: 'padding',
            value: '3px 10px',
        });
    });
});

describe('cypress-component - block components - vl-tooltip - hover behavior', () => {
    beforeEach(() => {
        mountDelay();
    });

    it('should show on hover and hide after mouseout', () => {
        cy.get('#btn-delay').trigger('mouseover');
        cy.get('vl-tooltip#tooltip-delay').should('have.attr', 'open');

        cy.get('#btn-delay').trigger('mouseout');
        cy.get('vl-tooltip#tooltip-delay', { timeout: 500 }).should('not.have.attr', 'open');
    });
});
