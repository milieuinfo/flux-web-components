import { InputChoice } from 'choices.js/src/scripts/interfaces/input-choice';
import { InputGroup } from 'choices.js/src/scripts/interfaces/input-group';

type MergeToOptional<T, U> = Pick<T, Extract<keyof T, keyof U>> & // gedeelde velden blijven required
    Partial<Omit<T, keyof U>> & // velden enkel in T (optioneel)
    Partial<Omit<U, keyof T>>; // velden enkel in U (optioneel)

export type SelectRichOption = MergeToOptional<InputChoice, InputGroup>;

export const SelectRichPosition = {
    AUTO: 'auto',
    TOP: 'top',
    BOTTOM: 'bottom',
} as const;

export type SelectRichPosition = (typeof SelectRichPosition)[keyof typeof SelectRichPosition];

export const SelectSearchStrategy = {
    DEFAULT: 'default',
    EXACT_AND: 'exact-and',
    EXACT_OR: 'exact-or',
} as const;

export type SelectSearchStrategy = (typeof SelectSearchStrategy)[keyof typeof SelectSearchStrategy];
