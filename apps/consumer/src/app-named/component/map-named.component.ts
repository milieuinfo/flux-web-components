import { registerWebComponents } from '@domg-wc/common-utilities';
import { VlTitleComponent } from '@domg-wc/components';
import { VlMap, VlMapBaseLayerGRBGray } from '@domg-wc/map';
import { mapWithGrayBaselayerHtml } from '../../html/map.html.js';

registerWebComponents([VlTitleComponent, VlMap, VlMapBaseLayerGRBGray]);

export class MapNamedComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            ${mapWithGrayBaselayerHtml('named imports', '@domg-wc/map')}
        `;
    }
}

customElements.define('consumer-map-named', MapNamedComponent);
