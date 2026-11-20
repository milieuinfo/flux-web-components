import { formatPosition, toLocalDateTime, toPlotlyX } from './time-format';

// Lokale tijd: zo hangt de test niet af van de tijdzone van de machine.
const at = (year: number, month: number, day: number, hours = 0, minutes = 0) =>
    new Date(year, month - 1, day, hours, minutes).getTime();

describe('jest - widgets - toLocalDateTime', () => {
    it('should give the local time as text, without a time zone', () => {
        expect(toLocalDateTime(at(2026, 8, 28, 15, 32))).toBe('2026-08-28 15:32:00');
    });

    it('should pad months, days and hours', () => {
        expect(toLocalDateTime(at(2026, 1, 5, 7, 4))).toBe('2026-01-05 07:04:00');
    });
});

describe('jest - widgets - formatPosition', () => {
    it('should show a time as a Belgian date and time', () => {
        expect(formatPosition({ type: 'time' }, at(2026, 8, 28, 15, 32))).toBe('28/08/2026 15:32');
    });

    it('should show a number as it is', () => {
        expect(formatPosition({ type: 'number' }, 2021)).toBe('2021');
    });

    it('should show a category as it is', () => {
        expect(formatPosition({ type: 'category' }, 'Gent')).toBe('Gent');
    });
});

describe('jest - widgets - toPlotlyX', () => {
    it('should give Plotly local times as text on a time axis', () => {
        expect(toPlotlyX({ type: 'time' }, Float64Array.from([at(2026, 8, 28, 1)]))).toEqual(['2026-08-28 01:00:00']);
    });

    it('should leave numbers alone on a number axis', () => {
        expect(toPlotlyX({ type: 'number' }, Float64Array.from([2020, 2021]))).toEqual([2020, 2021]);
    });
});
