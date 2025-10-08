import VectorSource from 'ol/source/Vector';
import { VlDrawPolygonAction } from './draw-polygon-action';

describe('jest - map - draw-polygon-action', () => {
    const source = new VectorSource({});

    const layer = {
        getSource: () => source,
    };

    const callback = jest.fn();

    it('geeft de snapping configuratie door aan de draw action', () => {
        const snappingLayer = jest.fn();
        const snapping = {
            layer: snappingLayer,
        };
        const action = new VlDrawPolygonAction(layer, callback, snapping);
        expect(action.options.layer).toEqual(snappingLayer);
    });

    it('geeft de juiste configuratie mee aan de draw interaction', () => {
        const action = new VlDrawPolygonAction(layer, callback);
        expect(action.options).toEqual(action.options);
    });
});
