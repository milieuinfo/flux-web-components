import { CATEGORIES, CONTROLS, defaultArgs, defaultArgTypes, getSelectControlOptions, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { MEDIA } from '../vl-share-button.model';

export const shareButtonArgs = {
    ...defaultArgs,
    href: '#',
    medium: MEDIA.FACEBOOK,
};

export const shareButtonArgTypes: ArgTypes = {
    ...defaultArgTypes,
    medium: {
        name: 'medium',
        control: { type: CONTROLS.SELECT },
        options: Object.values(MEDIA),
        description: 'This attribute is used to pass the medium.',
        table: {
            type: { summary: getSelectControlOptions(Object.values(MEDIA)) },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
    href: {
        name: 'href',
        description: "The href attribute specifies the link's destination.",
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
        },
    },
};
