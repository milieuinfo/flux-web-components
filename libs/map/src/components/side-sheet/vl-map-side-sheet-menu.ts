import { BaseHTMLElement, webComponent } from '@domg-wc/common';
import { vlLegacyStyles } from '@domg-wc/styles';

@webComponent('vl-map-side-sheet-menu')
export class VlMapSideSheetMenu extends BaseHTMLElement {
    constructor() {
        const html = `
            <slot></slot>
        `;
        const customStyleSheet = new CSSStyleSheet();
        customStyleSheet.replaceSync(`
            :host {
                margin: -1.5rem;
                display: block;
            }
        `);
        const styleSheets = [...vlLegacyStyles.map((style) => style.styleSheet!), customStyleSheet];
        super(html, styleSheets);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-side-sheet-menu': VlMapSideSheetMenu;
    }
}
