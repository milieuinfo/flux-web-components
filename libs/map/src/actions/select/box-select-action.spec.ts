import { VlBoxSelectAction } from './box-select-action';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import { Extent } from 'ol/extent';
import ResizeObserver from 'resize-observer-polyfill';

declare var global;
global.ResizeObserver = ResizeObserver;

describe('jest - map - box-select-action', () => {
    const feature1 = new Feature({ id: 1 });
    const feature2 = new Feature({ id: 2 });
    const intersectingFeatures = [feature1, feature2];
    let callback;
    let stub;

    const createVlBoxSelectAction = (filter?: (feature) => boolean) => {
        callback = jest.fn();
        const action = new VlBoxSelectAction(
            {
                getSource: () => ({
                    getFeatures: () => [],
                    forEachFeatureIntersectingExtent: (extent, fn) => {
                        intersectingFeatures.forEach(fn);
                    },
                }),
            },
            callback,
            { filter }
        );
        stub = jest
            .spyOn(action.dragBoxInteraction, 'getGeometry')
            .mockClear()
            // @ts-ignore
            .mockReturnValue({
                getExtent: (extent?: Extent) => extent,
            });
        action.map = new Map({});
        return action;
    };

    afterAll(() => {
        stub.mockReset();
    });

    it('kan op actief gezet worden, zodat de selectie, hover en dragbox interacties op actief gezet worden', () => {
        const boxSelectAction = createVlBoxSelectAction();
        expect(boxSelectAction.hoverInteraction.getActive()).toBe(false);
        expect(boxSelectAction.selectInteraction.getActive()).toBe(false);
        expect(boxSelectAction.dragBoxInteraction.getActive()).toBe(false);

        boxSelectAction.activate();
        expect(boxSelectAction.hoverInteraction.getActive()).toBe(true);
        expect(boxSelectAction.selectInteraction.getActive()).toBe(true);
        expect(boxSelectAction.dragBoxInteraction.getActive()).toBe(true);
    });

    it('kan terug op deactief gezet worden, zodat de selectie, hover en dragbox interacties op deactief gezet worden', () => {
        const boxSelectAction = createVlBoxSelectAction();
        boxSelectAction.activate();
        boxSelectAction.deactivate();
        expect(boxSelectAction.hoverInteraction.getActive()).toBe(false);
        expect(boxSelectAction.selectInteraction.getActive()).toBe(false);
        expect(boxSelectAction.dragBoxInteraction.getActive()).toBe(false);
    });

    it('zal de callback functie nog niet gebeurd zijn na het actief maken van de box selectie', () => {
        const boxSelectAction = createVlBoxSelectAction();
        boxSelectAction.activate();
        expect(callback).not.toHaveBeenCalled();
    });

    it('zal bij het slepen van de box selectie, de features van de layer toevoegen aan de hover interactie', () => {
        const boxSelectAction = createVlBoxSelectAction();
        boxSelectAction.dragBoxInteraction.dispatchEvent('boxdrag');
        expect(boxSelectAction.hoverInteraction.getFeatures().getArray()).toEqual(
            expect.arrayContaining([feature1, feature2])
        );
    });

    it('zal bij het slepen van de box selectie, enkel de features van de layer toevoegen aan de hover interactie die voldoen aan de geconfigureerde filter', () => {
        const boxSelectAction = createVlBoxSelectAction((feature) => feature === feature1);
        boxSelectAction.dragBoxInteraction.dispatchEvent('boxdrag');
        expect(boxSelectAction.hoverInteraction.getFeatures().getArray()).toEqual(expect.arrayContaining([feature1]));
    });

    it('zal bij het einde van de box selectie als er geen features intersecten, geen callbcak functie oproepen', () => {
        const boxSelectAction = createVlBoxSelectAction();
        boxSelectAction.dragBoxInteraction.dispatchEvent('boxend');
        expect(callback).not.toHaveBeenCalled();
    });

    it('zal bij het einde van de box selectie, de features toegevoegd hebben aan de selectie interactie, en de callback functie oproepen van de interactie met de intersecting feature', () => {
        const boxSelectAction = createVlBoxSelectAction();
        boxSelectAction.dragBoxInteraction.dispatchEvent('boxdrag');
        boxSelectAction.dragBoxInteraction.dispatchEvent('boxend');
        expect(boxSelectAction.hoverInteraction.getFeatures().getArray()).toEqual(
            expect.arrayContaining([feature1, feature2])
        );
        expect(callback).toHaveBeenCalledWith([feature1, feature2]);
    });

    it('zal bij het maken van een selectie door een klik, de callback functie aanroepen van de interactie', () => {
        const boxSelectAction = createVlBoxSelectAction();
        const selectedFeature = new Feature();
        boxSelectAction.selectInteraction.getFeatures().push(selectedFeature);
        boxSelectAction.selectInteraction.dispatchEvent('select');
        expect(callback).toHaveBeenCalledWith([selectedFeature]);
    });
});
