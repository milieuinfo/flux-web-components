import { CATEGORIES, CONTROLS, defaultArgs, defaultArgTypes, ICON_PLACEMENT, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { toasterDefaults } from '../vl-toaster.defaults';
import { TOASTER_PLACEMENT } from '../vl-toaster.model';

export type ToasterArgs = typeof defaultArgs & typeof toasterDefaults & { defaultSlot: string };

export const toasterArgs = {
    ...defaultArgs,
    ...toasterDefaults,
    defaultSlot: '',
};

export const toasterArgTypes: ArgTypes<typeof toasterArgs> = {
    ...defaultArgTypes,
    fadeOut: {
        name: 'fade-out',
        description:
            'Elke alert verdwijnt automatisch 5 seconden na openen. \n\n Dit kan toegankelijkheidsproblemen' +
            ' veroorzaken. Meer info ' +
            '[hier](?path=/docs/components-block-toaster--documentatie#fade-out).',
        table: {
            type: {
                summary: TYPES.BOOLEAN,
            },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(toasterDefaults.fadeOut) },
        },
    },
    placement: {
        name: 'placement',
        description: 'Positioneert de toaster.<br>Standaard worden die geplaatst in de rechterbovenhoek.',
        control: { type: CONTROLS.SELECT },
        options: Object.values(TOASTER_PLACEMENT),
        table: {
            type: {
                summary: TYPES.STRING,
            },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(toasterDefaults.placement) },
        },
    },
    defaultSlot: {
        name: '[default]',
        description: 'De inhoud van de toaster. Dit is typisch een vl-alert.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
        },
    },
};
