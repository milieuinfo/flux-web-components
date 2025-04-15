import flatpickr from 'flatpickr';

export const formatEpoch = (epoch: number | string | symbol, format: string | symbol): string | symbol => {
    if (epoch && (typeof epoch === 'string' || typeof epoch === 'number')) {
        const dateFormat = format && typeof format !== 'symbol' ? format : 'd.m.Y';
        return flatpickr.formatDate(new Date(Number(epoch)), dateFormat);
    } else {
        return epoch as symbol;
    }
};
