import { CATEGORIES, CONTROLS, TYPES, getSelectControlOptions } from '@domg-wc/common-storybook';
import { ArgTypes } from '@storybook/web-components';
import { inputFieldMaskedDefaults } from '../vl-input-field-masked.defaults';
import { inputFieldArgTypes, inputFieldArgs } from '../../input-field/stories/vl-input-field.stories-arg';
import { masks } from '../masks';

type InputFieldMaskedArgs = typeof inputFieldArgs & typeof inputFieldMaskedDefaults;

export const inputFieldMaskedArgs: InputFieldMaskedArgs = {
    ...inputFieldArgs,
    ...inputFieldMaskedDefaults,
};

export const inputFieldMaskedArgTypes: ArgTypes<InputFieldMaskedArgs> = {
    ...inputFieldArgTypes,
    mask: {
        name: 'mask',
        description: 'Het mask dat gebruikt moet worden.<br/>Dit attribuut is niet reactief.',
        control: { type: CONTROLS.SELECT },
        options: Object.keys(masks),
        table: {
            type: { summary: getSelectControlOptions(Object.keys(masks)) },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: inputFieldMaskedArgs.mask },
        },
    },
    maskPrefix: {
        name: 'mask-prefix',
        description:
            'Zet de prefix van het mask.<br/>De prefix wordt automatisch toegevoegd aan de value van het input veld indien de value niet begint met de prefix.<br/>Dit attribuut is niet reactief.',
        table: {
            type: { summary: TYPES.STRING },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: inputFieldMaskedArgs.maskPrefix },
        },
    },
    rawValue: {
        name: 'raw-value',
        description: 'Geeft de raw value terug bij het submitten van een form.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: inputFieldMaskedArgs.rawValue },
        },
    },
    disableMaskValidation: {
        name: 'disable-mask-validation',
        description: 'Schakelt de automatische mask validatie uit.',
        table: {
            type: { summary: TYPES.BOOLEAN },
            category: CATEGORIES.ATTRIBUTES,
            defaultValue: { summary: inputFieldMaskedArgs.disableMaskValidation },
        },
    },
    regex: {
        name: 'regex',
        description:
            'Overschrijft de regex die gebruikt wordt bij de mask validatie.<br/>Bij het testen van de regex wordt altijd de raw value gebruikt.',
        control: false,
        table: {
            type: { summary: TYPES.REGEX },
            category: CATEGORIES.PROPERTIES,
            defaultValue: { summary: inputFieldMaskedArgs.regex },
        },
    },
};
