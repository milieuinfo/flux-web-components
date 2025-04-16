import { BaseElementOfType, webComponent } from '@domg-wc/common';
import { baseStyle, resetStyle } from '@domg/govflanders-style/common';
import templateUigStyle from './vl-template.uig-css';

@webComponent('vl-template')
export class VlTemplate extends BaseElementOfType(HTMLElement) {
    constructor() {
        super(`
      <style>
        ${resetStyle}
        ${templateUigStyle}
        ${baseStyle}
      </style>
      <div>
        <slot name="header"></slot>
        <div class="vl-page">
          <main class="vl-main-content">
            <slot name="main"></slot>
          </main>
        </div>
        <slot name="footer"></slot>
      </div>
    `);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-template': VlTemplate;
    }
}
