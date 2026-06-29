import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';
import { compositeInputDefaults } from '../vl-composite-input.defaults';

export type CompositeInputArgs = typeof defaultArgs & {
    id: string;
    name: string;
    label: string;
    required: boolean;
    disabled: boolean;
    error: boolean;
    success: boolean;
    firstSlot: string;
    secondSlot: string;
    onVlChange: () => void;
};

export const compositeInputArgs: CompositeInputArgs = {
    ...defaultArgs,
    ...compositeInputDefaults,
    id: 'coords',
    name: 'coords',
    label: 'Coördinaten',
    required: true,
    firstSlot: `<vl-input-field slot="first" label="X" type="number" min="0" max="100"></vl-input-field>`,
    secondSlot: `<vl-input-field slot="second" label="Y" type="number" min="0" max="100"></vl-input-field>`,
    onVlChange: action('vl-change'),
};

export const compositeInputArgTypes: ArgTypes<CompositeInputArgs> = {
    ...defaultArgTypes,
    id: {
        name: 'id',
        description: 'Id van de component. Koppelt vl-form-message via het for-attribuut.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(compositeInputArgs.id) },
        },
    },
    name: {
        name: 'name',
        description: 'Naam waaronder de component deelneemt aan het formulier. Submit als <name>-x en <name>-y.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(compositeInputArgs.name) },
        },
    },
    label: {
        name: 'label',
        description: 'Toegankelijke naam van de samengestelde control.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(compositeInputArgs.label) },
        },
    },
    required: {
        name: 'required',
        description: 'Maakt beide velden verplicht. Faalt met valueMissing zodra één van beide leeg is.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(compositeInputArgs.required) },
        },
    },
    disabled: {
        name: 'disabled',
        description: 'Schakelt de component uit.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(compositeInputArgs.disabled) },
        },
    },
    error: {
        name: 'error',
        description: 'Forceert de error-staat (programmatic validator).',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(compositeInputArgs.error) },
        },
    },
    success: {
        name: 'success',
        description: 'Forceert de success-staat.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(compositeInputArgs.success) },
        },
    },
    firstSlot: {
        name: 'first slot',
        description: 'Gebruik dit slot (slot="first") voor het eerste invoerveld. Draagt zelf min/max.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: String(compositeInputArgs.firstSlot) },
        },
    },
    secondSlot: {
        name: 'second slot',
        description: 'Gebruik dit slot (slot="second") voor het tweede invoerveld. Draagt zelf min/max.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: String(compositeInputArgs.secondSlot) },
        },
    },
    onVlChange: {
        name: 'vl-change',
        description: 'Event dat afgevuurd wordt wanneer een van de waarden wijzigt.',
        table: {
            type: { summary: '{ first: string; second: string }' },
            category: CATEGORIES.EVENTS,
        },
    },
};
