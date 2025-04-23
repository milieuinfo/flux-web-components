import { EventsKey } from 'ol/events';
import Overlay from 'ol/Overlay';
import { unByKey } from 'ol/Observable';
import { VlDrawAction } from '../draw/draw-action';

export class VlMeasureAction extends VlDrawAction {
    private featureCounter: number;
    private measurementTooltips: any[];
    private drawStartHandler: EventsKey;
    private drawEndHandler: EventsKey;
    private removeFeatureHandler: any;
    constructor(layer, options?) {
        super(
            layer,
            'LineString',
            () => {
                unByKey(this.measurePointermoveHandler);
            },
            { ...options, maxPoints: 2, geometryName: 'measurement' }
        );

        this.featureCounter = 0;
        this.measurementTooltips = [];
    }

    activate() {
        this.drawStartHandler = this.drawInteraction.on('drawstart', (event) => {
            this._handleDrawStart(event);
        });

        this.drawEndHandler = this.drawInteraction.on('drawend', () => {
            this._setMeasurementTooltipsClosable(true);
        });

        this.removeFeatureHandler = this.layer.getSource().on('removefeature', (event) => {
            this._handleRemoveFeature(event);
        });

        super.activate();
    }

    _setMeasurementTooltipsClosable(closable) {
        this.measurementTooltips.forEach((tooltip) => {
            const closableAttribute = 'closable';
            const tooltipElement = tooltip.getElement();

            // Check if tooltip still exists
            if (tooltip && tooltipElement) {
                if (closable) {
                    tooltipElement.setAttribute(closableAttribute, closable);
                } else {
                    tooltipElement.removeAttribute(closableAttribute);
                }
            }
        });
    }

    _setMeasurementTooltipsVisible(visible) {
        this.measurementTooltips.forEach((tooltip) => {
            const hiddenAttribute = 'hidden';
            const tooltipElement = tooltip.getElement();

            // Check if tooltip still exists
            if (tooltip && tooltipElement) {
                if (visible) {
                    tooltipElement.removeAttribute(hiddenAttribute);
                } else {
                    tooltipElement.setAttribute(hiddenAttribute, true);
                }
            }
        });
    }

    _showMeasurementTooltip(feature, tooltipOverlay, tooltipElement) {
        const length = feature.getGeometry().getLength().toFixed(2);
        tooltipElement.textContent = `${length} m`;
        tooltipOverlay.setElement(tooltipElement);
        tooltipOverlay.setPosition(feature.getGeometry().getLastCoordinate());
    }

    _handleDrawStart({ feature }) {
        // Add measurement line (feature) and tooltip (overlay)

        const featureId = this.featureCounter;
        this.featureCounter += 1;

        this._setMeasurementTooltipsClosable(false); // Hide close buttons on tooltips while drawing

        feature.setId(featureId);

        const tooltipElement = document.createElement('vl-pill');
        tooltipElement['isInMap'] = true;

        tooltipElement.addEventListener(
            'close',
            (closePillEvent) => {
                this._handleRemoveMeasurement(closePillEvent, feature);
            },
            { once: true }
        );

        const tooltipOverlay = new Overlay({
            offset: [0, 40],
            positioning: 'bottom-center',
            stopEvent: true,
            insertFirst: true,
        });

        tooltipOverlay.set('featureId', featureId);

        // TODO: use one central map overlay array iso seperate measurementTooltips array
        this.map.addOverlay(tooltipOverlay);
        this.measurementTooltips = [...this.measurementTooltips, tooltipOverlay];

        this.measurePointermoveHandler = this.map.on('pointermove', () => {
            this._showMeasurementTooltip(feature, tooltipOverlay, tooltipElement);
        });
    }

    _removeMeasureFeature(feature) {
        const source = this.layer.getSource();
        if (feature && (feature.getId() == null || source.getFeatureById(feature.getId()) === feature)) {
            source.removeFeature(feature);
            this.map.render();
        }
    }

    _removeMeasurementTooltip(featureId) {
        const tooltip = this.getTooltipFor(featureId);
        this.map.removeOverlay(tooltip);
        this.measurementTooltips = this.measurementTooltips.filter(
            (measurementTooltip) => this._getFeatureIdFor(measurementTooltip) !== featureId
        );
    }

    _handleRemoveMeasurement(event, feature) {
        event.stopPropagation();

        // TODO: use one central map overlay array iso seperate measurementTooltips array
        this._removeMeasurementTooltip(feature.getId());
        this._removeMeasureFeature(feature);
    }

    _handleRemoveFeature(event) {
        this._removeMeasurementTooltip(event.feature.getId());
    }

    // @ts-ignore
    _cleanUp(removeUnlinkedTooltips) {
        unByKey(this.measurePointermoveHandler);

        if (removeUnlinkedTooltips) {
            // When deactivated (layer gets deactivated or measure drawing gets interrupted) the tooltips that are not linked to a feature need to be removed
            this.measurementTooltips.forEach((tooltip) => {
                const featureId = this._getFeatureIdFor(tooltip);
                if (this.layer.getSource().getFeatureById(featureId) == null) {
                    this._removeMeasurementTooltip(featureId);
                }
            });
        }
    }

    getTooltipFor(featureId) {
        return this.measurementTooltips.find((tooltip) => this._getFeatureIdFor(tooltip) === featureId);
    }

    _getFeatureIdFor(tooltip) {
        return tooltip.get('featureId');
    }

    handleLayerVisibilityChange() {
        this._setMeasurementTooltipsVisible(this.layer.getVisible());
    }

    deactivate() {
        this._setMeasurementTooltipsClosable(true);

        this._cleanUp(true);

        unByKey(this.drawStartHandler);
        unByKey(this.drawEndHandler);
        unByKey(this.removeFeatureHandler);

        super.deactivate();
    }

    stop() {
        super.stop();
        this._setMeasurementTooltipsClosable(true);
        this._cleanUp(true);
    }
}
