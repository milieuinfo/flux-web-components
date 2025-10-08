import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Modify from 'ol/interaction/Modify';
import Select from 'ol/interaction/Select';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import { VlSnapInteraction } from '../snap/snap-interaction';
import { VlModifyAction } from './modify-action';
import ResizeObserver from 'resize-observer-polyfill';

global.ResizeObserver = ResizeObserver;

describe('jest - map - modify-action', () => {
    const source = new VectorSource();
    const layer = new VectorLayer({ source });
    const callback = jest.fn();
    const filter = () => {};

    it('roept de callback functie op nadat er een modify werd uitgevoerd', () => {
        const modifyAction = new VlModifyAction({}, callback);
        const feature = new Feature({
            geometry: new Point([0, 0]),
        });
        modifyAction.selectInteraction.getFeatures().push(feature);
        modifyAction.modifyInteraction.dispatchEvent(<any>{
            type: 'modifyend',
            features: [feature],
        });
        expect(callback).toHaveBeenCalledWith(feature, expect.anything());
    });

    it('na het deactiveren wordt de selectie verwijderd', () => {
        const modifyAction = new VlModifyAction({});
        modifyAction.map = new Map({});
        const feature = new Feature({
            geometry: new Point([0, 0]),
        });
        modifyAction.selectInteraction.getFeatures().push(feature);
        modifyAction.deactivate();
        expect(modifyAction.selectInteraction.getFeatures().getLength()).toBe(0);
    });

    it('de feature filter zal doorgegeven worden aan de select action', () => {
        const layers = {};
        const options = {
            filter,
        };
        const modifyAction = new VlModifyAction(layers, null, options);
        expect(modifyAction.filter).toBe(filter);
    });

    it('bevat standaard 4 interacties: select, modify, hover en mark interaction', () => {
        const modifyAction = new VlModifyAction(layer, callback, {});
        expect(modifyAction.interactions.length).toBe(4);
        expect(modifyAction.interactions.filter((interaction) => interaction instanceof Modify).length).toBe(1);
        expect(modifyAction.interactions.filter((interaction) => interaction instanceof Select).length).toBe(3);
    });

    it('kan snapping aanzetten via opties met als standaard snapping layer de modify action layer', () => {
        const options: any = {
            filter,
        };
        let modifyAction = new VlModifyAction(layer, callback, options);
        expect(modifyAction.interactions.length).toBe(4);
        expect(
            modifyAction.interactions.find((interaction) => interaction instanceof VlSnapInteraction)
        ).toBeUndefined();

        options.snapping = false;
        modifyAction = new VlModifyAction(layer, callback, options);
        expect(modifyAction.interactions.length).toBe(4);
        expect(
            modifyAction.interactions.find((interaction) => interaction instanceof VlSnapInteraction)
        ).toBeUndefined();

        options.snapping = true;
        modifyAction = new VlModifyAction(layer, callback, options);
        expect(modifyAction.interactions.length).toBe(5);
        expect(modifyAction.interactions.find((interaction) => interaction instanceof VlSnapInteraction)).toBeDefined();
        expect(
            modifyAction.interactions.find(
                (interaction: VlSnapInteraction) => interaction instanceof VlSnapInteraction
            )['source_']
        ).toBe(source);

        const snappingSource = new VectorSource({ features: [] });
        const snappingLayer = new VectorLayer({ source: snappingSource });
        options.snapping = {
            layer: snappingLayer,
            pixelTolerance: 1000,
        };
        modifyAction = new VlModifyAction(layer, callback, options);
        expect(modifyAction.interactions.length).toBe(5);
        const snapInteraction = modifyAction.interactions.find(
            (interaction) => interaction instanceof VlSnapInteraction
        );
        expect(snapInteraction['source_']).toBe(snappingSource);
        expect(snapInteraction['pixelTolerance_']).toBe(1000);
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
        const modifyAction = createModifyActionWithMap(options);
        const addLayerStub = jest.spyOn(modifyAction.map, 'addLayer').mockClear().mockImplementation();
        modifyAction.activate();
        expect(modifyAction.map.addLayer).toHaveBeenCalledWith(snappingLayer);
        const removeLayerStub = jest.spyOn(modifyAction.map, 'removeLayer').mockClear().mockImplementation();
        modifyAction.deactivate();
        expect(modifyAction.map.removeLayer).toHaveBeenCalledWith(snappingLayer);

        addLayerStub.mockReset();
        removeLayerStub.mockReset();
    });

    const createModifyActionWithMap = (options) => {
        const modifyAction = new VlModifyAction(layer, callback, options);
        modifyAction.map = <any>{
            addLayer: () => {},
            removeLayer: () => {},
        };
        return modifyAction;
    };
});
