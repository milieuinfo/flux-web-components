import { webComponent } from '@domg-wc/common';
import { VlMapBaseLayer } from '../vl-map-base-layer';

@webComponent('vl-map-baselayer-grb')
export class VlMapBaseLayerGRB extends VlMapBaseLayer {
    constructor() {
        super();
        this.url = 'https://geo.api.vlaanderen.be/GRB/wmts';
        this.layer = 'grb_bsk';
        this.title = 'GRB basis laag';
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-baselayer-grb': VlMapBaseLayerGRB;
    }
}
