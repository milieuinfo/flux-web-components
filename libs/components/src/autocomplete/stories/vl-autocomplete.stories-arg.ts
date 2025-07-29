import { CAPTION_FORMAT, GROUP_BY } from '../vl-autocomplete.model';
import {
    CATEGORIES,
    CONTROLS,
    defaultArgs,
    defaultArgTypes,
    getSelectControlOptions,
    TYPES,
} from '@domg-wc/common-storybook';
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
    selectedAutocomplete: action('selected-autocomplete'),
    clear: action('clear'),
};

export const autocompleteArgTypes: ArgTypes<typeof autocompleteArgs> = {
    ...defaultArgTypes(),
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
        name: 'data-vl-initial-value',
        description: 'Attribuut wordt gebruikt om de initiële waarde te bepalen.',
        table: {
            type: { summary: TYPES.STRING, required: false },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: autocompleteArgs.initialValue },
        },
    },
    label: {
        name: 'data-vl-label',
        description: 'Attribuut wordt gebruikt om het label te bepalen.',
        table: {
            type: { summary: TYPES.STRING, required: false },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: autocompleteArgs.label },
        },
    },
    labelSmall: {
        name: 'data-vl-label-small',
        description: 'Attribuut wordt gebruikt om het label kleiner te maken.',
        table: {
            type: { summary: TYPES.BOOLEAN, required: false },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: autocompleteArgs.labelSmall },
        },
    },
    minChars: {
        name: 'data-vl-min-chars',
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
        name: 'data-vl-max-suggestions',
        description: 'Attribuut wordt gebruikt om het maximum aantal suggesties dat getoond moet worden te bepalen.',
        control: { type: CONTROLS.RANGE, min: 1, max: 20, step: 1 },
        table: {
            type: { summary: TYPES.NUMBER, required: false },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: autocompleteArgs.maxSuggestions },
        },
    },
    captionFormat: {
        name: 'data-vl-caption-format',
        description: 'Attribuut bepaalt hoe ieder item in de suggestielijst getoond wordt.',
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
        name: 'data-vl-group-by',
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
        name: 'data-vl-show-clear',
        description: 'Attribuut wordt gebruikt om te bepalen of het clear-icoon getoond moet worden.',
        table: {
            type: { summary: TYPES.BOOLEAN, required: false },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: autocompleteArgs.showClear },
        },
    },
    disableLoading: {
        name: 'data-vl-disable-loading',
        description: 'Bepaalt of de laad-animatie getoond wordt.',
        table: {
            type: { summary: TYPES.BOOLEAN, required: false },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: autocompleteArgs.disableLoading },
        },
    },
    clearTooltip: {
        name: 'data-vl-clear-tooltip',
        description: 'Attribuut wordt gebruikt om de tekst te bepalen die getoond wordt bij hover van het clear-icoon.',
        table: {
            type: { summary: TYPES.STRING, required: false },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: autocompleteArgs.clearTooltip },
        },
    },
    noMatchesText: {
        name: 'data-vl-no-matches-text',
        description: 'Attribuut wordt gebruikt om de tekst te bepalen die getoond wordt als er geen suggesties zijn.',
        table: {
            type: { summary: TYPES.STRING, required: false },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: autocompleteArgs.noMatchesText },
        },
    },
    items: {
        name: 'items',
        description: 'Gebruik deze property wanneer je een statische lijst van items wilt gebruiken.',
        control: { type: CONTROLS.OBJECT },
        table: {
            category: CATEGORIES.PROPERTIES,
            type: { summary: TYPES.ARRAY },
            defaultValue: { summary: autocompleteArgs.items },
        },
    },
    search: {
        name: 'search',
        description: `Dit custom event wordt getriggerd wanneer de gebruiker karakters ingeeft in het tekstvak terwijl 
            de component geen items heeft. Gebruik dit event wanneer je de suggestielijst wilt vullen met items uit een 
            API-call. Bekijk de story "WithInputAndApiCall" voor meer details.`,
        table: {
            type: { summary: '-' },
            category: CATEGORIES.EVENTS,
        },
    },
    selectedAutocomplete: {
        name: 'selected-autocomplete',
        description: `Dit custom event wordt getriggerd wanneer de gebruiker een item selecteert uit de suggestielijst. 
            De geselecteerde waarde kan worden opgevraagd via het detail van het event.`,
        table: {
            type: { summary: '-' },
            category: CATEGORIES.EVENTS,
        },
    },
    clear: {
        name: 'clear',
        description: `Dit custom event wordt getriggerd wanneer de gebruiker het clear-icoon aanklikt.`,
        table: {
            type: { summary: '-' },
            category: CATEGORIES.EVENTS,
        },
    },
};
