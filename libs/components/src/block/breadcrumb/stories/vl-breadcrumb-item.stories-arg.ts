import {
    CATEGORIES,
    CONTROLS,
    defaultArgs,
    defaultArgTypes,
    getSelectControlOptions,
    TYPES,
} from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { BREADCRUMB_ITEM_TYPE } from '../vl-breadcrumb-item.model';

export const breadcrumbItemArgs = {
    ...defaultArgs,
    href: '',
    type: 'link',
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
    type: {
        name: 'type',
        description: 'Type breadcrumb-item.',
        control: { type: CONTROLS.SELECT },
        options: ['', ...Object.values(BREADCRUMB_ITEM_TYPE)],
        table: {
            type: { summary: getSelectControlOptions(Object.values(BREADCRUMB_ITEM_TYPE)) },
            category: CATEGORIES.ATTRIBUTES,
            defaultArgs: { summary: breadcrumbItemArgs.type },
        },
    },
};
