import { BaseHTMLElement, webComponent } from '@domg-wc/common';
import type { VlSideSheet } from '@domg-wc/components/block';
import { vlMediaScreenSmall } from '@domg-wc/styles';
import { Zoom } from 'ol/control.js';
import OlFullScreenControl from 'ol/control/FullScreen';
import { EventsKey } from 'ol/events';
import OlLayerGroup from 'ol/layer/Group';
import { unByKey } from 'ol/Observable';
import { register } from 'ol/proj/proj4';
import OlProjection from 'ol/proj/Projection';
import proj4 from 'proj4';
import { VlCustomMap } from './actions/map/custom-map';
import { VlMapFeaturesLayer } from './components/layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import { VlMapWfsLayer } from './components/layer/vector-layer/vl-map-wfs-layer/vl-map-wfs-layer';
import { VlMapLayer } from './components/layer/vl-map-layer';
import { VlMapWmsLayer } from './components/layer/wms-layer/vl-map-wms-layer';
import { getLambert2008Code, getLambert2008Extent, getLambert72Code, getLambert72Extent } from './utils/capabilities';
import { OpenLayersUtil } from './utils/ol-util';
import { vlMapFluxStyles } from './vl-map.flux-css';
import { EVENT } from './vl-map.model';

const CONTROL_SHIFT_GAP = 8;

const SHIFTABLE_CONTROLS: { selector: string; property: string }[] = [
    { selector: '.ol-scale-line', property: '--vl-map--shift-scale-line' },
    { selector: '.ol-zoom', property: '--vl-map--shift-zoom' },
    { selector: '.ol-rotate', property: '--vl-map--shift-rotate' },
    { selector: '.ol-overviewmap', property: '--vl-map--shift-overviewmap' },
    { selector: '.ol-full-screen', property: '--vl-map--shift-full-screen' },
    { selector: '.ol-zoom-extent', property: '--vl-map--shift-zoom-extent' },
];

const SHIFTABLE_CHILDREN: { tag: string; selector: string; property: string; contentBox?: boolean }[] = [
    { tag: 'vl-map-legend', selector: '.flux-map-legend', property: '--vl-map--shift-legend' },
    {
        tag: 'vl-map-current-location',
        selector: '.flux-map-current-location',
        property: '--vl-map--shift-current-location',
    },
    { tag: 'vl-map-action-controls', selector: 'div', property: '--vl-map--shift-action-controls', contentBox: true },
];

const SHIFT_PROPERTIES = [...SHIFTABLE_CONTROLS, ...SHIFTABLE_CHILDREN].map(({ property }) => property);

const SHIFT_OBSTACLE_SELECTOR = 'vl-map-search';

const HIDDEN_CONTROL_CLASS = 'ol-hidden';

const SIDE_SHEET_SELECTOR = 'vl-map-side-sheet, vl-side-sheet';

type ShiftTarget = { element: HTMLElement; host: HTMLElement; property: string; contentBox?: boolean };

type MeasuredShiftTarget = ShiftTarget & { rect: DOMRect };

@webComponent('vl-map')
export class VlMap extends BaseHTMLElement {
    protected __mapReady: Promise<unknown>;
    protected __overviewMapReady: Promise<unknown>;
    protected _map: VlCustomMap;
    protected __mapReadyResolver: (value: PromiseLike<unknown> | unknown) => void;
    protected __overviewMapReadyResolver: (value: PromiseLike<unknown> | unknown) => void;
    protected observer: MutationObserver;
    protected __ready: any;
    private sideSheetObserver?: MutationObserver;
    private sideSheetResizeObserver?: ResizeObserver;
    private resizeObservedElements = new Set<Element>();
    private controlClassObserver?: MutationObserver;
    private classObservedElements = new Set<Element>();
    private controlsListenerKeys?: EventsKey[];
    private shiftRafId?: number;
    private scrollTracking = false;
    private readonly scrollListener = () => this._scheduleControlShiftUpdate();

    static get _observedAttributes() {
        return ['lambert2008', 'allow-invalid-geometry', 'auto-shift-controls'];
    }

    constructor() {
        const html = `
            <div id='map'>
                <slot></slot>
            </div>
        `;
        const styleSheets = [...vlMapFluxStyles.map((style) => style.styleSheet!)];
        super(html, styleSheets);

        this.__initializeCoordinateSystem();
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

    get hideScale() {
        return this.getAttribute('hide-scale') != undefined;
    }

    get autoShiftControls() {
        return this.getAttribute('auto-shift-controls') != undefined;
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
        return this._shadow?.querySelector<HTMLDivElement>('#map');
    }

    get _controls() {
        if (this.getAttribute('allow-fullscreen') !== null) {
            return [new OlFullScreenControl()];
        }
        return [];
    }

    get _projection() {
        return new OlProjection({
            code: this._code,
            extent: this._extent,
        });
    }

    /**
     * Voorlopig is dit een opt-in attribuut. In de toekomst wordt Lambert 2008 de default.
     */
    get isLambert2008() {
        return this.hasAttribute('lambert2008');
    }

    get _code() {
        return this.isLambert2008 ? getLambert2008Code() : getLambert72Code();
    }

    get _extent() {
        return this.isLambert2008 ? getLambert2008Extent() : getLambert72Extent();
    }

    get invalidGeometryAllowed() {
        return this.hasAttribute('allow-invalid-geometry');
    }

    public hasInvalidGeometries(): boolean {
        return this.nonBaseLayers.some((vlMapLayer) => {
            const { layer } = vlMapLayer;
            if (!layer?.getSource) return false;

            return layer
                .getSource()
                .getFeatures()
                .some((feature) => {
                    const geometry = feature.getGeometry();
                    if (geometry) {
                        return OpenLayersUtil.geometryIsInvalid(geometry);
                    }

                    return false;
                });
        });
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

        this._initializeMap();
    }

    _initializeMap() {
        this._map = new VlCustomMap({
            actions: [],
            disableEscapeKey: this.disableEscapeKey,
            disableRotation: this.disableRotation,
            disableMouseWheelZoom: this.disableMouseWheelZoom,
            disableKeyboard: this.disableKeyboard,
            hideScale: this.hideScale,
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
        if (this.autoShiftControls) {
            this._startControlShiftTracking();
        }
    }

    disconnectedCallback(): void {
        if (this.observer) {
            this.observer.disconnect();
        }
        this._stopControlShiftTracking();
        this.map?.setTarget(null);
    }

    _autoShiftControlsChangedCallback(_oldValue: string, newValue: string) {
        if (!this.isConnected || !this._map) {
            return;
        }

        if (newValue != undefined) {
            this._startControlShiftTracking();
        } else {
            this._stopControlShiftTracking();
        }
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
                // Een action kan aan meerdere layers gekoppeld zijn; baseer (de)activatie op
                // de zichtbaarheid van al die layers, niet op de ene layer die net wijzigde.
                const hasVisibleLayer = action.hasVisibleLayer();
                if (hasVisibleLayer) {
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
                    actionControl.get('element').setDisabled(!hasVisibleLayer);
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
        // Lambert 78
        proj4.defs(
            'EPSG:31370',
            '+proj=lcc +lat_1=51.16666723333333 +lat_2=49.8333339 +lat_0=90 +lon_0=4.367486666666666 +x_0=150000.013 +y_0=5400088.438 +ellps=intl +towgs84=-106.869,52.2978,-103.724,0.3366,-0.457,1.8422,-1.2747 +units=m +no_defs'
        );
        // Lambert 2008
        proj4.defs(
            'EPSG:3812',
            '+proj=lcc +lat_0=50.797815 +lon_0=4.35921583333333 +lat_1=49.8333333333333 +lat_2=51.1666666666667 +x_0=649328 +y_0=665262 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs'
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

    private _startControlShiftTracking(): void {
        if (this.sideSheetObserver) {
            return;
        }

        this.sideSheetResizeObserver = new ResizeObserver(() => this._scheduleControlShiftUpdate());
        this.controlClassObserver = new MutationObserver(() => this._scheduleControlShiftUpdate());
        this.sideSheetObserver = new MutationObserver(() => this._scheduleControlShiftUpdate());
        this.sideSheetObserver.observe(this, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: [
                'open',
                'left',
                'right',
                'hide-toggle-button',
                'toggle-text',
                'scale-position',
                'placement',
            ],
        });
        // controls zoals de overzichtskaart worden pas later en in de shadow DOM toegevoegd
        this.controlsListenerKeys = this._map
            .getControls()
            .on(['add', 'remove'], () => this._scheduleControlShiftUpdate());

        this._scheduleControlShiftUpdate();
    }

    private _stopControlShiftTracking(): void {
        this.sideSheetObserver?.disconnect();
        this.sideSheetResizeObserver?.disconnect();
        this.controlClassObserver?.disconnect();
        this.sideSheetObserver = undefined;
        this.sideSheetResizeObserver = undefined;
        this.controlClassObserver = undefined;
        this.resizeObservedElements.clear();
        this.classObservedElements.clear();
        this._setScrollTracking(false);

        if (this.controlsListenerKeys) {
            unByKey(this.controlsListenerKeys);
            this.controlsListenerKeys = undefined;
        }

        if (this.shiftRafId != undefined) {
            cancelAnimationFrame(this.shiftRafId);
            this.shiftRafId = undefined;
        }

        SHIFT_PROPERTIES.forEach((property) => this.style.removeProperty(property));
        SHIFTABLE_CHILDREN.forEach(({ tag, property }) =>
            this._ownElements<HTMLElement>(tag).forEach((child) => child.style.removeProperty(property))
        );
    }

    private _observeResizes(elements: Element[]): void {
        const resizeObserver = this.sideSheetResizeObserver;
        if (!resizeObserver) {
            return;
        }

        // enkel nieuwe elementen observeren: observe() meldt meteen een resize, wat anders een eindeloze lus geeft
        const current = new Set(elements);
        this.resizeObservedElements.forEach((element) => {
            if (!current.has(element)) {
                resizeObserver.unobserve(element);
                this.resizeObservedElements.delete(element);
            }
        });
        current.forEach((element) => {
            if (!this.resizeObservedElements.has(element)) {
                resizeObserver.observe(element);
                this.resizeObservedElements.add(element);
            }
        });
    }

    private _observeClassChanges(elements: Element[]): void {
        const classObserver = this.controlClassObserver;
        if (!classObserver) {
            return;
        }

        const unchanged =
            elements.length === this.classObservedElements.size &&
            elements.every((element) => this.classObservedElements.has(element));
        if (unchanged) {
            return;
        }

        classObserver.disconnect();
        this.classObservedElements = new Set(elements);
        elements.forEach((element) =>
            classObserver.observe(element, { attributes: true, attributeFilter: ['class', 'style'] })
        );
    }

    private _setScrollTracking(enabled: boolean): void {
        if (enabled === this.scrollTracking) {
            return;
        }

        this.scrollTracking = enabled;
        if (enabled) {
            window.addEventListener('scroll', this.scrollListener, { capture: true, passive: true });
        } else {
            window.removeEventListener('scroll', this.scrollListener, { capture: true });
        }
    }

    private _scheduleControlShiftUpdate(): void {
        if (this.shiftRafId != undefined) {
            return;
        }

        this.shiftRafId = requestAnimationFrame(() => {
            this.shiftRafId = undefined;
            this._recalculateControlShifts();
        });
    }

    private _ownElements<T extends Element>(selector: string): T[] {
        return Array.from(this.querySelectorAll<T>(selector)).filter((element) => {
            if (element.closest('vl-map') !== this) {
                return false;
            }
            const sideSheet = element.parentElement?.closest(SIDE_SHEET_SELECTOR);
            return !sideSheet || !this.contains(sideSheet);
        });
    }

    private _collectShiftTargets(): ShiftTarget[] {
        const targets: ShiftTarget[] = [];
        const mapElement = this._mapElement;

        if (mapElement) {
            SHIFTABLE_CONTROLS.forEach(({ selector, property }) => {
                const element = mapElement.querySelector<HTMLElement>(selector);
                if (element) {
                    targets.push({ element, host: this, property });
                }
            });
        }

        SHIFTABLE_CHILDREN.forEach(({ tag, selector, property, contentBox }) => {
            this._ownElements<HTMLElement>(tag).forEach((child) => {
                const element = child.shadowRoot?.querySelector<HTMLElement>(selector);
                if (element) {
                    targets.push({ element, host: child, property, contentBox });
                }
            });
        });

        return targets;
    }

    private _recalculateControlShifts(): void {
        const mapElement = this._mapElement;
        if (!this.autoShiftControls || !mapElement) {
            return;
        }

        const sideSheets = this._ownElements<VlSideSheet>(SIDE_SHEET_SELECTOR);
        const openSideSheets = sideSheets.filter((sideSheet) => sideSheet.hasAttribute('open'));
        const sideSheetIsModal = window.matchMedia(`screen and (max-width: ${vlMediaScreenSmall}px)`).matches;
        this._setScrollTracking(
            !sideSheetIsModal &&
                openSideSheets.some((sideSheet) => window.getComputedStyle(sideSheet).position === 'fixed')
        );

        const targets = this._collectShiftTargets();

        if (openSideSheets.length === 0 || sideSheetIsModal) {
            this._observeResizes([mapElement, ...sideSheets]);
            this._observeClassChanges([]);
            this._applyControlShifts(targets, new Map());
            return;
        }

        this._observeResizes([mapElement, ...sideSheets, ...targets.map(({ element }) => element)]);
        this._observeClassChanges(targets.map(({ element }) => element));

        if (targets.length === 0) {
            return;
        }

        const isVisible = (rect?: DOMRect): rect is DOMRect => !!rect && rect.width > 0 && rect.height > 0;
        const overlapsVertically = (a: DOMRect, b: DOMRect) => a.top < b.bottom && b.top < a.bottom;
        const overlapping = (rects: DOMRect[], rect: DOMRect) =>
            rects.filter((other) => overlapsVertically(rect, other));

        // de toggle button van een open side-sheet hangt naast het paneel en bedekt de kaart dus ook
        const leftSheetRects: DOMRect[] = [];
        const rightSheetRects: DOMRect[] = [];
        openSideSheets.forEach((sideSheet) => {
            const rect = sideSheet.getBoundingClientRect();
            if (rect.width === 0) {
                return;
            }
            const rects = [rect, sideSheet.toggleButtonRect].filter(isVisible);
            (sideSheet.hasAttribute('left') ? leftSheetRects : rightSheetRects).push(...rects);
        });
        const leftSheetEdge = (rect: DOMRect) =>
            Math.max(...overlapping(leftSheetRects, rect).map(({ right }) => right));
        const rightSheetEdge = (rect: DOMRect) =>
            Math.min(...overlapping(rightSheetRects, rect).map(({ left }) => left));

        const mapRect = mapElement.getBoundingClientRect();
        const mapCenter = mapRect.left + mapRect.width / 2;

        const currentShift = ({ host, property }: ShiftTarget) =>
            parseFloat(host.style.getPropertyValue(property)) || 0;
        const boxOf = ({ element, contentBox }: ShiftTarget) => {
            const rect = element.getBoundingClientRect();
            if (!contentBox) {
                return rect;
            }
            const style = window.getComputedStyle(element);
            const [top, right, bottom, left] = ['top', 'right', 'bottom', 'left'].map(
                (side) => parseFloat(style.getPropertyValue(`padding-${side}`)) || 0
            );
            return new DOMRect(rect.x + left, rect.y + top, rect.width - left - right, rect.height - top - bottom);
        };
        const measured = targets
            .filter(({ element }) => !element.classList.contains(HIDDEN_CONTROL_CLASS))
            .map((target) => {
                const rect = boxOf(target);
                const unshifted = new DOMRect(rect.x - currentShift(target), rect.y, rect.width, rect.height);
                return { ...target, rect: unshifted };
            })
            .filter(({ rect }) => isVisible(rect));
        const fixedObstacles = Array.from(mapElement.querySelectorAll<HTMLElement>(SHIFT_OBSTACLE_SELECTOR))
            .map((obstacle) => obstacle.getBoundingClientRect())
            .filter(isVisible);

        const leftAnchored = measured.filter(({ rect }) => rect.left + rect.width / 2 < mapCenter);
        const rightAnchored = measured.filter(({ rect }) => rect.left + rect.width / 2 >= mapCenter);

        const rowsOf = (items: MeasuredShiftTarget[]): MeasuredShiftTarget[][] => {
            let rows: MeasuredShiftTarget[][] = [];
            items.forEach((item) => {
                const touching = rows.filter((row) => row.some((other) => overlapsVertically(item.rect, other.rect)));
                rows = [...rows.filter((row) => !touching.includes(row)), [item, ...touching.flat()]];
            });
            return rows;
        };

        const shifts = new Map<HTMLElement, number>();

        rowsOf(leftAnchored).forEach((row) => {
            const covered = row
                .map(({ rect }) => ({ rect, edge: leftSheetEdge(rect) }))
                .filter(({ rect, edge }) => rect.left < edge);
            if (covered.length === 0) {
                return;
            }
            const needed = Math.max(...covered.map(({ rect, edge }) => edge + CONTROL_SHIFT_GAP - rect.left));
            const room = Math.min(
                ...row.map(({ rect }) => {
                    const obstacles = [
                        ...rightAnchored.map((obstacle) => obstacle.rect),
                        ...fixedObstacles.filter((obstacle) => obstacle.right > rect.left),
                    ].filter((obstacle) => overlapsVertically(rect, obstacle));
                    return Math.min(
                        mapRect.right - CONTROL_SHIFT_GAP - rect.right,
                        ...obstacles.map((obstacle) =>
                            obstacle.left >= rect.right ? obstacle.left - CONTROL_SHIFT_GAP - rect.right : -Infinity
                        )
                    );
                })
            );
            if (room >= needed) {
                row.forEach(({ element }) => shifts.set(element, Math.round(needed)));
            }
        });

        rowsOf(rightAnchored).forEach((row) => {
            const covered = row
                .map(({ rect }) => ({ rect, edge: rightSheetEdge(rect) }))
                .filter(({ rect, edge }) => rect.right > edge);
            if (covered.length === 0) {
                return;
            }
            const needed = Math.max(...covered.map(({ rect, edge }) => rect.right - (edge - CONTROL_SHIFT_GAP)));
            const room = Math.min(
                ...row.map(({ rect }) => {
                    const obstacles = [
                        ...leftAnchored.map((obstacle) => obstacle.rect),
                        ...fixedObstacles.filter((obstacle) => obstacle.left < rect.right),
                    ].filter((obstacle) => overlapsVertically(rect, obstacle));
                    return Math.min(
                        rect.left - (mapRect.left + CONTROL_SHIFT_GAP),
                        ...obstacles.map((obstacle) =>
                            obstacle.right <= rect.left ? rect.left - (obstacle.right + CONTROL_SHIFT_GAP) : -Infinity
                        )
                    );
                })
            );
            if (room >= needed) {
                row.forEach(({ element }) => shifts.set(element, Math.round(-needed)));
            }
        });

        this._applyControlShifts(targets, shifts);
    }

    private _applyControlShifts(targets: ShiftTarget[], shifts: Map<HTMLElement, number>): void {
        targets.forEach((target) => {
            const shift = shifts.get(target.element) ?? 0;
            const value = shift === 0 ? '' : `${shift}px`;
            if (target.host.style.getPropertyValue(target.property) === value) {
                return;
            }
            if (value) {
                target.host.style.setProperty(target.property, value);
            } else {
                target.host.style.removeProperty(target.property);
            }
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map': VlMap;
    }
}
