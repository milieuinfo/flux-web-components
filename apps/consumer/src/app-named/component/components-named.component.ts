import { registerWebComponents } from '@domg-wc/common';
import { VlStepsComponent } from '@domg-wc/components/block';
import { VlTitleComponent } from '@domg-wc/components/atom';
import { stepsNextHtml } from '../../html/components.html.js';

registerWebComponents([VlTitleComponent, VlStepsComponent]);

export class ComponentsNamedComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            ${stepsNextHtml('named imports', '@domg-wc/components/block')}
        `;
    }
}

customElements.define('consumer-components-named', ComponentsNamedComponent);
