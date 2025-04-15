import { CATEGORIES, CONTROLS, getSelectControlOptions, TYPES } from '@domg-wc/common-storybook';
import { action } from '@storybook/addon-actions';
import { ArgTypes } from '@storybook/web-components';
import { formControlArgs, formControlArgTypes } from '../../form-control/stories/form-control.stories-arg';
import { selectRichDefaults } from '../vl-select-rich.defaults';
import { SelectRichPosition } from '../vl-select-rich.model';

type SelectRichArgs = typeof formControlArgs &
    typeof selectRichDefaults & {
        onVlChange: () => void;
        onVlInput: () => void;
        onVlSelectSearch: () => void;
        onVlValid: () => void;
    };

export const selectRichArgs: SelectRichArgs = {
    ...formControlArgs,
    ...selectRichDefaults,
    onVlChange: action('vl-change'),
    onVlInput: action('vl-input'),
    onVlSelectSearch: action('vl-select-search'),
    onVlValid: action('vl-valid'),
};

export const selectRichArgTypes: ArgTypes<SelectRichArgs> = {
    ...formControlArgTypes,
    placeholder: {
        name: 'placeholder',
        description: 'De placeholder tekst.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: selectRichArgs.placeholder },
        },
    },
    notDeletable: {
        name: 'not-deletable',
        description: 'Duidt aan dat de selectie niet-verwijderbaar is.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: selectRichArgs.notDeletable },
        },
    },
    multiple: {
        name: 'multiple',
        description: 'Duidt aan dat je meerdere opties kan selecteren.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: selectRichArgs.multiple },
        },
    },
    search: {
        name: 'search',
        description:
            'Duidt aan dat je kan zoeken in de opties.<br>De zoekfunctie staat standaard aan als je de multiple select gebruikt.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: selectRichArgs.search },
        },
    },
    position: {
        name: 'position',
        description: 'De positie van de dropdown.<br>Dit attribuut is niet reactief.',
        control: { type: CONTROLS.SELECT },
        options: Object.values(SelectRichPosition),
        table: {
            type: { summary: getSelectControlOptions(Object.values(SelectRichPosition)) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: selectRichArgs.position },
        },
    },
    resultLimit: {
        name: 'result-limit',
        description: 'Het maximum aantal resultaten dat getoond wordt.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: selectRichArgs.resultLimit },
        },
    },
    noResultsText: {
        name: 'no-results-text',
        description: 'De tekst die getoond wordt als er geen resultaten zijn.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: selectRichArgs.noResultsText },
        },
    },
    noChoicesText: {
        name: 'no-choices-text',
        description:
            'De tekst die getoond wordt als er geen resterende opties zijn.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: selectRichArgs.noChoicesText },
        },
    },
    searchPlaceholder: {
        name: 'search-placeholder',
        description: 'De placeholder tekst van het zoekveld.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: selectRichArgs.searchPlaceholder },
        },
    },
    options: {
        name: 'options',
        description: 'De opties die geselecteerd kunnen worden.<br>Zie de documentatie pagina voor meer info.',
        table: {
            type: { summary: 'SelectRichOption' },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: selectRichArgs.options },
        },
    },
    onVlChange: {
        name: 'vl-change',
        description:
            'Event dat afgevuurd wordt als er een optie selecteerd of verwijderd wordt.<br>Het detail object van het event bevat de waarde van de geselecteerde optie.<br>Bij de multiselect bevat het detail object een array van waarden van de geselecteerde opties.',
        table: {
            type: { summary: '{ value: string | string[] }' },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlInput: {
        name: 'vl-input',
        description:
            'Event dat enkel afgevuurd wordt als de gebruiker een optie selecteert of verwijdert.<br>Het detail object van het event bevat de waarde van de geselecteerde optie.<br>Bij de multiselect bevat het detail object een array van waarden van de geselecteerde opties.',
        table: {
            type: { summary: '{ value: string | string[] }' },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlSelectSearch: {
        name: 'vl-select-search',
        description: 'Event dat afgevuurd wordt als er een waarde ingegeven wordt in het zoekveld.',
        table: {
            type: { summary: '{ value: string }' },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlValid: {
        name: 'vl-valid',
        description:
            'Event dat afgevuurd wordt als de select valid is.<br>Het detail object van het event bevat de waarde van de geselecteerde optie.<br>Bij de multiselect bevat het detail object een array van waarden van de geselecteerde opties.',
        table: {
            type: { summary: '{ value: string | string[] }' },
            category: CATEGORIES.EVENTS,
        },
    },
};
