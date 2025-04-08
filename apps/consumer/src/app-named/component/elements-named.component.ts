import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlButtonComponent } from '@domg-wc/components/next/button';
import { VlTitleComponent } from '@domg-wc/components/next/title';
import { buttonsInActionGroupHtml } from '../../html/elements.html.js';

registerWebComponents([VlTitleComponent, VlButtonComponent]);

export class ElementsNamedComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            ${buttonsInActionGroupHtml('named imports', '@domg-wc/elements')}
        `;
    }
}

customElements.define('consumer-elements-named', ElementsNamedComponent);
