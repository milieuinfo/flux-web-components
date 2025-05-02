import './component/components-named.component';
import './component/map-named.component';
import { registerWebComponents } from '@domg-wc/common';
import { VlTitleComponent } from '@domg-wc/components/atom';

registerWebComponents([VlTitleComponent]);

export class AppNamedComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="wrapper">
                <vl-title type="h1">Consumer App</vl-title>
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
