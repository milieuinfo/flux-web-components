import { webComponent } from '@domg-wc/common';
import { VlMapBaseLayer } from '../vl-map-base-layer';

@webComponent('vl-map-baselayer-grb-ortho')
export class VlMapBaseLayerGRBOrtho extends VlMapBaseLayer {
    constructor() {
        super();
        this.url = 'https://geo.api.vlaanderen.be/OMWRGBMRVL/wmts';
        this.layer = 'omwrgbmrvl';
        this.title = 'GRB ortho laag';
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-baselayer-grb-ortho': VlMapBaseLayerGRBOrtho;
    }
}
