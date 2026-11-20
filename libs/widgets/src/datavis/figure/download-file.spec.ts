import { buildFileName } from './download-file';

describe('jest - widgets - buildFileName', () => {
    it('should use the headline', () => {
        expect(buildFileName('Veldsterkte per meetpunt')).toBe('Veldsterkte per meetpunt');
    });

    it('should replace characters that a file system does not allow', () => {
        expect(buildFileName('Gent/Antwerpen: 2020?')).toBe('Gent-Antwerpen- 2020-');
    });

    it('should join the lines of a headline that wraps in the HTML', () => {
        expect(buildFileName('  Veldsterkte\n        per meetpunt ')).toBe('Veldsterkte per meetpunt');
    });

    it('should fall back to "grafiek" without a headline', () => {
        expect(buildFileName('')).toBe('grafiek');
    });
});
