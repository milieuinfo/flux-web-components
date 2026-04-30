import flatpickr from 'flatpickr';
import { VlDatepickerComponent } from '.';

export const extractTime = (date: Date): Date => {
    const d = new Date(0);
    d.setUTCHours(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
    return d;
};

export const getDatepickerBoundary = (instance: VlDatepickerComponent, kind: 'max' | 'min'): Date | undefined => {
    const { type, format, maxDate, maxTime, minDate, minTime } = instance;
    const parseDateBoundary = (dateString: string) => {
        if (dateString === 'today') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return today;
        }
        return flatpickr.parseDate(dateString, format);
    };

    if (kind === 'max') {
        if (['date', 'date-time', 'range'].includes(type) && maxDate) {
            return parseDateBoundary(maxDate);
        }
        if (type === 'time' && maxTime) {
            return flatpickr.parseDate(maxTime, format);
        }
    } else {
        if (['date', 'date-time', 'range'].includes(type) && minDate) {
            return parseDateBoundary(minDate);
        }
        if (type === 'time' && minTime) {
            return flatpickr.parseDate(minTime, format);
        }
    }

    return undefined;
};
