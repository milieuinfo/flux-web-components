import { CATEGORIES, TYPES } from '@domg-wc/common-storybook';
import { ArgTypes } from '@storybook/web-components';
import { textareaArgs, textareaArgTypes } from '../../textarea/stories/vl-textarea.stories-arg';
import { textareaRichDefaults } from '../vl-textarea-rich.defaults';

type TextareaRichArgs = typeof textareaArgs & typeof textareaRichDefaults;

export const textareaRichArgs: TextareaRichArgs = {
    ...textareaArgs,
    ...textareaRichDefaults,
};

export const textareaRichArgTypes: ArgTypes<TextareaRichArgs> = {
    ...textareaArgTypes,
    toolbar: {
        name: 'toolbar',
        description:
            'TinyMCE toolbar configuratie.<br/>Zie de documentatie pagina voor meer info.<br/>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: textareaRichArgs.toolbar },
        },
    },
    plugins: {
        name: 'plugins',
        description:
            'TinyMCE plugin configuratie.<br/>Zie de documentatie pagina voor meer info.<br/>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: textareaRichArgs.plugins },
        },
    },
    preview: {
        name: 'preview',
        description:
            'Beeldt de value af in preview mode.<br/>Er wordt geen TinyMCE toolbar getoond en de value is niet aanpasbaar.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: textareaRichArgs.preview },
        },
    },
    customConfig: {
        name: 'customConfig',
        description:
            'TinyMCE custom configuratie.<br/>Deze property kan gebruikt worden om custom configuratie mee te geven voor TinyMCE, als ook om configuratie mee te geven voor plugins.<br/>Deze property is niet reactief.',
        table: {
            type: { summary: '{ key: value }' },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: textareaRichArgs.customConfig },
        },
    },
};
