import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components';

export const mapActionControlArgs = {
    ...defaultArgs,
    actionId: '',
    icon: '',
    label: '',
    defaultActive: false,
};

export const mapActionControlArgTypes: ArgTypes<typeof mapActionControlArgs> = {
    ...defaultArgTypes(),
    actionId: {
        name: 'data-vl-action-id',
        description:
            'Het id van de actie die gelinkt is aan deze map-action-control.<br>Houd dit in sync met het id attribuut dat je op de actie plaatst.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapActionControlArgs.actionId },
        },
    },
    icon: {
        name: 'data-vl-icon',
        description: 'Het icoon van de toggle-button.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapActionControlArgs.icon },
        },
    },
    label: {
        name: 'data-vl-label',
        description: 'Het label van de toggle-button.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapActionControlArgs.label },
        },
    },
    defaultActive: {
        name: 'data-vl-default-active',
        description: 'Voeg `default-active` toe om de control default te activeren bij het renderen.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: mapActionControlArgs.defaultActive },
        },
    },
};
