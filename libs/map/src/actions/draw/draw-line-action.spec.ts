import VectorSource from 'ol/source/Vector';
import { VlDrawLineAction } from './draw-line-action';

describe('jest - map - draw-line-action', () => {
    const source = new VectorSource({});

    const layer = {
        getSource: () => source,
    };

    const callback = jest.fn();

    it('geeft de options door aan de draw action', () => {
        const snappingOptions = {
            layer: {
                getSource: () => {},
            },
        };
        const options = {
            snapping: snappingOptions,
            measure: true,
        };

        const action = new VlDrawLineAction(layer, callback, options);
        expect(action.options.maxPoints).toBeUndefined();
        expect(action.options.snapping).toEqual(options.snapping);
        expect(action.options.measure).toBe(true);
    });

    it('geeft de juiste configuratie mee aan de draw interaction', () => {
        const action = new VlDrawLineAction(layer, callback);
        expect(action.options).toEqual(action.options);
    });
});
