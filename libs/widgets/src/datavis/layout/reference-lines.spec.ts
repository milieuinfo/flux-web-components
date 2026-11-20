import type { ChartModel } from '../models/chart.model';
import { buildValueScale } from './axis-ranges';
import {
    buildReferenceLabels,
    buildReferenceShapes,
    describeOutOfRangeReferences,
    describeReference,
    findOutOfRangeArrow,
    isReferenceInRange,
    placeReferences,
    type ChartReference,
} from './reference-lines';

const model: ChartModel = {
    meta: { sources: [{ title: 'Departement Omgeving' }], x: { type: 'time' }, y: { type: 'number', unit: 'µT' } },
    series: [{ name: 'Meetpunt Beringen', x: Float64Array.from([0, 1]), y: Float64Array.from([0.21, 0.32]) }],
};

const reference = (value: number, label = '', isInView = false): ChartReference => ({ value, label, isInView });

describe('jest - widgets - describeReference', () => {
    it('should give the label, the value with its own decimals and the unit', () => {
        expect(describeReference(reference(0.4, 'Vlaamse streefwaarde'), 'µT')).toBe('Vlaamse streefwaarde: 0,4 µT');
        expect(describeReference(reference(100, 'EU-referentieniveau'), 'µT')).toBe('EU-referentieniveau: 100 µT');
    });

    it('should give only the value without a label', () => {
        expect(describeReference(reference(1250))).toBe('1.250');
    });
});

describe('jest - widgets - isReferenceInRange', () => {
    it('should tell whether the line falls within the value axis, edges included', () => {
        expect(isReferenceInRange(reference(0.4), [0, 0.4])).toBe(true);
        expect(isReferenceInRange(reference(100), [0, 0.4])).toBe(false);
        expect(isReferenceInRange(reference(-1), [0, 0.4])).toBe(false);
    });
});

describe('jest - widgets - buildReferenceShapes', () => {
    it('should draw a dashed line across the plot, above the grid', () => {
        const [shape] = buildReferenceShapes([reference(0.4)], '#4d535b');

        expect(shape).toMatchObject({ xref: 'paper', x0: 0, x1: 1, y0: 0.4, y1: 0.4, layer: 'above' });
        expect(shape.line).toEqual({ color: '#4d535b', width: 1, dash: 'dash' });
    });
});

describe('jest - widgets - buildReferenceLabels', () => {
    it('should put the label left above the line', () => {
        const [label] = buildReferenceLabels([reference(0.4, 'Vlaamse streefwaarde')], 'µT', '#4d535b', '#fff');

        expect(label).toMatchObject({ x: 0, xanchor: 'left', y: 0.4, yanchor: 'bottom' });
        expect(label.text).toBe('Vlaamse streefwaarde: 0,4 µT');
    });
});

describe('jest - widgets - placeReferences', () => {
    it('should draw a line within the value axis and keep a line far from the data as a note', () => {
        const target = reference(0.4, 'Vlaamse streefwaarde');
        const norm = reference(100, 'EU-referentieniveau');

        const placed = placeReferences(model, [target, norm]);

        expect(placed.valueScale.range).toEqual([0, 0.4]);
        expect(placed.inRange).toEqual([target]);
        expect(placed.outOfRange).toEqual([norm]);
    });

    it('should stretch the value axis to a line with in-view, so it is drawn', () => {
        const norm = reference(1, 'Norm', true);

        const placed = placeReferences(model, [norm]);

        expect(placed.valueScale.range).toEqual([0, 1]);
        expect(placed.inRange).toEqual([norm]);
        expect(placed.outOfRange).toEqual([]);
    });
});

describe('jest - widgets - findOutOfRangeArrow', () => {
    it('should point up above the value axis and down below it', () => {
        const valueScale = { range: [0, 0.4] as [number, number], step: 0.1 };

        expect(findOutOfRangeArrow(reference(100), valueScale)).toBe('↑');
        expect(findOutOfRangeArrow(reference(-1), valueScale)).toBe('↓');
    });
});

describe('jest - widgets - describeOutOfRangeReferences', () => {
    it('should give each note with its arrow, label, value and unit', () => {
        const placed = placeReferences(model, [
            reference(0.4, 'Vlaamse streefwaarde'),
            reference(100, 'EU-referentieniveau'),
        ]);

        expect(describeOutOfRangeReferences(placed, 'µT')).toEqual(['↑ EU-referentieniveau: 100\u00a0µT']);
    });
});

describe('jest - widgets - buildValueScale - references', () => {
    it('should stretch the value axis to an extra value', () => {
        expect(buildValueScale(model, [1]).range).toEqual([0, 1]);
    });

    it('should not change without extra values', () => {
        expect(buildValueScale(model).range).toEqual([0, 0.4]);
    });
});
