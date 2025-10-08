import OlBaseEvent from 'ol/events/Event';
import { MapActionPayload, OlVectorLayerType } from '../../vl-map.model';
import { VlSelectAction } from './select-action';
import { never } from 'ol/events/condition';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import ResizeObserver from 'resize-observer-polyfill';

global.ResizeObserver = ResizeObserver;

describe('jest - map - select-action', () => {
    const createVlSelectAction = ({ layer = <OlVectorLayerType>{}, callback, options }: MapActionPayload) => {
        const action = new VlSelectAction(layer, callback, options);
        action.map = new Map({});
        return action;
    };

    it('kan de selectie en hover stijl definiëren', () => {
        const selectieStyle = new Style();
        const hoverStyle = new Style();
        const selectAction = createVlSelectAction({
            options: {
                style: selectieStyle,
                hoverStyle,
            },
        });
        expect(selectAction.style).toBe(selectieStyle);
        expect(selectAction.hoverStyle).toBe(hoverStyle);
    });

    it('zal terugvallen op de selectie stijl indien er geen hover stijl gedefinieerd is', () => {
        const style = new Style();
        const selectAction = createVlSelectAction({
            options: {
                style,
            },
        });
        expect(selectAction.hoverStyle).toBe(style);
    });

    it('kan de selectie en hover stijl niet bepalen als die niet gedefinieerd is', () => {
        const selectAction = createVlSelectAction({});
        expect(selectAction.style).toBeNull();
        expect(selectAction.hoverStyle).toBeNull();
    });

    it('kan features markeren en demarkeren', () => {
        const feature1 = new Feature();
        const feature2 = new Feature();
        feature1.setId(1);
        feature2.setId(2);
        const layer = {
            getSource: () => ({
                getFeatureById: (id) => (id == 1 ? feature1 : feature2),
            }),
        } as OlVectorLayerType;
        const selectAction = createVlSelectAction({ layer });
        selectAction.markFeatureWithId(1);
        expect(selectAction.isMarked(feature1)).toBe(true);
        expect(selectAction.markInteraction.getFeatures().getLength()).toBe(1);
        selectAction.markFeatureWithId(2);
        expect(selectAction.isMarked(feature2)).toBe(true);
        expect(selectAction.markInteraction.getFeatures().getLength()).toBe(2);
        selectAction.demarkAllFeatures();
        expect(selectAction.markInteraction.getFeatures().getLength()).toBe(0);
        expect(selectAction.isMarked(feature1)).toBe(false);
        expect(selectAction.isMarked(feature2)).toBe(false);
    });

    it('kan clusters markeren en demarkeren', () => {
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
        const selectAction = createVlSelectAction({ layer });
        selectAction.markFeatureWithId(1);
        expect(selectAction.isMarked(cluster1)).toBe(true);
        expect(selectAction.isMarked(cluster2)).toBe(false);
        expect(selectAction.markInteraction.getFeatures().getLength()).toBe(1);
        selectAction.markFeatureWithId(2);
        expect(selectAction.isMarked(cluster1)).toBe(true);
        expect(selectAction.isMarked(cluster2)).toBe(false);
        selectAction.demarkAllFeatures();
        expect(selectAction.isMarked(cluster1)).toBe(false);
        expect(selectAction.isMarked(cluster2)).toBe(false);
    });

    it('zal de onselect functie oproepen als een feature geselecteerd wordt', () => {
        const layer = {
            id: 'layer1',
            getSource: () => ({
                getFeatures: () => [feature],
            }),
        } as unknown as OlVectorLayerType;
        const onSelect = jest.fn();
        const feature = new Feature({ id: 1 });
        const selectAction = createVlSelectAction({ layer, callback: onSelect });
        selectAction.selectInteraction.getFeatures().push(feature);
        const event = { type: 'select' } as OlBaseEvent;
        selectAction.selectInteraction.dispatchEvent(event);
        expect(onSelect).toHaveBeenCalledTimes(1);
        const argsForCall = onSelect.mock.calls[0];
        expect(argsForCall.length).toBe(3);
        expect(argsForCall[0]).toBe(feature);
        expect(argsForCall[1].type).toBe('select');
        expect(argsForCall[2]).toBe(layer);
    });

    it('als er meer dan 1 feature geselecteerd is, zal er bij elke klik afwisselend de volgende geselecteerd worden', () => {
        const onSelect = jest.fn();
        const feature = new Feature({ id: 1 });
        const feature2 = new Feature({ id: 2 });
        const feature3 = new Feature({ id: 3 });
        const selectAction = createVlSelectAction({
            layer: [
                {
                    id: 'layer1',
                    getSource: () => ({
                        getFeatures: () => [feature, feature2, feature3],
                    }),
                },
            ] as unknown as OlVectorLayerType,
            callback: onSelect,
        });

        selectAction.selectInteraction.getFeatures().push(feature);
        selectAction.selectInteraction.getFeatures().push(feature2);
        selectAction.selectInteraction.getFeatures().push(feature3);

        // TODO: Zorg ervoor dat dispatchEvent een OL BaseEvent afvuurt, onderstaande manier behouden voor backwards-compatibility.
        selectAction.selectInteraction.dispatchEvent({ type: 'select' } as OlBaseEvent);
        expect(onSelect.mock.calls[0][0]).toBe(feature);
        selectAction.selectInteraction.dispatchEvent({ type: 'select' } as OlBaseEvent);
        expect(onSelect.mock.calls[1][0]).toBe(feature2);
        selectAction.selectInteraction.dispatchEvent({ type: 'select' } as OlBaseEvent);
        expect(onSelect.mock.calls[2][0]).toBe(feature3);
        selectAction.selectInteraction.dispatchEvent({ type: 'select' } as OlBaseEvent);
        expect(onSelect.mock.calls[3][0]).toBe(feature);
    });

    it('als er programmatorisch een feature geselecteerd wordt zal daarna bij een klik ook de volgende genomen worden', () => {
        const onSelect = jest.fn();
        const feature = new Feature({ id: 1 });
        const feature2 = new Feature({ id: 2 });
        const feature3 = new Feature({ id: 3 });
        const selectAction = createVlSelectAction({
            layer: [
                {
                    id: 'layer1',
                    getSource: () => ({
                        getFeatures: () => [feature, feature2, feature3],
                        getFeatureById: (id) => {
                            switch (id) {
                                case 1:
                                    return feature;
                                case 2:
                                    return feature2;
                                case 3:
                                    return feature3;
                                default:
                                    return undefined;
                            }
                        },
                    }),
                },
            ] as unknown as OlVectorLayerType,
            callback: onSelect,
        });

        selectAction.selectFeature(feature);
        selectAction.clearFeatures();

        selectAction.selectInteraction.getFeatures().push(feature2);
        selectAction.selectInteraction.dispatchEvent({ type: 'select' } as OlBaseEvent);
        selectAction.selectInteraction.getFeatures().push(feature3);
        selectAction.selectInteraction.dispatchEvent({ type: 'select' } as OlBaseEvent);

        expect(onSelect.mock.calls[0][0].get('id')).toBe(1);
        expect(onSelect.mock.calls[1][0].get('id')).toBe(2);
        expect(onSelect.mock.calls[2][0].get('id')).toBe(3);
    });

    it('als er gevraagd wordt om de laatst geselecteerde feature te vergeten wordt daarna bij een klik op meerdere terug de 1e genomen', () => {
        const onSelect = jest.fn();
        const feature = new Feature();
        const feature2 = new Feature();
        const feature3 = new Feature();
        feature.setId(1);
        feature2.setId(2);
        feature3.setId(3);
        const selectAction = createVlSelectAction({
            layer: {
                id: 'layer1',
                getSource: () => ({
                    getFeatures: () => [feature, feature2, feature3],
                    getFeatureById: (id) => {
                        switch (id) {
                            case 1:
                                return feature;
                            case 2:
                                return feature2;
                            case 3:
                                return feature3;
                            default:
                                return undefined;
                        }
                    },
                }),
            } as unknown as OlVectorLayerType,
            callback: onSelect,
        });

        selectAction.selectInteraction.getFeatures().push(feature);
        selectAction.selectInteraction.getFeatures().push(feature2);
        selectAction.selectInteraction.getFeatures().push(feature3);

        selectAction.selectInteraction.dispatchEvent({ type: 'select' } as OlBaseEvent);
        expect(onSelect.mock.calls[0][0]).toBe(feature);
        selectAction.selectInteraction.dispatchEvent({ type: 'select' } as OlBaseEvent);
        expect(onSelect.mock.calls[1][0]).toBe(feature2);
        selectAction.deselect();
        selectAction.selectInteraction.dispatchEvent({ type: 'select' } as OlBaseEvent);
        expect(onSelect.mock.calls[2][0]).toBe(feature);
    });

    it('zal de onselect functie oproepen met lege argumenten als er een select wordt gedaan niet op een feature', () => {
        const onSelect = jest.fn();
        const selectAction = createVlSelectAction({ layer: [{}] as unknown as OlVectorLayerType, callback: onSelect });
        selectAction.map = new Map({});
        selectAction.activate();
        selectAction.selectInteraction.dispatchEvent('select');
        expect(onSelect).toHaveBeenCalled();
    });

    it('zal bij een deactivate de selectie features clearen', () => {
        const selectAction = createVlSelectAction({ layer: [{}] as unknown as OlVectorLayerType });
        selectAction.map = new Map({});
        const feature = new Feature({ id: 1 });
        selectAction.selectInteraction.getFeatures().push(feature);
        selectAction.deactivate();
        expect(selectAction.selectInteraction.getFeatures().getLength()).toBe(0);
    });

    it('zal bij het filteren van de selectie eerst de selectie clearen, zodat dezelfde feature opnieuw kan gekozen worden', () => {
        const feature = new Feature();
        feature.setId(1);
        const layer = new VectorLayer({ source: new VectorSource({ features: [feature] }) });
        const selectAction = createVlSelectAction({ layer });
        selectAction.selectInteraction.getFeatures().push(feature);
        const filter = selectAction.selectInteractionFilter(feature);
        expect(filter).toBe(true);
        expect(selectAction.selectInteraction.getFeatures().getLength()).toBe(0);
    });

    it('zal bij het filteren van de hover de huidige selectie niet in rekening brengen', () => {
        const feature = new Feature();
        feature.setId(1);
        const layer = new VectorLayer({ source: new VectorSource({ features: [feature] }) });
        const selectAction = createVlSelectAction({ layer });
        selectAction.selectInteraction.getFeatures().push(feature);
        const filter = selectAction.hoverInteractionFilter(feature, layer);
        expect(filter).toBe(false);
    });

    it('kan gebruik maken van een feature filter', () => {
        const feature = new Feature();
        feature.setId(1);
        const featureWithId2 = new Feature();
        feature.setId(2);
        let filter: any = (feature) => feature.getId() == 1;
        const selectAction = createVlSelectAction({
            layer: [
                new VectorLayer({ source: new VectorSource({ features: [feature, featureWithId2] }) }),
            ] as unknown as OlVectorLayerType,
            options: {
                filter,
            },
        });
        selectAction.selectInteraction.getFeatures().push(featureWithId2);
        filter = selectAction.selectInteractionFilter(feature);
        expect(filter).toBe(false);
    });

    it('zal bij activatie de functie activeren om na het zoomen de selectie bij clustering goed te zetten', () => {
        const selectAction = createVlSelectAction({
            layer: [{}] as unknown as OlVectorLayerType,
            options: {
                cluster: true,
            },
        });
        selectAction.map = <Map>{
            on: <any>jest.fn(),
        };
        selectAction.activate();
        expect(selectAction.map.on).toHaveBeenCalledWith('moveend', selectAction._fixClusterBehaviorListener);
    });

    it('zal bij deactivate de functie deactiveren om na het zoomen de selectie bij clustering goed te zetten', () => {
        const selectAction = createVlSelectAction({
            layer: [{}] as unknown as OlVectorLayerType,
            options: {
                cluster: true,
            },
        });
        selectAction.map = <Map>{
            on: <any>jest.fn(),
            un: <any>jest.fn(),
        };
        selectAction.activate();
        selectAction.deactivate();
        expect(selectAction.map.un).toHaveBeenCalledWith('moveend', selectAction._fixClusterBehaviorListener);
    });

    it('zal na het zoomen de geselecteerde feature verplaatsen naar de markeer selecteer interactie om visuele problemen met geselecteerde feature en cluster te voorkomen', () => {
        const feature = new Feature();
        feature.setId(1);
        const layer = {
            id: 'layer1',
            getSource: () => ({
                getFeatures: () => [feature],
                getFeatureById: (id) => (id == 1 ? feature : null),
            }),
        } as unknown as OlVectorLayerType;
        const selectAction = createVlSelectAction({
            layer,
            options: {
                cluster: true,
            },
        });
        selectAction.activate();
        selectAction.selectInteraction.getFeatures().push(feature);
        expect(selectAction.selectInteraction.getFeatures().getLength()).toBe(1);
        expect(selectAction.markInteraction.getFeatures().getLength()).toBe(0);
        expect(selectAction.hoverInteraction.getFeatures().getLength()).toBe(0);
        const event = { type: 'select' } as OlBaseEvent;
        selectAction.selectInteraction.dispatchEvent(event);
        expect(selectAction.selectInteraction.getFeatures().getLength()).toBe(0);
        expect(selectAction.markInteraction.getFeatures().getLength()).toBe(1);
        expect(selectAction.hoverInteraction.getFeatures().getLength()).toBe(0);
        selectAction._fixClusterBehavior();
        expect(selectAction.selectInteraction.getFeatures().getLength()).toBe(0);
        expect(selectAction.markInteraction.getFeatures().getLength()).toBe(1);
        expect(selectAction.hoverInteraction.getFeatures().getLength()).toBe(0);
    });

    it('het markeren kan niet door een gebruiker worden getriggered', () => {
        const selectAction = createVlSelectAction({});
        expect(selectAction.markInteraction['condition_']).toBe(never);
    });
});
