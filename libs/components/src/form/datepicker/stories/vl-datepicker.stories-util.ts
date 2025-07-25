import flatpickr from 'flatpickr';

export const formatEpoch = (epoch: number | string | symbol, format: string | symbol): string | symbol => {
    if (epoch && (typeof epoch === 'string' || typeof epoch === 'number')) {
        const dateFormat = format && typeof format !== 'symbol' ? format : 'd.m.Y';
        return flatpickr.formatDate(new Date(Number(epoch)), dateFormat);
    } else {
        return epoch as symbol;
    }
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
