import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { textDefaults } from '../vl-text.defaults';

type TextArgs = typeof defaultArgs & typeof textDefaults & { defaultSlot: string };

export const textArgs: TextArgs = {
    ...defaultArgs,
    ...textDefaults,
    defaultSlot: '',
};

export const textArgTypes: ArgTypes<TextArgs> = {
    ...defaultArgTypes,
    bold: {
        name: 'bold',
        description: 'Toont de tekst in het vet.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(textDefaults.bold) },
        },
    },
    success: {
        name: 'success',
        description: 'Toont de tekst in de success-kleur.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(textDefaults.success) },
        },
    },
    warning: {
        name: 'warning',
        description: 'Toont de tekst in de warning-kleur.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(textDefaults.warning) },
        },
    },
    error: {
        name: 'error',
        description: 'Toont de tekst in de error-kleur.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(textDefaults.error) },
        },
    },
    italic: {
        name: 'italic',
        description: 'Toont de tekst cursief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(textDefaults.italic) },
        },
    },
    underline: {
        name: 'underline',
        description: 'Toont de tekst onderstreept.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(textDefaults.underline) },
        },
    },
    annotation: {
        name: 'annotation',
        description: 'Toont de tekst minder opvallend - hij krijgt een grijze kleur.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(textDefaults.annotation) },
        },
    },
    small: {
        name: 'small',
        description: 'Toont de tekst kleiner.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(textDefaults.small) },
        },
    },
    defaultSlot: {
        name: '[default]',
        description: 'De inhoud van de tekst.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: textArgs.defaultSlot },
        },
    },
};
