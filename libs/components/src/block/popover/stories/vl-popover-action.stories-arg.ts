import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const popoverActionArgs = {
    ...defaultArgs,
    selected: false,
};

export const popoverActionArgTypes: ArgTypes<typeof popoverActionArgs> = {
    ...defaultArgTypes,
    selected: {
        name: 'selected',
        description:
            'Duidt de actie aan als het huidige item, bv. de huidige pagina of de laatst gekozen weergave. Een schermlezer leest dit via `aria-current`.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: String(popoverActionArgs.selected) },
        },
    },
};
