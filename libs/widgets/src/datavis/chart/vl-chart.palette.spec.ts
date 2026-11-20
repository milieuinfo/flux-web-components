import { MAX_SERIES } from '../models/validate-chart-model';
import { categoricalPalette } from './vl-chart.palette';

/** WCAG 2.1-contrastverhouding van `hex` op wit. */
function findContrastOnWhite(hex: string): number {
    const [red, green, blue] = [1, 3, 5]
        .map((start) => parseInt(hex.slice(start, start + 2), 16) / 255)
        .map((value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));
    return 1.05 / (0.2126 * red + 0.7152 * green + 0.0722 * blue + 0.05);
}

describe('jest - widgets - categoricalPalette', () => {
    it('should start with De Schelde and resolve the label to the text grade of the family', () => {
        expect(categoricalPalette[0]).toEqual({ line: '#2389e2', label: '#0f6fbf' });
    });

    it('should use the data color as label when it reaches the text contrast', () => {
        expect(categoricalPalette[1]).toEqual({ line: '#521f81', label: '#521f81' });
    });

    it('should have a color for every series the model allows', () => {
        expect(categoricalPalette).toHaveLength(MAX_SERIES);
    });

    it.each(categoricalPalette.map((color) => [color.line, color.label]))(
        'should reach the contrast on white for line %s and label %s',
        (line, label) => {
            expect(findContrastOnWhite(line)).toBeGreaterThanOrEqual(3);
            expect(findContrastOnWhite(label)).toBeGreaterThanOrEqual(4.5);
        },
    );
});
