import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { VlIconComponent } from '@domg-wc/components/atom';
import { CSSResult, html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';
import { vlTabFluxStyles } from './vl-tab.flux-css';
import { TabLinkClickEventDetail } from './vl-tabs.component';

registerWebComponents([VlIconComponent]);

/**
 * Tab link voor horizontale navigatie.
 * @property {string} href - Doel-URL van de link.
 * @property {boolean} external - Open de link in een nieuw venster.
 * @property {boolean} selected - Of deze tab link geselecteerd is.
 * @fires vl-tab-link-click - Vuurt wanneer de link aangeklikt wordt.
 */
@webComponent('vl-tab-link-next')
export class VlTabLinkComponent extends BaseLitElement {
    static get styles(): CSSResult[] {
        return [vlTabFluxStyles(true)];
    }

    @property({ type: String, reflect: true, attribute: 'href' })
    href = '';

    @property({ type: Boolean, reflect: true, attribute: 'external' })
    external = false;

    @property({ type: Boolean, reflect: true, attribute: 'selected' })
    selected = false;

    private onClick = () => {
        // We only dispatch the click event here
        // The navigation is handled by the browser via the anchor element, we don't want to interfere with that
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

    connectedCallback(): void {
        super.connectedCallback();

        if (!this.hasAttribute('href')) {
            console.warn('vl-tab-link-next: Attribuut "href" is verplicht');
        }
    }

    protected override render(): TemplateResult {
        return html`<a
            href="${this.href}"
            target="${ifDefined(this.external ? '_blank' : undefined)}"
            rel="${ifDefined(this.external ? 'nofollow noopener noreferrer' : undefined)}"
            aria-current="${ifDefined(this.selected ? 'page' : undefined)}"
            @click=${this.onClick}
            ><slot></slot>${when(
                !!this.external,
                () => html` <vl-icon icon="external" label="(opent in een nieuw venster)"></vl-icon> `,
            )}</a
        >`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-tab-link-next': VlTabLinkComponent;
    }
}
