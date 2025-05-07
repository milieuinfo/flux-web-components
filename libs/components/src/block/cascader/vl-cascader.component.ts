import { BaseLitElement, findNodesForSlot, registerWebComponents } from '@domg-wc/common';
import { resetStyle } from '@domg/govflanders-style/common';
import { breadcrumbStyle } from '@domg/govflanders-style/component';
import { CSSResult, html, nothing, PropertyDeclarations, PropertyValues, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { VlIconComponent } from '../../atom/icon';
import { VlLinkComponent } from '../../atom/link';
import { vlTitleStyles } from '../../atom/title/vl-title.css';
import { VlCascaderItemComponent } from './vl-cascader-item.component';
import { vlCascaderItemFluxStyles } from './vl-cascader-item.flux-css';
import { cascaderDefaults } from './vl-cascader.defaults';
import { CASCADER_SLOTS, CascaderItem, ItemListFn, NarrowDownFn, TemplateFn } from './vl-cascader.model';
import { vlCascaderFluxStyles } from './vl-cascader.flux-css';
import { getDefaultItemTemplate, getTemplateFunctionForType } from './vl-cascader.utils';

@customElement('vl-cascader')
export class VlCascaderComponent extends BaseLitElement {
    // Properties
    itemListFn: ItemListFn | undefined;
    templates: Map<string, TemplateFn> | undefined;

    // Attributes
    private hideBreadcrumb = cascaderDefaults.hideBreadcrumb;
    private level = cascaderDefaults.level;
    private loadingMessage = cascaderDefaults.loadingMessage;
    private headerText = cascaderDefaults.headerText;
    private loading = cascaderDefaults.loading;

    // State
    private nodeData: CascaderItem[] = [];

    // Variables
    private navigationLevelStack: CascaderItem[][] = []; // Stack to keep track of the navigation hierarchy history
    private breadCrumbHistory: { label: string; index: number }[] = [];
    private slidingIn = false;
    private slidingOut = false;

    static {
        registerWebComponents([VlCascaderItemComponent, VlIconComponent, VlLinkComponent]);
    }

    static get properties(): PropertyDeclarations {
        return {
            headerText: { type: String, attribute: 'header-text' },
            level: { type: Number, reflect: true },
            hideBreadcrumb: { type: Boolean, attribute: 'hide-breadcrumb' },
            loadingMessage: { type: String, attribute: 'loading-message' },
            loading: { type: Boolean, reflect: true },
            itemListFn: { type: Function },
            templates: { type: Map },
            nodeData: { type: Array, state: true },
        };
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [resetStyle, breadcrumbStyle, vlCascaderFluxStyles, vlCascaderItemFluxStyles, vlTitleStyles];
    }

    get items(): CascaderItem[] {
        return this.nodeData;
    }

    set items(cascaderItems: CascaderItem[]) {
        this.nodeData = cascaderItems;
    }

    connectedCallback() {
        super.connectedCallback();

        this.setData();
    }

    isDeclarativeMode(): boolean {
        return !this.items || !this.items.length;
    }

    /**
     * Deze functie zal het volgende niveau laden op basis van het CascaderItem argument
     * @param item: CascaderItem
     */
    processNarrowDown: NarrowDownFn = async (item: CascaderItem) => {
        if (this.loading) return;
        const { label, children, narrowDown } = item;
        if (children?.length) {
            this.pushItemStack(label, this.nodeData);
            this.nodeData = children;
            this.slidingIn = true;
            this.requestUpdate();
        } else if (narrowDown && this.itemListFn) {
            this.loading = true;
            this.pushItemStack(label, this.nodeData);
            this.requestUpdate();
            this.nodeData = await this.itemListFn(item);
            this.loading = false;
            this.slidingIn = true;
            this.requestUpdate();
        }
    };

    protected updated(changedProperties: PropertyValues<string>): void {
        super.updated(changedProperties);
        if (changedProperties.has('level')) {
            this.jumpToLevel(this.level);
        } else if (changedProperties.has('items')) {
            this.nodeData = this.items;
        }
    }

    protected render(): TemplateResult {
        const navSectionClasses = {
            'slide-in': this.slidingIn && !this.slidingOut,
            'slide-out': this.slidingOut && !this.slidingIn,
        };
        return html`
            <div>
                ${this.renderBreadcrumb()} ${this.renderHeader()}
                <div class="content">
                    <section class=${classMap(navSectionClasses)} @animationend=${this.handleAnimationEnd}>
                        ${!this.loading
                            ? this.nodeData?.map(this.renderItem)
                            : html` <vl-loader text=${this.loadingMessage}></vl-loader> `}
                    </section>
                </div>
            </div>
        `;
    }

    private setData(): void {
        const nodeTree = this.traverseTreeAndMapItems(this);

        if (this.isDeclarativeMode() && nodeTree?.length) {
            this.nodeData = nodeTree;
        } else {
            this.nodeData = this.items;
        }
    }

    /**
     * Update de navigationLevelStack en breadCrumbHistory
     * Wanneer aangeroepen zonder argumenten, gaan we terug in de geschiedenis
     * @param label?: string
     * @param items?: CascaderItem[]
     * @private
     */
    private pushItemStack(label: string, items: CascaderItem[]): void {
        if (label && items) {
            this.level = this.navigationLevelStack.push(items);
            this.breadCrumbHistory.push({ label, index: this.level });
        }
    }

    /**
     * Update de navigationLevelStack en breadCrumbHistory
     * Wanneer aangeroepen zonder argumenten, gaan we terug in de geschiedenis
     * @private
     */
    private popItemStack(): void {
        this.nodeData = this.navigationLevelStack.pop() || [];
        this.level = (this.breadCrumbHistory.pop()?.index || 1) - 1;
    }

    private goBack() {
        if (this.loading) return;
        if (this.navigationLevelStack.length > 0) {
            this.slidingOut = true;
            this.popItemStack();
        }
        this.requestUpdate();
    }

    private handleBreadcrumbClick = (index: number, label?: string) => {
        this.jumpToLevel(index);
        const detail = { levelClicked: index, label };
        this.dispatchEvent(new CustomEvent('vl-click-breadcrumb', { composed: true, bubbles: true, detail }));
    };

    private jumpToLevel(index: number): void {
        if (this.loading) return;
        const length = this.navigationLevelStack.length;
        const regressionNumber = length - index;
        if (regressionNumber > 0) {
            Array.from({ length: regressionNumber }).map(() => {
                this.goBack();
            });
        }
    }

    private renderHeader(): TemplateResult<1> | typeof nothing {
        return findNodesForSlot(this, 'header')?.length
            ? html`
                  <header>
                      <slot name="header"></slot>
                  </header>
              `
            : this.headerText
            ? html`
                  <header class="vl-header">
                      <h4 class="vl-header__title vl-label vl-label--h4">${this.headerText}</h4>
                  </header>
              `
            : nothing;
    }

    private renderBreadcrumbHome = () => {
        const hasBreadcrumbPlaceholderSlot = Boolean(findNodesForSlot(this, CASCADER_SLOTS.HOME)?.length);
        return html`
            <li class="vl-breadcrumb__list__item">
                <span class="vl-breadcrumb__list__item__separator" aria-hidden="true"></span>
                ${
                    !hasBreadcrumbPlaceholderSlot
                        ? html`
                              <vl-icon
                                  icon="places-home"
                                  class="vl-breadcrumb__list__item__cta"
                                  @click=${() => this.handleBreadcrumbClick(0)}
                              ></vl-icon>
                          `
                        : html`
                              <span
                                  @click=${() => this.handleBreadcrumbClick(0)}
                                  class="vl-breadcrumb__list__item__cta vl-breadcrumb-home-slot"
                              >
                                  <slot name="home"></slot>
                              </span>
                          `
                }
                </span>
            </li>
        `;
    };

    private renderBreadcrumbItem = ({ label, index }: { label: string; index: number }): TemplateResult => {
        const historyLength = this.breadCrumbHistory?.length;
        const isActiveLevel = historyLength === index;
        const breadCrumbItemClasses = {
            'vl-breadcrumb__list__item--deactivated': isActiveLevel,
        };
        return html`
            <li class="vl-breadcrumb__list__item ${classMap(breadCrumbItemClasses)}">
                <span class="vl-breadcrumb__list__item__separator" aria-hidden="true"></span>
                <span class="vl-breadcrumb__list__item__cta" @click=${() => this.handleBreadcrumbClick(index, label)}
                    >${label}</span
                >
            </li>
        `;
    };

    private renderBreadcrumb(): TemplateResult {
        const historyLength = this.breadCrumbHistory?.length;
        const hasBreadcrumbPlaceholderSlot = Boolean(
            findNodesForSlot(this, CASCADER_SLOTS.BREADCRUMB_PLACEHOLDER)?.length
        );
        return html`
            ${historyLength && !this.hideBreadcrumb
                ? html`
                      <nav aria-label="U bent hier: " class="vl-breadcrumb">
                          <ol class="vl-breadcrumb__list">
                              ${this.renderBreadcrumbHome()} ${this.breadCrumbHistory?.map(this.renderBreadcrumbItem)}
                          </ol>
                      </nav>
                  `
                : hasBreadcrumbPlaceholderSlot || !this.hideBreadcrumb
                ? html`
                      <nav class="vl-breadcrumb-placeholder">
                          <slot name="breadcrumb-placeholder"></slot>
                      </nav>
                  `
                : nothing}
        `;
    }

    private renderItem = (item: CascaderItem): TemplateResult | VlCascaderItemComponent => {
        const customTemplateResult = getTemplateFunctionForType(item, this);
        if (item.component) {
            // declaratieve gedefinieerde templates van afnemers renderen (via nested <vl-cascader-item>'s)
            return item.component;
        } else if (customTemplateResult) {
            // programmatisch gedefinieerde templates van afnemers renderen (via templates:Map<string, TemplateResult>)
            return customTemplateResult;
        } else {
            return this.defaultItemTemplate(item);
        }
    };

    private defaultItemTemplate(item: CascaderItem): TemplateResult {
        return getDefaultItemTemplate(item, this);
    }

    private getChildCascaderNodes = (component: HTMLElement) =>
        component.querySelectorAll<VlCascaderItemComponent>(':scope > vl-cascader-item');

    /**
     * Gaat de DOM-tree recursief aflopen binnen de VlCascaderComponent,
     * om zo de hiërarchische data structuur van de VlCascaderItemComponent als een array van CascaderItem's op te slaan
     * @param component: VlCascaderItemComponent | VlCascaderComponent
     * @returns CascaderItem[]
     */
    private traverseTreeAndMapItems = (component: VlCascaderItemComponent | VlCascaderComponent): CascaderItem[] => {
        const nodes = this.getChildCascaderNodes(component);
        const nodesForThisLevel: CascaderItem[] = [];
        nodes.forEach((node) => {
            const children = this.traverseTreeAndMapItems(node);
            if (node.item) {
                node.item.children = children;
            }
            node.cascaderRef = this;
            nodesForThisLevel.push({
                ...node.item,
                label: node.label!,
                component: node,
                children: children,
            });
        });
        return nodesForThisLevel;
    };

    private handleAnimationEnd(): void {
        this.slidingIn = false;
        this.slidingOut = false;
        this.requestUpdate();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-cascader': VlCascaderComponent;
    }
}
