import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
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
            defaultValue: { summary: String(formMessageArgs.for) },
        },
    },
    state: {
        name: 'state',
        description:
            'De `ValidityState`-sleutel waarvoor de message getoond moet worden. Gebruik `state="valid"` voor een success-boodschap (groen) die automatisch verschijnt zodra het veld geldig is na een eerste validatie.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: 'ValidityState' },
            defaultValue: { summary: String(formMessageArgs.state) },
        },
    },
    variant: {
        name: 'variant',
        description:
            'De visuele stijl van de message: `error` (default), `success` of `annotation`. Gebruik `annotation` voor een altijd zichtbare, informatieve tekst. De success-stijl wordt ook automatisch toegepast bij `state="valid"`.',
        control: { type: 'select' },
        options: ['error', 'success', 'annotation'],
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: 'error | success | annotation' },
            defaultValue: { summary: String(formMessageArgs.variant) },
        },
    },
    show: {
        name: 'show',
        description:
            'Duidt aan of de message getoond moet worden.<br>Dit kan gebruikt worden om de message manueel te tonen of te verbergen.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: String(formMessageArgs.show) },
        },
    },
    preLine: {
        name: 'preLine',
        description: 'Duidt aan of de nieuwe lijnen (`\n`) in de message behouden worden.',
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: { summary: TYPES.BOOLEAN },
            defaultValue: { summary: String(formMessageArgs.preLine) },
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
