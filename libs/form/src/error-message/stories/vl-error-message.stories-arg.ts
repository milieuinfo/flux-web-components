import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components';
import { errorMessageDefaults } from '../vl-error-message.defaults';

type ErrorMessageArgs = typeof defaultArgs & typeof errorMessageDefaults & { defaultSlot: string };

export const errorMessageArgs: ErrorMessageArgs = {
    ...defaultArgs,
    ...errorMessageDefaults,
    defaultSlot: '',
};

export const errorMessageArgTypes: ArgTypes<ErrorMessageArgs> = {
    ...defaultArgTypes,
    for: {
        name: 'for',
        description: 'Het id van het input element waarvoor de error message getoond moet worden.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.STRING },
            defaultValue: { summary: errorMessageArgs.for },
        },
    },
    state: {
        name: 'state',
        description: 'De state van het input element waarvoor de error message getoond moet worden.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: 'ValidityState' },
            defaultValue: { summary: errorMessageArgs.state },
        },
    },
    show: {
        name: 'show',
        description:
            'Duidt aan of de error message getoond moet worden.<br>Dit kan gebruikt worden om de error message manueel te tonen of te verbergen.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: errorMessageArgs.show },
        },
    },
    preLine: {
        name: 'preLine',
        description: 'Duidt aan of de nieuwe lijnen (`\n`) in de  error message behouden worden.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: errorMessageArgs.preLine },
        },
    },
    defaultSlot: {
        name: '[default]',
        description: 'De inhoud van de error message.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: errorMessageArgs.defaultSlot },
        },
    },
};
