import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components';

export const prozaMessageArgs = {
    ...defaultArgs,
    baseUrl: '',
    block: false,
    code: '',
    domain: '',
    parameters: '',
};

export const prozaMessageArgTypes: ArgTypes<typeof prozaMessageArgs> = {
    ...defaultArgTypes,
    baseUrl: {
        name: 'base-url',
        description: `Optionele baseUrl waarvan het Proza bericht opgehaald wordt.<br>Indien deze baseUrl niet meegegeven wordt, wordt het Proza bericht opgehaald relatief tov de huidige url op het pad 'proza/domein/{domain}/{code}'.<br>Dit attribuut is niet reactief.`,
        control: false,
        table: {
            type: { summary: TYPES.URL },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: prozaMessageArgs.baseUrl },
        },
    },
    block: {
        name: 'block',
        description: 'Duidt aan dat de inhoud van het Proza bericht een block element is.',
        control: false,
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: prozaMessageArgs.block },
        },
    },
    code: {
        name: 'code',
        description: 'De code die het Proza bericht identificeert.',
        type: { name: TYPES.STRING, required: true },
        control: false,
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: prozaMessageArgs.code },
        },
    },
    domain: {
        name: 'domain',
        description: 'Het Proza domein waarin het Proza bericht zit.',
        type: { name: TYPES.STRING, required: true },
        control: false,
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: prozaMessageArgs.domain },
        },
    },
    parameters: {
        name: 'parameters',
        description: 'De key/value parameters die verwerkt en getoond zullen worden in het content element.',
        control: false,
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: {
                summary: prozaMessageArgs.parameters,
            },
        },
    },
};
