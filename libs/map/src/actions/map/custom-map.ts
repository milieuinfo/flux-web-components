import Collection from 'ol/Collection';
import { OverviewMap, Rotate, ScaleLine, Zoom } from 'ol/control';
import { getCenter } from 'ol/extent';
import GeoJSON from 'ol/format/GeoJSON';
import BaseLayer from 'ol/layer/Base';
import LayerGroup from 'ol/layer/Group';
import { MapOptions } from 'ol/Map';
import Overlay from 'ol/Overlay';
import { Projection, transformExtent } from 'ol/proj';
import View from 'ol/View';
import { getGRBLayerExtent, getWGS84Code } from '../../utils/capabilities';
import { VlMapWithActions } from './map-with-actions';

/**
 * Dit is een versie van de VlMapWithActions die nog enkele extra functies bevat zoals het zoomen naar een bepaalde extent (of bounding box), het togglen van de layers, en alle functionaliteit omtrent een overzichtskaartje (ol.control.OverviewMap).
 * De view kan in het map opties object bij constructie worden meegegeven of een default view wordt aangemaakt op basis van de projectie.
 */
export class VlCustomMap extends VlMapWithActions {
    overviewMapControl: any;

    private projection: Projection;
    private view: any;
    private custom: any;
    private geoJSONFormat: GeoJSON;
    baseLayers: any;
    private maxZoomViewToExtent: any;
    private overviewMapLayers: any;

    constructor(
        options: MapOptions & {
            customLayers?: { baseLayerGroup: LayerGroup; overlayGroup: LayerGroup; overviewMapLayers?: BaseLayer[] };
            projection?: Projection;
            defaultZoom?: boolean;
            maxZoomViewToExtent?: number;
            custom?: any;
            controls?: any[];
            actions?: any[];
            disableEscapeKey?: boolean;
            disableRotation?: boolean;
            disableMouseWheelZoom?: boolean;
            disableKeyboard?: boolean;
        } = <any>{}
    ) {
        options.layers = [options.customLayers.baseLayerGroup, options.customLayers.overlayGroup];

        options.controls = [
            new Rotate(),
            new ScaleLine({
                minWidth: 128,
            }),
        ].concat(options.controls || []);

        options.view = new View({
            // default
            extent: options.projection.getExtent(),
            projection: options.projection,
            maxZoom: 16,
            minZoom: 2,
            center: getCenter(options.projection.getExtent()),
            zoom: 2,
            // overwrite default
            ...options.view,
        });

        super(options);

        if (options.defaultZoom === undefined || options.defaultZoom === true) {
            this.addControl(new Zoom());
        }

        this.projection = options.projection;
        this.view = options.view;

        this.geoJSONFormat = new GeoJSON({
            dataProjection: this.projection,
        });

        this.custom = options.custom || {};

        if (options.customLayers.overviewMapLayers && options.customLayers.overviewMapLayers.length > 0) {
            this.createOverviewMapControl(options);
        }

        this.baseLayers = options.customLayers.baseLayerGroup.getLayers().getArray();

        this.maxZoomViewToExtent = options.maxZoomViewToExtent || 16;
    }

    createOverviewMapControl(options) {
        const self = this;

        const toggleBaseLayer = (baseLayer?) => {
            const getNextLayerAfterVisibleLayer = (layers) => {
                let currentIndex = 0;
                self.baseLayers.forEach((layer, index) => {
                    if (layer.getVisible()) {
                        currentIndex = index;
                    }
                });
                return layers[currentIndex + 1 >= layers.length ? 0 : currentIndex + 1];
            };

            if (!baseLayer) {
                baseLayer = getNextLayerAfterVisibleLayer(self.baseLayers);
            }
            self.baseLayers.forEach((layer) => layer.setVisible(layer == baseLayer));
            const overviewMapLayers = self.overviewMapControl.getOverviewMap().getLayers().getArray();
            const nextVisibleOverviewMapLayer = getNextLayerAfterVisibleLayer(overviewMapLayers);
            overviewMapLayers.forEach((layer) => layer.setVisible(layer == nextVisibleOverviewMapLayer));
            self.render();
            self.overviewMapControl.getOverviewMap().render();
        };

        this.overviewMapLayers = options.customLayers.overviewMapLayers;
        this.overviewMapControl = new OverviewMap({
            layers: this.overviewMapLayers,
            collapsed: false,
            view: new View({
                projection: this.projection,
            }),
        });

        this.overviewMapControl.element.addEventListener('click', () => toggleBaseLayer(), false);

        this.custom.toggleBaseLayer = toggleBaseLayer;
    }

    addBaseLayerAndOverlayMapLayer(baseLayer, overlayMapLayer) {
        baseLayer.setVisible(this.baseLayers.length === 0);
        this.baseLayers.push(baseLayer);

        if (this.overviewMapControl) {
            this.overviewMapControl.getOverviewMap().getLayers().getArray().push(overlayMapLayer);
        } else {
            this.createOverviewMapControl({
                customLayers: {
                    overviewMapLayers: [overlayMapLayer],
                },
            });
        }
        overlayMapLayer.setVisible(this.overviewMapControl.getOverviewMap().getLayers().getArray().length === 2);
    }

    getBaseLayers() {
        const layerCollection: Collection<BaseLayer> = this.getLayerGroup().getLayers();
        const firstLayer: BaseLayer = layerCollection.getArray()[0];
        return (<any>firstLayer).getLayers().getArray();
    }

    getOverlayLayers() {
        return this._getOverlayLayersCollection().getArray();
    }

    _getOverlayLayersCollection(): Collection<BaseLayer> {
        const layerCollection: Collection<BaseLayer> = this.getLayerGroup().getLayers();
        const firstLayer: LayerGroup = <LayerGroup>layerCollection.getArray()[1];
        return firstLayer.getLayers();
    }

    addOverlayLayer(layer): void {
        this._getOverlayLayersCollection().push(layer);
    }

    removeOverlayLayer(layer: BaseLayer): void {
        this._getOverlayLayersCollection().remove(layer);
    }

    initializeView(boundingBox?, maxZoom?) {
        const lambertExtent = transformExtent(
            getGRBLayerExtent(),
            getWGS84Code(), // bron = WGS84
            this.projection.getCode() // doel = Belgische Lambert 72 of 2008
        );
        const view = this.getView();
        view.fit(lambertExtent, {
            size: this.getSize(),
        });

        this.zoomViewToExtent(this.getView(), boundingBox, maxZoom);
    }

    zoomToExtent(boundingBox, maxZoom) {
        this.zoomViewToExtent(this.getView(), boundingBox, maxZoom);
    }

    zoomViewToExtent(view, boundingBox, maxZoom) {
        if (boundingBox) {
            view.fit(boundingBox, { size: this.getSize() });
        }

        if (maxZoom || this.maxZoomViewToExtent) {
            if (view.getZoom() > (maxZoom || this.maxZoomViewToExtent)) {
                view.setZoom(maxZoom || this.maxZoomViewToExtent);
            }
        }
    }

    zoomToGeometry(geometry, maxZoom) {
        const geoJson = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry,
                },
            ],
        };
        this.zoomToExtent(this.geoJSONFormat.readFeatures(geoJson)[0].getGeometry().getExtent(), maxZoom);
    }

    showInfo(info, coordinate) {
        const close = document.createElement('div');
        close.setAttribute('class', 'close');
        // TODO investigate - "parentNode doesn't exist on currentTarget"
        close.onclick = () => event.currentTarget['parentNode'].remove();

        const element = document.createElement('div');
        element.innerHTML = `<span class='content'>${info}</span><div class='arrow'></div>`;
        element.setAttribute('class', 'info-tooltip');
        element.appendChild(close);

        const tooltip = new Overlay({
            offset: [0, -5],
            positioning: 'bottom-center',
            element,
        });

        this.addOverlay(tooltip);
        tooltip.setPosition(coordinate);
        element.parentNode['style'].position = 'fixed'; // because the overlay has absolute positioning and otherwise the left side panel could influence the overlay elements
    }
}
