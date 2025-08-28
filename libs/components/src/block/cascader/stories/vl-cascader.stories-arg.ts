import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { cascaderDefaults } from '../vl-cascader.defaults';
import { CASCADER_SLOTS } from '../vl-cascader.model';
import { action } from 'storybook/actions';

export type CascaderArgs = typeof cascaderDefaults &
    typeof defaultArgs & {
        homeSlot: string;
        headerSlot: string;
        onVlClickBreadcrumb: () => void;
    };

export const cascaderArgs: CascaderArgs = {
    ...defaultArgs,
    ...cascaderDefaults,
    homeSlot: '',
    headerSlot: '',
    onVlClickBreadcrumb: action('vl-click-breadcrumb'),
};

export const cascaderArgTypes: ArgTypes<CascaderArgs> = {
    ...defaultArgTypes,
    headerText: {
        name: 'header-text',
        description: 'Hiermee kan je de tekst instellen voor de header.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: cascaderArgs.headerText },
        },
    },
    headerSlot: {
        name: CASCADER_SLOTS.HEADER,
        description: 'Hiermee kan je de standaard header vervangen door een header naar keuze.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: cascaderArgs.headerSlot },
        },
    },
    breadcrumbPlaceholder: {
        name: CASCADER_SLOTS.BREADCRUMB_PLACEHOLDER,
        description:
            'Hiermee kan je een breadcrumb placeholder instellen. Zichtbaar wanneer breadcrumb niet zichtbaar is.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: cascaderArgs.breadcrumbPlaceholder },
        },
    },
    level: {
        name: 'level',
        description:
            'Huidige niveau in de hiërarchie.\n\nDit attribuut kan je aanpassen om terug te gaan naar een lager niveau.',
        table: {
            type: { summary: TYPES.NUMBER },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(cascaderArgs.level) },
        },
    },
    homeSlot: {
        name: CASCADER_SLOTS.HOME,
        description: 'Hiermee kan je het `' + CASCADER_SLOTS.HOME + '`-slot instellen.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: cascaderArgs.homeSlot },
        },
    },
    hideBreadcrumb: {
        name: 'hide-breadcrumb',
        description: 'Verbergt breadcrumb navigatie.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(cascaderArgs.hideBreadcrumb) },
        },
    },
    loading: {
        name: 'loading',
        description: 'Geeft weer dat data wordt geladen. Is reactief.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(cascaderArgs.loading) },
        },
    },
    itemListFn: {
        name: 'itemListFn',
        description:
            'Laat toe om een promise mee te geven wanneer dynamisch data moet opgehaald. Dit werkt enkel in combinatie met de `nodes`-property waarbij `requestParams` ingesteld staan.\n\nKan niet aangepast worden in Storybook. \n\n Raadpleeg de [documentatie](?path=/docs/components-cascader--cascader-default#cascader-met-dynamisch-ophalen-van-kind-elementen) voor meer info.',
        control: false,
        table: {
            disable: true,
            type: { summary: TYPES.FUNCTION },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: String(cascaderArgs.itemListFn) },
        },
    },
    items: {
        name: 'nodes',
        description:
            'Om de data-structuur van de cascader programmatorisch in te stellen.\n\n Raadpleeg [documentatie](?path=/docs/components-cascader--cascader-property-binding#cascader-met-property-binding) voor meer info.',
        table: {
            disable: true,
            type: { summary: TYPES.ARRAY },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: String(cascaderArgs.items) },
        },
    },
    loadingMessage: {
        name: 'loading-message',
        description: 'De boodschap die getoond wordt wanneer items aan het laden zijn.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: cascaderArgs.loadingMessage },
        },
    },
    templates: {
        name: 'templates',
        description:
            'Laat toe om alternatieve templates voor de cascader-items in te stellen.\n\nKan niet aangepast worden in Storybook.\n\n Raadpleeg de documentatie voor meer informatie.',
        control: false,
        table: {
            disable: true,
            type: { summary: TYPES.MAP },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: String(cascaderArgs.templates) },
        },
    },
    onVlClickBreadcrumb: {
        name: 'vl-click-breadcrumb',
        description:
            'Event dat afgevuurd wordt als op een breadcrumb item wordt geklikt.<br>Het detail object van het event bevat het gekozen niveau en het label van de breadcrumb.',
        table: {
            type: { summary: '{ index: number, label?: string }' },
            category: CATEGORIES.EVENTS,
        },
    },
};
