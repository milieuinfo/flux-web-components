import { BaseElementOfType, webComponent } from '@domg-wc/common';
import { loaderStyle } from '@domg/govflanders-style/component';
import { accessibilityStyle, alignStyle, resetStyle } from '@domg/govflanders-style/common';

@webComponent('vl-loader')
export class VlLoaderComponent extends BaseElementOfType(HTMLElement) {
    static get _observedAttributes() {
        return ['light', 'text', 'single'];
    }

    constructor() {
        super(`
          <style>
            ${resetStyle}
            ${loaderStyle}
            ${alignStyle}
            ${accessibilityStyle}
          </style>
          <div class="vl-u-align-center">
            <div class="vl-loader" role="alert" aria-busy="true"></div>
            <p id="text">
              <slot>
                Pagina is aan het laden
              </slot>
            </p>
          </div>
        `);
    }

    get _loader() {
        return this._shadow.querySelector('.vl-loader');
    }

    get _text() {
        return this._shadow.querySelector('#text');
    }

    get _slot() {
        return this._shadow.querySelector('slot');
    }

    _lightChangedCallback(oldValue: string, newValue: string) {
        this._toggleClass(this._loader, newValue, 'vl-loader--light');
    }

    _textChangedCallback(oldValue: string, newValue: string) {
        this._slot.innerText = newValue;
    }

    _singleChangedCallback(oldValue: string, newValue: string) {
        this._toggleClass(this._text, newValue, 'vl-u-visually-hidden');
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-loader': VlLoaderComponent;
    }
}
