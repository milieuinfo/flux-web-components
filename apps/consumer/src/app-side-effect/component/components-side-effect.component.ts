import '@domg-wc/components/atom/title';
import '@domg-wc/components/block/steps';
import { stepsHtml } from '../../html/components.html.js';

export class ComponentsSideEffectComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            ${stepsHtml('side effect imports', '@domg-wc/components/block')}
        `;
    }
}

customElements.define('consumer-components-side-effect', ComponentsSideEffectComponent);
