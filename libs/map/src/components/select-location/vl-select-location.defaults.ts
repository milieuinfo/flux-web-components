import { selectRichDefaults } from '../../../../form/src/select-rich/vl-select-rich.defaults';

const defaults = { ...selectRichDefaults };
delete defaults.multiple;
delete defaults.search;

export const selectLocationDefaults = {
    ...defaults,
    placeholder: 'Zoeken op kaart' as string,
    searchPlaceholder: 'Zoeken op adres of coördinaat' as string,
} as const;
