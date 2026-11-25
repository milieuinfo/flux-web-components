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

const recordPreventedNativeClicks = () =>
    cy.get('#tab-links-container').then(($container) => {
        const nativeClick = cy.stub().as('native-click');
        $container[0].addEventListener('click', (event) => nativeClick(event.defaultPrevented));
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

    // On mobile the tab links stay real links in a disclosure (FLUX-739): the browser follows them, unless
    // vl-tab-change is refused
    it('should follow a tab link in the mobile list and close the list when vl-tab-change is not refused', () => {
        clearLocationHash();
        mountTabLinks();
        cy.get('vl-tabs-next').shadow().find('.vl-tabs--mobile').should('exist');
        cy.window().then((win) => cy.stub(win, 'open').as('window-open'));
        cy.createStubForEvent('vl-tabs-next', 'vl-tab-change');

        mobileToggleButton().click();
        clickTabLink('#link-2');
        cy.location('hash').should('equal', '#tab-link-2');
        mobileToggleButton().should('have.attr', 'aria-expanded', 'false');
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-toggle').should('contain.text', 'Link 2');
        mobileToggleButton().click();
        stubNativeClicks();
        clickTabLink('#link-3');

        shouldHaveChangeDetail('firstCall', 'link-2', 'link-1');
        shouldHaveChangeDetail('lastCall', 'link-3', 'link-2');
        cy.get('@native-click').should('have.been.calledOnceWith', '_blank');
        cy.get('@window-open').should('not.have.been.called');
        mobileToggleButton().should('have.attr', 'aria-expanded', 'false');
        cy.get('#link-3').shadow().find('a').should('have.attr', 'aria-current', 'page');
    });

    it('should not follow a tab link in the mobile list when vl-tab-change is refused on a click', () => {
        clearLocationHash();
        mountTabLinks();
        cy.get('vl-tabs-next').shadow().find('.vl-tabs--mobile').should('exist');
        refuseTabChanges();

        mobileToggleButton().click();
        recordPreventedNativeClicks();
        clickTabLink('#link-2');
        clickTabLink('#link-3');

        cy.get('@vl-tab-change').should('have.been.calledTwice');
        cy.get('@native-click').should('have.been.calledTwice').and('always.have.been.calledWith', true);
        cy.location('hash').should('equal', '');
        shouldHaveOnlyFirstTabLinkSelected();
        mobileToggleButton().should('have.attr', 'aria-expanded', 'true');
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-toggle').should('contain.text', 'Link 1');
    });

    it('should not follow a tab link in the mobile list when vl-tab-change is refused on Enter', () => {
        clearLocationHash();
        mountTabLinks();
        cy.get('vl-tabs-next').shadow().find('.vl-tabs--mobile').should('exist');
        refuseTabChanges();

        mobileToggleButton().focus();
        cy.press(Cypress.Keyboard.Keys.SPACE);
        mobileToggleButton().should('have.attr', 'aria-expanded', 'true');
        recordPreventedNativeClicks();
        cy.press(Cypress.Keyboard.Keys.DOWN);
        cy.press(Cypress.Keyboard.Keys.DOWN);
        cy.press(Cypress.Keyboard.Keys.ENTER);
        cy.press(Cypress.Keyboard.Keys.END);
        cy.press(Cypress.Keyboard.Keys.ENTER);

        shouldHaveChangeDetail('firstCall', 'link-2', 'link-1');
        shouldHaveChangeDetail('lastCall', 'link-3', 'link-1');
        cy.get('@vl-tab-change').should('have.been.calledTwice');
        cy.get('@native-click').should('have.been.calledTwice').and('always.have.been.calledWith', true);
        cy.location('hash').should('equal', '');
        shouldHaveOnlyFirstTabLinkSelected();
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

    it('should select and follow a tab link with select() on mobile and keep the list closed', () => {
        clearLocationHash();
        mountTabLinks();
        cy.get('vl-tabs-next').shadow().find('.vl-tabs--mobile').should('exist');
        cy.createStubForEvent('vl-tabs-next', 'vl-tab-change');

        cy.get('vl-tabs-next')
            .find<VlTabLinkComponent>('#link-2')
            .then(($link) => $link[0].select());

        cy.location('hash').should('equal', '#tab-link-2');
        cy.get('#link-2').should('have.attr', 'selected');
        cy.get('#link-2').shadow().find('a').should('have.attr', 'aria-current', 'page');
        cy.get('#link-1').shadow().find('a').should('not.have.attr', 'aria-current');
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-toggle').should('contain.text', 'Link 2');
        cy.get('@vl-tab-change').should('not.have.been.called');
        mobileToggleButton().should('have.attr', 'aria-expanded', 'false');
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-dropdown').should('have.attr', 'hidden');
    });

    it('should close the mobile list and move the focus to the toggle on select() of a tab link', () => {
        clearLocationHash();
        mountTabLinks();
        cy.get('vl-tabs-next').shadow().find('.vl-tabs--mobile').should('exist');
        cy.createStubForEvent('vl-tabs-next', 'vl-tab-change');

        mobileToggleButton().click();
        mobileToggleButton().should('have.attr', 'aria-expanded', 'true');
        // The focus leaves the toggle first, so that the focus check below proves the move back
        cy.get('#link-1').shadow().find('a').focus();
        cy.get('vl-tabs-next')
            .find<VlTabLinkComponent>('#link-2')
            .then(($link) => $link[0].select());

        mobileToggleButton().should('have.attr', 'aria-expanded', 'false').and('have.focus');
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-dropdown').should('have.attr', 'hidden');
        cy.get('#link-2').shadow().find('a').should('have.attr', 'aria-current', 'page');
        cy.get('#link-1').shadow().find('a').should('not.have.attr', 'aria-current');
        cy.location('hash').should('equal', '#tab-link-2');
        cy.get('@vl-tab-change').should('not.have.been.called');
    });

    it('should move the focus to the selected option when the listbox opens', () => {
        mountTabs();

        cy.get('vl-tabs-next').find('#tab-2').then(([tab]) => (tab as VlTabComponent).select());
        cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-toggle').shadow().find('button').click();

        cy.focused().should('have.id', 'tab-option-1').and('have.attr', 'aria-selected', 'true');
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

describe('cypress-component - block components - vl-tabs-next - horizontal navigation - mobile', () => {
    const mountHorizontalNavigation = () =>
        cy.mount(html`
            <vl-tabs-next horizontal-navigation label="Transportmiddelen">
                <vl-tab-link-next href="#trein">Trein</vl-tab-link-next>
                <vl-tab-link-next href="#metro" selected>Metro, tram en bus</vl-tab-link-next>
                <vl-tab-link-next href="https://www.example.com" external>Fiets</vl-tab-link-next>
            </vl-tabs-next>
        `);

    const toggle = () => cy.get('vl-tabs-next').shadow().find('.vl-tabs__mobile-toggle');
    const toggleButton = () => toggle().shadow().find('button');

    const shouldFocusLink = (index: number) =>
        cy
            .get('vl-tab-link-next')
            .eq(index)
            .should(([link]) => {
                expect(link.shadowRoot!.activeElement).to.equal(link.shadowRoot!.querySelector('a'));
            });

    const openWithKeyboard = () => {
        toggleButton().focus();
        cy.press(Cypress.Keyboard.Keys.SPACE);
        toggleButton().should('have.attr', 'aria-expanded', 'true');
    };

    beforeEach(() => {
        cy.viewport(480, 800);
    });

    // Disclosure navigation (FLUX-739): links are not options of a listbox or combobox (WCAG 4.1.2), and choosing
    // an option must not navigate (WCAG 3.2.2)
    it('should keep the links as links instead of listbox options on mobile', () => {
        mountHorizontalNavigation();

        cy.get('vl-tabs-next').shadow().find('[role="listbox"], [role="option"]').should('not.exist');
        cy.get('vl-tabs-next')
            .shadow()
            .find('nav[aria-label="Transportmiddelen"] .vl-tabs__mobile-toggle')
            .should('have.text', 'Metro, tram en bus');
        toggleButton().should('not.have.attr', 'aria-haspopup');
        toggleButton().should('have.attr', 'aria-expanded', 'false');
        cy.get('vl-tab-link-next').first().should('not.be.visible');

        toggleButton().click();

        toggleButton().should('have.attr', 'aria-expanded', 'true');
        cy.get('vl-tab-link-next').each(([link]) => {
            expect(link.getAttribute('role')).to.equal('listitem');
            cy.wrap(link).shadow().find('a').should('be.visible').and('have.attr', 'href');
        });
        cy.get('vl-tab-link-next[selected]').shadow().find('a').should('have.attr', 'aria-current', 'page');
    });

    it('should render the toggle over the full width', () => {
        mountHorizontalNavigation();

        cy.get('vl-tabs-next').should(([tabs]) => {
            const toggleElement = tabs.shadowRoot!.querySelector('.vl-tabs__mobile-toggle')!;
            expect(toggleElement.getBoundingClientRect().width).to.be.closeTo(tabs.getBoundingClientRect().width, 1);
        });
    });

    it('should name the toggle after the selected link when the links are added later', () => {
        cy.mount(html`<vl-tabs-next horizontal-navigation label="Transportmiddelen"></vl-tabs-next>`);
        toggle().should('have.text', '');
        cy.get('vl-tabs-next').should(([tabs]) => expect((tabs as VlTabsComponent).hasUpdated).to.be.true);

        cy.get('vl-tabs-next').then(([tabs]) => {
            const link = document.createElement('vl-tab-link-next');
            link.setAttribute('href', '#fiets');
            link.setAttribute('selected', '');
            link.textContent = 'Fiets';
            tabs.appendChild(link);
        });

        toggle().should('have.text', 'Fiets');
    });

    it('should show the external link with its indication on mobile', () => {
        mountHorizontalNavigation();

        toggleButton().click();

        cy.get('vl-tab-link-next[external]').shadow().find('a').should('have.attr', 'target', '_blank');
        cy.get('vl-tab-link-next[external]')
            .shadow()
            .find('vl-icon[icon="external"]')
            .should('be.visible')
            .and('have.attr', 'label', '(opent in een nieuw venster)');
    });

    it('should keep the focus on the toggle, move to the links with Tab and close with Escape', () => {
        mountHorizontalNavigation();

        openWithKeyboard();
        toggleButton().should('have.focus');

        cy.press(Cypress.Keyboard.Keys.TAB);
        shouldFocusLink(0);

        cy.press(Cypress.Keyboard.Keys.ESC);
        toggleButton().should('have.attr', 'aria-expanded', 'false').and('have.focus');
        cy.get('vl-tab-link-next').first().should('not.be.visible');
    });

    // The list looks like a dropdown: the arrow keys, Home and End move the focus between the links, as in the APG
    // example "Disclosure Navigation Menu", but they never navigate or select
    it('should move the focus between the links with the arrow keys, Home and End without navigating', () => {
        mountHorizontalNavigation();
        cy.createStubForEvent('vl-tabs-next', 'vl-tab-link-click');

        openWithKeyboard();
        cy.press(Cypress.Keyboard.Keys.DOWN);
        shouldFocusLink(0);
        cy.press(Cypress.Keyboard.Keys.DOWN);
        shouldFocusLink(1);
        cy.press(Cypress.Keyboard.Keys.DOWN);
        shouldFocusLink(2);
        cy.press(Cypress.Keyboard.Keys.DOWN);
        shouldFocusLink(2);
        cy.press(Cypress.Keyboard.Keys.UP);
        shouldFocusLink(1);
        cy.press(Cypress.Keyboard.Keys.HOME);
        shouldFocusLink(0);
        cy.press(Cypress.Keyboard.Keys.END);
        shouldFocusLink(2);

        toggleButton().should('have.attr', 'aria-expanded', 'true');
        cy.get('vl-tab-link-next[selected]').should('have.text', 'Metro, tram en bus');
        cy.get('@vl-tab-link-click').should('not.have.been.called');

        cy.press(Cypress.Keyboard.Keys.ESC);
        toggleButton().should('have.attr', 'aria-expanded', 'false').and('have.focus');
    });

    it('should show the links as dropdown options on mobile, without the bar of a tab', () => {
        mountHorizontalNavigation();

        toggleButton().click();

        cy.get('vl-tab-link-next[selected]')
            .shadow()
            .find('a')
            .should(([link]) => {
                expect(getComputedStyle(link, '::after').display).to.equal('none');
                expect(getComputedStyle(link).fontWeight).to.equal('500');
            });
        cy.get('vl-tab-link-next')
            .first()
            .shadow()
            .find('a')
            .should(([link]) => {
                expect(getComputedStyle(link).fontWeight).to.equal('400');
            });
    });

    it('should let the browser follow the link instead of navigating on a selection, and close the disclosure', () => {
        mountHorizontalNavigation();
        cy.window().then((win) => cy.stub(win, 'open').as('windowOpen'));
        cy.document().then((doc) => doc.addEventListener('click', (event) => event.preventDefault()));
        cy.createStubForEvent('vl-tabs-next', 'vl-tab-link-click');

        toggleButton().click();
        cy.get('vl-tab-link-next[external]').shadow().find('a').click();

        cy.get('@vl-tab-link-click').should('have.been.calledOnce');
        cy.get('@windowOpen').should('not.have.been.called');
        toggleButton().should('have.attr', 'aria-expanded', 'false');
        cy.get('vl-tab-link-next[external]').should('have.attr', 'selected');
    });

    it('should be accessible on mobile, closed and open', () => {
        mountHorizontalNavigation();
        cy.injectAxe();

        cy.checkA11y('vl-tabs-next');
        toggleButton().click();
        cy.checkA11y('vl-tabs-next');
    });
});
