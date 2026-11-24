import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlTabLinkComponent } from './vl-tab-link.component';
import { VlTabPanelComponent } from './vl-tab-panel.component';
import { VlTabComponent } from './vl-tab.component';
import { TabChangeEventDetail, VlTabsComponent } from './vl-tabs.component';

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

const mountTabLinks = () =>
    cy.mount(html`
        <div id="tab-links-container">
            <vl-tabs-next horizontal-navigation label="Example navigation">
                <vl-tab-link-next id="link-1" href="#tab-link-1">Link 1</vl-tab-link-next>
                <vl-tab-link-next id="link-2" href="#tab-link-2">Link 2</vl-tab-link-next>
                <vl-tab-link-next id="link-3" href="https://www.vlaanderen.be" external>Link 3</vl-tab-link-next>
            </vl-tabs-next>
        </div>
    `);

const clickTabLink = (selector: string, options: Partial<Cypress.ClickOptions> = {}) =>
    cy
        .get(selector)
        .shadow()
        .find('a')
        .click({ force: true, ...options });

const refuseTabChanges = ({ onAncestor = false } = {}) =>
    cy.get('vl-tabs-next').then(($tabs) => {
        const refuse = cy
            .stub()
            .as('vl-tab-change')
            .callsFake((event: Event) => event.preventDefault());
        const target = onAncestor ? $tabs[0].parentElement : $tabs[0];
        target?.addEventListener('vl-tab-change', refuse);
    });

const stubNativeClicks = () =>
    cy.get('#tab-links-container').then(($container) => {
        const nativeClick = cy.stub().as('native-click');
        $container[0].addEventListener('click', (event) => {
            nativeClick((event.composedPath()[0] as HTMLAnchorElement).target);
            // Stops the browser from actually opening a new tab or window.
            event.preventDefault();
        });
    });

const clearLocationHash = () =>
    cy.window().then((win) => win.history.replaceState(null, '', win.location.pathname + win.location.search));

const shouldHaveChangeDetail = (call: 'firstCall' | 'lastCall', tabId: string, previousTabId: string) =>
    cy
        .get<sinon.SinonStub>('@vl-tab-change')
        .its(`${call}.args.0.detail`)
        .should((detail: TabChangeEventDetail) => {
            expect(detail.tab.id).to.equal(tabId);
            expect(detail.previousTab?.id).to.equal(previousTabId);
        });

const mobileToggleButton = () =>
    cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-toggle').shadow().find('button');

const shouldHaveOnlyFirstTabSelected = () => {
    cy.get('vl-tabs-next')
        .find('#tab-1')
        .should('have.attr', 'aria-selected', 'true')
        .and('have.attr', 'tabindex', '0');
    cy.get('vl-tabs-next')
        .find('#tab-2')
        .should('have.attr', 'aria-selected', 'false')
        .and('have.attr', 'tabindex', '-1');
    cy.get('vl-tabs-next')
        .find('#tab-3')
        .should('have.attr', 'aria-selected', 'false')
        .and('have.attr', 'tabindex', '-1');
    cy.get('vl-tabs-next').find('#panel-1').should('not.have.attr', 'hidden');
    cy.get('vl-tabs-next').find('#panel-2').should('have.attr', 'hidden');
    cy.get('vl-tabs-next').find('#panel-3').should('have.attr', 'hidden');
};

const shouldHaveOnlyFirstTabLinkSelected = () => {
    cy.get('#link-1').shadow().find('a').should('have.attr', 'aria-current', 'page');
    cy.get('#link-2').shadow().find('a').should('not.have.attr', 'aria-current');
    cy.get('#link-3').shadow().find('a').should('not.have.attr', 'aria-current');
};

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

    it('should dispatch a cancelable vl-tab-change with the tab and the previous tab before switching', () => {
        mountTabs();
        cy.createStubForEvent('vl-tabs-next', 'vl-tab-change');

        cy.get('vl-tabs-next').find('#tab-2').click();

        cy.get('@vl-tab-change').should('have.been.calledOnce');
        cy.get('@vl-tab-change').its('firstCall.args.0.cancelable').should('equal', true);
        shouldHaveChangeDetail('firstCall', 'tab-2', 'tab-1');
        cy.get('vl-tabs-next').find('#tab-2').should('have.attr', 'aria-selected', 'true');
    });

    it('should dispatch vl-tab-change before the tab is selected', () => {
        mountTabs();
        cy.get('vl-tabs-next').then(($tabs) => {
            const listener = cy.stub().as('selected-during-vl-tab-change');
            $tabs[0].addEventListener('vl-tab-change', () =>
                listener($tabs[0].querySelector('vl-tab-next[selected]')?.id),
            );
        });

        cy.get('vl-tabs-next').find('#tab-2').click();

        cy.get('@selected-during-vl-tab-change').should('have.been.calledOnceWith', 'tab-1');
    });

    it('should not dispatch vl-tab-change for the selected tab or a programmatic selection', () => {
        mountTabs();
        cy.createStubForEvent('vl-tabs-next', 'vl-tab-change');

        cy.get('vl-tabs-next').find('#tab-1').click();
        cy.get('vl-tabs-next')
            .find<VlTabComponent>('#tab-2')
            .then(($tab) => $tab[0].select());

        cy.get('vl-tabs-next').find('#tab-2').should('have.attr', 'aria-selected', 'true');
        cy.get('@vl-tab-change').should('not.have.been.called');
    });

    it('should not dispatch vl-tab-change for the initial selection', () => {
        const listener = cy.stub().as('vl-tab-change');
        cy.mount(html`
            <vl-tabs-next label="Example tabs" @vl-tab-change=${listener}>
                <vl-tab-next id="tab-1" panel="panel-1">Tab 1</vl-tab-next>
                <vl-tab-next id="tab-2" panel="panel-2">Tab 2</vl-tab-next>
                <vl-tab-panel-next id="panel-1" slot="panel">Panel 1</vl-tab-panel-next>
                <vl-tab-panel-next id="panel-2" slot="panel" hidden>Panel 2</vl-tab-panel-next>
            </vl-tabs-next>
        `);

        cy.get('vl-tabs-next').find('#tab-1').should('have.attr', 'aria-selected', 'true');
        cy.get('@vl-tab-change').should('not.have.been.called');
    });

    it('should keep the current tab when vl-tab-change is refused on click', () => {
        mountTabs();
        refuseTabChanges();

        cy.get('vl-tabs-next').find('#tab-2').click();

        cy.get('@vl-tab-change').should('have.been.calledOnce');
        shouldHaveOnlyFirstTabSelected();
    });

    it('should keep the current tab when vl-tab-change is refused by a listener on an ancestor', () => {
        mountTabs();
        refuseTabChanges({ onAncestor: true });

        cy.get('vl-tabs-next').find('#tab-2').click();

        cy.get('@vl-tab-change').should('have.been.calledOnce');
        shouldHaveOnlyFirstTabSelected();
    });

    it('should keep the current tab when vl-tab-change is refused on Enter and Space', () => {
        mountTabs();
        refuseTabChanges();

        cy.get('vl-tabs-next').find('#tab-2').trigger('keydown', { key: 'Enter' });
        cy.get('vl-tabs-next').find('#tab-3').trigger('keyup', { key: ' ' });

        cy.get('@vl-tab-change').should('have.been.calledTwice');
        shouldHaveOnlyFirstTabSelected();
    });

    [
        { key: 'ArrowRight', requestedTab: 3 },
        { key: 'ArrowLeft', requestedTab: 1 },
        { key: 'Home', requestedTab: 1 },
        { key: 'End', requestedTab: 3 },
    ].forEach(({ key, requestedTab }) => {
        it(`should move the focus to the requested tab but keep the selection on a refused ${key}`, () => {
            mountTabs();
            cy.get('vl-tabs-next').find('#tab-2').click();
            refuseTabChanges();

            cy.get('vl-tabs-next').find('#tab-2').should('have.focus').trigger('keydown', { key });

            shouldHaveChangeDetail('lastCall', `tab-${requestedTab}`, 'tab-2');
            cy.get('vl-tabs-next')
                .find(`#tab-${requestedTab}`)
                .should('have.focus')
                .and('have.attr', 'aria-selected', 'false')
                .and('have.attr', 'tabindex', '-1');
            cy.get('vl-tabs-next')
                .find('#tab-2')
                .should('have.attr', 'aria-selected', 'true')
                .and('have.attr', 'tabindex', '0');
            cy.get('vl-tabs-next').find('#panel-2').should('not.have.attr', 'hidden');
            cy.get('vl-tabs-next').find(`#panel-${requestedTab}`).should('have.attr', 'hidden');
        });
    });

    it('should request the tab after the focused tab on ArrowRight after a refused click', () => {
        mountTabs();
        refuseTabChanges();

        cy.get('vl-tabs-next').find('#tab-2').click();
        cy.get('vl-tabs-next').find('#tab-2').should('have.focus');
        cy.focused().trigger('keydown', { key: 'ArrowRight' });

        shouldHaveChangeDetail('lastCall', 'tab-3', 'tab-1');
        cy.get('vl-tabs-next').find('#tab-3').should('have.focus');
        shouldHaveOnlyFirstTabSelected();
    });

    it('should not switch tabs on arrow keys from content inside a panel', () => {
        cy.mount(html`
            <vl-tabs-next label="Example tabs">
                <vl-tab-next id="tab-1" panel="panel-1">Tab 1</vl-tab-next>
                <vl-tab-next id="tab-2" panel="panel-2">Tab 2</vl-tab-next>

                <vl-tab-panel-next id="panel-1" slot="panel">
                    <input id="panel-input" aria-label="Name" />
                </vl-tab-panel-next>
                <vl-tab-panel-next id="panel-2" slot="panel" hidden>Panel 2</vl-tab-panel-next>
            </vl-tabs-next>
        `);
        cy.createStubForEvent('vl-tabs-next', 'vl-tab-change');

        cy.get('#panel-input').should('be.visible').focus();
        cy.get('#panel-input').trigger('keydown', { key: 'ArrowRight' });
        cy.get('#panel-input').trigger('keydown', { key: 'End' });

        cy.get('@vl-tab-change').should('not.have.been.called');
        cy.get('vl-tabs-next').find('#tab-1').should('have.attr', 'aria-selected', 'true');
        cy.get('vl-tabs-next').find('#panel-1').should('not.have.attr', 'hidden');
        cy.get('#panel-input').should('have.focus');
    });

    it('should switch with select() after a refused vl-tab-change', () => {
        mountTabs();
        cy.get('vl-tabs-next').find('#tab-3').click();
        refuseTabChanges();

        cy.get('vl-tabs-next').find('#tab-1').click();
        cy.get('vl-tabs-next').find('#tab-3').should('have.attr', 'aria-selected', 'true');
        cy.get('vl-tabs-next')
            .find<VlTabComponent>('#tab-1')
            .then(($tab) => $tab[0].select());

        shouldHaveOnlyFirstTabSelected();
    });

    it('should select a tab link without vl-tab-change being refused', () => {
        clearLocationHash();
        mountTabLinks();
        cy.createStubForEvent('vl-tabs-next', 'vl-tab-change');

        clickTabLink('#link-2');

        shouldHaveChangeDetail('firstCall', 'link-2', 'link-1');
        cy.get('#link-2').shadow().find('a').should('have.attr', 'aria-current', 'page');
        cy.get('#link-1').shadow().find('a').should('not.have.attr', 'aria-current');
        cy.location('hash').should('equal', '#tab-link-2');
    });

    it('should not select or navigate when vl-tab-change is refused on a tab link click', () => {
        clearLocationHash();
        mountTabLinks();
        cy.createStubForEvent('vl-tabs-next', 'vl-tab-link-click');
        refuseTabChanges();

        clickTabLink('#link-2');

        cy.get('@vl-tab-change').should('have.been.calledOnce');
        cy.get('@vl-tab-link-click').should('have.been.calledOnce');
        shouldHaveOnlyFirstTabLinkSelected();
        cy.location('hash').should('equal', '');
    });

    it('should cancel the native click of an external tab link when vl-tab-change is refused', () => {
        mountTabLinks();
        cy.get('#tab-links-container').then(($container) => {
            const nativeClick = cy.stub().as('native-click');
            $container[0].addEventListener('click', (event) => nativeClick(event.defaultPrevented));
        });
        refuseTabChanges();

        clickTabLink('#link-3');

        cy.get('@native-click').should('have.been.calledOnceWith', true);
        shouldHaveOnlyFirstTabLinkSelected();
    });

    it('should select a tab link and follow its href with select() after a refused vl-tab-change', () => {
        clearLocationHash();
        mountTabLinks();
        refuseTabChanges();

        clickTabLink('#link-2');
        shouldHaveOnlyFirstTabLinkSelected();
        cy.get('vl-tabs-next')
            .find<VlTabLinkComponent>('#link-2')
            .then(($link) => $link[0].select());

        cy.get('@vl-tab-change').should('have.been.calledOnce');
        cy.get('#link-2').shadow().find('a').should('have.attr', 'aria-current', 'page');
        cy.get('#link-1').shadow().find('a').should('not.have.attr', 'aria-current');
        cy.location('hash').should('equal', '#tab-link-2');
    });

    it('should open an external tab link in a new window with select()', () => {
        mountTabLinks();
        cy.get('#link-3').shadow().find('a').should('have.attr', 'target', '_blank');
        stubNativeClicks();

        cy.get('vl-tabs-next')
            .find<VlTabLinkComponent>('#link-3')
            .then(($link) => $link[0].select());

        cy.get('@native-click').should('have.been.calledOnceWith', '_blank');
        cy.get('#link-3').shadow().find('a').should('have.attr', 'aria-current', 'page');
        cy.get('#link-1').shadow().find('a').should('not.have.attr', 'aria-current');
    });

    it('should select and follow a tab link with select() right after it is added', () => {
        clearLocationHash();
        mountTabLinks();
        cy.get('#link-1').shadow().find('a').should('have.attr', 'aria-current', 'page');
        cy.createStubForEvent('vl-tabs-next', 'vl-tab-change');

        cy.get('vl-tabs-next').then(($tabs) => {
            const link = document.createElement('vl-tab-link-next');
            link.id = 'link-4';
            link.setAttribute('href', '#tab-link-4');
            link.textContent = 'Link 4';
            $tabs[0].append(link);
            link.select();
        });

        cy.location('hash').should('equal', '#tab-link-4');
        cy.get('#link-4').shadow().find('a').should('have.attr', 'aria-current', 'page');
        cy.get('vl-tabs-next').find('vl-tab-link-next[selected]').should('have.length', 1);
        cy.get('#link-1').shadow().find('a').should('not.have.attr', 'aria-current');
        cy.get('@vl-tab-change').should('not.have.been.called');
    });

    it('should not dispatch vl-tab-change or select on a modifier click on a tab link', () => {
        mountTabLinks();
        cy.createStubForEvent('vl-tabs-next', 'vl-tab-change');
        stubNativeClicks();

        clickTabLink('#link-2', { ctrlKey: true });
        clickTabLink('#link-2', { metaKey: true });
        clickTabLink('#link-2', { shiftKey: true });

        cy.get('@vl-tab-change').should('not.have.been.called');
        shouldHaveOnlyFirstTabLinkSelected();
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

    it('should keep the current tab and close the dropdown when vl-tab-change is refused on an option click', () => {
        mountTabs();
        cy.get('vl-tabs-next').shadow().find('.vl-tabs--mobile').should('exist');
        refuseTabChanges();

        mobileToggleButton().click();
        cy.get('vl-tabs-next').shadow().find('#tab-option-1').click();

        shouldHaveChangeDetail('firstCall', 'tab-2', 'tab-1');
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-dropdown').should('have.attr', 'hidden');
        mobileToggleButton().should('have.focus');
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-toggle').should('contain.text', 'Tab 1');
        shouldHaveOnlyFirstTabSelected();
    });

    it('should keep the current tab and close the dropdown when vl-tab-change is refused on Enter and Space', () => {
        mountTabs();
        cy.get('vl-tabs-next').shadow().find('.vl-tabs--mobile').should('exist');
        refuseTabChanges();

        mobileToggleButton().click();
        cy.get('vl-tabs-next')
            .shadow()
            .find('#tab-option-0')
            .focus()
            .trigger('keydown', { key: 'ArrowDown', bubbles: true, composed: true });
        cy.focused().trigger('keydown', { key: 'Enter', bubbles: true, composed: true });
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-dropdown').should('have.attr', 'hidden');
        mobileToggleButton().should('have.focus');

        mobileToggleButton().click();
        cy.get('vl-tabs-next')
            .shadow()
            .find('#tab-option-0')
            .focus()
            .trigger('keydown', { key: 'End', bubbles: true, composed: true });
        cy.focused().trigger('keydown', { key: ' ', bubbles: true, composed: true });

        shouldHaveChangeDetail('firstCall', 'tab-2', 'tab-1');
        shouldHaveChangeDetail('lastCall', 'tab-3', 'tab-1');
        cy.get('@vl-tab-change').should('have.been.calledTwice');
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-dropdown').should('have.attr', 'hidden');
        mobileToggleButton().should('have.focus');
        shouldHaveOnlyFirstTabSelected();
    });

    it('should show the new tab in the dropdown after select() following a refused Enter', () => {
        mountTabs();
        cy.get('vl-tabs-next').shadow().find('.vl-tabs--mobile').should('exist');
        refuseTabChanges();

        mobileToggleButton().click();
        cy.get('vl-tabs-next')
            .shadow()
            .find('#tab-option-0')
            .focus()
            .trigger('keydown', { key: 'ArrowDown', bubbles: true, composed: true });
        cy.focused().trigger('keydown', { key: 'Enter', bubbles: true, composed: true });
        cy.get('@vl-tab-change').should('have.been.calledOnce');
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-toggle').should('contain.text', 'Tab 1');
        cy.get('vl-tabs-next')
            .find<VlTabComponent>('#tab-2')
            .then(($tab) => $tab[0].select());

        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-toggle').should('contain.text', 'Tab 2');
        cy.get('vl-tabs-next').shadow().find('#tab-option-1').should('have.attr', 'aria-selected', 'true');
        cy.get('vl-tabs-next').shadow().find('#tab-option-0').should('have.attr', 'aria-selected', 'false');
        cy.get('vl-tabs-next').find('#panel-2').should('not.have.attr', 'hidden');
        cy.get('vl-tabs-next').find('#panel-1').should('have.attr', 'hidden');
    });

    it('should show the new tab in the dropdown after select() following Escape on its option', () => {
        mountTabs();
        cy.get('vl-tabs-next').shadow().find('.vl-tabs--mobile').should('exist');

        mobileToggleButton().click();
        cy.get('vl-tabs-next')
            .shadow()
            .find('#tab-option-0')
            .focus()
            .trigger('keydown', { key: 'ArrowDown', bubbles: true, composed: true });
        cy.focused().trigger('keydown', { key: 'Escape', bubbles: true, composed: true });
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-dropdown').should('have.attr', 'hidden');
        cy.get('vl-tabs-next')
            .find<VlTabComponent>('#tab-2')
            .then(($tab) => $tab[0].select());

        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-toggle').should('contain.text', 'Tab 2');
        cy.get('vl-tabs-next').shadow().find('#tab-option-1').should('have.attr', 'aria-selected', 'true');
        cy.get('vl-tabs-next').find('#panel-2').should('not.have.attr', 'hidden');
    });

    it('should navigate to the tab link href from the dropdown when vl-tab-change is not refused', () => {
        clearLocationHash();
        mountTabLinks();
        cy.get('vl-tabs-next').shadow().find('.vl-tabs--mobile').should('exist');
        cy.window().then((win) => cy.stub(win, 'open').as('window-open'));
        cy.createStubForEvent('vl-tabs-next', 'vl-tab-change');

        mobileToggleButton().click();
        cy.get('vl-tabs-next').shadow().find('#tab-option-1').click();
        cy.location('hash').should('equal', '#tab-link-2');
        mobileToggleButton().click();
        cy.get('vl-tabs-next').shadow().find('#tab-option-2').click();

        shouldHaveChangeDetail('firstCall', 'link-2', 'link-1');
        shouldHaveChangeDetail('lastCall', 'link-3', 'link-2');
        cy.get('@window-open').should('have.been.calledOnceWith', 'https://www.vlaanderen.be', '_blank', 'noopener');
    });

    it('should not navigate from the dropdown when vl-tab-change is refused for a tab link', () => {
        clearLocationHash();
        mountTabLinks();
        cy.get('vl-tabs-next').shadow().find('.vl-tabs--mobile').should('exist');
        cy.window().then((win) => cy.stub(win, 'open').as('window-open'));
        refuseTabChanges();

        mobileToggleButton().click();
        cy.get('vl-tabs-next').shadow().find('#tab-option-1').click();
        mobileToggleButton().click();
        cy.get('vl-tabs-next').shadow().find('#tab-option-2').click();

        cy.get('@vl-tab-change').should('have.been.calledTwice');
        cy.location('hash').should('equal', '');
        cy.get('@window-open').should('not.have.been.called');
        shouldHaveOnlyFirstTabLinkSelected();
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-toggle').should('contain.text', 'Link 1');
    });

    it('should not navigate from the dropdown when vl-tab-change is refused on Enter and Space for a tab link', () => {
        clearLocationHash();
        mountTabLinks();
        cy.get('vl-tabs-next').shadow().find('.vl-tabs--mobile').should('exist');
        cy.window().then((win) => cy.stub(win, 'open').as('window-open'));
        refuseTabChanges();

        mobileToggleButton().click();
        cy.get('vl-tabs-next')
            .shadow()
            .find('#tab-option-0')
            .focus()
            .trigger('keydown', { key: 'ArrowDown', bubbles: true, composed: true });
        cy.focused().trigger('keydown', { key: 'Enter', bubbles: true, composed: true });
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-dropdown').should('have.attr', 'hidden');
        mobileToggleButton().should('have.focus');

        mobileToggleButton().click();
        cy.get('vl-tabs-next')
            .shadow()
            .find('#tab-option-0')
            .focus()
            .trigger('keydown', { key: 'End', bubbles: true, composed: true });
        cy.focused().trigger('keydown', { key: ' ', bubbles: true, composed: true });

        shouldHaveChangeDetail('firstCall', 'link-2', 'link-1');
        shouldHaveChangeDetail('lastCall', 'link-3', 'link-1');
        cy.get('@vl-tab-change').should('have.been.calledTwice');
        cy.location('hash').should('equal', '');
        cy.get('@window-open').should('not.have.been.called');
        shouldHaveOnlyFirstTabLinkSelected();
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-dropdown').should('have.attr', 'hidden');
        mobileToggleButton().should('have.focus');
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-toggle').should('contain.text', 'Link 1');
    });

    it('should open an external tab link only once with select()', () => {
        mountTabLinks();
        cy.get('vl-tabs-next').shadow().find('.vl-tabs--mobile').should('exist');
        cy.window().then((win) => cy.stub(win, 'open').as('window-open'));
        stubNativeClicks();

        cy.get('vl-tabs-next')
            .find<VlTabLinkComponent>('#link-3')
            .then(($link) => $link[0].select());

        cy.get('@native-click').should('have.been.calledOnceWith', '_blank');
        cy.get('@window-open').should('not.have.been.called');
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-toggle').should('contain.text', 'Link 3');
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
