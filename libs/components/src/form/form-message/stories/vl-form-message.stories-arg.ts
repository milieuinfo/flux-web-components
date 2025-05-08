import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components';
import { formMessageDefaults } from '../vl-form-message.defaults';

type FormMessageArgs = typeof defaultArgs & typeof formMessageDefaults & { defaultSlot: string };

export const formMessageArgs: FormMessageArgs = {
    ...defaultArgs,
    ...formMessageDefaults,
    defaultSlot: '',
};

export const formMessageArgTypes: ArgTypes<FormMessageArgs> = {
    ...defaultArgTypes,
    for: {
        name: 'for',
        description: 'De id van het input element waarvoor de message getoond moet worden.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.STRING },
            defaultValue: { summary: formMessageArgs.for },
        },
    },
    state: {
        name: 'state',
        description: 'De state van het input element waarvoor de message getoond moet worden.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: 'ValidityState' },
            defaultValue: { summary: formMessageArgs.state },
        },
    },
    show: {
        name: 'show',
        description:
            'Duidt aan of de message getoond moet worden.<br>Dit kan gebruikt worden om de message manueel te tonen of te verbergen.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: formMessageArgs.show },
        },
    },
    preLine: {
        name: 'preLine',
        description: 'Duidt aan of de nieuwe lijnen (`\n`) in de message behouden worden.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: formMessageArgs.preLine },
        },
    },
    defaultSlot: {
        name: '[default]',
        description: 'De inhoud van de message.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: formMessageArgs.defaultSlot },
        },
    },
};
