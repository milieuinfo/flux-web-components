import { webComponent } from '@domg-wc/common';
import OlTileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import { VlMapWmsLayer } from '../vl-map-wms-layer';

@webComponent('vl-map-xyz-wms-layer')
export class VlMapXYZWmsLayer extends VlMapWmsLayer {
    constructor() {
        super(OlTileLayer, XYZ);
    }

    get _layers() {
        return undefined;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-xyz-wms-layer': VlMapXYZWmsLayer;
    }
}
