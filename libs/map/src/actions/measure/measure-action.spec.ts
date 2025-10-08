import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import { VlMeasureAction } from './measure-action';

describe('jest - map - measure-action', () => {
    let measureAction;
    let layer;
    let addOverlay;
    let removeOverlay;
    let source;

    const objectIsEmpty = (object) => Object.keys(object).length === 0;

    beforeEach(() => {
        source = new VectorSource({ features: [] });
        layer = new VectorLayer({ source });
        measureAction = new VlMeasureAction(layer);
        addOverlay = jest.fn();
        removeOverlay = jest.fn();
        measureAction.map = {
            addOverlay,
            removeOverlay,
            on: () => {},
        };
    });

    it('passes the snapping configuration to the draw action', () => {
        const snappingLayer = jest.fn();
        const snapping = {
            layer: snappingLayer,
        };

        const action = new VlMeasureAction(layer, snapping);
        expect(action.options.layer).toEqual(snappingLayer);
    });

    it('when the drawing is started and the mouse is moved, a tooltip will appear', () => {
        measureAction.activate();

        const sketchFeature = new Feature({
            geometry: new LineString([
                [0, 0],
                [1, 1],
            ]),
        });

        measureAction.drawInteraction.dispatchEvent({
            type: 'drawstart',
            feature: sketchFeature,
        });

        expect(addOverlay).toHaveBeenCalled();
    });

    it('when the drawing is started, the tooltips will not be closable', () => {
        measureAction._setMeasurementTooltipsClosable = jest.fn();

        measureAction.activate();

        const sketchFeature = new Feature({
            geometry: new LineString([
                [0, 0],
                [1, 1],
            ]),
        });

        measureAction.drawInteraction.dispatchEvent({
            type: 'drawstart',
            feature: sketchFeature,
        });

        expect(measureAction._setMeasurementTooltipsClosable).toHaveBeenCalledWith(false);

        measureAction.drawInteraction.dispatchEvent({
            type: 'drawend',
            feature: sketchFeature,
        });

        expect(measureAction._setMeasurementTooltipsClosable).toHaveBeenCalledWith(true);
    });

    it('upon deactivation, the tooltips will be closable again', () => {
        measureAction._setMeasurementTooltipsClosable = jest.fn();

        measureAction.activate();

        const sketchFeature = new Feature({
            geometry: new LineString([
                [0, 0],
                [1, 1],
            ]),
        });

        measureAction.drawInteraction.dispatchEvent({
            type: 'drawstart',
            feature: sketchFeature,
        });

        expect(measureAction._setMeasurementTooltipsClosable).toHaveBeenCalledWith(false);

        measureAction.deactivate();

        expect(measureAction._setMeasurementTooltipsClosable).toHaveBeenCalledWith(true);
    });

    it('upon stop, the tooltips will be closable again', () => {
        measureAction._setMeasurementTooltipsClosable = jest.fn();

        measureAction.activate();

        const sketchFeature = new Feature({
            geometry: new LineString([
                [0, 0],
                [1, 1],
            ]),
        });

        measureAction.drawInteraction.dispatchEvent({
            type: 'drawstart',
            feature: sketchFeature,
        });

        expect(measureAction._setMeasurementTooltipsClosable).toHaveBeenCalledWith(false);

        measureAction.stop();

        expect(measureAction._setMeasurementTooltipsClosable).toHaveBeenCalledWith(true);
    });

    it('when the visibility of the layer changes, the tooltips will be shown or hidden accordingly', () => {
        measureAction._setMeasurementTooltipsVisible = jest.fn();

        measureAction.activate();

        const sketchFeature = new Feature({
            id: 1,
            geometry: new LineString([
                [0, 0],
                [1, 1],
            ]),
        });

        measureAction.drawInteraction.dispatchEvent({
            type: 'drawstart',
            feature: sketchFeature,
        });
        measureAction.drawInteraction.dispatchEvent({
            type: 'drawend',
            feature: sketchFeature,
        });

        expect(addOverlay).toHaveBeenCalled();
        const tooltip = measureAction.getTooltipFor(sketchFeature.getId());
        expect(tooltip).toBeDefined();
        expect(measureAction.measurementTooltips.length === 1).toBe(true);

        measureAction.handleLayerVisibilityChange();

        expect(measureAction._setMeasurementTooltipsVisible).toHaveBeenCalledWith(true);

        measureAction.layer.setVisible(false);
        measureAction.handleLayerVisibilityChange();

        expect(measureAction._setMeasurementTooltipsVisible).toHaveBeenCalledWith(false);
    });

    it('upon deactivation, the listeners are discarded', () => {
        measureAction.activate();

        expect(objectIsEmpty(measureAction.drawStartHandler)).toBe(false);
        expect(objectIsEmpty(measureAction.drawEndHandler)).toBe(false);
        expect(objectIsEmpty(measureAction.removeFeatureHandler)).toBe(false);

        const sketchFeature = new Feature({
            geometry: new LineString([
                [0, 0],
                [1, 1],
            ]),
        });

        measureAction.drawInteraction.dispatchEvent({
            type: 'drawstart',
            feature: sketchFeature,
        });
        measureAction.drawInteraction.dispatchEvent({
            type: 'drawend',
            feature: sketchFeature,
        });

        source.addFeature(sketchFeature);
        measureAction.deactivate();

        expect(objectIsEmpty(measureAction.drawStartHandler)).toBe(true);
        expect(objectIsEmpty(measureAction.drawEndHandler)).toBe(true);
        expect(objectIsEmpty(measureAction.removeFeatureHandler)).toBe(true);
    });

    it('when deactivated, the tooltips of features that were not yet fully drawn are removed from the map', () => {
        measureAction.activate();

        const sketchFeature = new Feature({
            geometry: new LineString([
                [0, 0],
                [1, 1],
            ]),
        });

        measureAction.drawInteraction.dispatchEvent({
            type: 'drawstart',
            feature: sketchFeature,
        });
        measureAction.drawInteraction.dispatchEvent({
            type: 'drawend',
            feature: sketchFeature,
        });

        const tooltip = measureAction.getTooltipFor(sketchFeature.getId());
        expect(measureAction.measurementTooltips.length === 1).toBe(true);

        measureAction.deactivate();
        expect(removeOverlay).toHaveBeenCalledWith(tooltip);
        expect(measureAction.measurementTooltips.length === 0).toBe(true);
    });

    it('when a feature is removed from the layer, the associated tooltip will also be removed', () => {
        measureAction.activate();

        const sketchFeature = new Feature({
            id: 1,
            geometry: new LineString([
                [0, 0],
                [1, 1],
            ]),
        });

        measureAction.drawInteraction.dispatchEvent({
            type: 'drawstart',
            feature: sketchFeature,
        });
        measureAction.drawInteraction.dispatchEvent({
            type: 'drawend',
            feature: sketchFeature,
        });

        expect(addOverlay).toHaveBeenCalled();
        const tooltip = measureAction.getTooltipFor(sketchFeature.getId());
        expect(tooltip).toBeDefined();
        expect(measureAction.measurementTooltips.length === 1).toBe(true);

        source.dispatchEvent({ type: 'removefeature', feature: sketchFeature });
        expect(removeOverlay).toHaveBeenCalledWith(tooltip);
        expect(measureAction.measurementTooltips.length === 0).toBe(true);
    });
});
