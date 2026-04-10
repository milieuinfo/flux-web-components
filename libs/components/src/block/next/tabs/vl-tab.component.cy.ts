import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlTabComponent } from './vl-tab.component';

registerWebComponents([VlTabComponent]);

describe('cypress-component - block components - vl-tab-next', () => {
    const mountTab = ({ selected = false } = {}) => {
        return cy.mount(html`
            <vl-tab-next 
                id="tab-1" 
                panel="panel-1" 
                ?selected=${selected}
            >Test tab</vl-tab-next>
        `);
    };

    it('should render the tab element with correct ARIA attributes', () => {
        mountTab();

        cy.get('vl-tab-next')
            .should('have.attr', 'role', 'tab')
            .and('have.attr', 'aria-controls', 'panel-1')
            .and('have.attr', 'aria-selected', 'false')
            .and('have.attr', 'tabindex', '-1');
    });

    it('should reflect the selected attribute to ARIA selection state', () => {
        mountTab({ selected: true });

        cy.get('vl-tab-next')
            .should('have.attr', 'aria-selected', 'true')
            .and('have.attr', 'tabindex', '0');
    });

    it('should dispatch vl-tab-click on click', () => {
        mountTab();

        cy.createStubForEvent('vl-tab-next', 'vl-tab-click');
        cy.get('vl-tab-next').click();
        cy.get('@vl-tab-click').should('have.been.called');
    });

    it('should dispatch vl-tab-click on Enter and Space keys', () => {
        mountTab();

        cy.createStubForEvent('vl-tab-next', 'vl-tab-click');
        cy.get('vl-tab-next').focus().trigger('keydown', { key: 'Enter' });
        cy.get('@vl-tab-click').should('have.been.called');
        cy.get('vl-tab-next').trigger('keyup', { key: ' ' });
        cy.get('@vl-tab-click').should('have.been.called');
    });
});
