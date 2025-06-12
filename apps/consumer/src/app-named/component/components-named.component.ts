import { registerWebComponents } from '@domg-wc/common';
import { VlStepsComponent } from '@domg-wc/components/block';
import { VlTitleComponent } from '@domg-wc/components/atom';
import { stepsHtml } from '../../html/components.html.js';

registerWebComponents([VlTitleComponent, VlStepsComponent]);

export class ComponentsNamedComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            ${stepsHtml('named imports', '@domg-wc/components/block')}
        `;
    }
}

customElements.define('consumer-components-named', ComponentsNamedComponent);
