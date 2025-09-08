import { BaseHTMLElement, webComponent } from '@domg-wc/common';
import * as OlExtent from 'ol/extent';
import OlGeoJSON from 'ol/format/GeoJSON';
import { Layer, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import Group from 'ol/layer/Group';
import * as OlLoadingstrategy from 'ol/loadingstrategy';
import { Projection } from 'ol/proj';
import { TileWMS, Vector as VectorSource, WMTS, XYZ } from 'ol/source';
import type { Options as WMSOptions } from 'ol/source/TileWMS';
import type { Options as VectorOptions } from 'ol/source/Vector';
import type { Options as WMTSOptions } from 'ol/source/WMTS';
import type { Options as XYZOptions } from 'ol/source/XYZ';
import OlStyleFill from 'ol/style/Fill';
import OlStyleStroke from 'ol/style/Stroke';
import OlStyle from 'ol/style/Style';
import OlWMTSTileGrid from 'ol/tilegrid/WMTS';
import { getLambert2008Code, getLambert72Code } from '../../utils/capabilities';
import { VlMap } from '../../vl-map';

type BackgroundLayerType = 'xyz' | 'wms' | 'wmts' | 'vector';
type BackgroundLayerOptions = XYZOptions | WMSOptions | WMTSOptions | VectorOptions;

@webComponent('vl-map-baselayer')
export class VlMapBaseLayer extends BaseHTMLElement {
    protected _url: string;
    protected _layer: string;
    protected _title: string;
    protected _wmtsSource: WMTS;
    protected _createdVectorSource: VectorSource;

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
            // @ts-expect-error: The parentNode is expected to have a map property
            return this.parentNode.map;
        }
    }

    get _projection(): Projection | undefined {
        if (this.parentNode && this.parentNode instanceof VlMap) {
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

    get _hasBackgroundLayer() {
        return this.hasAttribute('background-layer');
    }

    get _backgroundType(): BackgroundLayerType | string | undefined {
        return this.getAttribute('background-type') || undefined;
    }

    get _backgroundOptions(): BackgroundLayerOptions | undefined {
        if (!this._hasBackgroundLayer) return undefined;
        if (this._hasBackgroundLayer && !this._backgroundType && !this.hasAttribute('background-options'))
            return {
                url: 'https://cartoweb.wms.ngi.be/service',
                params: { FORMAT: 'image/png', LAYERS: 'crossborder,topo' },
            };

        const options = this.getAttribute('background-options');

        try {
            return JSON.parse(options);
        } catch (err) {
            console.warn('Invalid background-options JSON:', err);
            return undefined;
        }
    }

    get _extent(): OlExtent.Extent | undefined {
        return this._projection?.getExtent();
    }

    get _matrixSet(): string {
        switch (this._projection?.getCode()) {
            case getLambert2008Code():
                return 'BPL2008VL';
            case getLambert72Code():
                return 'BPL72VL';
            default:
                return 'WGS84VL';
        }
    }

    _configureMap() {
        if (this._map) {
            this._map.addBaseLayerAndOverlayMapLayer(this._createBaseLayer(), this._createBaseLayer());
        }
    }

    _createWMTSSource() {
        const size = OlExtent.getWidth(this._extent) / 256;
        const resolutions = new Array(16);
        const matrixIds = new Array(16);
        for (let z = 0; z < 16; ++z) {
            resolutions[z] = size / Math.pow(2, z);
            matrixIds[z] = z;
        }

        return new WMTS({
            url: this.url,
            layer: this.layer,
            matrixSet: this._matrixSet,
            format: 'image/png',
            projection: this._projection,
            tileGrid: new OlWMTSTileGrid({
                extent: this._extent,
                origin: OlExtent.getTopLeft(this._extent),
                resolutions,
                matrixIds,
            }),
            style: '',
        });
    }

    _createVectorSource() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        return new VectorSource({
            format: new OlGeoJSON({
                dataProjection: self._projection,
            }),
            url() {
                return `${self.url}&typeName=${self.layer}`;
            },
            strategy: OlLoadingstrategy.bbox,
        });
    }

    _createBackgroundLayer(): Layer | null {
        const options = this._backgroundOptions;
        const opacity = 0.3;

        switch (this._backgroundType) {
            case 'xyz':
                return new TileLayer({
                    source: new XYZ(options as XYZOptions),
                    opacity,
                });
            case 'wmts':
                return new TileLayer({
                    source: new WMTS(options as WMTSOptions),
                    opacity,
                });
            case 'vector':
                return new VectorLayer({
                    source: new VectorSource(options as VectorOptions),
                    opacity,
                });
            case 'wms':
            default:
                return new TileLayer({
                    source: new TileWMS(options as WMSOptions),
                    opacity,
                });
        }
    }

    _createBaseLayer() {
        const hasBackgroundLayer = this.hasAttribute('background-layer');
        const layers = [];
        if (hasBackgroundLayer) {
            layers.push(this._createBackgroundLayer());
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
