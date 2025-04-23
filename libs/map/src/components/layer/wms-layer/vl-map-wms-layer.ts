import { ImageWMS, TileWMS, XYZ } from 'ol/source';
import { Options as OlImageWMSSourceOptions } from 'ol/source/ImageWMS';
import { Options as OlTileWMSSourceOptions } from 'ol/source/TileWMS';
import { Options as OlXYZOptions } from 'ol/source/XYZ';
import { VlMapLayer } from '../vl-map-layer';
import './vl-map-wms-style/vl-map-wms-style';

export class VlMapWmsLayer extends VlMapLayer {
    static get _observedAttributes(): string[] {
        return VlMapLayer._observedAttributes.concat(['url', 'layers', 'styles', 'version']);
    }

    constructor(layerClass, sourceClass) {
        super();
        this.__layerClass = layerClass;
        this.__sourceClass = sourceClass;
    }

    connectedCallback() {
        return customElements.whenDefined('vl-map-wms-style').then(() => {
            this._source = this.__createSource(this.__sourceClass);
            this._layer = this.__createLayer(this.__layerClass);
            return super.connectedCallback();
        });
    }

    get _url() {
        const url = this.getAttribute('url');
        if (!url) {
            throw new Error('URL not defined');
        }
        return url;
    }

    get _layers() {
        const layers = this.getAttribute('layers');
        if (!layers) {
            throw new Error('Layers not defined');
        }
        return layers;
    }

    get _styles() {
        return this.getAttribute('styles') || '';
    }

    get _sldBody() {
        const wmsStyle: any = this.querySelector(':scope > vl-map-wms-style');
        if (wmsStyle) {
            return wmsStyle.sld;
        }
    }

    get _version() {
        return this.getAttribute('version') || '1.3.0';
    }

    _createLayerConfig(source) {
        return {
            title: this._name,
            source: source,
            minResolution: this._minResolution,
            maxResolution: this._maxResolution,
            visible: this._visible,
            opacity: this._opacity,
        };
    }

    get _sourceConfig(): OlImageWMSSourceOptions & OlTileWMSSourceOptions & OlXYZOptions {
        return {
            url: this._url,
            params: {
                LAYERS: this._layers,
                STYLES: this._styles,
                VERSION: this._version,
                SLD_BODY: this._sldBody,
            },
        };
    }

    __createLayer(LayerClass) {
        const layer = new LayerClass(this._createLayerConfig(this._source));
        layer.set('id', VlMapLayer._counter);
        return layer;
    }

    __createSource(SourceClass: typeof ImageWMS | typeof TileWMS | typeof XYZ): ImageWMS | TileWMS | XYZ {
        return new SourceClass(this._sourceConfig);
    }

    _layersChangedCallback(): void {
        this.updateOlLayerSource();
    }

    _urlChangedCallback(): void {
        this.updateOlLayerSource();
    }

    _stylesChangedCallback(): void {
        this.updateOlLayerSource();
    }

    _versionChangedCallback(): void {
        this.updateOlLayerSource();
    }

    private updateOlLayerSource(): void {
        if (!this._layer) {
            return;
        }

        const olSource = this.__createSource(this.__sourceClass);
        this._layer.setSource(olSource);
    }
}
