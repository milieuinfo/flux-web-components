import { webComponent } from '@domg-wc/common-utilities';
import * as OlExtent from 'ol/extent';
import OlTileLayer from 'ol/layer/Tile';
import { Projection } from 'ol/proj';
import OlWMTSSource from 'ol/source/WMTS';
import OlWMTSTileGrid from 'ol/tilegrid/WMTS';
import { getLambert2008Code, getLambert2008Extent, getLambert72Code } from '../../../utils/capabilities';
import { VlMap } from '../../../vl-map';
import { VlMapLayer } from '../vl-map-layer';

@webComponent('vl-map-wmts-layer')
export class VlMapWmtsLayer extends VlMapLayer {
    connectedCallback() {
        this._source = this.__createSource();
        this._layer = this._createLayer();
        return super.connectedCallback();
    }

    get _projection(): Projection | undefined {
        if (this.parentNode && this.parentNode instanceof VlMap) {
            return this.parentNode._projection;
        }
        return undefined;
    }

    get url() {
        const url = this.getAttribute('data-vl-url');
        if (!url) {
            throw new Error('URL not defined');
        }
        return url;
    }

    get _wmtsLayer() {
        const layer = this.getAttribute('data-vl-layer');
        if (!layer) {
            throw new Error('Layer not defined');
        }
        return layer;
    }

    _createLayer() {
        const layer = new OlTileLayer(<any>{
            title: this._name,
            source: this._source,
            minResolution: this._minResolution,
            maxResolution: this._maxResolution,
            visible: this._visible,
            opacity: this._opacity,
        });
        layer.set('id', VlMapLayer._counter);
        return layer;
    }

    __createSource() {
        const tileLimits = this.__grbTileLimits;
        return new OlWMTSSource({
            url: this.url,
            layer: this._wmtsLayer,
            matrixSet: this.__grbMatrixSet,
            format: this.__wmtsFormat,
            projection: this._projection,
            tileGrid: new OlWMTSTileGrid({
                extent: this.__extent,
                origin: OlExtent.getTopLeft(this.__extent),
                resolutions: tileLimits.resolutions,
                matrixIds: tileLimits.matrixIds,
            }),
            style: '',
        });
    }

    get __wmtsFormat() {
        return 'image/png';
    }

    get __extent() {
        return this._projection?.getExtent();
    }

    get __grbMatrixSet(): string {
        if (this.hasAttribute('matrix-set')) {
            return this.getAttribute('matrix-set');
        }
        switch (this._projection?.getCode()) {
            case getLambert2008Code():
                return 'BPL2008VL';
            case getLambert72Code():
                return 'BPL72VL';
            default:
                return 'WGS84VL';
        }
    }

    get __prefixMatrix(): boolean {
        return this.hasAttribute('matrix-prefix');
    }

    get __grbTileLimits() {
        const size = OlExtent.getWidth(getLambert2008Extent()) / 256;
        const resolutions = new Array(16);
        const matrixIds = new Array(16);
        for (let z = 0; z < 16; ++z) {
            resolutions[z] = size / Math.pow(2, z);
            matrixIds[z] = this.__prefixMatrix ? this.__grbMatrixSet + ':' + z : z;
        }
        return { matrixIds, resolutions };
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-wmts-layer': VlMapWmtsLayer;
    }
}
