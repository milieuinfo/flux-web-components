import { BaseLitElement, webComponent } from '@domg-wc/common';
import { CSSResult, html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { vlTabFluxStyles } from './vl-tab.flux-css';
import type { TabClickEventDetail } from './vl-tabs.component';

/**
 * Tab item dat gekoppeld kan worden aan een <vl-tab-panel-next>.
 * @property {string} panel - ID van het gekoppelde panel.
 * @property {boolean} selected - Of deze tab geselecteerd is.
 * @fires vl-tab-click - Vuurt wanneer de tab geselecteerd wordt.
 */
@webComponent('vl-tab-next')
export class VlTabComponent extends BaseLitElement {
    static get styles(): CSSResult[] {
        return [vlTabFluxStyles()];
    }

    @property({ type: String, reflect: true, attribute: 'panel' })
    panel = '';

    @property({ type: Boolean, reflect: true, attribute: 'selected' })
    selected = false;

    private dispatchClick = () => {
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
                this.dispatchClick();
                break;
            default:
                break;
        }
    };

    private onKeyUp = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase();
        switch (key) {
            case ' ':
                this.dispatchClick();
                break;
            default:
                break;
        }
    };

    public select() {
        this.selected = true;
        this.setAttribute('aria-selected', 'true');
        this.setAttribute('tabindex', '0');
        this.dispatchClick();
    }

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
        this.addEventListener('click', this.dispatchClick);
        this.addEventListener('keydown', this.onKeyDown);
        this.addEventListener('keyup', this.onKeyUp);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        this.removeEventListener('click', this.dispatchClick);
        this.removeEventListener('keydown', this.onKeyDown);
        this.removeEventListener('keyup', this.onKeyUp);
    }

    attributeChangedCallback(attribute: string, oldValue: string, newValue: string): void {
        super.attributeChangedCallback(attribute, oldValue, newValue);
        switch (attribute) {
            case 'selected':
                if (oldValue === newValue) return;
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
