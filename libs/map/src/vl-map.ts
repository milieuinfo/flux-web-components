import { BaseHTMLElement, webComponent } from '@domg-wc/common';
import { Zoom } from 'ol/control.js';
import OlFullScreenControl from 'ol/control/FullScreen';
import OlLayerGroup from 'ol/layer/Group';
import { register } from 'ol/proj/proj4';
import OlProjection from 'ol/proj/Projection';
import proj4 from 'proj4';
import { VlCustomMap } from './actions/map/custom-map';
import { VlMapFeaturesLayer } from './components/layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import { VlMapWfsLayer } from './components/layer/vector-layer/vl-map-wfs-layer/vl-map-wfs-layer';
import { VlMapLayer } from './components/layer/vl-map-layer';
import { VlMapWmsLayer } from './components/layer/wms-layer/vl-map-wms-layer';
import { vlMapFluxStyles } from './vl-map.flux-css';
import { EVENT } from './vl-map.model';

@webComponent('vl-map')
export class VlMap extends BaseHTMLElement {
    protected __mapReady: Promise<unknown>;
    protected __overviewMapReady: Promise<unknown>;
    protected _map: VlCustomMap;
    protected __mapReadyResolver: (value: PromiseLike<unknown> | unknown) => void;
    protected __overviewMapReadyResolver: (value: PromiseLike<unknown> | unknown) => void;
    protected observer: MutationObserver;
    protected __ready: any;

    constructor() {
        const html = `
            <div id='map'>
                <slot></slot>
            </div>
        `;
        const styleSheets = [...vlMapFluxStyles.map((style) => style.styleSheet!)];
        super(html, styleSheets);

        this.__prepareReadyPromises();
    }

    static get _observedClassAttributes() {
        return ['no-border', 'full-height'];
    }

    get _classPrefix() {
        return 'vl-map--';
    }

    /**
     * Returns a Promise that resolves when the map is ready for further use.
     *
     * @return {Promise<void>}
     */
    get ready() {
        return this.__ready;
    }

    /**
     * Returns the OpenLayers map.
     *
     * @return {VlCustomMap}
     */
    get map() {
        return this._map;
    }

    /**
     * Returns the OpenLayers map resolution.
     *
     * @return {Object}
     */
    get resolution() {
        return this.map.getView().getResolution();
    }

    /**
     * Returns the OpenLayers map layers that are not used as a base map layer.
     *
     * @return {Object[]}
     */
    get nonBaseLayers() {
        return [...this.querySelectorAll<VlMapLayer>(':scope > [is-layer]')];
    }

    get disableEscapeKey() {
        return this.getAttribute('disable-escape-key') != undefined;
    }

    get disableRotation() {
        return this.getAttribute('disable-rotation') != undefined;
    }

    get disableMouseWheelZoom() {
        return this.getAttribute('disable-mouse-wheel-zoom') != undefined;
    }

    get disableKeyboard() {
        return this.getAttribute('disable-keyboard') != undefined;
    }

    get actions() {
        return this.map && this.map.actions;
    }

    get controls() {
        return this.map && this.map.getControls().getArray();
    }

    get activeAction() {
        return this.map && this.map.getCurrentActiveAction();
    }

    get defaultAction() {
        return this.map && this.map.getDefaultActiveAction();
    }

    get _mapElement() {
        return this._shadow?.querySelector('#map');
    }

    get _controls() {
        if (this.getAttribute('allow-fullscreen') !== null) {
            return [new OlFullScreenControl()];
        }
        return [];
    }

    get _projection() {
        return new OlProjection({
            code: 'EPSG:31370',
            extent: this._extent,
            getPointResolution: (r) => r,
        });
    }

    get _extent() {
        return [9928, 66928, 272072, 329072];
    }

    get zoomInTipLabel() {
        return this.getAttribute('zoomInTooltip');
    }

    get zoomOutTipLabel() {
        return this.getAttribute('zoomOutTooltip');
    }

    get featuresLayers(): VlMapFeaturesLayer[] {
        return Array.from(this.querySelectorAll('vl-map-features-layer'));
    }

    get wfsLayers(): VlMapWfsLayer[] {
        return Array.from(this.querySelectorAll('vl-map-wfs-layer'));
    }

    get wmsLayers(): VlMapWmsLayer[] {
        return Array.from(this.querySelectorAll('vl-map-tiled-wms-layer, vl-map-image-wms-layer'));
    }

    static __callOnceOnLoad(callback) {
        if (document.readyState === 'complete') {
            callback();
        } else {
            window.addEventListener('load', callback, { once: true });
        }
    }

    __prepareReadyPromises() {
        this.__mapReady = new Promise((resolve) => (this.__mapReadyResolver = resolve));
        this.__overviewMapReady = new Promise((resolve) => (this.__overviewMapReadyResolver = resolve));
        this.__ready = Promise.all([this.__mapReady, this.__overviewMapReady]);
    }

    connectedCallback() {
        super.connectedCallback();

        this.__initializeCoordinateSystem();

        this._map = new VlCustomMap({
            actions: [],
            disableEscapeKey: this.disableEscapeKey,
            disableRotation: this.disableRotation,
            disableMouseWheelZoom: this.disableMouseWheelZoom,
            disableKeyboard: this.disableKeyboard,
            customLayers: {
                baseLayerGroup: this.__createLayerGroup('Basis lagen', []),
                overviewMapLayers: [],
                overlayGroup: this.__createLayerGroup('Lagen', []),
            },
            projection: this._projection,
            target: this._mapElement,
            controls: this._controls,
            defaultZoom: false,
        });

        this._map.initializeView();
        this.__updateMapSizeOnLoad();
        this.__updateOverviewMapSizeOnLoad();
        this._map.addControl(this.__createZoomControl());
        this.observeRemovedMapLayers();
    }

    disconnectedCallback(): void {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.map?.setTarget(null);
    }

    __createZoomControl() {
        const zoomOptions: { zoomInTipLabel?; zoomOutTipLabel? } = {};
        if (this.zoomInTipLabel) {
            zoomOptions.zoomInTipLabel = this.zoomInTipLabel;
        }
        if (this.zoomOutTipLabel) {
            zoomOptions.zoomOutTipLabel = this.zoomOutTipLabel;
        }
        return new Zoom(zoomOptions);
    }

    addLayer(layer) {
        this.map.addOverlayLayer(layer);
    }

    addAction(action) {
        this.map.addAction(action);
    }

    addControl(control) {
        this.map.addControl(control);
    }

    removeAction(action) {
        this.map.removeAction(action);
    }

    _dispatchLayerVisibleChangedEvent(layer) {
        this.dispatchEvent(
            new CustomEvent(EVENT.LAYER_VISIBLE_CHANGED, {
                detail: { layer, visible: layer.visible },
            })
        );
    }

    handleLayerVisibilityChange(layerElement) {
        this._dispatchLayerVisibleChangedEvent(layerElement);

        const actions = this.map.getLayerActions(layerElement.layer);

        if (actions) {
            actions.forEach((action) => {
                if (layerElement.visible) {
                    // Activate default active action on layer if applicable
                    if (!this.activeAction && action === this.defaultAction) {
                        action.element.activate();
                    }
                } else if (action.element._active) {
                    // Deactivate active action on layer
                    action.element.deactivate();
                }

                // Handle visibility changes specific to the action if these are defined
                if (action.handleLayerVisibilityChange) {
                    action.handleLayerVisibilityChange();
                }

                // Enable or disable the control of the action
                const actionControl = action.getControl();
                if (actionControl) {
                    actionControl.get('element').setDisabled(!layerElement.visible);
                }
            });
        }
    }

    _dispatchActiveActionChangedEvent(previousActiveAction, currentActiveAction) {
        this.dispatchEvent(
            new CustomEvent(EVENT.ACTIVE_ACTION_CHANGED, {
                detail: {
                    previous: previousActiveAction ? previousActiveAction.element : previousActiveAction,
                    current: currentActiveAction ? currentActiveAction.element : currentActiveAction,
                },
            })
        );
    }

    changeActiveAction(newActiveAction) {
        const previousActiveAction = this.activeAction;
        const currentActiveAction = newActiveAction || undefined;

        if (previousActiveAction) {
            this.map.deactivateCurrentAction();

            previousActiveAction.element._active = false;
            if (previousActiveAction.getControl()) {
                previousActiveAction.getControl().get('element').setActive(false);
            }
        }

        if (currentActiveAction) {
            this.map.activateAction(currentActiveAction);

            currentActiveAction.element._active = true;
            if (currentActiveAction.getControl()) {
                currentActiveAction.getControl().get('element').setActive(true);
            }
        }

        if (currentActiveAction || previousActiveAction) {
            this._dispatchActiveActionChangedEvent(previousActiveAction, currentActiveAction);
        }
    }

    activateAction(action) {
        if (action) {
            action.element.activate();
        }
    }

    deactivateAction(action) {
        if (action) {
            action.element.deactivate();
        }
    }

    /**
     * Zooms on the map to the given geometry or bounding box.
     *
     * @param {(ol/geom/Geometry|Number[])} geometryOrBoundingbox
     * @param {Number} max
     */
    zoomTo(geometryOrBoundingbox, max) {
        if (Array.isArray(geometryOrBoundingbox)) {
            this.map.zoomToExtent(geometryOrBoundingbox, max);
        } else if (geometryOrBoundingbox instanceof Object) {
            this.map.zoomToGeometry(geometryOrBoundingbox, max);
        }
    }

    /**
     * Register map event.
     *
     * @param {*} event
     * @param {*} callback
     */
    on(event, callback) {
        return this.map.on(event, callback);
    }

    /**
     * unregister map event.
     *
     * @param {*} event
     * @param {*} callback
     */
    un(event, callback) {
        return this.map.un(event, callback);
    }

    /**
     * Render the map again.
     */
    rerender() {
        this.map.render();
    }

    __updateMapSize() {
        this.style.display = 'block';
        if (this.map) {
            this.map.updateSize();
        }
        // @ts-expect-error: expects one argument
        this.__mapReadyResolver();
    }

    __updateOverviewMapSize() {
        if (this.map.overviewMapControl) {
            this.map.overviewMapControl.getOverviewMap().updateSize();
        }
        // @ts-expect-error: expects one argument
        this.__overviewMapReadyResolver();
    }

    __updateOverviewMapSizeOnLoad() {
        VlMap.__callOnceOnLoad(this.__updateOverviewMapSize.bind(this));
    }

    __updateMapSizeOnLoad() {
        VlMap.__callOnceOnLoad(this.__updateMapSize.bind(this));
    }

    __createLayerGroup(title, layers) {
        // title is not a valid option property, also can not find it in html DOM when setting it
        // ref.: https://openlayers.org/en/v6.15.1/apidoc/module-ol_layer_Group-LayerGroup.html
        return new OlLayerGroup(<any>{
            title,
            layers,
        });
    }

    __initializeCoordinateSystem() {
        proj4.defs(
            'EPSG:31370',
            '+proj=lcc +lat_1=51.16666723333333 +lat_2=49.8333339 +lat_0=90 +lon_0=4.367486666666666 +x_0=150000.013 +y_0=5400088.438 +ellps=intl +towgs84=-106.869,52.2978,-103.724,0.3366,-0.457,1.8422,-1.2747 +units=m +no_defs'
        );
        register(proj4);
    }

    private observeRemovedMapLayers(): void {
        const mapElement = this as unknown as HTMLElement;
        this.observer = new MutationObserver((mutations: MutationRecord[]) => {
            // opbouwen lijst van alle VlMapLayer-nodes die verwijderd werden uit deze instantie van het VlMap component
            mutations
                .filter(({ target }) => target === mapElement)
                .flatMap(({ removedNodes }) => Array.from(removedNodes).filter((node) => node instanceof VlMapLayer))
                .forEach((removedMapLayer: VlMapLayer & Node) => {
                    // verwijder elke MapLayer uit OL OverlayLayerCollection, die uit DOM werd verwijderd
                    this.map.removeOverlayLayer((<VlMapLayer>removedMapLayer)._layer);
                });
        });
        this.observer.observe(mapElement, { subtree: true, childList: true });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map': VlMap;
    }
}
