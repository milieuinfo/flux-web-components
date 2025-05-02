import { CAPTION_FORMAT, GROUP_BY } from '../vl-autocomplete.model';
import {
    CATEGORIES,
    CONTROLS,
    defaultArgs,
    defaultArgTypes,
    getSelectControlOptions,
    TYPES,
} from '@resources/utils-storybook';
import { DEFAULT_CAPTION_FORMAT, DEFAULT_MAX_MATCHES, DEFAULT_MIN_CHARS } from '../vl-autocomplete.defaults';
import { ArgTypes } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';

export const complexItems = [
    { title: 'Gent', subtitle: 'Gemeente', value: '1' },
    { title: 'Gentbos, Merelbeke', subtitle: 'Adres', value: '2' },
    { title: 'Gentbruggestraat, Gent', subtitle: 'Adres', value: '3' },
    { title: 'Gentele, Brugge', subtitle: 'Adres', value: '5' },
    { title: 'Automotive Contractors Gent ', subtitle: 'Project', value: '6' },
    { title: 'Buurtshuis Watersportbaan Gent', subtitle: 'Project', value: '7' },
];

export const autocompleteArgs = {
    ...defaultArgs,
    placeholder: '',
    initialValue: '',
    label: '',
    labelSmall: false,
    minChars: DEFAULT_MIN_CHARS,
    maxSuggestions: DEFAULT_MAX_MATCHES,
    captionFormat: CAPTION_FORMAT.TITLE_SUBTITLE_VERTICAL,
    groupBy: '',
    showClear: false,
    disableLoading: false,
    clearTooltip: 'Wissen',
    noMatchesText: 'Geen resultaat',
    items: [],
    search: action('search'),
};

export const autocompleteArgTypes: ArgTypes<typeof autocompleteArgs> = {
    ...defaultArgTypes,
    placeholder: {
        name: 'placeholder',
        description: 'Attribuut wordt gebruikt om de placeholder te bepalen.',
        table: {
            type: { summary: TYPES.STRING, required: false },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: autocompleteArgs.placeholder },
        },
    },
    initialValue: {
        name: 'initial-value',
        description: 'Attribuut wordt gebruikt om de initiële waarde te bepalen.',
        table: {
            type: { summary: TYPES.STRING, required: false },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: autocompleteArgs.initialValue },
        },
    },
    label: {
        name: 'label',
        description: 'Attribuut wordt gebruikt om de label te bepalen.',
        table: {
            type: { summary: TYPES.STRING, required: false },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: autocompleteArgs.label },
        },
    },
    labelSmall: {
        name: 'label-small',
        description: 'Attribuut wordt gebruikt om de label kleiner te maken.',
        table: {
            type: { summary: TYPES.BOOLEAN, required: false },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: autocompleteArgs.labelSmall },
        },
    },
    minChars: {
        name: 'min-chars',
        description:
            'Attribuut wordt gebruikt om te bepalen hoeveel karakters de gebruiker moet ingeven alvorens de suggesties getoond worden.',
        control: { type: CONTROLS.RANGE, min: 1, max: 10, step: 1 },
        table: {
            type: { summary: TYPES.NUMBER, required: false },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: autocompleteArgs.minChars },
        },
    },
    maxSuggestions: {
        name: 'max-suggestions',
        description: 'Attribuut wordt gebruikt om het maximum aantal suggesties dat moet getoond worden te bepalen.',
        control: { type: CONTROLS.RANGE, min: 1, max: 20, step: 1 },
        table: {
            type: { summary: TYPES.NUMBER, required: false },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: autocompleteArgs.maxSuggestions },
        },
    },
    captionFormat: {
        name: 'caption-format',
        description: 'Attribuut bepaalt wat er hoe moet getoond worden voor ieder item in de suggestielijst.',
        control: { type: CONTROLS.SELECT },
        options: Object.values(CAPTION_FORMAT),
        table: {
            category: CATEGORIES.ATTRIBUTES,
            type: {
                defaultValue: { summary: DEFAULT_CAPTION_FORMAT },
                summary: getSelectControlOptions(Object.values(CAPTION_FORMAT)),
                required: false,
            },
        },
    },
    groupBy: {
        name: 'group-by',
        description: 'Attribuut bepaalt hoe de items in de lijst gegroepeerd moeten worden.',
        control: { type: CONTROLS.SELECT },
        options: [GROUP_BY.TITLE, GROUP_BY.SUBTITLE],
        table: {
            type: {
                summary: getSelectControlOptions(Object.values(GROUP_BY)),
                required: false,
            },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: autocompleteArgs.groupBy },
        },
    },
    showClear: {
        name: 'show-clear',
        description: 'Attribuut wordt gebruikt te bepalen of het clear icoon moet tevoorschijn komen.',
        table: {
            type: { summary: TYPES.BOOLEAN, required: false },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: autocompleteArgs.showClear },
        },
    },
    disableLoading: {
        name: 'disable-loading',
        description: 'Bepaalt of loading animatie getoond wordt.',
        table: {
            type: { summary: TYPES.BOOLEAN, required: false },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: autocompleteArgs.disableLoading },
        },
    },
    clearTooltip: {
        name: 'clear-tooltip',
        description: 'Attribuut wordt gebruikt de tekst te bepalen die getoond moet worden bij hover van clear icon.',
        table: {
            type: { summary: TYPES.STRING, required: false },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: autocompleteArgs.clearTooltip },
        },
    },
    noMatchesText: {
        name: 'no-matches-text',
        description:
            'Attribuut wordt gebruikt de tekst te bepalen die getoond moet worden als er geen suggesties zijn.',
        table: {
            type: { summary: TYPES.STRING, required: false },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: autocompleteArgs.noMatchesText },
        },
    },
    items: {
        name: 'items',
        description: 'Use this property when you want to use a static list of items.',
        control: { type: CONTROLS.OBJECT },
        table: {
            category: CATEGORIES.PROPERTIES,
            type: { summary: TYPES.ARRAY },
            defaultValue: { summary: autocompleteArgs.items },
        },
    },
    search: {
        name: 'search',
        description:
            'This custom event is triggered when the user enters characters in de textbox while the component has no items specified. ' +
            'Use this event when you want to fill the suggestion list with items from an api call. Check out the WithInputAndApiCall story for more details.',
        table: {
            type: { summary: '-' },
            category: CATEGORIES.EVENTS,
        },
    },
};
