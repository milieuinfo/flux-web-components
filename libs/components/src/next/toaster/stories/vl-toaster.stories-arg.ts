import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@domg-wc/common-storybook';
import { ArgTypes } from '@storybook/web-components';
import { toasterDefaults } from '../vl-toaster.defaults';
import { TOASTER_PLACEMENT } from '../vl-toaster.model';

export type ToasterArgs = typeof defaultArgs &
    typeof toasterDefaults & {
        defaultSlot: string;
    };

export const toasterArgs = {
    ...defaultArgs,
    ...toasterDefaults,
    defaultSlot: '',
};

export const toasterArgTypes: ArgTypes = {
    ...defaultArgTypes(true),
    fadeOut: {
        name: 'fade-out',
        description: 'Elke alert verdwijnt automatisch 5 seconden na openen.<br>Dit attribuut is niet reactief.',
        table: {
            type: {
                summary: TYPES.BOOLEAN,
            },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: false },
        },
    },
    placement: {
        name: 'placement',
        description: 'Positioneert de toaster.<br>Standaard worden die geplaatst in de rechterbovenhoek.',
        options: Object.values(TOASTER_PLACEMENT),
        table: {
            type: {
                summary: Object.values(TOASTER_PLACEMENT),
            },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: 'top-right' },
        },
    },
    defaultSlot: {
        name: '[default]',
        description: 'De inhoud van de toaster. Dit is meestal een alert.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
};
