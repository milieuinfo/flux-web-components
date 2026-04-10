import { BaseLitElement, webComponent } from '@domg-wc/common';
import { CSSResult, html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { vlTabFluxStyles } from './vl-tab.flux-css';
import { TabClickEventDetail } from './vl-tabs.component';

@webComponent('vl-tab-next')
export class VlTabComponent extends BaseLitElement {
    static get styles(): CSSResult[] {
        return [vlTabFluxStyles];
    }

    @property({ type: String, reflect: true, attribute: 'panel' })
    panel = '';

    @property({ type: Boolean, reflect: true, attribute: 'selected' })
    selected = false;

    private onClick = () => {
        this.dispatchEvent(
            new CustomEvent<TabClickEventDetail>('vl-tab-click', {
                detail: {
                    tab: this,
                },
                bubbles: true,
                composed: true,
            }),
        );
    };

    private onKeyDown = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase();
        switch (key) {
            case 'enter':
                this.onClick();
                break;
            default:
                break;
        }
    };

    private onKeyUp = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase();
        switch (key) {
            case ' ':
                this.onClick();
                break;
            default:
                break;
        }
    };

    connectedCallback(): void {
        super.connectedCallback();
        this.setAttribute('role', 'tab');
        this.setAttribute('tabindex', this.selected ? '0' : '-1');
        this.setAttribute('aria-controls', this.panel);
        this.setAttribute('aria-selected', this.selected ? 'true' : 'false');
        if (!this.hasAttribute('panel')) {
            console.warn('vl-tab-next: Attribuut "panel" is verplicht');
        }
        if (!this.hasAttribute('id')) {
            console.warn('vl-tab-next: Attribuut "id" is verplicht');
        }
        this.addEventListener('click', this.onClick);
        this.addEventListener('keydown', this.onKeyDown);
        this.addEventListener('keyup', this.onKeyUp);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        this.removeEventListener('click', this.onClick);
    }

    attributeChangedCallback(attribute: string, oldValue: string, newValue: string): void {
        super.attributeChangedCallback(attribute, oldValue, newValue);
        switch (attribute) {
            case 'selected':
                const isSelected = newValue === 'true' || newValue === '';
                this.setAttribute('aria-selected', isSelected ? 'true' : 'false');
                this.setAttribute('tabindex', isSelected ? '0' : '-1');
                break;
            default:
                break;
        }
    }

    protected override render(): TemplateResult {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-tab-next': VlTabComponent;
    }
}
