import Map from 'ol/Map';
import Style from 'ol/style/Style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import { MapActionPayload, OlVectorLayerType } from '../../vl-map.model';
import { VlDeleteAction } from './delete-action';
import ResizeObserver from 'resize-observer-polyfill';

global.ResizeObserver = ResizeObserver;

describe('delete action', () => {
    const createVlDeleteAction = ({ layer = <OlVectorLayerType>{}, callback, options }: MapActionPayload) => {
        const action = new VlDeleteAction(layer, callback, options);
        action.map = new Map({});
        action.map.render = jest.fn();
        return action;
    };

    it('indien er geen delete stijl gedefinieerd is zal de standaard stijl gebruikt worden', () => {
        const deleteAction = createVlDeleteAction({ layer: {} as OlVectorLayerType });
        expect(deleteAction.style).toBeDefined();
    });

    it('de delete stijl kan bepaald worden', () => {
        const style = new Style();
        const deleteAction = createVlDeleteAction({ options: { style } });
        expect(deleteAction.style).toBe(style);
    });

    it('bij het oproepen van de callback zal na een success de selectie weggehaald worden', () => {
        const feature = new Feature();
        feature.setId(1);
        const layer = new VectorLayer({ source: new VectorSource({ features: [feature] }) });
        const callback = (features, success, cancel) => success(feature);
        const deleteAction = createVlDeleteAction({ layer, callback });
        deleteAction.selectInteraction.getFeatures().push(feature);
        deleteAction.selectInteraction.dispatchEvent('select');
        expect(deleteAction.selectInteraction.getFeatures().getLength()).toBe(0);
        expect(deleteAction.map.render).toHaveBeenCalled();
    });

    it('gaat niet fout bij feature zonder id', () => {
        const feature = new Feature();
        const layer = new VectorLayer({ source: new VectorSource({ features: [feature] }) });
        const callback = (features, success, cancel) => success(feature);
        const deleteAction = createVlDeleteAction({ layer, callback });
        deleteAction.selectInteraction.getFeatures().push(feature);
        deleteAction.selectInteraction.dispatchEvent('select');
        expect(deleteAction.selectInteraction.getFeatures().getLength()).toBe(0);
        expect(deleteAction.map.render).toHaveBeenCalled();
    });

    it('als aan de callback andere feature met zelfde id dan feature in de kaart wordt meegegeven wordt die niet gedeletet', () => {
        const feature = new Feature();
        feature.setId(1);
        const andereFeature = new Feature();
        andereFeature.setId(1);
        const layer = new VectorLayer({ source: new VectorSource({ features: [feature] }) });
        const callback = (features, success, cancel) => success(andereFeature);
        const deleteAction = createVlDeleteAction({ layer, callback });
        deleteAction.selectInteraction.getFeatures().push(feature);
        deleteAction.selectInteraction.dispatchEvent('select');
        expect(layer.getSource().getFeatures().length).toBe(1);
        expect(layer.getSource().getFeatures()[0]).toBe(feature);
    });

    it('bij het oproepen van de callback zal na een cancel de selectie weggehaald worden', () => {
        const feature = new Feature();
        feature.setId(1);
        const layer = new VectorLayer({ source: new VectorSource({ features: [feature] }) });
        const callback = (features, success, cancel) => cancel();
        const deleteAction = createVlDeleteAction({ layer, callback });
        deleteAction.selectInteraction.getFeatures().push(feature);
        deleteAction.selectInteraction.dispatchEvent('select');
        expect(deleteAction.selectInteraction.getFeatures().getLength()).toBe(0);
        expect(deleteAction.map.render).toHaveBeenCalled();
    });

    it('bij het oproepen van de callback zal na de success de geselecteerde feature(s) weggehaald worden', () => {
        const feature = new Feature();
        feature.setId(1);
        const layer = new VectorLayer({ source: new VectorSource({ features: [feature] }) });
        const callback = (features, success, cancel) => success(feature);
        const deleteAction = createVlDeleteAction({ layer, callback });
        deleteAction.selectInteraction.getFeatures().push(feature);
        deleteAction.selectInteraction.dispatchEvent('select');
        expect(layer.getSource().getFeatures().length).toBe(0);
        expect(deleteAction.map.render).toHaveBeenCalled();
    });

    it('bij het oproepen van de callback zal na een cancel de geselecteerde feature(s) niet weggehaald worden', () => {
        const feature = new Feature();
        feature.setId(1);
        const layer = new VectorLayer({ source: new VectorSource({ features: [feature] }) });
        const callback = (features, success, cancel) => cancel();
        const deleteAction = createVlDeleteAction({ layer, callback });
        deleteAction.selectInteraction.getFeatures().push(feature);
        deleteAction.selectInteraction.dispatchEvent('select');
        expect(layer.getSource().getFeatures().length).toBe(1);
        expect(deleteAction.map.render).toHaveBeenCalled();
    });

    it('als er geen callback is meegegeven kunnen worden de features onmiddellijk verwijderd', () => {
        const feature = new Feature();
        feature.setId(1);
        const layer = new VectorLayer({ source: new VectorSource({ features: [feature] }) });
        const deleteAction = createVlDeleteAction({ layer });
        deleteAction.selectInteraction.getFeatures().push(feature);
        deleteAction.selectInteraction.dispatchEvent('select');
        expect(layer.getSource().getFeatures().length).toBe(0);
        expect(deleteAction.selectInteraction.getFeatures().getLength()).toBe(0);
        expect(deleteAction.map.render).toHaveBeenCalled();
    });

    it('zal bij het einde van de box selectie, de features toegevoegd hebben aan de selectie interactie, en de callback functie oproepen van de interactie met de intersecting feature', () => {
        const feature = new Feature();
        feature.setId(1);
        const layer = {
            getSource: () => ({
                getFeatures: () => [],
                forEachFeatureIntersectingExtent: (extent, fn) => fn(feature),
                getFeatureById: () => feature,
                removeFeature: () => {},
            }),
        } as unknown as OlVectorLayerType;

        const deleteAction = createVlDeleteAction({ layer });
        const stub = jest
            .spyOn(deleteAction.dragBoxInteraction, 'getGeometry')
            .mockClear()
            // @ts-ignore
            .mockReturnValue({
                getExtent: () => {},
            });
        deleteAction.dragBoxInteraction.dispatchEvent('boxdrag');
        deleteAction.dragBoxInteraction.dispatchEvent('boxend');
        expect(deleteAction.map.render).toHaveBeenCalled();

        stub.mockReset();
    });

    it('de feature filter zal doorgegeven worden aan de select action', () => {
        const layers = {};
        const filter = () => {};
        const options = {
            filter,
        };
        const action = new VlDeleteAction(layers, null, options);
        expect(action.filter).toBe(filter);
    });
});
