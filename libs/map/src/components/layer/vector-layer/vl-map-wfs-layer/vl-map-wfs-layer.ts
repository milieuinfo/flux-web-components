import { webComponent } from '@domg-wc/common';
import OlGML2 from 'ol/format/GML2';
import * as OlLoadingstrategy from 'ol/loadingstrategy';
import OlVectorSource from 'ol/source/Vector';
import { VlMapVectorLayer } from '../vl-map-vector-layer';

@webComponent('vl-map-wfs-layer')
export class VlMapWfsLayer extends VlMapVectorLayer {
    connectedCallback() {
        this._source = this.__createSource();
        this._layer = this._createLayer();
        return super.connectedCallback();
    }

    get _url() {
        const url = this.getAttribute('url');
        if (!url) {
            throw new Error('URL not defined');
        }
        return new URL(url);
    }

    get _layers() {
        const layers = this.getAttribute('layers');
        if (!layers) {
            throw new Error('Layers not defined');
        }
        return layers;
    }

    __createSource() {
        return new OlVectorSource({
            format: this.__sourceFormat,
            strategy: this.__loadingStrategy,
            url: this.__getWfsUrl.bind(this),
        });
    }

    __getWfsUrl(extent, resolution, projection) {
        const url = this._url;
        const { searchParams } = url;
        searchParams.set('service', 'WFS');
        searchParams.set('request', 'GetFeature');
        searchParams.set('typename', this._layers);
        searchParams.set('bbox', extent.join(','));
        searchParams.set('srsname', projection.getCode());
        searchParams.set('outputFormat', this.__wfsOutputFormat);
        searchParams.set('version', this.__wfsVersion);
        return url;
    }

    get __loadingStrategy() {
        return OlLoadingstrategy.bbox;
    }

    get __sourceFormat() {
        return new OlGML2();
    }

    get __wfsOutputFormat() {
        return 'GML2';
    }

    get __wfsVersion() {
        return '2.0.0';
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-wfs-layer': VlMapWfsLayer;
    }
}
