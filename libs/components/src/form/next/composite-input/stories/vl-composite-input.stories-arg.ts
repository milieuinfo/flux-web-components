import { CATEGORIES, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { action } from 'storybook/actions';
import { formControlArgs, formControlArgTypes } from '../../../form-control/stories/form-control.stories-arg';

type CompositeInputArgs = typeof formControlArgs & {
    customValidator: string;
    defaultSlot: string;
    onVlChange: () => void;
    onVlValid: () => void;
};

export const compositeInputArgs: CompositeInputArgs = {
    ...formControlArgs,
    customValidator: '',
    defaultSlot: '',
    onVlChange: action('vl-change'),
    onVlValid: action('vl-valid'),
};

export const compositeInputArgTypes: ArgTypes<CompositeInputArgs> = {
    ...formControlArgTypes,
    customValidator: {
        name: 'customValidator',
        description:
            'Functie die de velden samen controleert.<br>Krijgt de waarden per <code>name</code> van elk kind en geeft een string terug om af te keuren, of null wanneer alles in orde is.',
        table: {
            type: { summary: 'CompositeCustomValidator' },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: String(compositeInputArgs.customValidator) },
        },
    },
    defaultSlot: {
        name: 'default slot (vereist)',
        description: 'De velden die samen het samengestelde veld vormen. Geef elk veld een eigen <code>name</code>.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: String(compositeInputArgs.defaultSlot) },
        },
    },
    onVlChange: {
        name: 'vl-change',
        description: 'Event dat afgevuurd wordt wanneer een van de velden een andere waarde krijgt.',
        table: {
            category: CATEGORIES.EVENTS,
        },
    },
    onVlValid: {
        name: 'vl-valid',
        description: 'Event dat afgevuurd wordt wanneer het samengestelde veld geldig is.',
        table: {
            category: CATEGORIES.EVENTS,
        },
    },
};
