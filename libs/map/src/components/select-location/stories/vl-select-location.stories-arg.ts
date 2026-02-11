import { ArgTypes } from '@storybook/web-components-vite';
// dit bestand (vl-select-location.stories-arg.ts) wordt enkel in storybook gebruikt - dus enkel in de monorepo opzet
//  - op deze manier wordt de barrel-file omzeilt
//  - selectRichArgTypes en selectRichDefaults mogen ook niet in de barrel-file, dat geeft neven-effect-import problemen
import { selectRichArgTypes } from '../../../../../components/src/form/select-rich/stories/vl-select-rich.stories-arg';
import { selectRichDefaults } from '../../../../../components/src/form/select-rich/vl-select-rich.defaults';
import { placeholder, searchPlaceholder } from '../vl-select-location.defaults';

type SelectLocationArgs = typeof selectLocationDefaults;

const minimalSelectRichDefaults = { ...selectRichDefaults };
delete minimalSelectRichDefaults.multiple;
delete minimalSelectRichDefaults.search;
delete minimalSelectRichDefaults.searchStrategy;

export const selectLocationDefaults = {
    ...minimalSelectRichDefaults,
    placeholder,
    searchPlaceholder,
} as const;

export const selectLocationArgs: SelectLocationArgs = {
    ...selectLocationDefaults,
};

const minimalSelectRichArgTypes = { ...selectRichArgTypes };
delete minimalSelectRichArgTypes.multiple;
delete minimalSelectRichArgTypes.search;
delete minimalSelectRichArgTypes.searchStrategy;

export const selectLocationArgTypes: ArgTypes<SelectLocationArgs> = {
    ...minimalSelectRichArgTypes,
};
