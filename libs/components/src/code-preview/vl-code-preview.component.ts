import { BaseElementOfType, webComponent } from '@domg-wc/common-utilities';
import { resetStyle } from '@domg/govflanders-style/common';
import { codePreviewStyle } from '@domg/govflanders-style/component';
import '@govflanders/vl-ui-core/dist/js/core.js';
import '@govflanders/vl-ui-util/dist/js/util.js';
import '@govflanders/vl-ui-code-preview/dist/js/code-preview.js';

declare const vl: any;

@webComponent('vl-code-preview')
export class VlCodePreviewComponent extends BaseElementOfType(HTMLElement) {
    constructor() {
        super(`
          <style>
            ${resetStyle}
            ${codePreviewStyle}
          </style>
          <div class="vl-code-preview" data-vl-code-preview data-vl-code-preview-no-copy-button>
            <pre class="line-numbers">
              <code class="language-markup auto-indent" tabindex="0"></code>
            </pre>
          </div>
        `);

        this._dress();
    }

    get _codeElement() {
        return this.shadowRoot.querySelector('code');
    }

    _dress() {
        [...this.children].forEach((child) => this._codeElement.append(child));
        vl.codePreview.dress(this._element);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-code-preview': VlCodePreviewComponent;
    }
}
