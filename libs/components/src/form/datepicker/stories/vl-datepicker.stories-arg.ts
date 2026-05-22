import { CATEGORIES, CONTROLS, getSelectControlOptions, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { formControlArgs, formControlArgTypes } from '../../form-control/stories/form-control.stories-arg';
import { datepickerDefaults } from '../vl-datepicker.defaults';
import { DATEPICKER_POSITIONS, DATEPICKER_TYPES } from '../vl-datepicker.model';
import { action } from 'storybook/actions';

type DatepickerArgs = typeof formControlArgs &
    typeof datepickerDefaults & {
        onVlChange: () => void;
        onVlInput: () => void;
        onVlValid: () => void;
        anchorPositioning: boolean;
    };

export const datepickerArgs: DatepickerArgs & { helperText?: string } = {
    ...formControlArgs,
    ...datepickerDefaults,
    onVlChange: action('vl-change'),
    onVlInput: action('vl-input'),
    onVlValid: action('vl-valid'),
    anchorPositioning: false,
    helperText: '',
};

export const datepickerArgTypes: ArgTypes<DatepickerArgs> = {
    ...formControlArgTypes,
    block: {
        name: 'block',
        description: 'Duidt aan dat de component de volledige breedte van zijn parent mag innemen.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(datepickerArgs.block) },
        },
    },
    readonly: {
        name: 'readonly',
        description: 'Duidt aan dat het veld enkel `readonly` is.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(datepickerArgs.readonly) },
        },
    },
    type: {
        name: 'type',
        description: 'Type van de datepicker',
        control: { type: CONTROLS.SELECT },
        options: DATEPICKER_TYPES,
        table: {
            type: { summary: getSelectControlOptions([...DATEPICKER_TYPES]) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: datepickerArgs.type },
        },
    },
    value: {
        name: 'value',
        description: 'De waarde van het veld.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: datepickerArgs.value },
        },
    },
    placeholder: {
        name: 'placeholder',
        description: 'De placeholder van het veld.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: datepickerArgs.placeholder },
        },
    },
    autocomplete: {
        name: 'autocomplete',
        description:
            'De autocomplete van het veld. Dit moet een waarde zijn die door de browser ondersteund wordt.<br>Een lijst van waarden kan je vinden op [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values).',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: datepickerArgs.autocomplete },
        },
    },
    format: {
        name: 'format',
        description:
            'Het formaat van de datum/tijd waarde. Voor een datum is het standaard formaat `d.m.Y` (-> 31.12.2019).<br>Voor tijd, is `H:i` het standaard formaat (-> 23:59).',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: datepickerArgs.format },
        },
    },
    minDate: {
        name: 'min-date',
        description: "Minimum datum conform het ingestelde formaat (bv. '01.01.2019') of 'today' voor vandaag.",
        control: { type: CONTROLS.DATE },
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: datepickerArgs.minDate },
        },
    },
    maxDate: {
        name: 'max-date',
        description: "Maximum datum conform het ingestelde formaat (bv. '31.12.2019') of 'today' voor vandaag.",
        control: { type: CONTROLS.DATE },
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: datepickerArgs.maxDate },
        },
    },
    minTime: {
        name: 'min-time',
        description:
            "Minimum tijd conform het ingestelde formaat (bv. '09:00').<br/>Enkel van toepassing bij type: `time` of `date-time`.",
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: datepickerArgs.minTime },
        },
    },
    maxTime: {
        name: 'max-time',
        description:
            "Maximum tijd conform het ingestelde format (bv. '17:00').<br/>Enkel van toepassing bij type: `time` of `date-time`.",
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: datepickerArgs.maxTime },
        },
    },
    amPm: {
        name: 'am-pm',
        description: 'Activeert de 12-uurs AM/PM timepicker.<br/>Enkel van toepassing bij type: `time` of `date-time`.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(datepickerArgs.amPm) },
        },
    },
    disableMaskValidation: {
        name: 'disable-mask-validation',
        description: 'Schakelt de automatische mask validatie uit.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(datepickerArgs.disableMaskValidation) },
        },
    },
    pattern: {
        name: 'pattern',
        description:
            'Het patroon dat je moet volgen bij het ingeven van een waarde.<br>Dit kan gebruikt worden voor eenvoudige validatie.<br>Gebruik de `regex` property voor complexe validatie.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: datepickerArgs.pattern },
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
            defaultValue: { summary: String(datepickerArgs.regex) },
        },
    },
    onVlInput: {
        name: 'vl-input',
        description:
            'Event dat alleen afgevuurd wordt als de gebruiker de waarde van het datepicker-input veld verandert.<br>Het detail object van het event bevat de ingegeven waarde.',
        table: {
            type: { summary: '{ value: string }' },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlChange: {
        name: 'vl-change',
        description:
            'Event dat afgevuurd wordt als de waarde van het datepicker-input veld verandert (zowel programmatorisch als door een gebruiker).<br>Het detail object van het event bevat de ingegeven waarde.',
        table: {
            type: { summary: '{ value: string }' },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlValid: {
        name: 'vl-valid',
        description:
            'Event dat afgevuurd wordt als de waarde van het datepicker-input veld valid is.<br>Het detail object van het event bevat de ingegeven waarde.',
        table: {
            type: { summary: '{ value: string }' },
            category: CATEGORIES.EVENTS,
        },
    },
    position: {
        name: 'position',
        description: 'Configuratie optie overgenomen van Flatpickr. (https://flatpickr.js.org/options/)',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: datepickerArgs.position },
        },
        options: DATEPICKER_POSITIONS,
        control: { type: 'select' },
    },
    isStatic: {
        name: 'static',
        description: 'Configuratie optie overgenomen van Flatpickr. (https://flatpickr.js.org/options/)',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(datepickerArgs.isStatic) },
        },
        control: false,
    },
    anchorPositioning: {
        name: 'anchor-positioning',
        description:
            'Activeert CSS Anchor Positioning + Popover API voor de kalender positionering. ' +
            'Dit zorgt ervoor dat de kalender correct wordt gepositioneerd in scrollbare containers ' +
            'en niet wordt afgekapt door overflow of transform op ancestor-elementen (bijv. in een modal).',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: 'false' },
        },
    },
};
