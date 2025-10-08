import VectorSource from 'ol/source/Vector';
import { VlDrawRectangleAction } from './draw-rectangle-action';

describe('jest - map - draw-rectangle-action', () => {
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
        const action = new VlDrawRectangleAction(layer, callback, snapping);
        expect(action.options.layer).toEqual(snappingLayer);
    });

    it('geeft de juiste configuratie mee aan de draw interaction', () => {
        const action = new VlDrawRectangleAction(layer, callback);
        expect(action.options.maxPoints).toBe(2);
        const { geometryFunction } = action.options;
        const geometry = geometryFunction(
            [
                [0, 0],
                [1, 2],
            ],
            null
        );
        expect(geometry.getCoordinates()[0][0]).toEqual([0, 0]);
        expect(geometry.getCoordinates()[0][1]).toEqual([0, 2]);
        expect(geometry.getCoordinates()[0][2]).toEqual([1, 2]);
        expect(geometry.getCoordinates()[0][3]).toEqual([1, 0]);
        expect(geometry.getCoordinates()[0][4]).toEqual([0, 0]);
    });
});
