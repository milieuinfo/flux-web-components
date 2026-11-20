import { deltaE00, findWeakestPair } from './palette-vision';
import { categoricalPalette } from './vl-chart.palette';

describe('jest - widgets - deltaE00', () => {
    it('should match the first test pair of Sharma et al. (2005)', () => {
        expect(deltaE00([50, 2.6772, -79.7751], [50, 0, -82.7485])).toBeCloseTo(2.0425, 4);
    });
});

describe('jest - widgets - findWeakestPair', () => {
    const slots = categoricalPalette.map((color) => color.line);

    it('should keep the slot order distinguishable for red-green and blue-yellow color blindness', () => {
        expect(findWeakestPair(slots, 'deuteranopia').deltaE).toBeGreaterThanOrEqual(9.5);
        expect(findWeakestPair(slots, 'protanopia').deltaE).toBeGreaterThanOrEqual(9.5);
        expect(findWeakestPair(slots, 'tritanopia').deltaE).toBeGreaterThanOrEqual(9.5);
    });

    it('should keep the first four slots distinguishable in black and white, rounded to one decimal', () => {
        const { deltaE } = findWeakestPair(slots.slice(0, 4), 'achromatopsia');
        expect(Math.round(deltaE * 10) / 10).toBeGreaterThanOrEqual(8.5);
    });
});
