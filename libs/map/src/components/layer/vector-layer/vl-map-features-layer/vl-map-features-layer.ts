import { webComponent } from '@domg-wc/common';
import OlGeoJSON from 'ol/format/GeoJSON';
import OlPoint from 'ol/geom/Point';
import OlClusterSource from 'ol/source/Cluster';
import OlVectorSource from 'ol/source/Vector';
import { VlMapVectorLayer } from '../vl-map-vector-layer';

@webComponent('vl-map-features-layer')
export class VlMapFeaturesLayer extends VlMapVectorLayer {
    static get _observedAttributes() {
        return VlMapVectorLayer._observedAttributes.concat(['auto-extent', 'features']);
    }

    private _geoJSON: OlGeoJSON;

    constructor() {
        super();
    }

    init() {
        this._geoJSON = new OlGeoJSON();
        this._source = this.__createSource();
        this._layer = this._createLayer();
    }

    async connectedCallback() {
        this.init();
        await super.connectedCallback();
        this._autoZoomToExtent();
    }

    /**
     * Geeft de OpenLayers features collectie van de kaartlaag terug.
     *
     * @return {object}
     */
    get features() {
        return this.__featuresSource ? this.__featuresSource.getFeatures() : this._featuresFromAttribute;
    }

    get _featuresFromAttribute() {
        const features = this.getAttribute('features');
        return features ? this.__readGeoJsonFeatures(features) : [];
    }

    /**
     * Zet de OpenLayers features collectie op de kaartlaag.
     *
     * @param {object} features
     */
    set features(features) {
        this.setAttribute('features', JSON.stringify(features));
    }

    get _autoExtent() {
        return this.getAttribute('auto-extent') != undefined;
    }

    get _autoExtentMaxZoom() {
        return this.getAttribute('auto-extent-max-zoom');
    }

    get cluster() {
        return this.getAttribute('cluster') != undefined;
    }

    get _clusterDistance() {
        return this.getAttribute('cluster-distance');
    }

    /**
     * Verwijdert de stijl van al de kaartlaag features.
     */
    removeFeaturesStyle() {
        if (this.__featuresSource && this.__featuresSource.getFeatures()) {
            this.__featuresSource.getFeatures().forEach((feature) => {
                feature.setStyle(null);
            });
        }
    }

    /**
     * Geeft de feature terug op basis van het id attribuut.
     *
     * @param {number} id
     * @return {Object}
     */
    getFeature(id) {
        if (this.__featuresSource && this.__featuresSource.getFeatures()) {
            return this.__featuresSource.getFeatures().filter((feature) => feature.getId() === id)[0];
        }
    }

    /**
     * Geeft de cluster terug op basis van het id attribuut.
     *
     * @param {number} id
     * @return {boolean}
     */
    getCluster(id) {
        if (this._layer) {
            return this._layer
                .getSource()
                .getFeatures()
                .filter((cluster) => {
                    const features = cluster.get('features');
                    if (features) {
                        return features.some((feature) => feature.getId() === id);
                    }
                    return false;
                })[0];
        }
    }

    /**
     * Zoom naar alle features in deze layer.
     *
     * @param {number} maxZoom - Hoe diep er maximaal ingezoomd mag worden.
     */
    async zoomToExtent(maxZoom) {
        if (this.mapElement && this.boundingBox) {
            this.mapElement.zoomTo(this.boundingBox, maxZoom);
        }
    }

    /**
     * Verwijdert alle features van de laag
     */
    clearFeatures() {
        if (this.__featuresSource) {
            this.__featuresSource.clear();
            this._featuresChanged();
        }
    }

    /**
     * Voegt een feature toe aan de kaartlaag via geojson
     *
     * @param {string} feature
     */
    addFeature(feature) {
        if (this.__featuresSource) {
            this.__featuresSource.addFeatures([this._geoJSON.readFeature(feature)]);
            this._featuresChanged();
        }
    }

    /**
     * Voegt een featurecollection toe aan de kaartlaag via geojson
     *
     * @param {string} featureCollection
     */
    addFeatureCollection(featureCollection) {
        if (this.__featuresSource) {
            this.__featuresSource.addFeatures(this._geoJSON.readFeatures(featureCollection));
            this._featuresChanged();
        }
    }

    _autoExtentChangedCallback() {
        this._autoZoomToExtent();
    }

    _featuresChangedCallback(oldValue, newValue) {
        if (newValue && this._layer) {
            this.__featuresSource.clear();
            this.__featuresSource.addFeatures(this.__readGeoJsonFeatures(newValue));
            this._featuresChanged();
        }
    }

    _featuresChanged() {
        this._autoZoomToExtent();
        this.rerender();
    }

    _autoZoomToExtent() {
        if (this._autoExtent) {
            this.zoomToExtent(this._autoExtentMaxZoom);
        }
    }

    get boundingBox() {
        if (this.__featuresSource && this.__featuresSource.getFeatures().length > 0) {
            return this.__featuresSource.getExtent();
        }
    }

    __createSource() {
        const source = new OlVectorSource({
            features: this.features,
        });
        return this.cluster ? this.__createClusterSource(source) : source;
    }

    __createClusterSource(source) {
        return new OlClusterSource({
            distance: this._clusterDistance,
            source,
            geometryFunction: (feature) => {
                const geometry = feature.getGeometry();
                if (geometry instanceof OlPoint) {
                    return geometry;
                }
                return this.__ignoreClustering();
            },
        });
    }

    get __featuresSource() {
        if (this.cluster && this.source) {
            return this.source.getSource();
        }
        return this.source;
    }

    __ignoreClustering() {
        return null;
    }

    __readGeoJsonFeatures(value) {
        return this._geoJSON.readFeatures(value);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-features-layer': VlMapFeaturesLayer;
    }
}
