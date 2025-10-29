import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const prozaMessagePreloaderArgs = {
    ...defaultArgs,
    baseUrl: '',
    domain: '',
};

export const prozaMessagePreloaderArgTypes: ArgTypes<typeof prozaMessagePreloaderArgs> = {
    ...defaultArgTypes,
    baseUrl: {
        name: 'base-url',
        description: "Optionele baseUrl waarvan de Proza berichten opgehaald worden.<br>Indien deze baseUrl niet" +
            " meegegeven wordt, worden de Proza berichten opgehaald relatief tov de huidige url op het pad" +
            " 'proza/domein/{domain}'.<br>Dit attribuut is niet reactief.",
        control: false,
        table: {
            type: { summary: TYPES.URL },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: prozaMessagePreloaderArgs.baseUrl },
        },
    },
    domain: {
        name: 'domain',
        description: 'Het Proza domein waarin de Proza berichten zit.',
        type: { name: TYPES.STRING, required: true },
        control: false,
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: prozaMessagePreloaderArgs.domain },
        },
    },
};
