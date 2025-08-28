import { defaultArgs, defaultArgTypes } from '@resources/utils-storybook';
import { action } from 'storybook/actions';
import { ArgTypes } from '@storybook/web-components-vite';

export const pagerArgs = {
    ...defaultArgs,
    totalItems: 50,
    currentPage: 1,
    itemsPerPage: 7,
    paginationDisabled: false,
    alignCenter: false,
    alignRight: false,
    change: action('change'),
};

export const pagerArgTypes: ArgTypes<typeof pagerArgs> = {
    ...defaultArgTypes,
    totalItems: {
        name: 'total-items',
        description: 'This attribute determines the total number of elements.',
        table: {
            type: { summary: 'number' },
            category: 'Attributes',
            defaultValue: { summary: String(100) },
        },
    },
    currentPage: {
        name: 'current-page',
        description: 'This attribute determines the current page.',
        table: {
            type: { summary: 'number' },
            category: 'Attributes',
            defaultValue: { summary: String(1) },
        },
    },
    itemsPerPage: {
        name: 'items-per-page',
        description: 'This attribute determines the number of rows to show per page.',
        table: {
            type: { summary: 'number' },
            category: 'Attributes',
            defaultValue: { summary: String(10) },
        },
    },
    paginationDisabled: {
        name: 'pagination-disabled',
        description: 'This attribute determines if the page links should be disabled.',
        table: {
            type: { summary: 'boolean' },
            category: 'Attributes',
            defaultValue: { summary: 'false' },
        },
    },
    alignCenter: {
        name: 'align-center',
        description: 'This attribute is used to center the pagination.',
        table: {
            type: { summary: 'boolean' },
            category: 'Attributes',
            defaultValue: { summary: 'false' },
        },
    },
    alignRight: {
        name: 'align-right',
        description: 'This attribute is used to align the pagination to the right.',
        table: {
            type: { summary: 'boolean' },
            category: 'Attributes',
            defaultValue: { summary: 'false' },
        },
    },
    change: {
        name: 'change',
        description:
            'This event is triggered when a click on a pager item happens. In the detail of the event you can find the current page, total page number, items per page number and the total amount of items of the pagination.',
        table: { category: 'Events' },
    },
};
