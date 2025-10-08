import BaseLayer from 'ol/layer/Base';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Draw from 'ol/interaction/Draw';
import Polygon from 'ol/geom/Polygon';
import LineString from 'ol/geom/LineString';
import { VlDrawAction } from './draw-action';
import { VlSnapInteraction } from '../snap/snap-interaction';
import Map from 'ol/Map';

describe('jest - map - draw-action', () => {
    const source = new VectorSource({ features: [] });
    const layer = new VectorLayer({ source });

    let callback;

    let addOverlay;
    let removeOverlay;

    beforeEach(() => {
        callback = jest.fn();
    });

    afterEach(() => {
        addOverlay = undefined;
        removeOverlay = undefined;
    });

    it('kan opties meegeven aan draw action', () => {
        const drawAction = new VlDrawAction(layer, 'LineString', callback, { maxPoints: 2 });
        const { options } = drawAction;
        expect(options.maxPoints).toBe(2);
        expect(options.source).toBe(source);
        expect(options.type).toBe('LineString');
        expect(drawAction.interactions.length).toBe(1);
        expect(drawAction.interactions[0] instanceof Draw).toBe(true);
    });

    it('kan snapping aanzetten via opties met als standaard snapping layer de draw action layer', () => {
        const options: any = {
            maxPoints: 2,
        };

        let drawAction = new VlDrawAction(layer, 'LineString', callback, options);
        expect(drawAction.interactions.find((interaction) => interaction instanceof VlSnapInteraction)).toBeUndefined();

        options.snapping = false;
        drawAction = new VlDrawAction(layer, 'LineString', callback, options);
        expect(drawAction.interactions.find((interaction) => interaction instanceof VlSnapInteraction)).toBeUndefined();

        options.snapping = true;
        drawAction = new VlDrawAction(layer, 'LineString', callback, options);
        expect(drawAction.interactions.length).toBe(2);
        expect(drawAction.interactions.find((interaction) => interaction instanceof VlSnapInteraction)).toBeDefined();

        const snappingSource = new VectorSource({ features: [] });
        const snappingLayer = new VectorLayer({ source: snappingSource });
        options.snapping = {
            layer: snappingLayer,
            pixelTolerance: 1000,
        };
        drawAction = new VlDrawAction(layer, 'LineString', callback, options);
        const snapInteraction: any = drawAction.interactions.find(
            (interaction) => interaction instanceof VlSnapInteraction
        );
        expect(snapInteraction.source_).toBe(snappingSource);
        expect(snapInteraction.pixelTolerance_).toBe(1000);
    });

    it('als er een snapping layer is wordt die toegevoegd en verwijderd bij het aan- en afzetten van de actie', () => {
        const snappingSource = new VectorSource({ features: [] });
        const snappingLayer = new VectorLayer({ source: snappingSource });
        const options = {
            snapping: {
                layer: snappingLayer,
                pixelTolerance: 1000,
            },
        };
        const drawAction = createDrawActionWithMap('Point', options);
        const addLayerStub = jest.spyOn(drawAction.map, 'addLayer').mockClear().mockImplementation();
        drawAction.activate();
        expect(drawAction.map.addLayer).toHaveBeenCalledWith(snappingLayer);
        const removeLayerStub = jest.spyOn(drawAction.map, 'removeLayer').mockClear().mockImplementation();
        drawAction.deactivate();
        expect(drawAction.map.removeLayer).toHaveBeenCalledWith(snappingLayer);

        addLayerStub.mockReset();
        removeLayerStub.mockReset();
    });

    it('roept de callback functie aan na het tekenen', () => {
        const drawAction = new VlDrawAction(layer, 'Polygon', callback);
        const sketchFeature = new Feature();

        drawAction.drawInteraction.dispatchEvent(<any>{
            type: 'drawend',
            feature: sketchFeature,
        });

        expect(callback).toHaveBeenCalledWith(sketchFeature, expect.anything());
    });

    it('kan na het tekenen de feature terug verwijderen via de cancel draw functie', () => {
        const callback = (feature, cancelDraw) => cancelDraw();
        const drawAction = new VlDrawAction(layer, 'Polygon', callback);
        const sketchFeature = new Feature({});

        drawAction.drawInteraction.dispatchEvent(<any>{
            type: 'drawend',
            feature: sketchFeature,
        });

        source.addFeature(sketchFeature);
        expect(source.getFeatures().length).toBe(0);
    });

    it('kan na het tekenen asynchroon de feature terug verwijderen via de cancel draw functie', () => {
        const callback = (feature, cancelDraw) => {
            source.addFeature(feature);
            cancelDraw();
        };
        const drawAction = new VlDrawAction(layer, 'Polygon', callback);
        const sketchFeature = new Feature({});

        drawAction.drawInteraction.dispatchEvent(<any>{
            type: 'drawend',
            feature: sketchFeature,
        });

        expect(source.getFeatures().length).toBe(0);
    });

    it('Als het tekenen gestart is en er met de muis verschoven wordt zal er een tooltip verschijnen als de optie measure op true staat', () => {
        const options = {
            measure: true,
        };
        let drawAction = createDrawActionWithMap('Polygon', options);
        let sketchFeature1 = new Feature({
            geometry: new Polygon([
                [
                    [0, 0],
                    [0, 1],
                    [1, 1],
                ],
            ]),
        });
        drawAction.drawInteraction.dispatchEvent(<any>{
            type: 'drawstart',
            feature: sketchFeature1,
        });
        expect(addOverlay).toHaveBeenCalled();
        let tooltip = addOverlay.mock.calls[0][0];
        expect(drawAction.tooltip).toBe(tooltip);
        let tooltipStub = jest.spyOn(drawAction.tooltip, 'setElement').mockClear().mockImplementation();
        drawAction.pointermove();
        expect(tooltipStub).toHaveBeenCalled();
        expect(tooltipStub.mock.calls[0][0].textContent).toBe('1.00 m');
        expect(tooltip.getOffset()).toEqual([-15, 10]);

        addOverlay.mockReset();

        drawAction = createDrawActionWithMap('LineString', options);
        const sketchFeature2 = new Feature({
            geometry: new LineString([
                [0, 0],
                [1, 1],
            ]),
        });
        drawAction.drawInteraction.dispatchEvent(<any>{
            type: 'drawstart',
            feature: sketchFeature2,
        });
        expect(addOverlay).toHaveBeenCalled();
        tooltip = addOverlay.mock.calls[0][0];
        expect(drawAction.tooltip).toBe(tooltip);
        tooltipStub = jest.spyOn(drawAction.tooltip, 'setElement').mockClear().mockImplementation();
        drawAction.pointermove();
        expect(tooltipStub).toHaveBeenCalled();
        expect(tooltipStub.mock.calls[0][0].textContent).toBe('1.41 m');
        expect(tooltip.getOffset()).toEqual([-15, 10]);

        tooltipStub.mockReset();
    });

    it('Als het tekenen gestart is en er met de muis verschoven wordt zal er een tooltip verschijnen als de optie measure een object is met de offset van de tooltip in', () => {
        const options = {
            measure: {
                tooltip: {
                    offset: [0, 0],
                },
            },
        };
        let drawAction = createDrawActionWithMap('Polygon', options);
        let sketchFeature: Feature<Polygon> = new Feature({
            geometry: new Polygon([
                [
                    [0, 0],
                    [0, 1],
                    [1, 1],
                ],
            ]),
        });
        drawAction.drawInteraction.dispatchEvent(<any>{
            type: 'drawstart',
            feature: sketchFeature,
        });
        expect(addOverlay).toHaveBeenCalled();
        let tooltip = addOverlay.mock.calls[0][0];
        expect(drawAction.tooltip).toBe(tooltip);
        let tooltipStub = jest.spyOn(drawAction.tooltip, 'setElement').mockClear().mockImplementation();
        drawAction.pointermove();
        expect(tooltipStub).toHaveBeenCalled();
        expect(tooltipStub.mock.calls[0][0].textContent).toBe('1.00 m');
        expect(tooltip.getOffset()).toEqual([0, 0]);

        addOverlay.mockReset();
        drawAction = createDrawActionWithMap('LineString', options);
        const sketchFeature2 = new Feature({
            geometry: new LineString([
                [0, 0],
                [1, 1],
            ]),
        });
        drawAction.drawInteraction.dispatchEvent(<any>{
            type: 'drawstart',
            feature: sketchFeature2,
        });
        expect(addOverlay).toHaveBeenCalled();
        tooltip = addOverlay.mock.calls[0][0];
        expect(drawAction.tooltip).toBe(tooltip);
        tooltipStub = jest.spyOn(drawAction.tooltip, 'setElement').mockClear().mockImplementation();
        drawAction.pointermove();
        expect(tooltipStub).toHaveBeenCalled();
        expect(tooltipStub.mock.calls[0][0].textContent).toBe('1.41 m');
        expect(tooltip.getOffset()).toEqual([0, 0]);

        tooltipStub.mockReset();
    });

    it('Als het tekenen gestart en er met de muis verschoven wordt zal er geen tooltip verschijnen als de optie measure op false staat', () => {
        const drawAction = createDrawActionWithMap('Polygon');
        const sketchFeature = new Feature({
            geometry: new Polygon([
                [
                    [0, 0],
                    [0, 1],
                    [1, 1],
                ],
            ]),
        });
        drawAction.drawInteraction.dispatchEvent(<any>{
            type: 'drawstart',
            feature: sketchFeature,
        });
        expect(addOverlay).not.toHaveBeenCalled();
    });

    it('Bij het stoppen worden de tooltips (en listener) verwijderd', () => {
        const options = {
            measure: true,
        };
        const drawAction = createDrawActionWithMap('Polygon', options);
        const sketchFeature = new Feature({
            geometry: new Polygon([
                [
                    [0, 0],
                    [0, 1],
                    [1, 1],
                    [0, 0],
                ],
            ]),
        });
        drawAction.drawInteraction.dispatchEvent(<any>{
            type: 'drawstart',
            feature: sketchFeature,
        });
        drawAction.drawInteraction.dispatchEvent(<any>{
            type: 'drawend',
            feature: sketchFeature,
        });
        expect(removeOverlay).toHaveBeenCalled();
    });

    it('Bij het deactiveren worden de tooltips en listener verwijderd', () => {
        const options = {
            measure: true,
        };
        const drawAction = createDrawActionWithMap('Polygon', options);
        const sketchFeature = new Feature({
            geometry: new Polygon([
                [
                    [0, 0],
                    [0, 1],
                    [1, 1],
                    [0, 0],
                ],
            ]),
        });
        drawAction.drawInteraction.dispatchEvent(<any>{
            type: 'drawstart',
            feature: sketchFeature,
        });
        drawAction.deactivate();
        expect(removeOverlay).toHaveBeenCalled();
    });

    const setMeasureSpies = () => {
        addOverlay = jest.fn();
        removeOverlay = jest.fn();
    };

    const createDrawActionWithMap = (type, options?) => {
        setMeasureSpies();
        const drawAction = new VlDrawAction(layer, type, callback, options);
        drawAction.map = <Map>{
            addOverlay,
            removeOverlay,
            on: (type, callback) => (drawAction[type] = callback),
            addLayer: (layer) => {},
            removeLayer: (layer) => <BaseLayer>{},
        };
        return drawAction;
    };
});
