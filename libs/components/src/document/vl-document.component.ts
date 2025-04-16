import { BaseHTMLElement, webComponent } from '@domg-wc/common';
import { baseStyle, elementStyle, resetStyle } from '@domg/govflanders-style/common';
import { documentStyle, iconStyle } from '@domg/govflanders-style/component';

@webComponent('vl-document')
export class VlDocumentComponent extends BaseHTMLElement {
    static get _observedAttributes() {
        return ['href', 'target'];
    }

    constructor() {
        super(`
          <style>
            ${resetStyle}
            ${baseStyle}
            ${elementStyle}
            ${documentStyle}
            ${iconStyle}
          </style>
          <a class="vl-document" href="#" download>
            <div class="vl-document__type">
              <i class="vl-vi vl-vi-document" aria-hidden="true"></i>
              <span class="vl-document__type__text">
                <slot name="type"></slot>
              </span>
            </div>
            <div class="vl-document__content">
              <div class="vl-document__title vl-link">
                <slot name="title"></slot>
              </div>
              <div class="vl-document__metadata">
                <slot name="metadata"></slot>
              </div>
            </div>
          </a>
        `);
    }

    _hrefChangedCallback(oldValue: string, newValue: string) {
        this._element.href = newValue;
    }

    _targetChangedCallback(oldValue: string, newValue: string) {
        if (newValue) {
            this._element.setAttribute('target', newValue);
        } else {
            this._element.removeAttribute('target');
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-document': VlDocumentComponent;
    }
}
