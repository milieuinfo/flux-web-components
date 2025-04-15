import { formControlDefaults } from '../form-control/form-control.defaults';

export const radioGroupDefaults = {
    ...formControlDefaults,
    readonly: false as boolean,
    value: null as string | null,
};
