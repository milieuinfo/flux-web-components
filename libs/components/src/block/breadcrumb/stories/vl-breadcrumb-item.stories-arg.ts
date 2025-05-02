import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components';

export const breadcrumbItemArgs = {
    ...defaultArgs,
    href: '',
};

export const breadcrumbItemArgTypes: ArgTypes<typeof breadcrumbItemArgs> = {
    ...defaultArgTypes,
    href: {
        name: 'href',
        description: 'Url voor breadcrumb-item.',
        table: {
            type: { summary: TYPES.URL },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: breadcrumbItemArgs.href },
        },
    },
};
