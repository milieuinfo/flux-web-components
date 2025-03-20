import './component/components-named.component';
import './component/elements-named.component';
import './component/map-named.component';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlH1Element } from '@domg-wc/elements';

registerWebComponents([VlH1Element]);

export class AppNamedComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="wrapper">
                <vl-title-next type="h1">Consumer App</vl-title-next>
                <consumer-elements-named></consumer-elements-named>
                <br><br>
                <consumer-components-named></consumer-components-named>
                <br><br>
                <consumer-map-named></consumer-map-named>
            </div>
      `;
    }
}

customElements.define('consumer-app-named', AppNamedComponent);
