import { formControlDefaults } from '../form-control/form-control.defaults';
import { DATEPICKER_TYPES } from './vl-datepicker.model';

export const datepickerDefaults = {
    ...formControlDefaults,
    block: false as boolean,
    readonly: false as boolean,
    value: '' as string,
    placeholder: '' as string,
    autocomplete: '' as string,
    type: 'date' as (typeof DATEPICKER_TYPES)[number],
    format: '' as string,
    amPm: false as boolean,
    minDate: '' as string,
    maxDate: '' as string,
    minTime: '' as string,
    maxTime: '' as string,
    disableMaskValidation: false as boolean,
    disableMobileNativeInput: false as boolean,
    pattern: '' as string,
    regex: null as RegExp | null,
} as const;
