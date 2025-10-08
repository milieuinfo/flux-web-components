import { Group, Tile, Vector } from 'ol/layer';
import Projection from 'ol/proj/Projection';
import { Vector as VectorSource } from 'ol/source';
import { VlCustomMap } from './custom-map';
import ResizeObserver from 'resize-observer-polyfill';

global.ResizeObserver = ResizeObserver;

describe('jest - map - custom-map', () => {
    let map;

    const layers = [
        new Tile({
            visible: true,
        }),
        new Tile({
            visible: false,
        }),
    ];

    const overviewMapLayers = [
        new Tile({
            visible: false,
        }),
        new Tile({
            visible: true,
        }),
    ];

    const overlayLayer = new Vector({ source: new VectorSource() });

    const merge = (a, b) => {
        for (const element in b) {
            if (b.hasOwnProperty(element)) {
                a[element] = b[element];
            }
        }
    };

    const createMap = (options = {}) => {
        const defaultOptions = {
            actions: [],
            customLayers: {
                baseLayerGroup: new Group({
                    layers: layers,
                }),
                overviewMapLayers: overviewMapLayers,
                overlayGroup: new Group({
                    layers: [overlayLayer],
                }),
            },
            projection: new Projection({
                code: 'EPSG:31370',
                extent: [9928.0, 66928.0, 272072.0, 329072.0],
            }),
        };

        if (options) {
            merge(defaultOptions, options);
        }

        const map = new VlCustomMap(defaultOptions);
        map.addControl = jest.fn();
        map.getSize = () => {
            return [1200, 800];
        };
        return map;
    };

    const createMapZonderLayers = () => {
        const defaultOptions = {
            actions: [],
            customLayers: {
                baseLayerGroup: new Group({
                    layers: [],
                }),
                overviewMapLayers: [],
                overlayGroup: new Group({
                    layers: [],
                }),
            },
            projection: new Projection({
                code: 'EPSG:31370',
                extent: [9928.0, 66928.0, 272072.0, 329072.0],
            }),
        };

        const map = new VlCustomMap(defaultOptions);
        map.addControl = jest.fn();
        return map;
    };

    const createBaseLayer = (visibility) => {
        return new Tile({
            visible: visibility,
        });
    };

    const createVisibleBaseLayer = () => {
        return createBaseLayer(true);
    };

    const createInvisibleBaseLayer = () => {
        return createBaseLayer(false);
    };

    beforeEach(() => {
        map = createMap();
    });

    it('kan de base layers teruggeven', () => {
        expect(map.getBaseLayers().length).toBe(2);
        expect(map.getBaseLayers()).toEqual(layers);
    });

    it('kan de overlay layers teruggeven', () => {
        expect(map.getOverlayLayers().length).toBe(1);
    });

    it('kan zoomen naar een puntgeometrie, zodat er sterk is ingezoomd (hoge zoom waarde)', () => {
        expect(map.getView().getZoom()).toBe(2);

        map.zoomToGeometry({
            type: 'Point',
            coordinates: [100000, 100000],
        });

        expect(map.getView().getZoom()).toBe(16);
    });

    it('kan zoomen naar een geometrie tot maximaal aan het gedefinieerde zoom niveau via de map declaratie optie of de methode argumenten', () => {
        const max = 10;

        map.zoomToGeometry({ type: 'Point', coordinates: [100000, 100000] });
        expect(map.getView().getZoom()).toBe(16);

        map.zoomToGeometry({ type: 'Point', coordinates: [100000, 100000] }, max);
        expect(map.getView().getZoom()).toBe(max);

        map = createMap({ maxZoomViewToExtent: 5 });
        map.zoomToGeometry({ type: 'Point', coordinates: [100000, 100000] }, max);
        expect(map.getView().getZoom()).toBe(max);

        map = createMap({ maxZoomViewToExtent: 5 });
        map.zoomToGeometry({ type: 'Point', coordinates: [100000, 100000] });
        expect(map.getView().getZoom()).toBe(5);
    });

    it('kan met de show info functie een popover tonen op de kaart', () => {
        map.showInfo('Test', [0, 0]);
        const overlays = map.getOverlays();
        const array = overlays.getArray();

        expect(overlays.getLength()).toBe(1);
        expect(array.length).toBe(1);

        const overlay = array[0];
        const element =
            '<div class="info-tooltip"><span class="content">Test</span><div class="arrow"></div><div class="close"></div></div>';
        expect(overlay?.getElement()?.outerHTML).toBe(element);
    });

    it('Als er geen overviewMapLayers zijn, zal er geen overviewMapControl aangemaakt worden.', () => {
        const map = createMapZonderLayers();
        expect(map.overviewMapControl).toBeUndefined();
    });

    it('Wanneer de eerste overviewMapLayer wordt toegevoegd, wordt een overviewMapControl aangemaakt.', () => {
        const map = createMapZonderLayers();
        const baseLayer = createVisibleBaseLayer();
        const overviewMapLayer = createInvisibleBaseLayer();

        expect(map.overviewMapControl).toBeUndefined();
        map.addBaseLayerAndOverlayMapLayer(baseLayer, overviewMapLayer);
        expect(map.overviewMapControl).toBeDefined();
        expect(map.getBaseLayers().length).toBe(1);
        expect(map.getBaseLayers()[0]).toBe(baseLayer);
        expect(map.overviewMapControl?.getOverviewMap().getLayers().getArray().length).toBe(1);
        expect(map.overviewMapControl?.getOverviewMap().getLayers().getArray()[0]).toBe(overviewMapLayer);
    });

    it('Er kunnen meerdere base layers en overlayMapLayers toegevoegd worden aan de map ', () => {
        map = createMapZonderLayers();

        const baseLayer = createVisibleBaseLayer();
        const overviewMapLayer = createInvisibleBaseLayer();

        expect(map.overviewMapControl).toBeUndefined();
        map.addBaseLayerAndOverlayMapLayer(baseLayer, overviewMapLayer);
        map.addBaseLayerAndOverlayMapLayer(baseLayer, overviewMapLayer);

        expect(map.getBaseLayers().length).toBe(2);
        expect(map.getBaseLayers()[0]).toBe(baseLayer);
        expect(map.getBaseLayers()[1]).toBe(baseLayer);
        expect(map.overviewMapControl?.getOverviewMap().getLayers().getArray().length).toBe(2);
        expect(map.overviewMapControl?.getOverviewMap().getLayers().getArray()[0]).toBe(overviewMapLayer);
        expect(map.overviewMapControl?.getOverviewMap().getLayers().getArray()[1]).toBe(overviewMapLayer);
    });

    it('Enkel de eerste toegevoegde baselayer is visible en enkel de 2e toegevoegde overlaymaplayer is visible', () => {
        map = createMapZonderLayers();

        for (let layerNr = 0; layerNr < 3; layerNr++) {
            map.addBaseLayerAndOverlayMapLayer(createInvisibleBaseLayer(), createInvisibleBaseLayer());
        }

        expect(map.getBaseLayers()[0].getVisible()).toBe(true);
        expect(map.getBaseLayers()[1].getVisible()).toBe(false);
        expect(map.getBaseLayers()[2].getVisible()).toBe(false);

        expect(map.overviewMapControl?.getOverviewMap().getLayers().getArray()[0].getVisible()).toBe(false);
        expect(map.overviewMapControl?.getOverviewMap().getLayers().getArray()[1].getVisible()).toBe(true);
        expect(map.overviewMapControl?.getOverviewMap().getLayers().getArray()[2].getVisible()).toBe(false);
    });

    it('Na een klik is de volgende toegevoegde baselayer visible', () => {
        map = createMapZonderLayers();

        for (let layerNr = 0; layerNr < 3; layerNr++) {
            map.addBaseLayerAndOverlayMapLayer(createInvisibleBaseLayer(), createInvisibleBaseLayer());
        }

        const overlayElement = map.overviewMapControl.element;
        const overviewMap = map.overviewMapControl?.getOverviewMap();

        const mapRenderFn = jest.spyOn(map, 'render').mockClear().mockImplementation();
        const overviewMapRenderFn = jest.spyOn(overviewMap, 'render').mockClear().mockImplementation();

        overlayElement.click();
        expect(map.getBaseLayers()[0].getVisible()).toBe(false);
        expect(map.getBaseLayers()[1].getVisible()).toBe(true);
        expect(map.getBaseLayers()[2].getVisible()).toBe(false);
        expect(map.overviewMapControl?.getOverviewMap().getLayers().getArray()[0].getVisible()).toBe(false);
        expect(map.overviewMapControl?.getOverviewMap().getLayers().getArray()[1].getVisible()).toBe(false);
        expect(map.overviewMapControl?.getOverviewMap().getLayers().getArray()[2].getVisible()).toBe(true);
        expect(map.render).toHaveBeenCalled();
        expect(overviewMap?.render).toHaveBeenCalled();

        mapRenderFn.mockReset();
        overviewMapRenderFn.mockReset();
        overlayElement.click();
        expect(map.getBaseLayers()[0].getVisible()).toBe(false);
        expect(map.getBaseLayers()[1].getVisible()).toBe(false);
        expect(map.getBaseLayers()[2].getVisible()).toBe(true);
        expect(map.overviewMapControl?.getOverviewMap().getLayers().getArray()[0].getVisible()).toBe(true);
        expect(map.overviewMapControl?.getOverviewMap().getLayers().getArray()[1].getVisible()).toBe(false);
        expect(map.overviewMapControl?.getOverviewMap().getLayers().getArray()[2].getVisible()).toBe(false);
        expect(map.render).toHaveBeenCalled();
        expect(overviewMap?.render).toHaveBeenCalled();

        mapRenderFn.mockReset();
        overviewMapRenderFn.mockReset();
        overlayElement.click();
        expect(map.getBaseLayers()[0].getVisible()).toBe(true);
        expect(map.getBaseLayers()[1].getVisible()).toBe(false);
        expect(map.getBaseLayers()[2].getVisible()).toBe(false);
        expect(map.overviewMapControl?.getOverviewMap().getLayers().getArray()[0].getVisible()).toBe(false);
        expect(map.overviewMapControl?.getOverviewMap().getLayers().getArray()[1].getVisible()).toBe(true);
        expect(map.overviewMapControl?.getOverviewMap().getLayers().getArray()[2].getVisible()).toBe(false);
        expect(map.render).toHaveBeenCalled();
        expect(overviewMap?.render).toHaveBeenCalled();
    });
});
