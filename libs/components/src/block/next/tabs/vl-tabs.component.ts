import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { VlButtonComponent } from '@domg-wc/components/atom';
import { SelectOption, VlSelectComponent } from '@domg-wc/components/form';
import { vlMediaScreenSmall, vlResetStyles } from '@domg-wc/styles';
import { CSSResult, html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';
import { VlTabLinkComponent } from './vl-tab-link.component';
import { VlTabPanelComponent } from './vl-tab-panel.component';
import { VlTabComponent } from './vl-tab.component';
import { vlTabsFluxStyles } from './vl-tabs.flux-css';

registerWebComponents([VlTabComponent, VlTabLinkComponent, VlTabPanelComponent, VlSelectComponent]);

export type TabClickEventDetail = {
    tab: VlTabComponent;
};

export type TabLinkClickEventDetail = {
    tab: VlTabLinkComponent;
};

export type TabChangeEventDetail = {
    tab: VlTabComponent | VlTabLinkComponent;
    previousTab: VlTabComponent | VlTabLinkComponent | undefined;
};

/**
 * Tabs component voor overzichtelijke navigatie tussen tabbladen.
 * @property {string} label - Beschrijvende label voor de tabs container.
 * @property {boolean} noBorder - Verwijdert de rand onder de tabs.
 * @property {boolean} horizontalNavigation - Schakelt horizontale navigatie in voor <vl-tab-link-next>.
 * @fires vl-tab-change - Vuurt vóór de gebruiker naar een andere tab wisselt. Roep preventDefault() aan om de wissel te weigeren.
 * @fires vl-tab-click - Vuurt wanneer een <vl-tab-next> aangeklikt wordt, ook als de wissel daarna geweigerd wordt.
 * @fires vl-tab-link-click - Vuurt wanneer een <vl-tab-link-next> aangeklikt wordt, ook als de wissel daarna geweigerd wordt.
 */
@webComponent('vl-tabs-next')
export class VlTabsComponent extends BaseLitElement {
    static get styles(): CSSResult[] {
        return [vlResetStyles, vlTabsFluxStyles];
    }

    @property({ type: Boolean, reflect: true, attribute: 'horizontal-navigation' })
    horizontalNavigation = false;

    @property({ type: String, reflect: true, attribute: 'label' })
    label = '';

    @property({ type: Boolean, reflect: true, attribute: 'no-border' })
    noBorder = false;

    @property({ type: Boolean })
    private mobile = window.matchMedia(`(max-width: ${vlMediaScreenSmall}px)`).matches;

    @property({ type: Boolean })
    private mobileDropdownOpen = false;

    @property({ type: Number })
    private mobileDropdownFocusedIndex = -1;

    private mobileMediaQuery?: MediaQueryList;
    
    private get mobileOptions(): SelectOption[] { 
        return this.allTabs.map((tab, index) => ({
            label: tab.textContent || '',
            value: String(index),
            selected: index === this.selectedTabIndex,
        })) || [];
    }

    private get mobileToggleButton(): HTMLButtonElement | null {
        return (
            this.shadowRoot
                ?.querySelector<VlButtonComponent>('.vl-tabs__mobile-toggle')
                ?.shadowRoot?.querySelector<HTMLButtonElement>('button') || null
        );
    }

    private get allTabs(): (VlTabComponent | VlTabLinkComponent)[] {
        const defaultSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('nav slot');
        if (!defaultSlot) {
            return [];
        }

        return defaultSlot
            .assignedElements()
            .filter((element) => element instanceof VlTabComponent || element instanceof VlTabLinkComponent) as (
            | VlTabComponent
            | VlTabLinkComponent
        )[];
    }

    private get selectedTab(): VlTabComponent | VlTabLinkComponent | undefined {
        return this.allTabs.find((tab) => tab.selected === true);
    }

    private get selectedTabIndex(): number {
        if (!this.selectedTab) {
            return -1;
        }
        return this.allTabs.indexOf(this.selectedTab);
    }

    private showPanel = (panelId: string) => {
        this.querySelectorAll(`vl-tab-panel-next`).forEach((el) => el.setAttribute('hidden', ''));
        const panelElement = this.querySelector<VlTabPanelComponent>(`vl-tab-panel-next[id="${CSS.escape(panelId)}"]`);
        if (!panelElement) {
            console.warn(`
                vl-tabs-next: Er werd geen panel gevonden met ID: "${panelId}".
                Voeg een <vl-tab-panel-next> element toe en koppel het met een <vl-tab-next> adhv het panel ID.
                Indien je niet met panels wenst te werken, gebruik dan het "horizontal-navigation"-attribuut en
                <vl-tab-link-next> elementen.`);
            return;
        }
        panelElement.removeAttribute('hidden');
    };

    private selectTab = (
        tab: VlTabComponent | VlTabLinkComponent,
        focus: boolean = false,
        navigate: boolean = true,
    ) => {
        this.allTabs.forEach((otherTab) => {
            if (otherTab !== tab && otherTab.selected) {
                otherTab.selected = false;
            }
        });
        if (!tab.selected) {
            tab.selected = true;
        }

        if (tab instanceof VlTabComponent) {
            this.showPanel(tab.panel);
        }

        if (focus) {
            tab.focus();
        }

        if (this.mobile) {
            // The toggle label and options are derived from the selected state of the tabs, which Lit doesn't observe.
            this.requestUpdate();
            const index = this.allTabs.indexOf(tab);
            const optionIndex = this.mobileOptions.findIndex((option) => option.value === String(index));
            if (optionIndex !== -1) {
                this.mobileDropdownFocusedIndex = index;
            }
            if (navigate && this.horizontalNavigation) {
                const href = (tab as VlTabLinkComponent).href;
                if (href) {
                    if ((tab as VlTabLinkComponent).external) {
                        window.open(href, '_blank', 'noopener');
                    } else {
                        window.location.href = href;
                    }
                }
            }
        }
    };

    private requestSelectTab(
        tab: VlTabComponent | VlTabLinkComponent,
        focus: boolean = false,
        navigate: boolean = true,
    ): boolean {
        // select() on vl-tab-next sets selected before it dispatches vl-tab-click, so a programmatic selection can't be refused.
        if (!tab.selected && !this.dispatchTabChange(tab)) {
            return false;
        }
        this.selectTab(tab, focus, navigate);
        return true;
    }

    private dispatchTabChange(tab: VlTabComponent | VlTabLinkComponent): boolean {
        return this.dispatchEvent(
            new CustomEvent<TabChangeEventDetail>('vl-tab-change', {
                detail: { tab, previousTab: this.selectedTab },
                bubbles: true,
                composed: true,
                cancelable: true,
            }),
        );
    }

    private previousTab(): void {
        const { selectedTabIndex } = this;

        if (selectedTabIndex === -1) {
            return;
        }

        const previousTabIndex = selectedTabIndex === 0 ? this.allTabs.length - 1 : selectedTabIndex - 1;

        this.requestSelectTab(this.allTabs[previousTabIndex], true);
    }

    private nextTab(): void {
        const { selectedTabIndex } = this;

        if (selectedTabIndex === -1) {
            return;
        }

        const nextTabIndex = selectedTabIndex === this.allTabs.length - 1 ? 0 : selectedTabIndex + 1;

        this.requestSelectTab(this.allTabs[nextTabIndex], true);
    }

    private firstTab(): void {
        this.requestSelectTab(this.allTabs[0], true);
    }

    private lastTab(): void {
        this.requestSelectTab(this.allTabs[this.allTabs.length - 1], true);
    }

    private onKeyDown = (e: KeyboardEvent) => {
        // Keydowns from panel content and from the mobile dropdown also bubble through the host.
        if (!this.allTabs.some((tab) => tab === e.target)) {
            return;
        }
        const key = e.key.toLowerCase();
        switch (key) {
            case 'arrowleft':
                this.previousTab();
                break;
            case 'arrowright':
                this.nextTab();
                break;
            case 'home':
                this.firstTab();
                break;
            case 'end':
                this.lastTab();
                break;
            default:
                break;
        }
    };

    private onTabClicked = (e: Event) => {
        const { tab } = (e as CustomEvent<TabClickEventDetail>).detail;
        this.requestSelectTab(tab, true);
    };

    // A tab link is handled on the native click of its <a>: only that event can still stop the browser from navigating.
    private onTabLinkClicked = (e: MouseEvent) => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
            return;
        }
        const tab = this.findClickedTabLink(e);
        if (tab && !this.requestSelectTab(tab)) {
            e.preventDefault();
        }
    };

    private findClickedTabLink(e: MouseEvent): VlTabLinkComponent | undefined {
        const path = e.composedPath();
        return this.allTabs.find(
            (tab): tab is VlTabLinkComponent =>
                tab instanceof VlTabLinkComponent &&
                path.some((target) => target instanceof HTMLAnchorElement && target.getRootNode() === tab.shadowRoot),
        );
    }

    firstUpdated(): void {
        this.ensureSelectedTab();

        this.mobileMediaQuery = window.matchMedia(`(max-width: ${vlMediaScreenSmall}px)`);
        this.setMobileState(this.mobileMediaQuery.matches);
        this.mobileMediaQuery.addEventListener('change', this.handleMobileMediaQueryChange);
    }

    updated(): void {
        this.ensureSelectedTab();
    }

    private setMobileState(isMobile: boolean): void {
        this.mobile = isMobile;
        if (this.mobile) {
            // Remove listitem role from tab links in mobile
            this.allTabs.forEach((tab) => {
                if (tab instanceof VlTabLinkComponent) {
                    tab.removeAttribute('role');
                }
            });
        } else {
            this.mobileDropdownFocusedIndex = -1;
            this.mobileDropdownOpen = false;
            // Set listitem role on tab links in desktop
            this.allTabs.forEach((tab) => {
                if (tab instanceof VlTabLinkComponent) {
                    tab.setAttribute('role', 'listitem');
                }
            });
        }
    }

    private handleMobileMediaQueryChange = (event: MediaQueryListEvent): void => {
        this.setMobileState(event.matches);
    };

    private ensureSelectedTab(): void {
        if (this.allTabs.length === 0) {
            return;
        }

        const selectedTab = this.allTabs.find((tab) => tab.selected === true);
        if (!selectedTab) {
            this.selectTab(this.allTabs[0], false, false);
            return;
        }
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.addEventListener('vl-tab-click', this.onTabClicked);
        this.addEventListener('click', this.onTabLinkClicked);
        if (!this.horizontalNavigation) {
            this.addEventListener('keydown', this.onKeyDown);
        }
        this.addEventListener('keydown', this.onMobileListboxKeyDown);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        this.removeEventListener('vl-tab-click', this.onTabClicked);
        this.removeEventListener('click', this.onTabLinkClicked);
        this.removeEventListener('keydown', this.onKeyDown);
        this.removeEventListener('keydown', this.onMobileListboxKeyDown);

        if (this.mobileMediaQuery) {
            this.mobileMediaQuery.removeEventListener('change', this.handleMobileMediaQueryChange);
            this.mobileMediaQuery = undefined;
        }
    }

    protected override render(): TemplateResult {
        return html` ${this.mobile ? this.renderMobile() : this.renderDesktop()} `;
    }

    protected renderDesktop(): TemplateResult {
        return html`<div class="vl-tabs ${this.noBorder ? 'vl-tabs--no-border' : ''}">
                <nav
                    id="tabs-nav"
                    aria-label="${ifDefined(this.label ? this.label : undefined)}"
                    role="${ifDefined(!this.horizontalNavigation ? 'tablist' : undefined)}"
                >
                    ${when(!this.horizontalNavigation, () => html` <slot></slot> `)}
                    ${when(
                        this.horizontalNavigation,
                        () =>
                            html`<ul>
                                <slot></slot>
                            </ul>`,
                    )}
                </nav>
            </div>
            ${when(!this.horizontalNavigation, () => html` <slot name="panel"></slot> `)} `;
    }

    private focusMobileOption(index: number): void {
        const option = this.shadowRoot?.querySelector<HTMLDivElement>(`#tab-option-${index}`);
        option?.focus();
    }

    private onMobileToggle = () => {
        this.mobileDropdownOpen = !this.mobileDropdownOpen;
        if (this.mobileDropdownOpen) {
            this.mobileDropdownFocusedIndex = 0;
            requestAnimationFrame(() => {
                this.focusMobileOption(this.mobileDropdownFocusedIndex);
            });
        } else {
            this.mobileToggleButton?.focus();
        }
    };

    private onMobileListboxKeyDown = (e: KeyboardEvent) => {
        if (!this.mobileDropdownOpen) return;

        const key = e.key.toLowerCase();
        const optionsCount = this.mobileOptions.length;

        switch (key) {
            case 'arrowdown':
                e.preventDefault();
                this.mobileDropdownFocusedIndex =
                    this.mobileDropdownFocusedIndex === optionsCount - 1 ? 0 : this.mobileDropdownFocusedIndex + 1;
                this.focusMobileOption(this.mobileDropdownFocusedIndex);
                break;
            case 'arrowup':
                e.preventDefault();
                this.mobileDropdownFocusedIndex =
                    this.mobileDropdownFocusedIndex === 0 ? optionsCount - 1 : this.mobileDropdownFocusedIndex - 1;
                this.focusMobileOption(this.mobileDropdownFocusedIndex);
                break;
            case 'home':
                e.preventDefault();
                this.mobileDropdownFocusedIndex = 0;
                this.focusMobileOption(this.mobileDropdownFocusedIndex);
                break;
            case 'end':
                e.preventDefault();
                this.mobileDropdownFocusedIndex = optionsCount - 1;
                this.focusMobileOption(this.mobileDropdownFocusedIndex);
                break;
            case 'enter':
            case ' ':
                e.preventDefault();
                if (this.mobileDropdownFocusedIndex >= 0) {
                    this.requestSelectTab(this.allTabs[this.mobileDropdownFocusedIndex], false, true);
                    this.onMobileToggle();
                    this.mobileToggleButton?.focus();
                }
                break;
            case 'escape':
                e.preventDefault();
                this.onMobileToggle();
                this.mobileToggleButton?.focus();
                break;
            default:
                break;
        }
    };

    private renderMobile(): TemplateResult {
        const selectedTabLabel = this.selectedTab?.textContent || '';
        return html`
            <div class="vl-tabs vl-tabs--mobile ${this.noBorder ? 'vl-tabs--no-border' : ''}">
                <vl-button
                    icon="arrow-down-fat"
                    icon-placement="after"
                    tertiary
                    block
                    aria-expanded="${this.mobileDropdownOpen ? 'true' : 'false'}"
                    aria-controls="tabs-dropdown"
                    aria-haspopup="listbox"
                    class="vl-tabs__mobile-toggle"
                    @click="${this.onMobileToggle}"
                    >${selectedTabLabel}</vl-button
                >

                <div
                    id="tabs-dropdown"
                    role="listbox"
                    aria-label="${ifDefined(this.label || undefined)}"
                    aria-multiselectable="false"
                    class="vl-tabs__mobile-dropdown"
                    ?hidden="${!this.mobileDropdownOpen}"
                >
                    ${this.mobileOptions.map(
                        (option, index) => html`
                            <div
                                id="tab-option-${index}"
                                tabindex="0"
                                role="option"
                                aria-selected="${option.selected ? 'true' : 'false'}"
                                class="vl-tabs__mobile-option"
                                @click="${() => {
                                    this.requestSelectTab(this.allTabs[Number(option.value)]);
                                    this.mobileDropdownFocusedIndex = -1;
                                    this.onMobileToggle();
                                }}"
                            >
                                ${option.label}
                            </div>
                        `,
                    )}
                </div>

                <nav hidden>
                    <slot></slot>
                </nav>
                ${when(!this.horizontalNavigation, () => html` <slot name="panel"></slot> `)}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-tabs-next': VlTabsComponent;
    }
}
