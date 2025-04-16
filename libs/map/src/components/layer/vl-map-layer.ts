import { BaseElementOfType } from '@domg-wc/common';
import { VlMap } from '../../vl-map';
import { VlMapLayerStyle } from '../layer-style/vl-map-layer-style';

export abstract class VlMapLayer extends BaseElementOfType(HTMLElement) {
    static get _observedAttributes() {
        return ['hidden', 'opacity'];
    }

    __counter: number;
    __styleCount: number;
    __ready: boolean;
    _layer: any;
    _source: any;
    __styles: any;
    __layerClass: any;
    __sourceClass: any;
    constructor() {
        super();
        VlMapLayer._counter = 0;
        this.__counter = ++VlMapLayer._counter;
        this.__ready = false;
    }

    async connectedCallback() {
        super.connectedCallback();

        this.__setIsLayerMarkerAttribute();
        if (this.mapElement) {
            await this.mapElement.ready;
            this.mapElement.addLayer(this._layer);
        }
        // bereken hoeveel VlMapStyle elementen er actief zouden moeten zijn
        this.__styleCount = this.getStyleCount();
        this.__markAsReady();
    }

    /**
     * bereken op basis van direct child elements hoeveel er van het type VlMapLayerStyle zijn
     */
    getStyleCount(): number {
        const childNodeList = (<any>this).querySelectorAll(':scope > *');
        return Array.from(childNodeList)?.filter((child) => child instanceof VlMapLayerStyle).length;
    }

    disconnectedCallback() {
        this._layer?.dispose();
    }

    static get _counter() {
        return this.__counter;
    }

    static set _counter(counter) {
        this.__counter = counter;
    }

    /**
     * Geeft de OpenLayers kaartlaag.
     *
     * @return {ol.layer.Layer}
     */
    get layer() {
        return this._layer;
    }

    /**
     * Geeft de OpenLayers kaartlaag source.
     *
     * @return {ol.source}
     */
    get source() {
        return this._source;
    }

    /**
     * Geeft terug ofdat de kaartlaag zichtbaar is of niet.
     *
     * @return {Boolean}
     */
    get visible() {
        return this._layer?.getVisible();
    }

    /**
     * Geeft de kaartlaag titel terug.
     *
     * @return {String}
     */
    get title() {
        return this.get('title');
    }

    /**
     * Zet de zichtbaarheid van de kaartlaag.
     *
     * @param {Boolean} value
     */
    // eslint-disable-line @typescript-eslint/adjacent-overload-signatures
    set visible(value) {
        this._layer?.setVisible(value);
        this.rerender();

        if (this.mapElement) {
            this.mapElement.handleLayerVisibilityChange(this);
        }
    }

    /**
     * Geeft de opacity van de kaartlaag terug.
     *
     * @return {Number}
     */
    get opacity(): number {
        return this._layer?.getOpacity();
    }

    /**
     * Zet de opacity van de kaartlaag.
     *
     * @param {Number} value
     */
    set opacity(value: number) {
        this._layer?.setOpacity(value);
    }

    get mapElement(): VlMap {
        if (this.parentNode && this.parentNode.map) {
            return this.parentNode;
        }
        return null;
    }

    get ready() {
        return this.__ready;
    }

    get _name() {
        return this.getAttribute('name') || 'kaartlaag';
    }

    get _minResolution() {
        return this.getAttribute('min-resolution') || 0;
    }

    get _maxResolution() {
        return this.getAttribute('max-resolution') || Infinity;
    }

    get _opacity() {
        return Number(this.getAttribute('data-vl-opacity') || 1);
    }

    get _visible() {
        return this.getAttribute('hidden') == undefined;
    }

    get _styles() {
        // als er meer styles zijn op het VlMapLayer, dan dat er VlMapLayerStyle elementen zijn
        // dan verwijderen we de dubbels
        if (this.__styles.length > this.__styleCount) {
            this.__styles = Array.from(new Set(this.__styles));
        }
        return this.__styles;
    }

    set _styles(styles) {
        this.__styles = styles;
    }

    /**
     * Geeft de waarde op basis van een sleutel.
     *
     * @param {String} key
     * @return {Object}
     */
    get(key) {
        return this._layer.get(key);
    }

    /**
     * Rendert de kaartlaag opnieuw.
     */
    rerender() {
        if (this.mapElement) {
            this.mapElement.rerender();
        }
    }

    isVisibleAtResolution(resolution) {
        const minResolution = parseFloat(this._layer.getMinResolution());
        const maxResolution = parseFloat(this._layer.getMaxResolution());
        return resolution >= minResolution && resolution < maxResolution;
    }

    _hiddenChangedCallback(oldValue, newValue) {
        if (this._layer) {
            this.visible = newValue == undefined;
        }
    }

    _opacityChangedCallback(oldValue: string, newValue: string) {
        this.opacity = Number(newValue || 1);
    }

    __setIsLayerMarkerAttribute() {
        this.dataset.vlIsLayer = true;
    }

    __markAsReady() {
        this.__ready = true;
    }
}
