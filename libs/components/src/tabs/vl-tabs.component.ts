import { awaitUntil, BaseLitElement, registerWebComponents, type VL, webComponent } from '@domg-wc/common';
import './vl-tabs.lib.js';
import { vlLegacyStyles } from '@domg-wc/styles';
import { baseStyle, resetStyle } from '@domg/govflanders-style/common';
import { linkStyle } from '@domg/govflanders-style/component';
import { html, PropertyDeclarations, PropertyValues, TemplateResult } from 'lit';
import { VlTabSectionComponent } from './vl-tab-section.component';
import { VlTabComponent } from './vl-tab.component';
import { VlTabsPaneComponent } from './vl-tabs-pane.component';
import { tabsStyle } from './vl-tabs.css';
import tabsUigStyle from './vl-tabs.uig-css';

declare const vl: VL;
declare const window: Window;

@webComponent('vl-tabs')
export class VlTabsComponent extends BaseLitElement {
    private observer: MutationObserver | undefined;
    private abortController = new AbortController();

    private alt: boolean = false;
    private responsiveLabel: string = '';
    private activeTab: string = '';
    private href: string = '';
    private disableLinks: boolean = false;
    private withinFunctionalHeader: boolean = false;
    private displayStyle: 'default' | 'tabs' | 'collapsed' = 'default';

    static {
        registerWebComponents([VlTabComponent, VlTabSectionComponent, VlTabsPaneComponent]);
    }

    static get is() {
        return 'vl-tabs';
    }

    static get properties(): PropertyDeclarations {
        return {
            alt: { type: Boolean },
            responsiveLabel: { type: String, attribute: 'responsive-label' },
            activeTab: { type: String, attribute: 'active-tab' },
            href: { type: String },
            disableLinks: { type: Boolean, attribute: 'disable-links' },
            withinFunctionalHeader: { type: Boolean, attribute: 'within-functional-header' },
            displayStyle: { type: String, attribute: 'display-style' }, // 'default' | 'tabs' | 'collapsed'
        };
    }

    connectedCallback() {
        super.connectedCallback();
    }

    disconnectedCallback() {
        this.observer?.disconnect();
        this.abortController.abort('disconnectedCallback');
    }

    render(): TemplateResult {
        return html`
            <style>
                ${resetStyle}
                ${tabsStyle}
                ${tabsUigStyle}
                ${linkStyle}
                ${baseStyle}
                ${vlLegacyStyles.join('')}
            </style>
            <div id="tabs" tabs tabs-responsive-label="Navigatie">
                <div id="tabs-wrapper" class="vl-tabs__wrapper">
                    <ul id="tab-list" class="vl-tabs" tabs-list role="tablist" aria-label="tabs"></ul>
                    <button type="button" tabs-toggle class="vl-tabs__toggle" close="false">
                        <span id="tabs-responsive-label">Navigatie</span>
                    </button>
                </div>
            </div>
        `;
    }

    protected firstUpdated(_changedProperties: PropertyValues) {
        super.firstUpdated(_changedProperties);

        this.renderTabs();
        if (!this.hasAttribute('within-functional-header')) {
            this.renderSections();
        }
        this.dress();
        this.observer = this.observeTabPanes((mutations: MutationRecord[]) => this.processTabPane(mutations));
    }

    private get dressed(): boolean {
        return this.hasAttribute(VlTabsComponent.dressedAttributeName);
    }

    private static get dressedAttributeName(): string {
        return 'tabs-dressed';
    }

    private async dress(forced?: boolean): Promise<void> {
        if (!this.dressed || forced) {
            await customElements.whenDefined('vl-tab');
            await customElements.whenDefined('vl-tab-section');
            vl.tabsNext.dress(this);
            this.setAttribute(VlTabsComponent.dressedAttributeName, '');
        }
    }

    private async ready(): Promise<void> {
        return awaitUntil(() => this.dressed);
    }

    private get tabsElement(): HTMLDivElement {
        return this.shadowRoot?.getElementById('tabs') as HTMLDivElement;
    }

    private get tabListElement(): HTMLUListElement {
        return this.shadowRoot?.getElementById('tab-list') as HTMLUListElement;
    }

    private get tabsToggleElement(): HTMLButtonElement {
        return this.shadowRoot?.querySelector('.vl-tabs__toggle') as HTMLButtonElement;
    }

    private get responsiveLabelElement(): HTMLSpanElement {
        return this.shadowRoot?.getElementById('tabs-responsive-label') as HTMLSpanElement;
    }

    private get tabPanes(): VlTabsPaneComponent[] {
        return [...this.querySelectorAll<VlTabsPaneComponent & Element>(VlTabsPaneComponent.is)];
    }

    private addTab({ tabPane, index }: { tabPane: VlTabsPaneComponent; index?: number }) {
        const element = this.getTabTemplate({
            id: tabPane.paneId,
            title: tabPane.paneTitle,
        });
        if (index && index >= 0) {
            this.tabListElement?.insertBefore(element, this.tabListElement.children[index]);
        } else {
            this.tabListElement?.appendChild(element);
        }
    }

    private getTabTemplate({ id, title }: { id: string; title: string }) {
        const tab = document.createElement('vl-tab');
        tab.id = `${id}`;
        tab.role = 'tab';
        tab.setAttribute('href', `${this.hrefWithFallback}#${id}`);
        if (this.hasAttribute('within-functional-header')) {
            tab.setAttribute('within-functional-header', '');
        }
        if (this.hasAttribute('disable-links')) {
            tab.setAttribute('disable-link', '');
        }
        const slot = document.createElement('slot');
        slot.name = `${id}-title-slot`;
        slot.innerHTML = `${title}`;
        tab.appendChild(slot);
        return tab;
    }

    private removeTab(id: string) {
        const element = this.tabListElement?.querySelector(`[id="${id}"]`);
        if (element) {
            this.tabListElement?.removeChild(element);
        }
    }

    private addTabSection({ id, index }: { id: string; index: number }) {
        this.tabPanes[index].setAttribute('slot', `${id}-slot`);
        const element = this.getTabSectionTemplate({ id });
        if (index && index >= 0) {
            this.tabsElement?.insertBefore(element, this.tabsElement.children[++index]);
        } else {
            this.tabsElement?.appendChild(element);
        }
    }

    private getTabSectionTemplate({ id }: { id: string }): HTMLElement {
        const tabSection = document.createElement('vl-tab-section');
        tabSection.id = `${id}-pane`;
        const slot = document.createElement('slot');
        slot.name = `${id}-slot`;
        tabSection.appendChild(slot);
        return tabSection;
    }

    private removeTabSection(id: string) {
        const element = this.tabsElement?.querySelector(`#${id}-pane`);
        if (element) {
            this.tabsElement?.removeChild(element);
        }
    }

    private renderTabs() {
        if (this.tabListElement) this.tabListElement.innerHTML = '';
        this.tabPanes.forEach((tabPane) => {
            this.addTab({ tabPane: tabPane as Element & VlTabsPaneComponent });
        });
    }

    private renderSections() {
        this.tabPanes.forEach((tabPane, index) => this.addTabSection({ id: tabPane.paneId, index }));
    }

    protected updated(changedProperties: Map<string, unknown>): void {
        super.updated(changedProperties);

        if (changedProperties.has('alt')) {
            if (this.alt) {
                this.tabListElement.classList.add('vl-tabs--alt');
            } else {
                this.tabListElement.classList.remove('vl-tabs--alt');
            }
        }
        if (changedProperties.has('responsiveLabel')) {
            const value = this.responsiveLabel || 'Navigatie';
            this.tabsElement.setAttribute('tabs-responsive-label', value);
            this.responsiveLabelElement.innerHTML = value;
        }
        if (changedProperties.has('activeTab')) {
            this.ready().then(() => {
                const tab = [...this.tabListElement.children].find(
                    (tab) => tab.id == this.activeTab
                ) as VlTabComponent & Element;
                if (tab && !tab.isActive) {
                    tab.activate();
                    if (this.tabsToggleElement && this.tabListElement.getAttribute('show') === 'true') {
                        // Als de tabsToggle aanwezig is en de tabList open is, klik op de tabsToggle om de tabList te sluiten.
                        this.tabsToggleElement.click();
                    }
                }
            });
        }
        if (changedProperties.has('withinFunctionalHeader')) {
            if (this.withinFunctionalHeader) {
                this.classList.add('vl-tabs--within-functional-header');
            } else {
                this.classList.remove('vl-tabs--within-functional-header');
            }
        }
        if (changedProperties.has('href')) {
            [...this.tabListElement.children].forEach((tab) => tab.setAttribute('href', `${this.href}#${tab.id}`));
        }
    }

    private get hrefWithFallback(): string {
        return this.getAttribute('href') || window.location.pathname + window.location.search;
    }

    private observeTabPanes(callback: MutationCallback): MutationObserver {
        const node = this as unknown as Node;
        const observer = new MutationObserver(callback);
        observer.observe(node, { childList: true });
        return observer;
    }

    private processTabPane(mutations: MutationRecord[]) {
        const tabPanesToAdd = mutations
            .flatMap((mutation: MutationRecord) => [...mutation.addedNodes])
            .filter((node) => node instanceof VlTabsPaneComponent);
        tabPanesToAdd.forEach((tabPane) => this.addTabAndSection(tabPane as Element & VlTabsPaneComponent));

        const tabPanesToDelete = mutations
            .flatMap((mutation: MutationRecord) => [...mutation.removedNodes])
            .filter((node) => node instanceof VlTabsPaneComponent);
        tabPanesToDelete.forEach((tabPane) => this.removeTabAndSection(tabPane as Element & VlTabsPaneComponent));

        this.dress(true);
    }

    private addTabAndSection(tabPane: VlTabsPaneComponent & Element) {
        const index = this.tabPanes.indexOf(tabPane);
        this.addTab({ tabPane, index });

        if (!this.hasAttribute('within-functional-header')) {
            this.addTabSection({ id: tabPane.getAttribute('id') || '', index });
        }
    }

    private removeTabAndSection(tabPane: VlTabsPaneComponent) {
        this.removeTab(tabPane.paneId);

        if (!this.hasAttribute('within-functional-header')) {
            this.removeTabSection(tabPane.paneId);
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-tabs': VlTabsComponent;
    }
}
