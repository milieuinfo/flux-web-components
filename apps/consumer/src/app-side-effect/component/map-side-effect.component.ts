import '@domg-wc/components/atom/title';
import '@domg-wc/map/vl-map.js';
import '@domg-wc/map/components/baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray.js';
import { mapWithGrayBaselayerHtml } from '../../html/map.html.js';

export class MapSideEffectComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            ${mapWithGrayBaselayerHtml('side effect imports', '@domg-wc/map')}
        `;
    }
}

customElements.define('consumer-map-side-effect', MapSideEffectComponent);
