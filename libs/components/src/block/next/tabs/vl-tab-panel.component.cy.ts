import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlTabPanelComponent } from './vl-tab-panel.component';

registerWebComponents([VlTabPanelComponent]);

describe('cypress-component - block components - vl-tab-panel-next', () => {
    it('should render the panel with tabpanel role and hidden state', () => {
        cy.mount(html`
            <vl-tab-panel-next id="panel-1">Panel content</vl-tab-panel-next>
        `);

        cy.get('vl-tab-panel-next')
            .should('have.attr', 'role', 'tabpanel')
            .and('have.attr', 'tabindex', '0')
            .and('have.attr', 'hidden');
    });

    it('should render slotted panel content', () => {
        cy.mount(html`<vl-tab-panel-next id="panel-1">Panel content</vl-tab-panel-next>`);

        cy.get('vl-tab-panel-next').should('contain.text', 'Panel content');
    });
});
