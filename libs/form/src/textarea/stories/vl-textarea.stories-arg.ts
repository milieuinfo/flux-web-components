import { CATEGORIES, CONTROLS, TYPES } from '@domg-wc/common-storybook';
import { action } from '@storybook/addon-actions';
import { ArgTypes } from '@storybook/web-components';
import { formControlArgs, formControlArgTypes } from '../../form-control/stories/form-control.stories-arg';
import { textareaDefaults } from '../vl-textarea.defaults';

type TextareaArgs = typeof formControlArgs &
    typeof textareaDefaults & { onVlChange: () => void; onVlInput: () => void; onVlValid: () => void };

export const textareaArgs: TextareaArgs = {
    ...formControlArgs,
    ...textareaDefaults,
    onVlChange: action('vl-change'),
    onVlInput: action('vl-input'),
    onVlValid: action('vl-valid'),
};

export const textareaArgTypes: ArgTypes<TextareaArgs> = {
    ...formControlArgTypes,
    block: {
        name: 'block',
        description: 'Duidt aan dat de component de volledige breedte van zijn parent mag innemen.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: textareaArgs.block },
        },
    },
    readonly: {
        name: 'readonly',
        description: 'Duidt aan dat het veld `readonly` is.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: textareaArgs.readonly },
        },
    },
    value: {
        name: 'value',
        description: 'De waarde van het textarea veld.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: textareaArgs.value },
        },
    },
    placeholder: {
        name: 'placeholder',
        description: 'De placeholder van het textarea veld.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: textareaArgs.placeholder },
        },
    },
    autocomplete: {
        name: 'autocomplete',
        description:
            'De autocomplete van het textarea veld. Dit moet een waarde zijn die door de browser ondersteund wordt.<br>Een lijst van waarden kan je vinden op [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values).',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: textareaArgs.autocomplete },
        },
    },
    minLength: {
        name: 'min-length',
        description: 'Het minimum aantal karakters dat je kan ingeven.',
        control: { type: CONTROLS.NUMBER },
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: textareaArgs.minLength },
        },
    },
    maxLength: {
        name: 'max-length',
        description: 'Het maximum aantal karakters dat je kan ingeven.',
        control: { type: CONTROLS.NUMBER },
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: textareaArgs.maxLength },
        },
    },
    rows: {
        name: 'rows',
        description: 'Het aantal rijen van het textarea veld.',
        control: { type: CONTROLS.NUMBER },
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: textareaArgs.rows },
        },
    },
    cols: {
        name: 'cols',
        description: 'Het aantal kolommen van het textarea veld.',
        control: { type: CONTROLS.NUMBER },
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: textareaArgs.cols },
        },
    },
    onVlChange: {
        name: 'vl-change',
        description:
            'Event dat afgevuurd wordt als de waarde van het textarea veld verandert (zowel programmatorisch als door een gebruiker).<br>Het detail object van het event bevat de ingegeven waarde.',
        table: {
            type: { summary: '{ value: string }' },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlInput: {
        name: 'vl-input',
        description:
            'Event dat alleen afgevuurd wordt als een gebruiker de waarde van het textarea veld verandert.<br>Het detail object van het event bevat de ingegeven waarde.',
        table: {
            type: { summary: '{ value: string }' },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlValid: {
        name: 'vl-valid',
        description:
            'Event dat afgevuurd wordt als de waarde van het textarea valid is.<br>Het detail object van het event bevat de ingegeven waarde.',
        table: {
            type: { summary: '{ value: string }' },
            category: CATEGORIES.EVENTS,
        },
    },
};
