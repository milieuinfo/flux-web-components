import { BaseHTMLElement, webComponent } from '@domg-wc/common';
import { baseStyle, resetStyle } from '@domg/govflanders-style/common';
import { vlTemplateFluxStyles } from './vl-template.flux-css';

@webComponent('vl-template')
export class VlTemplate extends BaseHTMLElement {
    constructor() {
        super(`
      <style>
        ${resetStyle}
        ${vlTemplateFluxStyles}
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
