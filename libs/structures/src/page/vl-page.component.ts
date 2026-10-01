import { BaseHTMLElement, webComponent } from '@domg-wc/common';
import { baseStyle, resetStyle } from '@domg/govflanders-style/common';
import { vlPageFluxStyles } from './vl-page.flux-css';

@webComponent('vl-page')
export class VlPage extends BaseHTMLElement {
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
        const styleSheets = [resetStyle.styleSheet!, vlPageFluxStyles.styleSheet!, baseStyle.styleSheet!];
        super(html, styleSheets);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-page': VlPage;
    }
}
