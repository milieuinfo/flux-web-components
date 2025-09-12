export const nbsp = '\u00A0'; // non-breaking space

type ThousandsSeparator = '.' | '' | ' ' | typeof nbsp;

type NumberOptions = {
    decimals?: number;
    thousandsSeparator?: ThousandsSeparator;
};

type CurrencyOptions = {
    decimals?: number;
    currency?: string;
};

type DateSeparator = '.' | '/' | '-' | ' ' | typeof nbsp;

type DateOptions = {
    fullYear?: boolean;
    dateSeparator?: DateSeparator;
};

type TimeOptions = {
    seconds: boolean;
};

// We wijken af van de browser implementatie van de nl-BE locale omwille van deze richtlijnen:
// https://www.vlaanderen.be/team-taaladvies/taaladviezen/getallen-en-geldbedragen-notatie-komma-punt-spatie
// https://taaladvies.net/10000000-of-10-000-000/
// Concreet kiezen we standaard voor een spatie (non-breakable space: '\u00A0') zodra het getal langer is dan 4 cijfers.
// Dit is aanpasbaar met de optie `thousandsSeparator`.
// Bij valuta wordt voorkeur gegeven aan een punt als scheidingsteken.
const applyThousandsSeparator = (value: string, thousandsSeparator: ThousandsSeparator = nbsp) =>
    thousandsSeparator === '.' ? value : value.replaceAll('.', thousandsSeparator === ' ' ? nbsp : thousandsSeparator);

// We wijken af van de browser implementatie van de nl-BE locale omwille van deze richtlijnen:
// https://www.vlaanderen.be/vlaanderen-design-system/richtlijnen/formulieren/datum
// Concreet kiezen we standaard voor een punt ('.') als scheidingsteken tussen dag, maand en jaar.
// Dit is aanpasbaar met de optie `dateSeparator`.
const applyDateSeparator = (value: string, dateSeparator: DateSeparator = '.'): string =>
    dateSeparator === '/' ? value : value.replaceAll('/', dateSeparator === ' ' ? nbsp : dateSeparator);

export const formatNumber = (value: number, options?: NumberOptions): string =>
    applyThousandsSeparator(
        new Intl.NumberFormat('nl-BE', {
            minimumFractionDigits: options?.decimals,
            maximumFractionDigits: options?.decimals,
            useGrouping: 'min2',
        } as unknown as Intl.NumberFormatOptions).format(value),
        options?.thousandsSeparator
    );

export const formatCurrency = (value: number, options?: CurrencyOptions): string =>
    new Intl.NumberFormat('nl-BE', {
        style: 'currency',
        currency: options?.currency || 'EUR',
        minimumFractionDigits: options?.decimals ?? 2,
        maximumFractionDigits: options?.decimals ?? 2,
    }).format(value);

export const formatDate = (date: Date, options?: DateOptions): string => {
    try {
        if (typeof date !== 'object') throw 'invalid date';
        return applyDateSeparator(
            new Intl.DateTimeFormat('nl-BE', {
                day: '2-digit',
                month: '2-digit',
                year: options?.fullYear ? 'numeric' : '2-digit',
            }).format(date),
            options?.dateSeparator
        );
    } catch (error) {
        console.error(error);
        return String(date);
    }
};

export const formatTime = (date: Date, options?: TimeOptions): string => {
    try {
        if (typeof date !== 'object') throw 'invalid date';
        return new Intl.DateTimeFormat('nl-BE', {
            hour: '2-digit',
            minute: '2-digit',
            second: options?.seconds ? '2-digit' : undefined,
            hour12: false,
        }).format(date);
    } catch (error) {
        console.error(error);
        return String(date);
    }
};

export const formatReadableDate = (date: Date): string => {
    try {
        if (typeof date !== 'object') throw 'invalid date';
        return new Intl.DateTimeFormat('nl-BE', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    } catch (error) {
        console.error(error);
        return String(date);
    }
};

export const formatDaysFromNow = (date: Date): string => {
    try {
        if (typeof date !== 'object') throw 'invalid date';
        const diffDays = Math.round((date.getTime() - Date.now()) / (24 * 60 * 60 * 1000));
        return new Intl.RelativeTimeFormat('nl-BE', { numeric: 'auto', style: 'long' }).format(diffDays, 'day');
    } catch (error) {
        console.error(error);
        return String(date);
    }
};

export const formatPercentage = (value: number, options?: NumberOptions): string =>
    applyThousandsSeparator(
        new Intl.NumberFormat('nl-BE', {
            style: 'percent',
            minimumFractionDigits: options?.decimals,
            maximumFractionDigits: options?.decimals,
        }).format(value),
        options?.thousandsSeparator
    );
