import { inputFieldDefaults } from '../input-field/vl-input-field.defaults';

export const inputFieldMaskedDefaults = {
    ...inputFieldDefaults,
    mask: '' as string,
    maskPrefix: '' as string,
    rawValue: false as boolean,
    disableMaskValidation: false as boolean,
} as const;
