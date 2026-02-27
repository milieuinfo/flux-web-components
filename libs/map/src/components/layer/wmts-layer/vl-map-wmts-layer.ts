import { webComponent } from '@domg-wc/common';
import * as OlExtent from 'ol/extent';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';
import OlTileLayer from 'ol/layer/Tile';
import { Projection } from 'ol/proj';
import OlWMTSSource, { optionsFromCapabilities } from 'ol/source/WMTS';
import OlWMTSTileGrid from 'ol/tilegrid/WMTS';
import { getLambert2008Code, getLambert2008Extent, getLambert72Code } from '../../../utils/capabilities';
import { VlMap } from '../../../vl-map';
import { VlMapLayer } from '../vl-map-layer';

@webComponent('vl-map-wmts-layer')
export class VlMapWmtsLayer extends VlMapLayer {
    async connectedCallback() {
        if (this.hasAttribute('from-capabilities')) {
            this._source = await this.__createSourceFromCapabilities();
        } else {
            this._source = this.__createSource();
        }
        this._layer = this._createLayer();
        return super.connectedCallback();
    }

    get _projection(): Projection | undefined {
        if (this.parentNode && this.parentNode instanceof VlMap) {
            return this.parentNode._projection;
        }
    }

    get url() {
        const url = this.getAttribute('url');
        if (!url) {
            throw new Error('URL not defined');
        }
        return url;
    }

    get _wmtsLayer() {
        const layer = this.getAttribute('layer');
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

    async __createSourceFromCapabilities(): Promise<OlWMTSSource> {
        const resp = await fetch(`${this.url}?SERVICE=WMTS&REQUEST=GetCapabilities`);
        const text = await resp.text();
        const parser = new WMTSCapabilities();
        const caps = parser.read(text);
        const options = optionsFromCapabilities(caps, {
            layer: this._wmtsLayer,
            ...(this.hasAttribute('matrix-set') ? { matrixSet: this.__grbMatrixSet } : {}),
            projection: this._projection,
        });
        if (!options) {
            throw new Error(`De WMTS source kon niet aangemaakt worden vanuit de capabilities voor de layer '${this._wmtsLayer}'`);
        }
        return new OlWMTSSource(options);
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
