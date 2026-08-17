import { CATEGORIES, CONTROLS, getSelectControlOptions, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { formControlArgs, formControlArgTypes } from '../../form-control/stories/form-control.stories-arg';
import { selectRichDefaults } from '../vl-select-rich.defaults';
import {
    SelectRichItemTemplateFn,
    SelectRichOption,
    SelectRichPosition,
    SelectSearchStrategy,
} from '../vl-select-rich.model';
import { action } from 'storybook/actions';

type SelectRichArgs = typeof formControlArgs &
    typeof selectRichDefaults & {
        itemTemplate: SelectRichItemTemplateFn | undefined;
        onVlChange: () => void;
        onVlInput: () => void;
        onVlSelectSearch: () => void;
        onVlValid: () => void;
    };

export const selectRichArgs: SelectRichArgs = {
    ...formControlArgs,
    ...selectRichDefaults,
    itemTemplate: undefined as SelectRichItemTemplateFn | undefined,
    onVlChange: action('vl-change'),
    onVlInput: action('vl-input'),
    onVlSelectSearch: action('vl-select-search'),
    onVlValid: action('vl-valid'),
};

export const vestigingOptions: SelectRichOption[] = [
    {
        label: '0123.456.789',
        labelDescription: 'Industrieweg 123, 9876 Plaatsnaam',
        value: '0123456789',
        vestiging: 'Vestiging Hasselt',
    },
    {
        label: '0987.654.321',
        labelDescription: 'Nijverheidsstraat 45, 2300 Turnhout',
        value: '0987654321',
        vestiging: 'Vestiging Turnhout',
    },
    {
        label: 'Niet van toepassing',
        labelDescription: 'Er is geen bijhorende vestiging',
        value: 'geen-vestiging',
    },
] as SelectRichOption[];

export const vestigingItemTemplate: SelectRichItemTemplateFn = (option) => html`
    <div class="vl-stacked">
        <vl-text bold>${option.label}</vl-text>
        ${(option as { vestiging?: string }).vestiging
            ? html`<vl-text annotation>${(option as { vestiging?: string }).vestiging}</vl-text>`
            : nothing}
        <vl-text annotation>${option.labelDescription}</vl-text>
    </div>
`;

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
    itemTemplate: {
        name: 'itemTemplate',
        description:
            'Bepaalt zelf de inhoud van een optie in de dropdown.<br>Niet reactief en niet aanpasbaar in' +
            ' Storybook.' +
            '<br>Zie de [documentatie](/docs/components-form-select-rich--documentatie#itemtemplate)' +
            ' voor meer info.',
        control: false,
        table: {
            category: CATEGORIES.PROPERTIES,
            type: { summary: TYPES.FUNCTION },
            defaultValue: { summary: String(selectRichArgs.itemTemplate) },
        },
    },
    notDeletable: {
        name: 'not-deletable',
        description: 'Duidt aan dat de selectie niet-verwijderbaar is.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(selectRichArgs.notDeletable) },
        },
    },
    multiple: {
        name: 'multiple',
        description: 'Duidt aan dat je meerdere opties kan selecteren.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(selectRichArgs.multiple) },
        },
    },
    search: {
        name: 'search',
        description:
            'Duidt aan dat je kan zoeken in de opties.<br>De zoekfunctie staat standaard ' +
            'aan als je de multiple select gebruikt.<br>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(selectRichArgs.search) },
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
            defaultValue: { summary: String(selectRichArgs.resultLimit) },
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
    searchStrategy: {
        name: 'search-strategy',
        description: 'De zoek strategie die gebruikt wordt bij het zoeken in de opties.<br>Dit attribuut is reactief.',
        control: { type: CONTROLS.SELECT },
        options: Object.values(SelectSearchStrategy),
        table: {
            type: { summary: getSelectControlOptions(Object.values(SelectSearchStrategy)) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: selectRichArgs.searchStrategy },
        },
    },
    initialOptions: {
        name: 'initial-options',
        description:
            'De standaard opties die geselecteerd kunnen worden. Bij een reset van de form worden deze opties ' +
            'getoond.<br>Niet dynamisch.<br>Zie de documentatie pagina voor meer info.',
        table: {
            type: { summary: 'SelectRichOption' },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: String(selectRichArgs.initialOptions) },
        },
    },
    options: {
        name: 'options',
        description:
            'De opties die geselecteerd kunnen worden.<br>Zal de opties van de select-rich dynamisch bijwerken.' +
            '<br>Zie de documentatie pagina voor meer info.',
        table: {
            type: { summary: 'SelectRichOption' },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: String(selectRichArgs.options) },
        },
    },
    onVlChange: {
        name: 'vl-change',
        description:
            'Event dat afgevuurd wordt als er een optie selecteerd of verwijderd wordt.' +
            '<br>Het detail object van het event bevat de waarde van de geselecteerde optie.' +
            '<br>Bij de multiselect bevat het detail object een array van waarden van de geselecteerde opties.',
        table: {
            type: { summary: '{ value: string | string[] }' },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlInput: {
        name: 'vl-input',
        description:
            'Event dat enkel afgevuurd wordt als de gebruiker een optie selecteert of verwijdert.' +
            '<br>Het detail object van het event bevat de waarde van de geselecteerde optie.' +
            '<br>Bij de multiselect bevat het detail object een array van waarden van de geselecteerde opties.',
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
            'Event dat afgevuurd wordt als de select valid is.' +
            '<br>Het detail object van het event bevat de waarde van de geselecteerde optie.' +
            '<br>Bij de multiselect bevat het detail object een array van waarden van de geselecteerde opties.',
        table: {
            type: { summary: '{ value: string | string[] }' },
            category: CATEGORIES.EVENTS,
        },
    },
};
