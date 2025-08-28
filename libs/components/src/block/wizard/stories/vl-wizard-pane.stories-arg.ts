import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const wizardPaneArgs = {
    ...defaultArgs,
    isActive: false,
    name: '',
};

export const wizardPaneArgTypes: ArgTypes<typeof wizardPaneArgs> = {
    ...defaultArgTypes,
    isActive: {
        name: 'isActive',
        description: 'Bepaalt of de pane actief is.',
        table: {
            type: {
                summary: TYPES.STRING,
            },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(wizardPaneArgs.isActive) },
        },
    },
    name: {
        name: 'name',
        description: 'Stelt de naam van de pane in. De naam is zichtbaar in de tooltip van de stap.',
        table: {
            type: {
                summary: TYPES.STRING,
            },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: wizardPaneArgs.name },
        },
    },
};
