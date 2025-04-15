import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@domg-wc/common-storybook';
import { ArgTypes } from '@storybook/web-components';
import { iconDefaults } from '../vl-icon.defaults';

type IconArgs = typeof defaultArgs & typeof iconDefaults;

export const iconArgs: IconArgs = {
    ...defaultArgs,
    ...iconDefaults,
};

export const iconArgTypes: ArgTypes<IconArgs> = {
    ...defaultArgTypes(true),
    icon: {
        name: 'icon',
        description: 'Het icoon dat moet afgebeeld worden.',
        type: { name: TYPES.STRING, required: true },
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: iconArgs.icon },
        },
    },
    small: {
        name: 'small',
        description: 'Beeldt het icoon klein af.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: iconArgs.small },
        },
    },
    large: {
        name: 'large',
        description: 'Beeldt het icoon groot af.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: iconArgs.large },
        },
    },
    light: {
        name: 'light',
        description: 'Beeldt het icoon licht af.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: iconArgs.light },
        },
    },
    rightMargin: {
        name: 'right-margin',
        description: 'Voegt een right-margin toe aan het icoon.<br/>Te gebruiken als het icoon voor een tekst staat.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: iconArgs.rightMargin },
        },
    },
    leftMargin: {
        name: 'left-margin',
        description: 'Voegt een left-margin toe aan het icoon.<br/>Te gebruiken als het icoon na een tekst staat.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: iconArgs.leftMargin },
        },
    },
    clickable: {
        name: 'clickable',
        description: 'Beeldt het icoon klikbaar af.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: iconArgs.clickable },
        },
    },
};
