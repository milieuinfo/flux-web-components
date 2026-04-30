import flatpickr from 'flatpickr';

export const formatEpoch = (epoch: number | string | symbol, format: string | symbol): string | symbol => {
    // Storybook's DATE-control geeft een Unix-timestamp (ms) terug; story-args bevatten doorgaans
    // al een geformatteerde datum string. Enkel echte timestamps mogen geherformatteerd worden,
    // anders wordt b.v. "05.05.2026" via Number(...) NaN en krijgen we "aN.aN.0NaN".
    const isTimestamp = typeof epoch === 'number' || (typeof epoch === 'string' && /^\d+$/.test(epoch));
    if (isTimestamp) {
        const dateFormat = format && typeof format !== 'symbol' ? format : 'd.m.Y';
        return flatpickr.formatDate(new Date(Number(epoch)), dateFormat);
    }
    return epoch as symbol;
};

export const createDateRange = (
    date: Date,
    range: number,
    format: string = 'd.m.Y',
    delimiter: string = ''
): [string, string] | string => {
    if (date && range) {
        const startDate = new Date(date);
        const endDate = new Date(date);
        startDate.setDate(startDate.getDate() - range);
        endDate.setDate(endDate.getDate() + range);
        const dates: [string, string] = [
            flatpickr.formatDate(startDate, format),
            flatpickr.formatDate(endDate, format),
        ];
        return delimiter ? dates.join(delimiter) : dates;
    } else {
        return '';
    }
};
