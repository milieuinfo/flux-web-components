import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@domg-wc/common-storybook';
import { ArgTypes } from '@storybook/web-components';
import { cascaderItemDefaults } from '../vl-cascader-item.defaults';
import { CASCADER_SLOTS } from '../vl-cascader.model';

export type CascaderItemArgs = typeof defaultArgs & {
    annotation: string;
    contentSlot: string;
    label: string;
    labelSlot: string;
};

export const cascaderItemArgs: CascaderItemArgs = {
    ...defaultArgs,
    annotation: cascaderItemDefaults.annotation,
    contentSlot: '',
    label: cascaderItemDefaults.label,
    labelSlot: '',
};

export const cascaderItemArgTypes: ArgTypes<CascaderItemArgs> = {
    ...defaultArgTypes(true),
    annotation: {
        name: 'annotation',
        description: 'Dit bepaalt de ondertitel in de breadcrumb navigatie.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: cascaderItemArgs.annotation },
        },
        type: { name: TYPES.STRING },
    },
    contentSlot: {
        name: CASCADER_SLOTS.CONTENT,
        description: 'Komt onder het label.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: cascaderItemArgs.contentSlot },
        },
    },
    label: {
        name: 'label',
        description: 'Dit bepaalt het label in de breadcrumb navigatie.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: cascaderItemArgs.label },
        },
        type: { name: TYPES.STRING, required: true },
    },
    labelSlot: {
        name: CASCADER_SLOTS.LABEL,
        description: 'Een klik op deze inhoud zal de kind elementen weergeven.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: cascaderItemArgs.labelSlot },
        },
    },
};
