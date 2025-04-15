import { formControlDefaults } from '../form-control/form-control.defaults';
import { SelectRichOption, SelectRichPosition } from './vl-select-rich.model';

export const selectRichDefaults = {
    ...formControlDefaults,
    options: [] as SelectRichOption[],
    placeholder: '' as string,
    notDeletable: false as boolean,
    multiple: false as boolean,
    search: false as boolean,
    position: SelectRichPosition.AUTO as SelectRichPosition,
    resultLimit: 4 as number,
    noResultsText: 'Geen resultaten gevonden' as string,
    noChoicesText: 'Geen resterende opties gevonden' as string,
    searchPlaceholder: 'Zoek item' as string,
} as const;
