import { formControlDefaults } from '../form-control/form-control.defaults';

export const checkboxDefaults = {
    ...formControlDefaults,
    block: false as boolean,
    value: null as string | null,
    checked: false as boolean,
    isSwitch: false as boolean,
} as const;
