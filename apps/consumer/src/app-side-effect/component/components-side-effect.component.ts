import '@domg-wc/components/block/title';
import '@domg-wc/components/block/steps';
import { stepsNextHtml } from '../../html/components.html.js';

export class ComponentsSideEffectComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            ${stepsNextHtml('side effect imports', '@domg-wc/components/block')}
        `;
    }
}

customElements.define('consumer-components-side-effect', ComponentsSideEffectComponent);
