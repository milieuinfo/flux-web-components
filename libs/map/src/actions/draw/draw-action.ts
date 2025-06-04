import { EventsKey } from 'ol/events';
import { LineString, Polygon } from 'ol/geom';
import Draw from 'ol/interaction/Draw';
import { unByKey } from 'ol/Observable';
import Overlay from 'ol/Overlay';
import { Circle, Fill, Stroke, Style } from 'ol/style';
import { VlBaseMapAction } from '../mapaction';
import { VlSnapInteraction } from '../snap/snap-interaction';
import { Type } from 'ol/geom/Geometry';

export class VlDrawAction extends VlBaseMapAction {
    tooltip: Overlay;
    protected measurePointermoveHandler: EventsKey;
    drawInteraction: Draw;

    constructor(layer: any, type: Type, onDraw, _options: { style?: any; maxPoints?: number } = {}) {
        const interactions = [];

        const style = new Style({
            fill:
                _options.style?.getFill() ||
                new Fill({
                    color: 'rgba(2, 85, 204, 0.8)',
                }),
            stroke:
                _options.style?.getStroke() ||
                new Stroke({
                    color: 'rgba(2, 85, 204, 1)',
                    width: 1,
                }),
            image:
                _options.style?.getImage() ||
                new Circle({
                    radius: 4,
                    stroke: new Stroke({
                        color: 'rgba(2, 85, 204, 1)',
                        width: 1,
                    }),
                    fill: new Fill({
                        color: 'rgba(2, 85, 204, 0.8)',
                    }),
                }),
        });

        const options: any = {
            ..._options,
            source: layer.getSource(),
            type,
            style,
        };

        const drawInteraction = new Draw(options);

        interactions.push(drawInteraction);

        if (options.snapping !== undefined) {
            switch (typeof options.snapping) {
                case 'boolean':
                    if (options.snapping) {
                        interactions.push(new VlSnapInteraction(layer.getSource()));
                    }
                    break;
                case 'object':
                    if (options.snapping.layer) {
                        interactions.push(new VlSnapInteraction(options.snapping.layer.getSource(), options.snapping));
                    } else {
                        interactions.push(new VlSnapInteraction(layer.getSource(), options.snapping));
                    }
                    break;
                default:
                    break;
            }
        }

        drawInteraction.on('drawstart', (event) => {
            if (options.measure) {
                const { feature } = event;

                options.measure = typeof options.measure === 'object' ? options.measure : {};
                options.measure.tooltip = options.measure.tooltip || {};

                const tooltipElement = document.createElement('div');
                tooltipElement.setAttribute('class', 'measure-tooltip');

                this.tooltip = new Overlay({
                    offset: options.measure.tooltip.offset || [-15, 10],
                    positioning: 'bottom-center',
                });

                this.map.addOverlay(this.tooltip);

                this.measurePointermoveHandler = this.map.on('pointermove', () => {
                    this._showMeasureTooltip(feature, tooltipElement);
                });
            }
        });

        drawInteraction.on('drawend', (event) => {
            const { feature } = event;

            onDraw(feature, () => {
                if (layer.getSource().hasFeature(feature)) {
                    layer.getSource().removeFeature(feature);
                } else {
                    // When the features was not yet added to the source we'll add a listener
                    const listener = layer.getSource().on('addfeature', (e) => {
                        layer.getSource().removeFeature(e.feature);
                        unByKey(listener);
                    });
                }
            });
            this._cleanUp();
        });

        super(interactions);

        this.options = options;
        this.drawInteraction = drawInteraction;

        this.layer = layer;
    }

    activate() {
        if (this.options.snapping && this.options.snapping.layer) {
            this.map.addLayer(this.options.snapping.layer);
        }
        super.activate();
    }

    deactivate() {
        this._cleanUp();
        if (this.options.snapping && this.options.snapping.layer) {
            this.map.removeLayer(this.options.snapping.layer);
        }
        super.deactivate();
    }

    _cleanUp() {
        if (this.options.measure) {
            unByKey(this.measurePointermoveHandler);
            this._removeTooltip();
        }
    }

    _removeTooltip() {
        if (this.tooltip) {
            this.map.removeOverlay(this.tooltip);
            this.tooltip = undefined;
        }
    }

    _showMeasureTooltip(feature, tooltipElement) {
        if (this.tooltip) {
            const length = this._getLengthOfLastSegment(feature.getGeometry());
            if (length !== 0) {
                tooltipElement.textContent = `${length} m`;
                this.tooltip.setElement(tooltipElement);
                this.tooltip.setPosition(feature.getGeometry().getLastCoordinate());
            }
        }
    }

    _getLengthOfLastSegment(geometry) {
        if (geometry && geometry instanceof LineString) {
            return new LineString(this._getCoordinatesOfLastSegment(geometry)).getLength().toFixed(2);
        }
        if (geometry && geometry instanceof Polygon) {
            return new LineString(this._getCoordinatesOfLastSegment(geometry.getLinearRing(0))).getLength().toFixed(2);
        }
        return 0;
    }

    _getCoordinatesOfLastSegment(geometry) {
        const size = geometry.getCoordinates().length;
        return geometry.getCoordinates().slice(size - 2);
    }

    stop() {
        this.drawInteraction.abortDrawing();
    }

    pointermove() {}
}
