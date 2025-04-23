import { ArgTypes } from '@storybook/web-components';
import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';

export const httpErrorMessageArgs = {
    ...defaultArgs,
    title: '',
    image: '',
    alt: '',
    errorCode: '',
    textSlot: '',
    actionsSlot: '',
};

export const httpErrorMessageArgTypes: ArgTypes<typeof httpErrorMessageArgs> = {
    ...defaultArgTypes,
    title: {
        name: 'title',
        type: { name: TYPES.STRING, required: false },
        description: 'Past de title van de error message aan.',
        table: {
            type: { summary: TYPES.STRING },
            defaultValue: { summary: httpErrorMessageArgs.title },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    image: {
        name: 'image',
        type: { name: TYPES.STRING, required: false },
        description: 'De URL voor de afbeelding die weergegeven moet worden.',
        table: {
            type: { summary: TYPES.STRING },
            defaultValue: { summary: httpErrorMessageArgs.image },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    alt: {
        name: 'image-alt',
        type: { name: TYPES.STRING, required: false },
        description: 'Past de alternatieve tekst van de afbeelding aan.',
        table: {
            type: { summary: TYPES.STRING },
            defaultValue: { summary: httpErrorMessageArgs.alt },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    errorCode: {
        name: 'error-code',
        type: { name: TYPES.STRING, required: false },
        description: 'Geeft de default titel, afbeelding, tekst en actie voor een specifieke error code weer.',
        table: {
            type: { summary: TYPES.STRING },
            defaultValue: { summary: httpErrorMessageArgs.errorCode },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    textSlot: {
        name: 'text',
        description: 'Past de omschrijvende tekst onder de titel aan. Dit slot is niet reactief',
        table: {
            type: { name: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: httpErrorMessageArgs.textSlot },
        },
    },
    actionsSlot: {
        name: 'actions',
        description: 'Past de acties aan. Dit slot is niet reactief',
        table: {
            type: { name: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: httpErrorMessageArgs.actionsSlot },
        },
    },
};
