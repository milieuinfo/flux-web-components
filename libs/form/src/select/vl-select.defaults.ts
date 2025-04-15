import { formControlDefaults } from '../form-control/form-control.defaults';
import { SelectOption } from './vl-select.model';

export const selectDefaults = {
    ...formControlDefaults,
    options: [] as SelectOption[],
    block: false as boolean,
    placeholder: '' as string,
    autocomplete: '' as string,
    notDeletable: false as boolean,
} as const;
