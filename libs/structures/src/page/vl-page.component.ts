import { BaseLitElement, webComponent } from '@domg-wc/common';
import { CSSResult, html, PropertyDeclarations, TemplateResult } from 'lit';
import { vlPageStyles } from './vl-page.css';
import { pageDefaults } from './vl-page.defaults';

@webComponent('vl-page')
export class VlPage extends BaseLitElement {
    private vCenter = pageDefaults.vCenter;
    private vStretch = pageDefaults.vStretch;

    static get styles(): CSSResult[] {
        return [vlPageStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            vCenter: { type: Boolean, attribute: 'v-center', reflect: true },
            vStretch: { type: Boolean, attribute: 'v-stretch', reflect: true },
        };
    }

    protected render(): TemplateResult {
        return html`
            <slot name="header"></slot>
            <div class="vl-page">
                <main class="vl-main-content">
                    <slot name="main"></slot>
                </main>
            </div>
            <slot name="footer"></slot>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-page': VlPage;
    }
}
