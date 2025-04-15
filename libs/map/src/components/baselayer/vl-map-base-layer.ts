import { BaseElementOfType, webComponent } from '@domg-wc/common-utilities';
import * as OlExtent from 'ol/extent';
import OlGeoJSON from 'ol/format/GeoJSON';
import * as OlLoadingstrategy from 'ol/loadingstrategy';
import OlVectorSource from 'ol/source/Vector';
import OlWMTSSource from 'ol/source/WMTS';
import TileWMS from 'ol/source/TileWMS';
import OlStyleFill from 'ol/style/Fill';
import OlStyleStroke from 'ol/style/Stroke';
import OlStyle from 'ol/style/Style';
import OlWMTSTileGrid from 'ol/tilegrid/WMTS';
import Group from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';

@webComponent('vl-map-baselayer')
export class VlMapBaseLayer extends BaseElementOfType(HTMLElement) {
    connectedCallback() {
        super.connectedCallback();

        this._configureMap();
    }

    /**
     * Geeft het kaartlaag type terug.
     *
     * @Return {string}
     */
    get type() {
        return this.getAttribute('type') || 'wmts';
    }

    /**
     * Geeft de kaartlaag URL terug.
     *
     * @Return {string}
     */
    get url() {
        return this.getAttribute('url') || this._url;
    }

    set url(value) {
        this._url = value;
    }

    /**
     * Geeft de kaartlaag identifier terug.
     *
     * @Return {string}
     */
    get layer() {
        return this.getAttribute('layer') || this._layer;
    }

    set layer(value) {
        this._layer = value;
    }

    /**
     * Geeft de kaartlaag titel terug.
     *
     * @Return {string}
     */
    get title(): string {
        return this.getAttribute('title') || this._title;
    }

    set title(value) {
        this._title = value;
    }

    get _map() {
        if (this.parentNode) {
            return this.parentNode.map;
        }
    }

    get _projection() {
        if (this.parentNode) {
            return this.parentNode._projection;
        }
    }

    get _WMTSSource() {
        this._wmtsSource = this._wmtsSource || this._createWMTSSource();
        return this._wmtsSource;
    }

    get _vectorSource() {
        this._createdVectorSource = this._createdVectorSource || this._createVectorSource();
        return this._createdVectorSource;
    }

    _configureMap() {
        if (this._map) {
            this._map.addBaseLayerAndOverlayMapLayer(this._createBaseLayer(), this._createBaseLayer());
        }
    }

    _createWMTSSource() {
        const size = OlExtent.getWidth(this._projection.getExtent()) / 256;
        const resolutions = new Array(16);
        const matrixIds = new Array(16);
        for (let z = 0; z < 16; ++z) {
            resolutions[z] = size / Math.pow(2, z);
            matrixIds[z] = z;
        }

        return new OlWMTSSource({
            url: this.url,
            layer: this.layer,
            matrixSet: 'BPL72VL',
            format: 'image/png',
            projection: this._projection,
            tileGrid: new OlWMTSTileGrid({
                extent: this._projection.getExtent(),
                origin: OlExtent.getTopLeft(this._projection.getExtent()),
                resolutions,
                matrixIds,
            }),
            style: '',
        });
    }

    _createVectorSource() {
        // eslint-disable-line @typescript-eslint/no-this-alias
        const self = this;
        return new OlVectorSource({
            format: new OlGeoJSON({
                dataProjection: self._projection,
            }),
            url() {
                return `${self.url}&typeName=${self.layer}`;
            },
            strategy: OlLoadingstrategy.bbox,
        });
    }

    _createBaseLayer() {
        const hasBackgroundLayer = this.hasAttribute('background-layer');
        const layers = [];
        if (hasBackgroundLayer) {
            layers.push(
                new TileLayer({
                    source: new TileWMS({
                        params: { FORMAT: 'image/png', LAYERS: 'crossborder,topo' },
                        url: 'https://cartoweb.wms.ngi.be/service',
                    }),
                    opacity: 0.3,
                })
            );
        }
        switch (this.type) {
            case 'wmts':
                layers.push(
                    new TileLayer(<any>{
                        title: this.title,
                        type: 'base',
                        source: this._WMTSSource,
                    })
                );
                break;
            case 'wfs':
                layers.push(
                    new VectorLayer({
                        source: this._vectorSource,
                        style: new OlStyle({
                            stroke: new OlStyleStroke({
                                color: 'rgba(0, 0, 0, 1.0)',
                                width: 1,
                            }),
                            fill: new OlStyleFill({
                                color: 'rgba(255, 0, 0, 1.0)',
                            }),
                        }),
                    })
                );
                break;
            default:
                return null;
        }
        return new Group({ layers: layers });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-baselayer': VlMapBaseLayer;
    }
}
