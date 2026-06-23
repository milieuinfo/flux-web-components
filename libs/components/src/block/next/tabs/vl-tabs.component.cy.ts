import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlTabLinkComponent } from './vl-tab-link.component';
import { VlTabPanelComponent } from './vl-tab-panel.component';
import { VlTabComponent } from './vl-tab.component';
import { VlTabsComponent } from './vl-tabs.component';

registerWebComponents([VlTabsComponent, VlTabComponent, VlTabLinkComponent, VlTabPanelComponent]);

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

describe('cypress-component - block components - vl-tabs-next - desktop', () => {
    beforeEach(() => {
        cy.viewport(1024, 768);
    });

    it('should mount with ARIA tablist structure', () => {
        mountTabs();

        cy.get('vl-tabs-next').should('exist');
        cy.get('vl-tabs-next').shadow().find('nav[role="tablist"]').should('exist');
        cy.get('vl-tabs-next').find('vl-tab-next').should('have.length', 3);
        cy.get('vl-tabs-next').find('#panel-1').should('not.have.attr', 'hidden');
        cy.get('vl-tabs-next').find('#panel-2').should('have.attr', 'hidden');
    });

    it('should mount an empty tablist without errors', () => {
        cy.mount(html`<vl-tabs-next></vl-tabs-next>`);

        cy.get('vl-tabs-next').should('exist');
        cy.get('vl-tabs-next').shadow().find('nav[role="tablist"]').should('exist');
        cy.get('vl-tabs-next').find('vl-tab-next').should('have.length', 0);
    });

    it('should update when a new tab is added dynamically after mount', () => {
        cy.mount(html`
            <vl-tabs-next label="Example tabs">
                <vl-tab-next id="tab-1" panel="panel-1">Tab 1</vl-tab-next>
                <vl-tab-panel-next id="panel-1" slot="panel">Panel 1</vl-tab-panel-next>
            </vl-tabs-next>
        `);

        cy.get('vl-tabs-next').then(($tabs) => {
            const tabs = $tabs[0] as HTMLElement;
            const newTab = document.createElement('vl-tab-next');
            newTab.id = 'tab-2';
            newTab.setAttribute('panel', 'panel-2');
            newTab.textContent = 'Tab 2';
            const newPanel = document.createElement('vl-tab-panel-next');
            newPanel.id = 'panel-2';
            newPanel.slot = 'panel';
            newPanel.textContent = 'Panel 2';

            tabs.appendChild(newTab);
            tabs.appendChild(newPanel);
            newTab.setAttribute('selected', '');
        });

        cy.get('vl-tabs-next').find('#tab-2').should('have.attr', 'aria-selected', 'true');
        cy.get('vl-tabs-next').find('#panel-2').should('not.have.attr', 'hidden');
    });

    it('should recover selection when the selected tab is removed', () => {
        mountTabs();

        cy.get('vl-tabs-next').then(($tabs) => {
            const tabs = $tabs[0] as HTMLElement;
            const selectedTab = tabs.querySelector('#tab-1');
            selectedTab?.remove();
        });

        cy.get('vl-tabs-next').find('vl-tab-next').should('have.length', 2);
        cy.get('vl-tabs-next').find('vl-tab-next[aria-selected="true"]').should('have.id', 'tab-2');
    });

    it('should switch tabs when consumer code sets selected programmatically', () => {
        mountTabs();

        cy.get('vl-tabs-next').then(($tabs) => {
            const tabs = $tabs[0] as HTMLElement;
            const secondTab = tabs.querySelector<VlTabComponent>('#tab-2');
            secondTab?.select();
        });

        cy.get('vl-tabs-next').find('#tab-2').should('have.attr', 'aria-selected', 'true');
        cy.get('vl-tabs-next').find('#panel-2').should('not.have.attr', 'hidden');
    });

    it('should switch panels when clicking a tab', () => {
        mountTabs();

        cy.get('vl-tabs-next').find('#tab-2').click();

        cy.get('vl-tabs-next').find('#tab-2').should('have.attr', 'aria-selected', 'true');
        cy.get('vl-tabs-next').find('#panel-2').should('not.have.attr', 'hidden');
        cy.get('vl-tabs-next').find('#panel-1').should('have.attr', 'hidden');
    });

    it('should navigate tabs with ArrowRight, ArrowLeft, Home and End keys', () => {
        mountTabs();

        cy.get('vl-tabs-next').find('#tab-1').focus().trigger('keydown', { key: 'ArrowRight' });
        cy.get('vl-tabs-next').find('#tab-2').should('have.attr', 'aria-selected', 'true').and('have.focus');

        cy.get('vl-tabs-next').find('#tab-2').trigger('keydown', { key: 'ArrowRight' });
        cy.get('vl-tabs-next').find('#tab-3').should('have.attr', 'aria-selected', 'true').and('have.focus');

        cy.get('vl-tabs-next').find('#tab-3').trigger('keydown', { key: 'Home' });
        cy.get('vl-tabs-next').find('#tab-1').should('have.attr', 'aria-selected', 'true').and('have.focus');

        cy.get('vl-tabs-next').find('#tab-1').trigger('keydown', { key: 'End' });
        cy.get('vl-tabs-next').find('#tab-3').should('have.attr', 'aria-selected', 'true').and('have.focus');
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
        cy.get('vl-tab-link-next').each(([vlTabLinkNext]) => {
            const role = vlTabLinkNext.getAttribute('role');
            expect(role).to.equal('listitem');
        })
    });

    it('should be accessible as a complete tablist widget', () => {
        mountTabs();
        cy.injectAxe();

        cy.checkA11y('vl-tabs-next');
    });
});

describe('cypress-component - block components - vl-tabs-next - mobile', () => {
    beforeEach(() => {
        cy.viewport(480, 800);
    });

    it('should render tabs on mobile view', () => {
        mountTabs();

        cy.get('vl-tabs-next').should('exist');
        cy.get('vl-tabs-next').find('vl-tab-next').should('have.length', 3);
        cy.get('vl-tabs-next').find('#panel-1').should('not.have.attr', 'hidden');
    });

    it('should close the listbox with Escape and return focus to the toggle', () => {
        mountTabs();

        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-toggle').shadow().find('button').click();
        cy.get('vl-tabs-next').shadow().find('#tab-option-0').focus().trigger('keydown', {
            key: 'Escape',
            bubbles: true,
            composed: true,
        });

        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-dropdown').should('have.attr', 'hidden');
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-toggle').shadow().find('button').should('have.focus');
    });

    it('should select a mobile option with Enter and Space', () => {
        mountTabs();

        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-toggle').shadow().find('button').click();
        cy.get('vl-tabs-next').shadow().find('#tab-option-0').focus().trigger('keydown', { key: 'ArrowDown', bubbles: true, composed: true });
        cy.focused().should('have.id', 'tab-option-1');
        cy.focused().trigger('keydown', { key: 'Enter', bubbles: true, composed: true });
        cy.get('vl-tabs-next').find('#panel-2').should('not.have.attr', 'hidden');

        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-toggle').shadow().find('button').click();
        cy.get('vl-tabs-next').shadow().find('#tab-option-0').focus().trigger('keydown', { key: ' ', bubbles: true, composed: true });
        cy.get('vl-tabs-next').find('#panel-1').should('not.have.attr', 'hidden');
    });

    it('should be accessible on mobile', () => {
        mountTabs();
        cy.injectAxe();

        cy.checkA11y('vl-tabs-next');

        // should not render an ARIA tablist
        cy.get('vl-tabs-next').shadow().find('nav').should('not.have.attr', 'role', 'tablist');
        // should not render a nav > ul navigation
        cy.get('vl-tabs-next').shadow().find('nav ul').should('not.exist');
        // should render a listbox
        cy.get('vl-tabs-next').shadow().find('.vl-tabs--mobile div[role="listbox"]').should('exist');
    });
});
