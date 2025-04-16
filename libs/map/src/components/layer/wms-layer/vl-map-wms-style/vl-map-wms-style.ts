import { BaseElementOfType, webComponent } from '@domg-wc/common';

@webComponent('vl-map-wms-style')
export class VlMapWmsStyle extends BaseElementOfType(HTMLElement) {
    get sld() {
        return this.getAttribute('data-vl-sld');
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-wms-style': VlMapWmsStyle;
    }
}
