import Feature from 'ol/Feature';
import { VlTranslateAction } from './translate-action';

describe('jest - map - translate-action', () => {
    it('roept de callback functie op nadat er een translate werd uitgevoerd en cleart ook de selectie interactie', () => {
        const callback = jest.fn();
        const translateAction = new VlTranslateAction({}, callback);
        const feature = new Feature();
        translateAction.selectInteraction.getFeatures().push(feature);
        translateAction.translateInteraction.dispatchEvent(<any>{
            type: 'translateend',
            features: [feature],
        });
        expect(callback).toHaveBeenCalledWith(feature, expect.anything());
        expect(translateAction.selectInteraction.getFeatures().getLength()).toBe(0);
    });

    it('na het deactiveren wordt de selectie verwijderd', () => {
        const translateAction = new VlTranslateAction({});
        const feature = new Feature();
        translateAction.selectInteraction.getFeatures().push(feature);
        translateAction.deactivate();
        expect(translateAction.selectInteraction.getFeatures().getLength()).toBe(0);
    });

    it('bij de Translate interaction constructor moet ook de laag meegegeven worden zodat na het selecteren steeds de feature op de laag verplaatst zal worden en geen features op een andere laag', () => {
        const layer = { id: 'layer1' };
        const translateAction = new VlTranslateAction(layer, {});
        expect(translateAction.translateOptions.layers.length).toBe(1);
        expect(translateAction.translateOptions.layers[0]).toEqual(layer);
    });
});
