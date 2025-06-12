// Er zijn wijzigingen in deze file toegepast tov de originele file van Digitaal Vlaanderen v14.0.2.
// Er staat een comment bij alle wijzigingen beginnend met het ticket nummer waar de wijziging voor doorgevoerd is (UIG-...).
// Verder is de dressAll() methode en alle calls hiernaar verwijderd aangezien deze methode niet nodig is.

// Private Variables
const tabActiveClass = `vl-tab--active`,
    tabClass = `vl-tab`,
    dataTabList = `[tabs-list]`,
    dataTab = `[tab]`,
    dataTabPane = `[tab-pane]`,
    tabToggleAtt = `tabs-toggle`,
    tabShowAtt = `show`,
    tabCloseAtt = `close`,
    tabsAtt = `tabs`;

// eslint-disable-next-line no-undef
const breakpoint = vl.breakpoint;

breakpoint.dress();

class TabsNext {
    constructor() {
        this.currentTabIndexForCurrentTabsContainer = -1;
    }

    resetTabIndexesForTabs(tabs) {
        vl.util.each(tabs, (tab) => {
            tab.setAttribute('tabindex', '-1');
            tab.setAttribute('aria-selected', 'false');
            if (typeof tab.closest === 'function') {
                // check for IE
                vl.util.removeClass(tab.closest(`.${tabClass}`), tabActiveClass);
            }
        });
    }

    resetTabPanes(tabPanes) {
        vl.util.each(tabPanes, (pane) => {
            pane.setAttribute('hidden', 'hidden');
            pane.setAttribute(`${tabShowAtt}`, 'false');
        });
    }

    showTabPaneForTab(tab, tabPane) {
        // hightlight tab
        tab.setAttribute('tabindex', '0');
        if (typeof tab.closest === 'function') {
            // check for IE
            vl.util.addClass(tab.closest(`.${tabClass}`), tabActiveClass);
        }
        tab.setAttribute('aria-selected', true);

        // UIG-2483: Nullcheck toegevoegd voor tabPane.
        tabPane?.setAttribute('hidden', '');
        tabPane?.setAttribute(`${tabShowAtt}`, 'true');
    }

    updateResponsiveBtnLabelForTabsContainerWithTab(tabsContainer, tab) {
        const toggleBtnEl = tabsContainer.querySelector(`[${tabToggleAtt}] span`);

        toggleBtnEl.innerHTML = tab.innerHTML;
    }

    clickEvent(event) {
        if (event.target && typeof event.target.closest === 'function') {
            // check for IE
            const tabsContainer = event.target.closest(`[${tabsAtt}]`);

            const toggleBtnEl = tabsContainer.querySelector(`[${tabToggleAtt}]`);
            const tabsList = tabsContainer.querySelector(`${dataTabList}`);
            const isListOpen = tabsList.getAttribute(tabShowAtt) === 'true';

            tabsList.setAttribute(tabShowAtt, isListOpen ? 'false' : 'true');
            tabsList.setAttribute('aria-hidden', isListOpen ? 'true' : 'false');
            toggleBtnEl.setAttribute('aria-expanded', isListOpen ? 'true' : 'false');
            toggleBtnEl.setAttribute(tabCloseAtt, isListOpen ? 'false' : 'true');
        }
    }

    setupResponsiveToggleBtnForTabsContainer(tabsComponent) {
        const tabsContainer = tabsComponent.shadowRoot;
        const toggleBtnEl = tabsContainer?.querySelector(`[${tabToggleAtt}]`);
        const displayStyle = tabsComponent.getAttribute('display-style');
        const bp = breakpoint._getBreakpoint();

        // setup responsive toggle btn
        // UIG-2218: Event listener voor click event op toggle button enkel breakpoint afhankelijk toevoegen
        // wanneer default behavior van toepassing is.
        if (toggleBtnEl && (bp === 'xsmall' || bp === 'small' || displayStyle === 'collapsed')) {
            toggleBtnEl.addEventListener('click', this.clickEvent, { signal: tabsComponent.disconnectedSignal });
        }
    }

    dress(tabsComponent) {
        const tabsContainer = tabsComponent.shadowRoot;
        const tabs = tabsContainer.querySelectorAll(`${dataTab}`);
        const tabPanes = tabsContainer.querySelectorAll(`${dataTabPane}`);
        const currentTabHash = window.location.hash;
        const activeTab = tabsContainer.querySelector(`[href$='${currentTabHash}']`);

        // UIG-2483: Check voor tabPanes.length > 0 uitgezet.
        // Bij het gebruik binnen de functional-header zijn er geen tabPanes, maar de logica hieronder moet wel uitgevoerd worden.
        // Indien dit niet uitgevoerd wordt zijn er problemen in de mobile view en problemen met accessibility.
        vl.util.each(tabs, (tab, index) => {
            tab.addEventListener('focus', () => {
                this.currentTabIndexForCurrentTabsContainer = index;
                tab.click();
            });
            tab.addEventListener('click', () => {
                // reset tabs & panes
                this.resetTabIndexesForTabs(tabs);
                this.resetTabPanes(tabPanes);

                // set tab
                this.showTabPaneForTab(tab, tabPanes[index]);

                // set responsive button label
                this.updateResponsiveBtnLabelForTabsContainerWithTab(tabsContainer, tab);
                const toggleBtnEl = tabsContainer.querySelector(`[${tabToggleAtt}]`);
                toggleBtnEl.click();
            });
        });

        if (activeTab) {
            activeTab.click();
        }

        // Detect arrows (<-, ->) & spacebar usage on tabContainer
        tabsContainer.addEventListener('keydown', (event) => {
            switch (event.keyCode) {
                // left arrow <-
                case 37: {
                    let i = this.currentTabIndexForCurrentTabsContainer - 1;

                    if (i < 0) {
                        i = tabs.length - 1;
                    }
                    const prevTabEl = tabs[i];

                    if (prevTabEl) {
                        prevTabEl.focus();
                    }
                    break;
                }
                // right arrow ->
                case 39: {
                    let i = this.currentTabIndexForCurrentTabsContainer + 1;

                    if (i >= tabs.length) {
                        i = 0;
                    }
                    const nextTabEl = tabs[i];

                    if (nextTabEl) {
                        nextTabEl.focus();
                    }
                    break;
                }
                default:
                    break;
            }
        });

        const displayStyle = tabsComponent.getAttribute('display-style');

        // UIG-2830: we zetten de responsive toggle button op omdat tabs kan opstarten in een breakpoint
        // waarbij de toggle button nodig is zonder dat een resize event heeft plaatsgevonden
        this.setupResponsiveToggleBtnForTabsContainer(tabsComponent);

        // UIG-2830: Event listener voor window resize toevoegen wanneer default behavior van toepassing is
        if (displayStyle !== 'tabs' || displayStyle !== 'collapsed') {
            window.addEventListener(
                'resize',
                vl.util.debounce(() => {
                    const bp = breakpoint._getBreakpoint();
                    const toggleBtnEl = tabsContainer.querySelector(`[${tabToggleAtt}]`);
                    toggleBtnEl.removeEventListener('click', this.clickEvent, false);

                    // setup responsive toggle btn
                    if (bp === 'xsmall' || bp === 'small') {
                        this.setupResponsiveToggleBtnForTabsContainer(tabsComponent);
                    }
                }, 0),
                { signal: tabsComponent.disconnectedSignal }
            );
        }
    }
}

if (!('tabs' in vl)) {
    vl.tabs = new TabsNext();
}

export default TabsNext;
