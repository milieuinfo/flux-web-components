import { VlHighlightAction } from './highlight-action';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';

describe('jest - map - highlight-action', () => {
    it('kan de highlight stijl definiëren', () => {
        const style = new Style();
        const highlightAction = new VlHighlightAction(
            {},
            {
                style,
            }
        );
        expect(highlightAction.highlightInteraction.getStyle()).toBe(style);
    });

    it('kan features highlighten en dehighlighten', () => {
        const feature1 = new Feature();
        const feature2 = new Feature();
        feature1.setId(1);
        feature2.setId(2);
        const highlightAction = new VlHighlightAction({
            getSource: () => ({
                getFeatureById: (id) => (id == 1 ? feature1 : feature2),
            }),
        });

        highlightAction.highlightFeatureWithId(1);
        expect(highlightAction.isHighlighted(feature1)).toBe(true);
        expect(highlightAction.highlightInteraction.getFeatures().getLength()).toBe(1);
        highlightAction.highlightFeatureWithId(2);
        expect(highlightAction.isHighlighted(feature2)).toBe(true);
        expect(highlightAction.highlightInteraction.getFeatures().getLength()).toBe(2);
        highlightAction.dehighlightAllFeatures();
        expect(highlightAction.highlightInteraction.getFeatures().getLength()).toBe(0);
        expect(highlightAction.isHighlighted(feature1)).toBe(false);
        expect(highlightAction.isHighlighted(feature2)).toBe(false);
    });

    it('kan clusters highlighten en dehighlighten', () => {
        const feature1 = new Feature();
        feature1.setId(1);
        const feature2 = new Feature();
        feature2.setId(2);
        const feature3 = new Feature();
        feature3.setId(3);
        const cluster1 = new Feature();
        const cluster2 = new Feature();
        cluster1.set('features', [feature1, feature2]);
        cluster2.set('features', [feature3]);
        const layer = new VectorLayer({
            source: new VectorSource({
                features: [cluster1, cluster2],
            }),
        });
        const highlightAction = new VlHighlightAction(layer);
        highlightAction.highlightFeatureWithId(1);
        expect(highlightAction.isHighlighted(cluster1)).toBe(true);
        expect(highlightAction.isHighlighted(cluster2)).toBe(false);
        expect(highlightAction.highlightInteraction.getFeatures().getLength()).toBe(1);
        highlightAction.highlightFeatureWithId(2);
        expect(highlightAction.isHighlighted(cluster1)).toBe(true);
        expect(highlightAction.isHighlighted(cluster2)).toBe(false);
        highlightAction.dehighlightAllFeatures();
        expect(highlightAction.isHighlighted(cluster1)).toBe(false);
        expect(highlightAction.isHighlighted(cluster2)).toBe(false);
    });

    it('kan de highlight stijl niet bepalen als die niet gedefinieerd is', () => {
        const highlightAction = new VlHighlightAction({});
        expect(highlightAction.style).toBeUndefined();
    });

    it('zal bij een deactivate de highlight features clearen', () => {
        const highlightAction = new VlHighlightAction({});
        const feature = new Feature({ id: 1 });
        highlightAction.highlightInteraction.getFeatures().push(feature);
        highlightAction.deactivate();
        expect(highlightAction.highlightInteraction.getFeatures().getLength()).toBe(0);
    });
});
