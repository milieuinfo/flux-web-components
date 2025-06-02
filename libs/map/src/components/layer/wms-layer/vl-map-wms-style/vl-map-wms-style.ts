import { BaseHTMLElement, webComponent } from '@domg-wc/common';

@webComponent('vl-map-wms-style')
export class VlMapWmsStyle extends BaseHTMLElement {
    get sld() {
        return this.getAttribute('sld');
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-wms-style': VlMapWmsStyle;
    }
}
