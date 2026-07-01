import { FormValue, requiredValidator, SyncValidator, Validator } from '@open-wc/form-control';

type FormControlWithValidationTarget = HTMLElement & { validationTarget: HTMLInputElement | undefined | null };

// Vóór de eerste render is validationTarget nog null; dan is er per definitie geen badInput.
const hasNativeBadInput = (instance: FormControlWithValidationTarget): boolean =>
    !!instance.validationTarget?.validity.badInput;

export const badInputValidator: Validator = {
    key: 'badInput',
    message: 'Please enter a valid value.',
    isValid(instance: FormControlWithValidationTarget): boolean {
        return !hasNativeBadInput(instance);
    },
};

export const badInputAwareRequiredValidator: Validator = {
    ...requiredValidator,
    isValid(instance: FormControlWithValidationTarget, value: FormValue): boolean {
        // Bij badInput geeft de native input een lege value terug terwijl er zichtbaar tekst
        // staat — valueMissing zou dan misleidend zijn, badInput dekt die toestand.
        if (hasNativeBadInput(instance)) {
            return true;
        }

        return (requiredValidator as SyncValidator).isValid(instance, value);
    },
};

export const minValueValidator: Validator = {
    attribute: 'min',
    key: 'rangeUnderflow',
    message(instance: HTMLElement & { min: number; minExclusive: boolean }): string {
        if (instance.minExclusive) {
            return `Value must be greater than ${instance.min}.`;
        }

        return `Value must be greater than or equal to ${instance.min}.`;
    },
    isValid(instance: HTMLElement & { min: number; minExclusive: boolean }, value: string): boolean {
        if (!value || (!instance.min && instance.min !== 0)) {
            return true;
        }

        if (parseFloat(value) < instance.min) {
            return false;
        }

        if (instance.minExclusive && parseFloat(value) === instance.min) {
            return false;
        }

        return true;
    },
};

export const maxValueValidator: Validator = {
    attribute: 'max',
    key: 'rangeOverflow',
    message(instance: { max: number; maxExclusive: boolean }): string {
        if (instance.maxExclusive) {
            return `Value must be lesser than ${instance.max}.`;
        }

        return `Value must be lesser than or equal to ${instance.max}.`;
    },
    isValid(instance: HTMLElement & { max: number; maxExclusive: boolean }, value: string): boolean {
        if (!value || (!instance.max && instance.max !== 0)) {
            return true;
        }

        if (parseFloat(value) > instance.max) {
            return false;
        }

        if (instance.maxExclusive && parseFloat(value) === instance.max) {
            return false;
        }

        return true;
    },
};

export const patternValidator: Validator = {
    attribute: 'pattern',
    key: 'patternMismatch',
    message: 'Please match the requested format',
    isValid(instance: HTMLElement & { pattern: string; regex: RegExp }, value: string): boolean {
        if (!value || (!instance.pattern && !instance.regex)) {
            return true;
        }

        const regex = instance.pattern || instance.regex;
        const regExp = new RegExp(regex);

        return regExp.test(value);
    },
};
