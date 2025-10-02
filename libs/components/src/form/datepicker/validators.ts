import { Validator } from '@open-wc/form-control';
import flatpickr from 'flatpickr';
import { CleaveInstance, MaskOptions } from '../models/cleave.model';
import { extractTime, getDatepickerBoundary } from './helpers';
import { VlDatepickerComponent } from './vl-datepicker.component';

export const maskValidator: Validator = {
    key: 'patternMismatch',
    message: 'Waarde voldoet niet aan het opgegeven patroon.',
    isValid(
        instance: HTMLElement & {
            disableMaskValidation: boolean;
            pattern: string;
            regex: RegExp;
            maskOptions: MaskOptions;
            cleaveInstance: CleaveInstance;
            inputValue: string;
        },
        value: string
    ): boolean {
        const { disableMaskValidation, cleaveInstance, inputValue } = instance;
        const regex = instance.regex || instance.pattern;
        if (!value || (!regex && (!cleaveInstance || disableMaskValidation))) {
            return true;
        }
        if (cleaveInstance && !disableMaskValidation && instance.maskOptions?.regex) {
            const rawValue = cleaveInstance.getRawValue();
            const regExp = new RegExp(instance.maskOptions.regex);
            return regExp.test(rawValue);
        } else {
            const regExp = new RegExp(regex);
            // we testen de inputValue gezien dit de waarde is die de gebruiker ingeeft
            return regExp.test(inputValue);
        }
    },
};

export const rangeOverflowValidator: Validator = {
    key: 'rangeOverflow',
    message: 'Waarde overschrijdt het toegestane maximum.',
    isValid(instance: VlDatepickerComponent, value: unknown): boolean {
        const { type } = instance;
        if (!value || !(typeof value === 'string' || value instanceof Date)) {
            return true;
        }

        const boundary = getDatepickerBoundary(instance, 'max');
        if (!boundary) return true;

        if (type === 'time' && typeof value === 'string') {
            const valTime = new Date(0);
            const [hours, minutes, seconds] = value.split(':');
            valTime.setHours(hours ? Number(hours) : 0, minutes ? Number(minutes) : 0, seconds ? Number(seconds) : 0);
            const maxTime = extractTime(boundary);
            return valTime.getTime() <= maxTime.getTime();
        }

        const endDateString = type === 'range' && typeof value === 'string' ? value.split('/')[1] : '';

        const valDate = flatpickr.parseDate(endDateString || value);
        if (!valDate) return true;

        return valDate.getTime() <= boundary.getTime();
    },
};

export const rangeUnderflowValidator: Validator = {
    key: 'rangeUnderflow',
    message: 'Waarde ligt onder het toegestane minimum.',
    isValid(instance: VlDatepickerComponent, value: unknown): boolean {
        const { type } = instance;
        if (!value || !(typeof value === 'string' || value instanceof Date)) {
            return true;
        }

        const boundary = getDatepickerBoundary(instance, 'min');
        if (!boundary) return true;

        if (type === 'time' && typeof value === 'string') {
            const valTime = new Date(0);
            const [hours, minutes, seconds] = value.split(':');
            valTime.setHours(hours ? Number(hours) : 0, minutes ? Number(minutes) : 0, seconds ? Number(seconds) : 0);
            const minTime = extractTime(boundary);
            return valTime.getTime() >= minTime.getTime();
        }

        const startDateString = type === 'range' && typeof value === 'string' ? value.split('/')[0] : '';

        const valDate = flatpickr.parseDate(startDateString || value);
        if (!valDate) return true;

        return valDate.getTime() >= boundary.getTime();
    },
};



