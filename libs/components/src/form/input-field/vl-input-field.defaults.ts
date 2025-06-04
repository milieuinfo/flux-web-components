import { formControlDefaults } from '../form-control/form-control.defaults';

export const inputFieldDefaults = {
    ...formControlDefaults,
    block: false as boolean,
    readonly: false as boolean,
    type: 'text' as string,
    value: '' as string,
    placeholder: '' as string,
    autocomplete: '' as string,
    minLength: null as number | null,
    maxLength: null as number | null,
    min: null as number | null,
    max: null as number | null,
    minExclusive: false as boolean,
    maxExclusive: false as boolean,
    pattern: '' as string,
    inputGroup: false as boolean,
    regex: null as RegExp | null,
} as const;
