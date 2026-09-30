import { css, LitElement, TemplateResult } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';
import { VlTab, VlTabpanel, VlTabs } from '@govflanders/vl-ui-design-system-web-components';

const tagOf = (cls: unknown) => unsafeStatic((cls as { elementName: string }).elementName);

export class FluxTabsPane extends LitElement {
    static properties = {
        title: { type: String },
    };

    render(): TemplateResult {
        return html`<slot></slot>`;
    }
}

export class FluxTabs extends LitElement {
    static properties = {
        activeTab: { type: String, attribute: 'active-tab', reflect: true },
        bare: { type: Boolean, reflect: true },
        panes: { state: true },
    };

    declare activeTab: string | null;
    declare bare: boolean;
    declare panes: FluxTabsPane[];

    static styles = css`
        :host {
            display: block;
        }
        :host(:not([bare])) .tabs {
            border-radius: 0;
            background: transparent;
        }
        :host(:not([bare])) *::part(bar) {
            border-bottom: 1px solid #cbd2da;
        }
        :host(:not([bare])) *::part(tablist) {
            gap: 2.6rem;
        }
        :host(:not([bare])) *::part(panels) {
            padding: 1.5rem 0 0;
            background: transparent;
        }
        :host(:not([bare])) *::part(tab) {
            padding: 1rem 0;
            border-radius: 0;
            border-bottom: 3px solid transparent;
            background: transparent;
            color: #0055cc;
        }
        :host(:not([bare])) *[selected]::part(tab) {
            border-bottom-color: #333332;
            color: #333332;
        }
    `;

    constructor() {
        super();
        this.panes = [];
    }

    private collect = (): void => {
        this.panes = [...this.querySelectorAll<FluxTabsPane>(':scope > flux-tabs-pane')];
        this.panes.forEach((pane, i) => pane.setAttribute('slot', `pane-${i}`));
    };

    connectedCallback(): void {
        super.connectedCallback();
        this.collect();
    }

    private onChange(e: CustomEvent<{ tab: string }>): void {
        this.activeTab = e.detail.tab;
        this.dispatchEvent(new CustomEvent('change', { detail: { activeTab: this.activeTab }, composed: true }));
    }

    render(): TemplateResult {
        return html`<${tagOf(VlTabs)}
            class="tabs"
            variant=${this.bare ? 'primary' : 'secondary'}
            active-tab=${this.activeTab ?? ''}
            @vl-change=${this.onChange}
        >
            ${this.panes.map(
                (pane) => html`<${tagOf(VlTab)} id=${pane.id}>${pane.title}</${tagOf(VlTab)}>`
            )}
            ${this.panes.map(
                (pane, i) => html`<${tagOf(VlTabpanel)} tab-id=${pane.id}><slot name=${`pane-${i}`}></slot></${tagOf(VlTabpanel)}>`
            )}
        </${tagOf(VlTabs)}>
        <slot hidden @slotchange=${this.collect}></slot>`;
    }
}

if (!customElements.get('flux-tabs-pane')) {
    customElements.define('flux-tabs-pane', FluxTabsPane);
}
if (!customElements.get('flux-tabs')) {
    customElements.define('flux-tabs', FluxTabs);
}
