import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { VlIconComponent } from '@domg-wc/components/atom';
import { CSSResult, html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';
import { vlTabFluxStyles } from './vl-tab.flux-css';
import { TabLinkClickEventDetail } from './vl-tabs.component';

registerWebComponents([VlIconComponent]);

@webComponent('vl-tab-link-next')
export class VlTabLinkComponent extends BaseLitElement {
    static get styles(): CSSResult[] {
        return [vlTabFluxStyles];
    }

    @property({ type: String, reflect: true, attribute: 'href' })
    href = '';

    @property({ type: Boolean, reflect: true, attribute: 'external' })
    external = false;

    @property({ type: Boolean, reflect: true, attribute: 'selected' })
    selected = false;

    private get link(): HTMLAnchorElement {
        return this.shadowRoot!.querySelector<HTMLAnchorElement>('a')!;
    }

    private onClick = () => {
        this.dispatchEvent(
            new CustomEvent<TabLinkClickEventDetail>('vl-tab-link-click', {
                detail: {
                    tab: this,
                },
                bubbles: true,
                composed: true,
            }),
        );
    };

    firstUpdated(): void {
        this.link.addEventListener('click', this.onClick);
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.setAttribute('role', 'listitem');

        if (!this.hasAttribute('href')) {
            console.warn('vl-tab-link-next: Attribuut "href" is verplicht');
        }
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        this.link.removeEventListener('click', this.onClick);
    }

    protected override render(): TemplateResult {
        return html`<a
            href="${this.href}"
            target="${ifDefined(this.external ? '_blank' : undefined)}"
            rel="${ifDefined(this.external ? 'nofollow noopener noreferrer' : undefined)}"
            aria-current="${ifDefined(this.selected ? 'page' : undefined)}"
            ><slot></slot>${when(!!this.external, () => html` <vl-icon icon="external"></vl-icon> `)}</a
        >`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-tab-link-next': VlTabLinkComponent;
    }
}
