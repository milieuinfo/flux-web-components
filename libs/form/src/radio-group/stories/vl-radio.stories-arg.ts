import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@domg-wc/common-storybook';
import { action } from '@storybook/addon-actions';
import { ArgTypes } from '@storybook/web-components';
import { radioDefaults } from '../vl-radio.defaults';

type RadioArgs = typeof defaultArgs &
    typeof radioDefaults & {
        defaultSlot: string;
        onVlChange: () => void;
        onVlInput: () => void;
        onVlValid: () => void;
    };

export const radioArgs: RadioArgs = {
    ...defaultArgs,
    ...radioDefaults,
    defaultSlot: '',
    onVlChange: action('vl-change'),
    onVlInput: action('vl-input'),
    onVlValid: action('vl-valid'),
};

export const radioArgTypes: ArgTypes<RadioArgs> = {
    ...defaultArgTypes(true),
    id: {
        name: 'id',
        description: 'Het id van het veld.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: radioArgs.id },
        },
    },
    value: {
        name: 'value',
        description: 'De value van de radio.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: radioArgs.value },
        },
    },
    name: {
        name: 'name',
        description: 'De naam van het veld.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: radioArgs.name },
        },
    },
    label: {
        name: 'label',
        description:
            'Het label van het veld.<br>Standaard wordt de tekst van het bijhorende label element gebruikt, indien dit niet aanwezig is of geen tekst bevat kan je dit attribuut gebruiken om het label te definiëren.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: radioArgs.label },
        },
    },
    block: {
        name: 'block',
        description: 'Duidt aan dat de component de volledige breedte van zijn parent mag innemen.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: radioArgs.block },
        },
    },
    readonly: {
        name: 'readonly',
        description: 'Duidt aan dat het veld enkel leesbaar is.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: radioArgs.readonly },
        },
    },
    disabled: {
        name: 'disabled',
        description: 'Beeldt de component in een disabled state af.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: radioArgs.disabled },
        },
    },
    error: {
        name: 'error',
        description: 'Beeldt de component in een error state af.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: radioArgs.error },
        },
    },
    success: {
        name: 'success',
        description: 'Beeldt de component in een success state af.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: radioArgs.success },
        },
    },
    checked: {
        name: 'checked',
        description: 'Vinkt de radio aan of uit.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: radioArgs.checked },
        },
    },
    defaultSlot: {
        name: '[default]',
        description: 'De content van de radio.',
        table: {
            category: CATEGORIES.SLOTS,
            type: { summary: TYPES.HTML },
            defaultValue: { summary: radioArgs.defaultSlot },
        },
    },
    onVlChange: {
        name: 'vl-change',
        description:
            'Event dat afgevuurd wordt als de radio aangevinkt of uitgevinkt wordt (zowel programmatorisch als door een gebruiker).<br>Het detail object van het event bevat de checked state en de waarde van de radio.',
        table: {
            type: { summary: '{ checked: boolean, value?: string }' },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlInput: {
        name: 'vl-input',
        description:
            'Event dat afgevuurd wordt als de radio aangevinkt wordt.<br>Het detail object van het event bevat de checked state en de waarde van de radio.',
        table: {
            type: { summary: '{ checked: boolean, value?: string }' },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlValid: {
        name: 'vl-valid',
        description:
            'Event dat afgevuurd wordt als de radio aangevinkt wordt.<br>Het detail object van het event bevat de checked state en de waarde van de radio.',
        table: {
            type: { summary: '{ checked: boolean, value?: string }' },
            category: CATEGORIES.EVENTS,
        },
    },
};
