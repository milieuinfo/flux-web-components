import { BaseHTMLElement, webComponent } from '@domg-wc/common';
import { baseStyle, resetStyle } from '@domg/govflanders-style/common';
import { vlTemplateFluxStyles } from './vl-template.flux-css';

@webComponent('vl-template')
export class VlTemplate extends BaseHTMLElement {
    constructor() {
        const html = `
            <div>
                <slot name="header"></slot>
                <div class="vl-page">
                    <main class="vl-main-content">
                        <slot name="main"></slot>
                    </main>
                </div>
                <slot name="footer"></slot>
            </div>
        `;
        const styleSheets = [resetStyle.styleSheet!, vlTemplateFluxStyles.styleSheet!, baseStyle.styleSheet!];
        super(html, styleSheets);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-template': VlTemplate;
    }
}
