import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { VlButtonComponent, VlIconComponent } from '@domg-wc/components/atom';
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

registerWebComponents([VlTabComponent, VlTabLinkComponent, VlTabPanelComponent, VlSelectComponent, VlIconComponent]);

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
 * @fires vl-tab-change - Vuurt vóór de gebruiker naar een andere tab wisselt.
 *   Roep preventDefault() aan om de wissel te weigeren.
 * @fires vl-tab-click - Vuurt bij een klik, Enter of Spatie op een <vl-tab-next> en bij select(),
 *   ook als de wissel geweigerd wordt.
 * @fires vl-tab-link-click - Vuurt bij een klik of Enter op een <vl-tab-link-next> en bij select(),
 *   ook als de wissel geweigerd wordt.
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
    
    private get mobileOptions(): (SelectOption & { external: boolean })[] {
        return this.allTabs.map((tab, index) => ({
            label: tab.textContent || '',
            value: String(index),
            selected: index === this.selectedTabIndex,
            external: tab instanceof VlTabLinkComponent && tab.external,
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
        // Focus before the dispatch: after a refusal it stays on the requested tab,
        // and a modal opened in a vl-tab-change listener keeps the focus.
        if (focus) {
            tab.focus();
        }
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

    private previousTab(focusedTabIndex: number): void {
        const previousTabIndex = focusedTabIndex === 0 ? this.allTabs.length - 1 : focusedTabIndex - 1;

        this.requestSelectTab(this.allTabs[previousTabIndex], true);
    }

    private nextTab(focusedTabIndex: number): void {
        const nextTabIndex = focusedTabIndex === this.allTabs.length - 1 ? 0 : focusedTabIndex + 1;

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
        // After a refused tab change the focused tab is not the selected one: the arrow keys start from the focus.
        const focusedTabIndex = this.allTabs.findIndex((tab) => tab === e.target);
        if (focusedTabIndex === -1) {
            return;
        }
        const key = e.key.toLowerCase();
        switch (key) {
            case 'arrowleft':
                this.previousTab(focusedTabIndex);
                break;
            case 'arrowright':
                this.nextTab(focusedTabIndex);
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
    // The browser then follows the <a> itself, so selectTab() must not navigate too (mobile, select()).
    private onTabLinkClicked = (e: MouseEvent) => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
            return;
        }
        const tab = this.findClickedTabLink(e);
        if (tab && !this.requestSelectTab(tab, false, false)) {
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
        if (!this.mobile) {
            this.mobileDropdownFocusedIndex = -1;
            this.mobileDropdownOpen = false;
        }
        this.syncTabLinkRoles();
    }

    private syncTabLinkRoles(): void {
        this.allTabs.forEach((tab) => {
            if (!(tab instanceof VlTabLinkComponent)) {
                return;
            }
            if (this.mobile) {
                tab.removeAttribute('role');
            } else {
                tab.setAttribute('role', 'listitem');
            }
        });
    }

    private handleMobileMediaQueryChange = (event: MediaQueryListEvent): void => {
        this.setMobileState(event.matches);
    };

    private onDefaultSlotChange = (): void => {
        this.syncTabLinkRoles();
        // renderMobile() reads the tabs from the slot of the previous render. No update on desktop on purpose:
        // updated() would then select a tab added later through ensureSelectedTab().
        if (this.mobile) {
            this.requestUpdate();
        }
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
                    ${when(
                        !this.horizontalNavigation,
                        () => html` <slot @slotchange=${this.onDefaultSlotChange}></slot> `,
                    )}
                    ${when(
                        this.horizontalNavigation,
                        () =>
                            html`<ul>
                                <slot @slotchange=${this.onDefaultSlotChange}></slot>
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
            requestAnimationFrame(() => {
                this.focusMobileOption(Math.max(this.selectedTabIndex, 0));
            });
        } else {
            this.mobileToggleButton?.focus();
        }
    };

    private chooseMobileOption(index: number): void {
        // Focus on the toggle before the dispatch, as in requestSelectTab(): a modal opened in a vl-tab-change listener
        // then keeps the focus, and returns it to the toggle when it closes.
        this.mobileDropdownOpen = false;
        this.mobileToggleButton?.focus();
        this.requestSelectTab(this.allTabs[index], false, true);
    }

    private onMobileListboxKeyDown = (e: KeyboardEvent) => {
        if (!this.mobileDropdownOpen) return;

        // The index follows the real focus of an option (@focus, @blur) and is -1 elsewhere, e.g. on the toggle:
        // the arrow keys then enter the listbox, and Enter and Space keep their own behavior there.
        const key = e.key.toLowerCase();
        const optionsCount = this.mobileOptions.length;
        const focusedIndex = this.mobileDropdownFocusedIndex;

        switch (key) {
            case 'arrowdown':
                e.preventDefault();
                this.focusMobileOption(focusedIndex === optionsCount - 1 ? 0 : focusedIndex + 1);
                break;
            case 'arrowup':
                e.preventDefault();
                this.focusMobileOption(focusedIndex <= 0 ? optionsCount - 1 : focusedIndex - 1);
                break;
            case 'home':
                e.preventDefault();
                this.focusMobileOption(0);
                break;
            case 'end':
                e.preventDefault();
                this.focusMobileOption(optionsCount - 1);
                break;
            case 'enter':
            case ' ':
                if (this.allTabs[focusedIndex]) {
                    e.preventDefault();
                    this.chooseMobileOption(focusedIndex);
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
                                @focus="${() => {
                                    this.mobileDropdownFocusedIndex = index;
                                }}"
                                @blur="${() => {
                                    this.mobileDropdownFocusedIndex = -1;
                                }}"
                                @click="${() => this.chooseMobileOption(index)}"
                            >
                                ${option.label}
                                ${when(
                                    option.external,
                                    () => html`
                                        <vl-icon icon="external" label="(opent in een nieuw venster)"></vl-icon>
                                    `,
                                )}
                            </div>
                        `,
                    )}
                </div>

                <nav hidden>
                    <slot @slotchange=${this.onDefaultSlotChange}></slot>
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
