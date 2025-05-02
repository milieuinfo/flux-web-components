import { formControlDefaults } from '../form-control/form-control.defaults';

export const textareaDefaults = {
    ...formControlDefaults,
    block: false as boolean,
    readonly: false as boolean,
    value: '' as string,
    placeholder: '' as string,
    autocomplete: '' as string,
    minLength: null as number | null,
    maxLength: null as number | null,
    rows: null as number | null,
    cols: null as number | null,
} as const;
