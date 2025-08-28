import { CONTROLS, defaultArgs, defaultArgTypes, getSelectControlOptions } from '@resources/utils-storybook';
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
        table: { type: { summary: getSelectControlOptions(Object.values(MEDIA)) } },
    },
    href: { type: 'string', description: "The href attribute specifies the link's destination." },
};
