import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OlGML2 from 'ol/format/GML2';
import { VlCompositeVectorLayer } from './composite-vector-layer';
import { VlCompositeVectorSource } from '../source/composite-vector-source';

describe('jest - map - composite-vector-layer', () => {
    const source1 = new VectorSource({
        format: new OlGML2(),
        url: () => 'http://localhost/kaartlaag1',
    });

    const source2 = new VectorSource({
        format: new OlGML2(),
        url: () => 'http://localhost/kaartlaag2',
    });

    const layer1 = new VectorLayer(<any>{
        title: 'Laag 1',
        source: source1,
        minResolution: 4,
        maxResolution: 8,
    });

    const layer2 = new VectorLayer(<any>{
        title: 'Laag 1',
        source: source2,
        minResolution: 2,
        maxResolution: 10,
    });

    it('maakt een combinatie van alle layers', () => {
        const compositeVectorLayer = new VlCompositeVectorLayer([layer1, layer2], { title: 'Composite laag' });
        expect(compositeVectorLayer.getMinResolution()).toBe(2);
        expect(compositeVectorLayer.getMaxResolution()).toBe(10);
        expect(compositeVectorLayer.getSource() instanceof VlCompositeVectorSource).toBe(true);
        expect(compositeVectorLayer.getSource()['sources'][0]).toBe(source1);
        expect(compositeVectorLayer.getSource()['sources'][1]).toBe(source2);
    });

    it('het options argument is optioneel', () => {
        new VlCompositeVectorLayer([layer1, layer2]);
    });
});
