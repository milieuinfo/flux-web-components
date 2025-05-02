import { BaseHTMLElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { resetStyle } from '@domg/govflanders-style/common';
import { infoblockStyle } from '@domg/govflanders-style/component';
import { VlIconComponent } from '../../atom/icon';
import { vlTitleStyles } from '../../atom/title/vl-title.css';

@webComponent('vl-infoblock')
export class VlInfoblockComponent extends BaseHTMLElement {
    static {
        registerWebComponents([VlIconComponent]);
    }

    constructor() {
        super(`
          <style>
            ${resetStyle}
            ${vlTitleStyles.join('')}
            ${infoblockStyle}
          </style>
          <section id="infoblock-element" class="vl-infoblock">
            <header class="vl-infoblock__header" role="presentation">
              <vl-icon id="infoblock_icon" class="vl-infoblock__header__icon"></vl-icon>
              <slot name="title">
                  <h2 id="title_content" class="vl-infoblock__title">tester</h2>
              </slot>
            </header>
            <div class="vl-infoblock__content" id="infoblock_content">
              <slot></slot>
            </div>
          </section>
        `);
    }

    static get _observedAttributes() {
        return ['title', 'icon', 'type'];
    }

    get _iconElement() {
        return this._element.querySelector('#infoblock_icon');
    }

    connectedCallback() {
        super.connectedCallback();

        const title = this.getAttribute('title');
        if (title) {
            this._titleChangedCallback('', title);
        }
    }

    _titleChangedCallback(oldValue: string, newValue: string) {
        const currentSlot = this.shadowRoot?.querySelector('#title_content');
        if (currentSlot) {
            (currentSlot as HTMLElement).innerText = newValue;
        }
    }

    _iconChangedCallback(oldValue: string, newValue: string) {
        this._iconElement.setAttribute('icon', newValue);
    }

    _typeChangedCallback(oldValue: string, newValue: string) {
        const classPrefix = 'vl-infoblock--';
        if (oldValue) {
            this._element.classList.remove(classPrefix + oldValue);
        }
        if (newValue) {
            this._element.classList.add(classPrefix + newValue);
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-infoblock': VlInfoblockComponent;
    }
}
