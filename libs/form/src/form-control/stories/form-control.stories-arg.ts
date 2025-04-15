import { CATEGORIES, TYPES, defaultArgs, defaultArgTypes } from '@domg-wc/common-storybook';
import { formControlDefaults } from '../form-control.defaults';
import { ArgTypes } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';

type FormControlArgs = typeof defaultArgs & typeof formControlDefaults & { onVlReset: () => void };

export const formControlArgs: FormControlArgs = {
    ...defaultArgs,
    ...formControlDefaults,
    onVlReset: action('vl-reset'),
};

export const formControlArgTypes: ArgTypes<FormControlArgs> = {
    ...defaultArgTypes(true),
    id: {
        name: 'id',
        description: 'Het id van het veld.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: formControlArgs.id },
        },
    },
    name: {
        name: 'name',
        description: 'De naam van het veld.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: formControlArgs.name },
        },
    },
    label: {
        name: 'label',
        description:
            'Vult het aria-label attribuut van het veld in.<br/>Kan gebruikt worden als er geen bijhorend label element of vl-form-label component is.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: formControlArgs.label },
        },
    },
    required: {
        name: 'required',
        description: 'Duidt aan dat het veld verplicht is.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: formControlArgs.required },
        },
    },
    disabled: {
        name: 'disabled',
        description: 'Beeldt de component in een disabled state af.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: formControlArgs.disabled },
        },
    },
    error: {
        name: 'error',
        description: 'Beeldt de component in een error state af.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: formControlArgs.error },
        },
    },
    success: {
        name: 'success',
        description: 'Beeldt de component in een success state af.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: formControlArgs.success },
        },
    },
    onVlReset: {
        name: 'vl-reset',
        description: 'Event dat afgevuurd wordt wanneer het veld gereset wordt.',
        table: {
            category: CATEGORIES.EVENTS,
        },
    },
};
