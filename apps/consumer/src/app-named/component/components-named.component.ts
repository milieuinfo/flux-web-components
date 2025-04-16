import { registerWebComponents } from '@domg-wc/common';
import { VlStepsComponent, VlTitleComponent } from '@domg-wc/components';
import { stepsNextHtml } from '../../html/components.html.js';

registerWebComponents([VlTitleComponent, VlStepsComponent]);

export class ComponentsNamedComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            ${stepsNextHtml('named imports', '@domg-wc/components')}
        `;
    }
}

customElements.define('consumer-components-named', ComponentsNamedComponent);
