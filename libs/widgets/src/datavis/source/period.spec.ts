import {
    describePeriod,
    isLatestPeriod,
    parsePeriodDuration,
    parsePeriodEnd,
    shiftPeriod,
    toPeriodRange,
    type Period,
} from './period';

const day = (year: number, month: number, date: number, hours = 0) => new Date(year, month - 1, date, hours);
const today = day(2026, 8, 28, 15);

describe('jest - widgets - parsePeriodDuration', () => {
    it('should accept a known duration', () => {
        expect(parsePeriodDuration('7d')).toBe('7d');
    });

    it('should fall back to 24 hours', () => {
        expect(parsePeriodDuration('2w')).toBe('24h');
        expect(parsePeriodDuration(null)).toBe('24h');
    });
});

describe('jest - widgets - parsePeriodEnd', () => {
    it('should read a date as a local day', () => {
        expect(parsePeriodEnd('2026-08-20', today)).toEqual(day(2026, 8, 20));
    });

    it('should fall back to the start of today', () => {
        expect(parsePeriodEnd(null, today)).toEqual(day(2026, 8, 28));
        expect(parsePeriodEnd('gisteren', today)).toEqual(day(2026, 8, 28));
    });
});

describe('jest - widgets - toPeriodRange', () => {
    it('should give one calendar day for 24 hours', () => {
        expect(toPeriodRange({ duration: '24h', end: day(2026, 8, 28, 15) })).toEqual({
            from: day(2026, 8, 28),
            to: day(2026, 8, 29),
        });
    });

    it('should give seven days up to and including the end', () => {
        expect(toPeriodRange({ duration: '7d', end: day(2026, 8, 28) })).toEqual({
            from: day(2026, 8, 22),
            to: day(2026, 8, 29),
        });
    });

    it('should count calendar days across a clock change', () => {
        // Op 25 oktober 2026 gaat de klok in België een uur terug.
        expect(toPeriodRange({ duration: '24h', end: day(2026, 10, 25) }).to).toEqual(day(2026, 10, 26));
    });
});

describe('jest - widgets - shiftPeriod', () => {
    const week: Period = { duration: '7d', end: day(2026, 8, 21) };

    it('should go back a whole period', () => {
        expect(shiftPeriod(week, -1, today)).toEqual({ duration: '7d', end: day(2026, 8, 14) });
    });

    it('should go forward a whole period', () => {
        expect(shiftPeriod(week, 1, today)).toEqual({ duration: '7d', end: day(2026, 8, 28) });
    });

    it('should never go past today', () => {
        expect(shiftPeriod({ duration: '7d', end: day(2026, 8, 25) }, 1, today).end).toEqual(day(2026, 8, 28));
    });
});

describe('jest - widgets - isLatestPeriod', () => {
    it('should be true for a period that ends today', () => {
        expect(isLatestPeriod({ duration: '24h', end: day(2026, 8, 28) }, today)).toBe(true);
    });

    it('should be false for an earlier period', () => {
        expect(isLatestPeriod({ duration: '24h', end: day(2026, 8, 27) }, today)).toBe(false);
    });
});

describe('jest - widgets - describePeriod', () => {
    it('should name the day for 24 hours', () => {
        expect(describePeriod({ duration: '24h', end: day(2026, 8, 28) })).toMatch(/^28 aug\.? 2026$/);
    });

    it('should name the first and last day for a longer period', () => {
        expect(describePeriod({ duration: '7d', end: day(2026, 8, 28) })).toMatch(/^22.*28 aug\.? 2026$/);
    });
});
