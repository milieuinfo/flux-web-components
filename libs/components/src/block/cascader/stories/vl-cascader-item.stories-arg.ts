import { CATEGORIES, defaultArgs, defaultArgTypes, TYPES } from '@resources/utils-storybook';
import { ArgTypes } from '@storybook/web-components-vite';
import { cascaderItemDefaults } from '../vl-cascader-item.defaults';
import { CASCADER_SLOTS, type CascaderItem } from '../vl-cascader.model';

export type CascaderItemArgs = typeof defaultArgs & {
    annotation: string;
    item: CascaderItem;
    templateType: string;
    contentSlot: string;
    label: string;
    labelSlot: string;
};

export const cascaderItemArgs: CascaderItemArgs = {
    ...defaultArgs,
    annotation: cascaderItemDefaults.annotation,
    item: { label: '' },
    templateType: '',
    contentSlot: '',
    label: cascaderItemDefaults.label,
    labelSlot: '',
};

export const cascaderItemArgTypes: ArgTypes<CascaderItemArgs> = {
    ...defaultArgTypes,
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
    templateType: {
        name: 'template-type',
        description:
            'De key in de `templates` Map van `vl-cascader` die bepaalt met welke template dit item gerenderd wordt.<br>Kan niet aangepast worden in Storybook.',
        control: false,
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: cascaderItemArgs.templateType },
        },
    },
    item: {
        name: 'item',
        description:
            'Het data-object van het item. Bij het koppelen aan de DOM overschrijft de component hierin `label`, `annotation` en `templateType` met zijn attributen.<br>Kan niet aangepast worden in Storybook.',
        control: false,
        table: {
            type: { summary: 'CascaderItem' },
            category: CATEGORIES.PROPERTIES,
        },
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
        description:
            'Een klik op deze inhoud zal de kind elementen weergeven. Geef een eigen vl-link' +
            ' in dit slot de class vl-cascader-link om het pijltje rechts uit te lijnen.',
        table: {
            type: { summary: TYPES.HTML },
            category: CATEGORIES.SLOTS,
            defaultValue: { summary: cascaderItemArgs.labelSlot },
        },
    },
};
