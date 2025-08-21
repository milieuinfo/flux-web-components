import { BaseHTMLElement, webComponent } from '@domg-wc/common';
import { vlIconStyles, vlLinkIconStyles, vlLinkStyles } from '@domg-wc/components/atom';

@webComponent('vl-map-side-sheet-menu-item')
export class VlMapSideSheetMenuItem extends BaseHTMLElement {
    static get _observedAttributes() {
        return ['title', 'href'];
    }

    constructor() {
        const html = `
            <div>
                <div class="vl-map-side-sheet-menu-item">
                    <a id="vl-map-side-sheet-menu-item-link" class="vl-link" href="#">
                        <span class="vl-icon vl-icon--arrow-left-fat vl-link__icon vl-link__icon--before"></span><span id="title">Terug</span>
                    </a>
                </div>
                <slot></slot>
            </div>
        `;
        const customStyleSheet = new CSSStyleSheet();
        customStyleSheet.replaceSync(`
            .vl-map-side-sheet-menu-item {
                background: #e8ebee;
                padding: 2rem;
            }

            slot {
                padding: 1.5rem;
                display: block;
            }
        `);
        const styleSheets = [
            vlLinkIconStyles.styleSheet!,
            vlIconStyles.styleSheet!,
            vlLinkStyles('.vl-link').styleSheet!,
            customStyleSheet,
        ];
        super(html, styleSheets);
    }

    get _titleElement() {
        return this._shadow?.querySelector<HTMLElement>('#title');
    }

    get _hrefElement() {
        return this._shadow?.querySelector('#vl-map-side-sheet-menu-item-link');
    }

    _titleChangedCallback(oldValue, newValue) {
        if (newValue) {
            this._titleElement.innerText = newValue;
        }
    }

    _hrefChangedCallback(oldValue, newValue) {
        if (newValue) {
            this._hrefElement.setAttribute('href', newValue);
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-side-sheet-menu-item': VlMapSideSheetMenuItem;
    }
}
