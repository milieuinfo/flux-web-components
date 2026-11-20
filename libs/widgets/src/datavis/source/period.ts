/** De keuzes voor de lengte van een periode, zoals in de PoC van de ELF-sensoren. De waarde is ook de waarde van
 *  het attribuut `period` op `vl-data-source`. */
export const PERIOD_DURATIONS = ['24h', '7d', '30d', '1y'] as const;
export type PeriodDuration = (typeof PERIOD_DURATIONS)[number];

export const PERIOD_DURATION_LABELS: Record<PeriodDuration, string> = {
    '24h': '24 uur',
    '7d': '7 dagen',
    '30d': '30 dagen',
    '1y': '1 jaar',
};

const DAYS_PER_DURATION: Record<PeriodDuration, number> = { '24h': 1, '7d': 7, '30d': 30, '1y': 365 };
const DEFAULT_DURATION: PeriodDuration = '24h';

/** Een periode: zoveel volle dagen, tot en met de dag `end` (lokale tijd, 00:00). "24 uur" is één kalenderdag,
 *  van middernacht tot middernacht: zo vergelijk je dag met dag, en stap je met vorige en volgende per dag. */
export type Period = { duration: PeriodDuration; end: Date };

/** Van `from` (inbegrepen) tot `to` (niet inbegrepen), om de data van de periode op te vragen. */
export type PeriodRange = { from: Date; to: Date };

export function startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number): Date {
    // Met de kalender i.p.v. 24 uur in milliseconden: een dag met een uurwissel heeft er 23 of 25.
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

export function parsePeriodDuration(value: string | null | undefined): PeriodDuration {
    return (PERIOD_DURATIONS as readonly string[]).includes(value ?? '') ? (value as PeriodDuration) : DEFAULT_DURATION;
}

/** De laatste dag van een periode uit een attribuut als "2026-08-28"; zonder (geldige) datum: vandaag. */
export function parsePeriodEnd(value: string | null | undefined, today: Date): Date {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value ?? '');
    if (!match) return startOfDay(today);
    const [, year, month, day] = match.map(Number);
    return new Date(year, month - 1, day);
}

export function toPeriodRange({ duration, end }: Period): PeriodRange {
    return { from: addDays(startOfDay(end), 1 - DAYS_PER_DURATION[duration]), to: addDays(startOfDay(end), 1) };
}

/** Een hele periode vooruit (`steps` > 0) of terug: na 7 dagen komen de 7 dagen erna. Nooit voorbij vandaag. */
export function shiftPeriod(period: Period, steps: number, today: Date): Period {
    const end = addDays(startOfDay(period.end), steps * DAYS_PER_DURATION[period.duration]);
    return { duration: period.duration, end: end > startOfDay(today) ? startOfDay(today) : end };
}

/** Of de periode tot vandaag loopt: dan is er geen volgende periode. */
export function isLatestPeriod(period: Period, today: Date): boolean {
    return startOfDay(period.end) >= startOfDay(today);
}

const dayFormat = new Intl.DateTimeFormat('nl-BE', { day: 'numeric', month: 'short', year: 'numeric' });

/** Welke dagen de periode toont, voor de lezer: "4 nov 2026", of "1–7 nov 2026". */
export function describePeriod(period: Period): string {
    const { from, to } = toPeriodRange(period);
    const lastDay = addDays(to, -1);
    return period.duration === '24h' ? dayFormat.format(lastDay) : dayFormat.formatRange(from, lastDay);
}
