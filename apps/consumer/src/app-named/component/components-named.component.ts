import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlStepsComponent } from '@domg-wc/components/next/steps';
import { VlTitleComponent } from '@domg-wc/components/next/title';
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
