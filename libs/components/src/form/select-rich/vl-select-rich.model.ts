import { Choice } from 'choices.js';

export type SelectRichOption = Choice;

export const SelectRichPosition = {
    AUTO: 'auto',
    TOP: 'top',
    BOTTOM: 'bottom',
} as const;

export type SelectRichPosition = (typeof SelectRichPosition)[keyof typeof SelectRichPosition];
