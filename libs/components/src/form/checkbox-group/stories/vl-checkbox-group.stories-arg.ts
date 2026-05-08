import { CATEGORIES, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';
import { formControlArgs, formControlArgTypes } from '../../form-control/stories/form-control.stories-arg';
import { checkboxGroupDefaults } from '../vl-checkbox-group.defaults';

type CheckboxGroupArgs = typeof formControlArgs &
    typeof checkboxGroupDefaults & { onVlChange: () => void; onVlInput: () => void; onVlValid: () => void };

export const checkboxGroupArgs: CheckboxGroupArgs = {
    ...formControlArgs,
    ...checkboxGroupDefaults,
    onVlChange: action('vl-change'),
    onVlInput: action('vl-input'),
    onVlValid: action('vl-valid'),
};

export const checkboxGroupArgTypes: ArgTypes<CheckboxGroupArgs> = {
    ...formControlArgTypes,
    readonly: {
        name: 'readonly',
        description: 'Duidt aan dat de groep enkel leesbaar is.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(checkboxGroupArgs.readonly) },
        },
    },
    block: {
        name: 'block',
        description: 'Duidt aan dat de checkboxes de volledige breedte van hun parent innemen.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(checkboxGroupArgs.block) },
        },
    },
    onVlChange: {
        name: 'vl-change',
        description:
            'Event dat afgevuurd wordt als een checkbox aangevinkt of uitgevinkt wordt.<br>Het detail object bevat de checked state en de waarde van de checkbox.',
        table: {
            type: { summary: '{ checked: boolean, value?: string }' },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlInput: {
        name: 'vl-input',
        description:
            'Event dat alleen afgevuurd wordt als een gebruiker een checkbox aanvinkt of uitvinkt.<br>Het detail object bevat de checked state en de waarde van de checkbox.',
        table: {
            type: { summary: '{ checked: boolean, value?: string }' },
            category: CATEGORIES.EVENTS,
        },
    },
    onVlValid: {
        name: 'vl-valid',
        description: 'Event dat afgevuurd wordt als de groep geldig is.',
        table: {
            type: { summary: '{ checked: boolean, value?: string }' },
            category: CATEGORIES.EVENTS,
        },
    },
};
