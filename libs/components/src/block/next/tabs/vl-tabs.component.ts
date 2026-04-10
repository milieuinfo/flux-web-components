import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { vlResetStyles } from '@domg-wc/styles';
import { CSSResult, html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';
import { VlTabLinkComponent } from './vl-tab-link.component';
import { VlTabPanelComponent } from './vl-tab-panel.component';
import { VlTabComponent } from './vl-tab.component';
import { vlTabsFluxStyles } from './vl-tabs.flux-css';

registerWebComponents([VlTabComponent, VlTabLinkComponent, VlTabPanelComponent]);

export type TabClickEventDetail = {
    tab: VlTabComponent;
};

export type TabLinkClickEventDetail = {
    tab: VlTabLinkComponent;
};

@webComponent('vl-tabs-next')
export class VlTabsComponent extends BaseLitElement {
    static get styles(): CSSResult[] {
        return [vlResetStyles, vlTabsFluxStyles];
    }

    @property({ type: Boolean, reflect: true, attribute: 'horizontal-navigation' })
    horizontalNavigation = false;

    @property({ type: String, reflect: true, attribute: 'label' })
    label = '';

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
        const panelElement = this.querySelector<VlTabPanelComponent>(`vl-tab-panel-next#${panelId}`);
        if (!panelElement) {
            console.warn(`
                vl-tabs-next: Er werd geen panel gevonden met ID: "${panelId}".
                Voeg een <vl-tab-panel-next> element toe en koppel het met een <vl-tab-next> adhv het panel ID.
                Indien je niet met panels wenst te werken, gebruik dan het "horizontal-navigation"-attribuut en
                <vl-tab-link-next> elementen.`);
        }
        panelElement!.removeAttribute('hidden');
    };

    private selectTab = (tab: VlTabComponent | VlTabLinkComponent) => {
        if (this.selectedTab) this.selectedTab.selected = false;
        tab.selected = true;

        if (tab instanceof VlTabComponent) {
            this.showPanel(tab.panel);
        }
    };

    private previousTab(): void {
        const { selectedTabIndex } = this;

        if (selectedTabIndex === -1) {
            return;
        }

        const previousTabIndex = selectedTabIndex === 0 ? this.allTabs.length - 1 : selectedTabIndex - 1;

        this.selectTab(this.allTabs[previousTabIndex]);
        this.allTabs[previousTabIndex].focus();
    }

    private nextTab(): void {
        const { selectedTabIndex } = this;

        if (selectedTabIndex === -1) {
            return;
        }

        const nextTabIndex = selectedTabIndex === this.allTabs.length - 1 ? 0 : selectedTabIndex + 1;

        this.selectTab(this.allTabs[nextTabIndex]);
        this.allTabs[nextTabIndex].focus();
    }

    private firstTab(): void {
        this.selectTab(this.allTabs[0]);
        this.allTabs[0].focus();
    }

    private lastTab(): void {
        this.selectTab(this.allTabs[this.allTabs.length - 1]);
        this.allTabs[this.allTabs.length - 1].focus();
    }

    private onKeyDown = (e: KeyboardEvent) => {
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
        this.selectTab(tab);
    };

    private onTabLinkClicked = (e: Event) => {
        const { tab } = (e as CustomEvent<TabLinkClickEventDetail>).detail;
        this.selectTab(tab);
    };

    firstUpdated(): void {
        if (this.selectedTabIndex === -1) {
            this.selectTab(this.allTabs[0]);
        }
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.addEventListener('vl-tab-click', this.onTabClicked);
        this.addEventListener('vl-tab-link-click', this.onTabLinkClicked);
        if (!this.horizontalNavigation) {
            this.addEventListener('keydown', this.onKeyDown);
        }
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        this.removeEventListener('vl-tab-click', this.onTabClicked);
        this.removeEventListener('vl-tab-link-click', this.onTabLinkClicked);
        this.removeEventListener('keydown', this.onKeyDown);
    }

    protected override render(): TemplateResult {
        return html`<nav
                class="vl-tabs"
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
            ${when(!this.horizontalNavigation, () => html` <slot name="panel"></slot> `)} `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-tabs-next': VlTabsComponent;
    }
}
