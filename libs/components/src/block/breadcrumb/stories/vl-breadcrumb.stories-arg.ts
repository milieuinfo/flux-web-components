import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';

export const breadcrumbArgs = {
    ...defaultArgs,
    ellipsis: false,
};

export const breadcrumbArgTypes: ArgTypes<typeof breadcrumbArgs> = {
    ...defaultArgTypes,
    ellipsis: {
        name: 'ellipsis',
        description:
            'Houdt elk breadcrumb item op één regel en kapt het af met een ellipsis wanneer het niet past.<br>Zonder dit attribuut loopt een lang breadcrumb item door over meerdere regels.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: String(breadcrumbArgs.ellipsis) },
        },
    },
};
