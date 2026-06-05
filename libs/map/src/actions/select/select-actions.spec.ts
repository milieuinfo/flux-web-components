import OlVectorLayer from 'ol/layer/Vector';
import OlVectorSource from 'ol/source/Vector';
import OlFeature from 'ol/Feature';
import { VlSelectActions } from './select-actions';
import { OlVectorLayerType } from '../../vl-map.model';
import { Style as OlStyle } from 'ol/style';

describe('jest - map - select-actions', () => {
    it('is een select action', () => {
        const selectActions = new VlSelectActions([{}] as OlVectorLayerType[], null, {});
        expect(selectActions instanceof VlSelectActions).toBe(true);
    });

    it('bevat de layers', () => {
        const feature1 = new OlFeature();
        const feature2 = new OlFeature();
        const layer1 = new OlVectorLayer({
            source: new OlVectorSource({
                features: [feature1],
            }),
        });
        const layer2 = new OlVectorLayer({
            source: new OlVectorSource({
                features: [feature2],
            }),
        });
        const selectActions = new VlSelectActions([layer1, layer2]);
        expect(selectActions.layers).toEqual([layer1, layer2]);
    });

    it('kan een custom filter bevatten', () => {
        const layer1 = new OlVectorLayer({
            source: new OlVectorSource({
                features: [new OlFeature()],
            }),
        });
        const onSelect = jest.fn();
        const filter = jest.fn();
        const options = {
            filter,
        };
        const feature = jest.fn() as unknown as OlFeature;
        const selectActions = new VlSelectActions([layer1], onSelect, options);
        selectActions.filter(feature, layer1);
        expect(filter).toHaveBeenCalledWith(feature, layer1);
    });

    it('zal terugvallen op de selectie stijl indien er geen hover stijl gedefinieerd is', () => {
        const style = () => new OlStyle();
        const feature = new OlFeature();
        const layer = new OlVectorLayer({
            source: new OlVectorSource({
                features: [feature],
            }),
        });
        const selectActions = new VlSelectActions([layer], null, { style });
        expect(selectActions.hoverStyle).toEqual(style);
    });

    it('kan de selectie en hover stijl niet bepalen als die niet gedefinieerd is', () => {
        const feature = new OlFeature();
        const layer = new OlVectorLayer({
            source: new OlVectorSource({
                features: [feature],
            }),
        });

        const selectActions = new VlSelectActions([layer]);
        expect(selectActions.style).toBeNull();
        expect(selectActions.hoverStyle).toBeNull();
    });

    it('kan features markeren en demarkeren', () => {
        const feature1 = new OlFeature();
        const feature2 = new OlFeature();
        const feature3 = new OlFeature();
        const layer1 = new OlVectorLayer({
            source: new OlVectorSource({
                features: [feature1, feature2],
            }),
        });
        const layer2 = new OlVectorLayer({
            source: new OlVectorSource({
                features: [feature3],
            }),
        });
        const selectActions = new VlSelectActions([layer1, layer2]);

        feature1.setId(1);
        feature2.setId(2);
        feature3.setId(3);

        selectActions.markFeatureWithId(1, layer1);
        expect(selectActions.isMarked(feature1)).toBe(true);
        expect(selectActions.markInteraction.getFeatures().getLength()).toBe(1);
        selectActions.markFeatureWithId(2, layer1);
        expect(selectActions.isMarked(feature2)).toBe(true);
        expect(selectActions.markInteraction.getFeatures().getLength()).toBe(2);
        selectActions.markFeatureWithId(3, layer2);
        expect(selectActions.isMarked(feature3)).toBe(true);
        expect(selectActions.markInteraction.getFeatures().getLength()).toBe(3);
        selectActions.demarkAllFeatures();
        expect(selectActions.markInteraction.getFeatures().getLength()).toBe(0);
        expect(selectActions.isMarked(feature1)).toBe(false);
        expect(selectActions.isMarked(feature2)).toBe(false);
    });

    it('is van toepassing op elk van zijn gekoppelde layers', () => {
        const layer1 = new OlVectorLayer({ source: new OlVectorSource() });
        const layer2 = new OlVectorLayer({ source: new OlVectorSource() });
        const otherLayer = new OlVectorLayer({ source: new OlVectorSource() });
        const selectActions = new VlSelectActions([layer1, layer2] as OlVectorLayerType[]);
        expect(selectActions.appliesToLayer(layer1 as OlVectorLayerType)).toBe(true);
        expect(selectActions.appliesToLayer(layer2 as OlVectorLayerType)).toBe(true);
        expect(selectActions.appliesToLayer(otherLayer as OlVectorLayerType)).toBe(false);
    });

    it('blijft een zichtbare layer hebben zolang minstens één gekoppelde layer zichtbaar is', () => {
        const layer1 = new OlVectorLayer({ source: new OlVectorSource() });
        const layer2 = new OlVectorLayer({ source: new OlVectorSource() });
        const selectActions = new VlSelectActions([layer1, layer2] as OlVectorLayerType[]);
        layer1.setVisible(true);
        layer2.setVisible(false);
        expect(selectActions.hasVisibleLayer()).toBe(true);
        layer1.setVisible(false);
        expect(selectActions.hasVisibleLayer()).toBe(false);
        layer2.setVisible(true);
        expect(selectActions.hasVisibleLayer()).toBe(true);
    });

    it('kan clusters markeren en demarkeren', () => {
        const feature1 = new OlFeature();
        const feature2 = new OlFeature();
        const feature3 = new OlFeature();
        const feature4 = new OlFeature();
        const cluster1 = new OlFeature();
        const cluster2 = new OlFeature();
        const cluster3 = new OlFeature();
        const layer1 = new OlVectorLayer({
            source: new OlVectorSource({
                features: [cluster1, cluster2],
            }),
        });
        const layer2 = new OlVectorLayer({
            source: new OlVectorSource({
                features: [cluster3],
            }),
        });
        const selectActions = new VlSelectActions([layer1, layer2]);

        feature1.setId(1);
        feature2.setId(2);
        feature3.setId(3);
        feature4.setId(4);
        cluster1.set('features', [feature1, feature2]);
        cluster2.set('features', [feature3]);
        cluster3.set('features', [feature4]);

        selectActions.markFeatureWithId(1, layer1);
        expect(selectActions.isMarked(cluster1)).toBe(true);
        expect(selectActions.isMarked(cluster2)).toBe(false);
        expect(selectActions.isMarked(cluster3)).toBe(false);
        expect(selectActions.markInteraction.getFeatures().getLength()).toBe(1);
        selectActions.markFeatureWithId(2, layer1);
        expect(selectActions.isMarked(cluster1)).toBe(true);
        expect(selectActions.isMarked(cluster2)).toBe(false);
        expect(selectActions.isMarked(cluster3)).toBe(false);
        selectActions.markFeatureWithId(4, layer2);
        expect(selectActions.isMarked(cluster1)).toBe(true);
        expect(selectActions.isMarked(cluster2)).toBe(false);
        expect(selectActions.isMarked(cluster3)).toBe(true);
        selectActions.demarkAllFeatures();
        expect(selectActions.isMarked(cluster1)).toBe(false);
        expect(selectActions.isMarked(cluster2)).toBe(false);
        expect(selectActions.isMarked(cluster3)).toBe(false);
    });
});
