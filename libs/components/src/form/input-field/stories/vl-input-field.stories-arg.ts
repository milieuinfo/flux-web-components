import { CATEGORIES, CONTROLS, TYPES } from '@resources/utils-storybook';
import { action } from '@storybook/addon-actions';
import { ArgTypes } from '@storybook/web-components';
import { formControlArgs, formControlArgTypes } from '../../form-control/stories/form-control.stories-arg';
import { inputFieldDefaults } from '../vl-input-field.defaults';

type InputFieldArgs = typeof formControlArgs &
    typeof inputFieldDefaults & { onVlChange: () => void; onVlInput: () => void; onVlValid: () => void };

export const inputFieldArgs: InputFieldArgs = {
    ...formControlArgs,
    ...inputFieldDefaults,
    onVlChange: action('vl-change'),
    onVlInput: action('vl-input'),
    onVlValid: action('vl-valid'),
};

export const inputFieldArgTypes: ArgTypes<InputFieldArgs> = {
    ...formControlArgTypes,
    block: {
        name: 'block',
        description: 'Duidt aan dat de component de volledige breedte van zijn parent mag innemen.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: inputFieldArgs.block },
        },
    },
    readonly: {
        name: 'readonly',
        description: 'Duidt aan dat het veld enkel `readonly` is.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: inputFieldArgs.readonly },
        },
    },
    type: {
        name: 'type',
        description:
            'Het type van het input veld.<br>Voor meer informatie over de mogelijke types kan je terecht op [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types).',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: inputFieldArgs.type },
        },
    },
    value: {
        name: 'value',
        description: 'De waarde van het input veld.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: inputFieldArgs.value },
        },
    },
    placeholder: {
        name: 'placeholder',
        description: 'De placeholder van het input veld.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: inputFieldArgs.placeholder },
        },
    },
    autocomplete: {
        name: 'autocomplete',
        description:
            'De autocomplete van het veld. Dit moet een waarde zijn die door de browser ondersteund wordt.<br>Een lijst van waarden kan je vinden op [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values).',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: inputFieldArgs.autocomplete },
        },
    },
    minLength: {
        name: 'min-length',
        description: 'Het minimum aantal karakters dat je kan ingeven.',
        control: { type: CONTROLS.NUMBER },
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: inputFieldArgs.minLength },
        },
    },
    maxLength: {
        name: 'max-length',
        description: 'Het maximum aantal karakters dat je kan ingeven.',
        control: { type: CONTROLS.NUMBER },
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: inputFieldArgs.maxLength },
        },
    },
    min: {
        name: 'min',
        description: 'De minimum waarde die je kan ingeven.',
        control: { type: CONTROLS.NUMBER },
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: inputFieldArgs.min },
        },
    },
    max: {
        name: 'max',
        description: 'De maximum waarde die je kan ingeven.',
        control: { type: CONTROLS.NUMBER },
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: inputFieldArgs.max },
        },
    },
    minExclusive: {
        name: 'min-exclusive',
        description: 'Bij het gebruik van het min attribuut moet de waarde hoger zijn dan de min waarde.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: inputFieldArgs.minExclusive },
        },
    },
    maxExclusive: {
        name: 'max-exclusive',
        description: 'Bij het gebruik van het max attribuut moet de waarde lager zijn dan de max waarde.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: inputFieldArgs.maxExclusive },
        },
    },
    pattern: {
        name: 'pattern',
        description:
            'Het patroon dat je moet volgen bij het ingeven van een waarde.<br>Dit kan gebruikt worden voor eenvoudige validatie.<br>Gebruik de `regex` property voor complexe validatie.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: inputFieldArgs.pattern },
        },
    },
    inputGroup: {
        name: 'input-group',
        description: 'Duidt aan dat de component deel is van een input-group.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: inputFieldArgs.inputGroup },
        },
    },
    regex: {
        name: 'regex',
        description:
            'Het patroon dat je moet volgen bij het ingeven van een waarde.<br>Dit kan gebruikt worden voor complexe validatie.',
        control: false,
        table: {
            type: { summary: TYPES.REGEX },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: inputFieldArgs.regex },
        },
    },
    onVlChange: {
        name: 'vl-change',
        description:
            'Event dat afgevuurd wordt als de waarde van het input veld verandert (zowel programmatorisch als door een gebruiker).<br>Het detail object van het event bevat de ingegeven waarde.',
        table: {
            type: { summary: '{ value: string }' },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlInput: {
        name: 'vl-input',
        description:
            'Event dat alleen afgevuurd wordt als de gebruiker de waarde van het input veld verandert.<br>Het detail object van het event bevat de ingegeven waarde.',
        table: {
            type: { summary: '{ value: string }' },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlValid: {
        name: 'vl-valid',
        description:
            'Event dat afgevuurd wordt als de waarde van het input veld valid is.<br>Het detail object van het event bevat de ingegeven waarde.',
        table: {
            type: { summary: '{ value: string }' },
            category: CATEGORIES.EVENTS,
        },
    },
};
