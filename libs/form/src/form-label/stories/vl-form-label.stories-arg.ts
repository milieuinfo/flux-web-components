import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components';
import { formLabelDefaults } from '../vl-form-label.defaults';

type FormLabelArgs = typeof defaultArgs & { defaultSlot: string } & typeof formLabelDefaults;

export const formLabelArgs: FormLabelArgs = {
    ...defaultArgs,
    ...formLabelDefaults,
    defaultSlot: '',
};

export const formLabelArgTypes: ArgTypes<FormLabelArgs> = {
    ...defaultArgTypes(true),
    for: {
        name: 'for',
        description: 'Het id van de form control waarvoor het label bedoeld is.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.STRING },
            defaultValue: { summary: formLabelArgs.for },
        },
    },
    label: {
        name: 'label',
        description: 'De tekst van het label. Overschrijft de waarde van het default slot.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.STRING },
            defaultValue: { summary: formLabelArgs.label },
        },
    },
    block: {
        name: 'block',
        description: 'Duidt aan of het label de volledige breedte van de parent moet innemen.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: formLabelArgs.block },
        },
    },
    light: {
        name: 'light',
        description: 'Duidt aan of het label in light mode moet weergegeven worden.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: formLabelArgs.light },
        },
    },
    defaultSlot: {
        name: '[default]',
        description: 'De content van het label. Wordt overschreven door de waarde van het label attribuut.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: formLabelArgs.defaultSlot },
        },
    },
};
