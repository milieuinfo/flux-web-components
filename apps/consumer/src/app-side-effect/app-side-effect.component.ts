import '@domg-wc/components/next/title';
import './component/components-side-effect.component';
import './component/map-side-effect.component';

export class AppSideEffectComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="wrapper">
                <vl-title-next type="h1">Consumer App</vl-title-next>
                <consumer-elements-side-effect></consumer-elements-side-effect>
                <br><br>
                <consumer-components-side-effect></consumer-components-side-effect>
                <br><br>
                <consumer-map-side-effect></consumer-map-side-effect>
            </div>
      `;
    }
}

customElements.define('consumer-app-side-effect', AppSideEffectComponent);
