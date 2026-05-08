import { formControlDefaults } from '../form-control/form-control.defaults';

export const checkboxGroupDefaults = {
    ...formControlDefaults,
    readonly: false as boolean,
    block: false as boolean,
} as const;
