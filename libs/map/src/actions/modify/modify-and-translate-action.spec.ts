import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { VlModifyAndTranslateAction } from './modify-and-translate-action';
import { VlSnapInteraction } from '../snap/snap-interaction';

describe('jest - map - modify-and-translate-action', () => {
    const source = new VectorSource();
    const layer = new VectorLayer({ source });

    it('roept de callback functie op nadat er een translate werd uitgevoerd en cleart ook de selectie interactie', () => {
        const callback = jest.fn();
        const modifyAndTranslateAction = new VlModifyAndTranslateAction({}, callback);
        const feature = new Feature({ geometry: new Point([0, 0]) });
        modifyAndTranslateAction.selectInteraction.getFeatures().push(feature);
        modifyAndTranslateAction.translateInteraction.dispatchEvent(<any>{
            type: 'translateend',
            features: [feature],
        });
        expect(callback).toHaveBeenCalledWith(feature, expect.anything());
        expect(modifyAndTranslateAction.selectInteraction.getFeatures().getLength()).toBe(0);
    });

    it('kan snapping aanzetten via opties door de modify action correct aan te roepen', () => {
        const options = {
            snapping: true,
        };
        const action = new VlModifyAndTranslateAction(layer, jest.fn(), options);
        expect(action.interactions.find((interaction) => interaction instanceof VlSnapInteraction)).toBeDefined();
    });
});
