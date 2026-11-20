import { buildAxisTitle } from './axis-titles';

describe('jest - widgets - buildAxisTitle', () => {
    it('should combine the title and the unit', () => {
        expect(buildAxisTitle({ type: 'number', title: 'Concentratie', unit: 'µg/m³' })).toBe('Concentratie (µg/m³)');
    });

    it('should use only the title when there is no unit', () => {
        expect(buildAxisTitle({ type: 'number', title: 'Jaar' })).toBe('Jaar');
    });

    it('should use only the unit when there is no title', () => {
        expect(buildAxisTitle({ type: 'number', unit: 'µT' })).toBe('µT');
    });

    it('should give no title when there is no title and no unit', () => {
        expect(buildAxisTitle({ type: 'number' })).toBeUndefined();
    });

    it('should treat an empty title as no title', () => {
        expect(buildAxisTitle({ type: 'number', title: '', unit: 'µT' })).toBe('µT');
    });
});
