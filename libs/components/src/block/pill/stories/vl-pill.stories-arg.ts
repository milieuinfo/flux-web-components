import { CONTROLS, defaultArgs, defaultArgTypes, getSelectControlOptions } from '@resources/utils-storybook';
import { action } from 'storybook/actions';
import { ArgTypes } from '@storybook/web-components-vite';

export const pillArgs = {
    ...defaultArgs,
    closable: false,
    checkable: false,
    checked: false,
    type: '',
    disabled: false,
    close: action('close'),
    check: action('check'),
    click: action('click'),
    clickable: false,
};

export const pillArgTypes: ArgTypes<typeof pillArgs> = {
    ...defaultArgTypes,
    closable: {
        name: 'closable',
        description:
            'The attribute that determines whether the pill can be removed or not (cannot be used in combination with checkable or clickable).',
        table: {
            type: { summary: 'boolean' },
            category: 'Attributes',
            defaultValue: { summary: 'false' },
        },
    },
    checkable: {
        name: 'checkable',
        description:
            'The attribute that determines whether the pill can be checked or not (cannot be used in combination with closable or clickable).',
        table: {
            type: { summary: 'boolean' },
            category: 'Attributes',
            defaultValue: { summary: 'false' },
        },
    },
    checked: {
        name: 'checked',
        description: 'The property that determines whether the pill is checked or not.',
        table: {
            type: { summary: 'boolean' },
            category: 'Properties',
            defaultValue: { summary: 'false' },
        },
    },
    type: {
        name: 'type',
        description: 'The attribute that determines the type. ',
        control: { type: CONTROLS.SELECT },
        options: ['success', 'warning', 'error'],
        table: {
            type: { summary: getSelectControlOptions(['success', 'warning', 'error']) },
            category: 'Attributes',
            defaultValue: { summary: '' },
        },
    },
    disabled: {
        name: 'disabled',
        description: 'The attribute that determines whether the pill is disabled or not.',
        table: {
            type: { summary: 'boolean' },
            category: 'Attributes',
            defaultValue: { summary: 'false' },
        },
    },
    close: {
        name: 'close',
        description: "The custom event that is triggered on click of the pill's close button.",
        table: { category: 'Events' },
    },
    check: {
        name: 'check',
        description:
            "The custom event that is triggered on input of the pill's checkbox. In the detail of the event you can find whether the pill is getting checked or unchecked.",
        table: { category: 'Events' },
    },
    clickable: {
        name: 'clickable',
        description:
            'The attribute that determines whether the pill can be clicked or not (cannot be used in combination with closable or checkable).',
        table: {
            type: { summary: 'boolean' },
            category: 'Attributes',
            defaultValue: { summary: 'false' },
        },
    },
    click: {
        name: 'click',
        description:
            'The custom event that is triggered on click of a pill button. Requires the clickable attribute to be set.',
        table: { category: 'Events' },
    },
};
