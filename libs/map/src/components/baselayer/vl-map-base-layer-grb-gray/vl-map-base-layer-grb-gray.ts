import { webComponent } from '@domg-wc/common';
import { VlMapBaseLayer } from '../vl-map-base-layer';

@webComponent('vl-map-baselayer-grb-gray')
export class VlMapBaseLayerGRBGray extends VlMapBaseLayer {
    constructor() {
        super();
        this.url = 'https://geo.api.vlaanderen.be/GRB/wmts';
        this.layer = 'grb_bsk_grijs';
        this.title = 'GRB basis laag grijs';
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-baselayer-grb-gray': VlMapBaseLayerGRBGray;
    }
}
