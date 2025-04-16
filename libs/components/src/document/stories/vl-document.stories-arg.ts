import {
    CATEGORIES,
    CONTROLS,
    defaultArgs,
    defaultArgTypes,
    getSelectControlOptions,
    TYPES,
} from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components';

export const documentArgs = {
    ...defaultArgs,
    href: '#',
    target: '_self',
    type: '',
    title: '',
    metadata: '',
};

export const documentArgTypes: ArgTypes<typeof documentArgs> = {
    ...defaultArgTypes(),
    href: {
        name: 'data-vl-href',
        description: 'Bepaalt de download link.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: documentArgs.href },
        },
    },
    target: {
        name: 'data-vl-target',
        control: { type: CONTROLS.SELECT },
        options: ['_blank', '_self', '_parent', '_top', 'timeline', 'question'],
        description:
            'Bepaalt waar de link geopend wordt. Mogelijke waarden zijn `_blank`, `_self`, `_parent` en `_top`.',
        table: {
            type: { summary: getSelectControlOptions(['_blank', '_self', '_parent', '_top', 'timeline', 'question']) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: documentArgs.target },
        },
    },
    type: {
        name: 'type',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: documentArgs.type },
        },
    },
    title: {
        name: 'title',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: documentArgs.title },
        },
    },
    metadata: {
        name: 'metadata',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: documentArgs.metadata },
        },
    },
};
