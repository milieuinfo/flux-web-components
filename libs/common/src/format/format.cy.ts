import {
    formatCurrency,
    formatDate,
    formatDaysFromNow,
    formatNumber,
    formatPercentage,
    formatReadableDate,
    formatTime,
    nbsp,
} from './format';

describe('cypress-components - commmon - format utilities (nl-BE)', () => {
    describe('formatNumber', () => {
        it('should format numbers with thousands separator', () => {
            expect(formatNumber(1234567)).to.equal(`1${nbsp}234${nbsp}567`);
        });

        it('should format negative numbers', () => {
            expect(formatNumber(-42)).to.equal('-42');
        });

        it('should keep decimal part unchanged', () => {
            expect(formatNumber(1234.56)).to.equal('1234,56');
        });

        it('should format with a specified number of decimals, and round it', () => {
            expect(formatNumber(1234.5678, { decimals: 3 })).to.equal('1234,568');
        });

        it('should format without decimals, and round it', () => {
            expect(formatNumber(1234.5678, { decimals: 0 })).to.equal('1235');
        });

        it('should format a fixed number of decimals', () => {
            expect(formatNumber(1000, { decimals: 2 })).to.equal('1000,00');
        });

        it('should use a specified thousands separator', () => {
            expect(formatNumber(1234567.89, { thousandsSeparator: '.' })).to.equal('1.234.567,89');
        });

        it('should use an empty string as thousands separator', () => {
            expect(formatNumber(1234567.89, { thousandsSeparator: '' })).to.equal('1234567,89');
        });

        it('should use a space as thousands separator and convert it to non-breaking space', () => {
            expect(formatNumber(1234567.89, { thousandsSeparator: ' ' })).to.equal(`1${nbsp}234${nbsp}567,89`);
        });
    });

    describe('formatCurrency', () => {
        it('should format currency with default 2 fraction digits', () => {
            expect(formatCurrency(1234.5)).to.equal(`€${nbsp}1.234,50`);
        });

        it('should format with a specified number of decimals, and round it', () => {
            expect(formatCurrency(1234.5678, { decimals: 3 })).to.equal(`€${nbsp}1.234,568`);
        });

        it('should format without decimals, and round it', () => {
            expect(formatCurrency(1234.5678, { decimals: 0 })).to.equal(`€${nbsp}1.235`);
        });

        it('should handle a different currency', () => {
            expect(formatCurrency(1234.5, { currency: 'GBP' })).to.equal(`£${nbsp}1.234,50`);
        });
    });

    describe('formatDate', () => {
        it('should format a plain Date object', () => {
            const d = new Date('2025-01-31T00:00:00Z');
            expect(formatDate(d)).to.equal('31.01.25');
        });
        it('should format a plain Date object with full year', () => {
            const d = new Date('2025-01-31T00:00:00Z');
            expect(formatDate(d, { fullYear: true })).to.equal('31.01.2025');
        });
        it('should format a plain Date object with a specified separator', () => {
            const d = new Date('2025-01-31T00:00:00Z');
            expect(formatDate(d, { dateSeparator: '/' })).to.equal(`31/01/25`);
        });
        it('should format a plain Date object with "space" as separator and convert it to a non-breaking space', () => {
            const d = new Date('2025-01-31T00:00:00Z');
            expect(formatDate(d, { dateSeparator: ' ' })).to.equal(`31${nbsp}01${nbsp}25`);
        });
        it('should catch an invalid date argument', () => {
            // @ts-ignore
            expect(formatDate(1234)).to.equal('1234');
        });
    });

    describe('formatTime', () => {
        const d = new Date('2025-03-15T14:05:09');

        it('should format hour & minute (24h)', () => {
            expect(formatTime(d)).to.equal('14:05');
        });

        it('should add seconds when option is true', () => {
            expect(formatTime(d, { seconds: true })).to.equal('14:05:09');
        });

        it('should catch an invalid date argument', () => {
            // @ts-ignore
            expect(formatTime(1234)).to.equal('1234');
        });
    });

    describe('formatReadableDate', () => {
        it('should produce a long, localized date string', () => {
            const d = new Date('2025-12-25T00:00:00Z');
            expect(formatReadableDate(d)).to.equal('donderdag 25 december 2025');
        });

        it('should catch an invalid date argument', () => {
            // @ts-ignore
            expect(formatReadableDate(1234)).to.equal('1234');
        });
    });

    describe('formatDaysFromNow', () => {
        const daysFromNow = (days: number): Date => {
            const msPerDay = 24 * 60 * 60 * 1000;
            return new Date(Date.now() + days * msPerDay);
        };

        it('should return a "days from now" string for a date 1 day in the past (nl-BE)', () => {
            const yesterday = daysFromNow(-1);
            expect(formatDaysFromNow(yesterday)).to.equal('gisteren');
        });

        it('should return a "days from now" string for a date 2 days in the past (nl-BE)', () => {
            const twoDaysAgo = daysFromNow(-2);
            expect(formatDaysFromNow(twoDaysAgo)).to.equal('eergisteren');
        });

        it('should return a "days from now" string for a date 3 days in the past (nl-BE)', () => {
            const twoDaysAgo = daysFromNow(-3);
            expect(formatDaysFromNow(twoDaysAgo)).to.equal('3 dagen geleden');
        });

        it('should return a "days from now" string for a date 1 day in the future (nl-BE)', () => {
            const tomorrow = daysFromNow(1);
            expect(formatDaysFromNow(tomorrow)).to.equal('morgen');
        });

        it('should return a "days from now" string for a date 2 day in the future (nl-BE)', () => {
            const tomorrow = daysFromNow(2);
            expect(formatDaysFromNow(tomorrow)).to.equal('overmorgen');
        });

        it('should return a "days from now" string for a date 5 days in the future (nl-BE)', () => {
            const fiveDaysLater = daysFromNow(5);
            expect(formatDaysFromNow(fiveDaysLater)).to.equal('over 5 dagen');
        });
    });

    describe('formatPercentage', () => {
        it('should format a decimal as percent', () => {
            expect(formatPercentage(0.1234)).to.equal('12%');
        });

        it('should allow custom decimals', () => {
            expect(formatPercentage(0.1234, { decimals: 2 })).to.equal('12,34%');
        });

        it('should allow a fixed number of decimals', () => {
            expect(formatPercentage(0.5, { decimals: 2 })).to.equal('50,00%');
        });
    });
});
