import { Validator } from '@open-wc/form-control';
import { CleaveInstance, MaskOptions } from '../models/cleave.model';

export const maskValidator: Validator = {
    key: 'patternMismatch',
    message: 'Value does not meet the given mask pattern.',
    isValid(
        instance: HTMLElement & {
            disableMaskValidation: boolean;
            regex: RegExp;
            maskOptions: MaskOptions;
            cleaveInstance: CleaveInstance;
        },
        value: string
    ): boolean {
        const { disableMaskValidation, cleaveInstance } = instance;
        const regex = instance.regex || instance.maskOptions?.regex;

        if (!value || disableMaskValidation || !regex || !cleaveInstance) {
            return true;
        }

        const rawValue = cleaveInstance.getRawValue();
        const regExp = new RegExp(regex);

        return regExp.test(rawValue);
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
    isValid(
        instance: HTMLElement & { min: number; minExclusive: boolean; cleaveInstance: CleaveInstance },
        value: string
    ): boolean {
        const { min, minExclusive, cleaveInstance } = instance;

        if (!value || (!min && min !== 0) || !cleaveInstance) {
            return true;
        }

        const rawValue = cleaveInstance.getRawValue();

        if (parseFloat(rawValue) < min) {
            return false;
        }

        if (minExclusive && parseFloat(rawValue) === min) {
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
    isValid(
        instance: HTMLElement & { max: number; maxExclusive: boolean; cleaveInstance: CleaveInstance },
        value: string
    ): boolean {
        const { max, maxExclusive, cleaveInstance } = instance;

        if (!value || (!max && max !== 0) || !cleaveInstance) {
            return true;
        }

        const rawValue = cleaveInstance.getRawValue();

        if (parseFloat(rawValue) > max) {
            return false;
        }

        if (maxExclusive && parseFloat(rawValue) === max) {
            return false;
        }

        return true;
    },
};
