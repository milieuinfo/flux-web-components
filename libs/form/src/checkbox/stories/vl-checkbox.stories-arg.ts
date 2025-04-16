import { CATEGORIES, TYPES } from '@resources/utils-storybook';
import { action } from '@storybook/addon-actions';
import { ArgTypes } from '@storybook/web-components';
import { formControlArgs, formControlArgTypes } from '../../form-control/stories/form-control.stories-arg';
import { checkboxDefaults } from '../vl-checkbox.defaults';

type CheckboxArgs = typeof formControlArgs &
    typeof checkboxDefaults & {
        contentSlot: string;
        onVlChange: () => void;
        onVlInput: () => void;
        onVlValid: () => void;
    };

export const checkboxArgs: CheckboxArgs = {
    ...formControlArgs,
    ...checkboxDefaults,
    contentSlot: '',
    onVlChange: action('vl-change'),
    onVlInput: action('vl-input'),
    onVlValid: action('vl-valid'),
};

export const checkboxArgTypes: ArgTypes<CheckboxArgs> = {
    ...formControlArgTypes,
    block: {
        name: 'block',
        description: 'Duidt aan dat de component de volledige breedte van zijn parent mag innemen.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: checkboxArgs.block },
        },
    },
    id: {
        name: 'id',
        description: 'De id van het veld.<br>Bij de switch variant moet je een id instellen.',
        type: { name: 'boolean', required: true },
        table: {
            type: { summary: TYPES.STRING, required: true },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: formControlArgs.id },
        },
    },
    value: {
        name: 'value',
        description: 'De value van de checkbox.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: checkboxArgs.value },
        },
    },
    checked: {
        name: 'checked',
        description: 'Vinkt de checkbox aan of uit.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: checkboxArgs.checked },
        },
    },
    isSwitch: {
        name: 'switch',
        description: 'Beeldt de checkbox af als een switch.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: checkboxArgs.isSwitch },
        },
    },
    contentSlot: {
        name: 'content',
        description: 'De content van de checkbox.',
        table: {
            category: CATEGORIES.SLOTS,
            type: { summary: TYPES.HTML },
            defaultValue: { summary: checkboxArgs.contentSlot },
        },
    },
    onVlChange: {
        name: 'vl-change',
        description:
            'Event dat afgevuurd wordt als de checkbox aangevinkt of uitgevinkt wordt (zowel programmatorisch als door een gebruiker).<br>Het detail object van het event bevat de checked state en de waarde van de checkbox indien deze aangevinkt is.',
        table: {
            type: { summary: '{ value: string }' },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlInput: {
        name: 'vl-input',
        description:
            'Event dat alleen afgevuurd wordt als de gebruiker de checkbox aanvinkt of uitvinkt.<br>Het detail object van het event bevat de checked state en de waarde van de checkbox indien deze aangevinkt is.',
        table: {
            type: { summary: '{ checked: boolean, value?: string }' },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlValid: {
        name: 'vl-valid',
        description:
            'Event dat afgevuurd wordt als de checkbox valid is.<br>Het detail object van het event bevat de checked state en de waarde van de checkbox indien deze aangevinkt is.',
        table: {
            type: { summary: '{ checked: boolean, value?: string }' },
            category: CATEGORIES.EVENTS,
        },
    },
};
