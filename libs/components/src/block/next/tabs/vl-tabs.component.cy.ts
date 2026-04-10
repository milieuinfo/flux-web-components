import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlTabLinkComponent } from './vl-tab-link.component';
import { VlTabPanelComponent } from './vl-tab-panel.component';
import { VlTabComponent } from './vl-tab.component';
import { VlTabsComponent } from './vl-tabs.component';

registerWebComponents([VlTabsComponent, VlTabComponent, VlTabLinkComponent, VlTabPanelComponent]);

describe('cypress-component - block components - vl-tabs-next', () => {
    const mountTabs = () =>
        cy.mount(html`
            <vl-tabs-next label="Example tabs">
                <vl-tab-next id="tab-1" panel="panel-1">Tab 1</vl-tab-next>
                <vl-tab-next id="tab-2" panel="panel-2">Tab 2</vl-tab-next>
                <vl-tab-next id="tab-3" panel="panel-3">Tab 3</vl-tab-next>

                <vl-tab-panel-next id="panel-1" slot="panel">Panel 1</vl-tab-panel-next>
                <vl-tab-panel-next id="panel-2" slot="panel" hidden>Panel 2</vl-tab-panel-next>
                <vl-tab-panel-next id="panel-3" slot="panel" hidden>Panel 3</vl-tab-panel-next>
            </vl-tabs-next>
        `);

    it('should mount with ARIA tablist structure', () => {
        mountTabs();

        cy.get('vl-tabs-next').should('exist');
        cy.get('vl-tabs-next').shadow().find('nav[role="tablist"]').should('exist');
        cy.get('vl-tabs-next').find('vl-tab-next').should('have.length', 3);
        cy.get('vl-tabs-next').find('vl-tab-panel-next#panel-1').should('not.have.attr', 'hidden');
        cy.get('vl-tabs-next').find('vl-tab-panel-next#panel-2').should('have.attr', 'hidden');
    });

    it('should switch panels when clicking a tab', () => {
        mountTabs();

        cy.get('vl-tabs-next').find('vl-tab-next#tab-2').click();

        cy.get('vl-tabs-next').find('vl-tab-next#tab-2').should('have.attr', 'aria-selected', 'true');
        cy.get('vl-tabs-next').find('vl-tab-panel-next#panel-2').should('not.have.attr', 'hidden');
        cy.get('vl-tabs-next').find('vl-tab-panel-next#panel-1').should('have.attr', 'hidden');
    });

    it('should navigate tabs with ArrowRight, ArrowLeft, Home and End keys', () => {
        mountTabs();

        cy.get('vl-tabs-next').find('vl-tab-next#tab-1').focus().trigger('keydown', { key: 'ArrowRight' });
        cy.get('vl-tabs-next').find('vl-tab-next#tab-2').should('have.attr', 'aria-selected', 'true').and('have.focus');

        cy.get('vl-tabs-next').find('vl-tab-next#tab-2').trigger('keydown', { key: 'ArrowRight' });
        cy.get('vl-tabs-next').find('vl-tab-next#tab-3').should('have.attr', 'aria-selected', 'true').and('have.focus');

        cy.get('vl-tabs-next').find('vl-tab-next#tab-3').trigger('keydown', { key: 'Home' });
        cy.get('vl-tabs-next').find('vl-tab-next#tab-1').should('have.attr', 'aria-selected', 'true').and('have.focus');

        cy.get('vl-tabs-next').find('vl-tab-next#tab-1').trigger('keydown', { key: 'End' });
        cy.get('vl-tabs-next').find('vl-tab-next#tab-3').should('have.attr', 'aria-selected', 'true').and('have.focus');
    });

    it('should render a horizontal navigation variant using vl-tab-link-next', () => {
        cy.mount(html`
            <vl-tabs-next horizontal-navigation label="Legende tabs">
                <vl-tab-link-next href="/one">Link 1</vl-tab-link-next>
                <vl-tab-link-next href="/two" selected>Link 2</vl-tab-link-next>
            </vl-tabs-next>
        `);

        cy.get('vl-tabs-next').shadow().find('ul').should('exist');
        cy.get('vl-tabs-next').find('vl-tab-link-next').should('have.length', 2);
        cy.get('vl-tabs-next')
            .find('vl-tab-link-next[selected]')
            .shadow()
            .find('a')
            .should('have.attr', 'aria-current', 'page');
    });

    it('should be accessible as a complete tablist widget', () => {
        mountTabs();
        cy.injectAxe();

        cy.checkA11y('vl-tabs-next');
    });
});
