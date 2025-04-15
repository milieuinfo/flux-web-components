import { Validator } from '@open-wc/form-control';
import { CleaveInstance, MaskOptions } from '../models/cleave.model';

export const maskValidator: Validator = {
    key: 'patternMismatch',
    message: 'Value does not meet the given pattern.',
    isValid(
        instance: HTMLElement & {
            disableMaskValidation: boolean;
            pattern: string;
            regex: RegExp;
            maskOptions: MaskOptions;
            cleaveInstance: CleaveInstance;
            inputValue: string;
        },
        value: string
    ): boolean {
        const { disableMaskValidation, cleaveInstance, inputValue } = instance;
        const regex = instance.regex || instance.pattern;
        if (!value || (!regex && (!cleaveInstance || disableMaskValidation))) {
            return true;
        }
        if (cleaveInstance && !disableMaskValidation && instance.maskOptions?.regex) {
            const rawValue = cleaveInstance.getRawValue();
            const regExp = new RegExp(instance.maskOptions.regex);
            return regExp.test(rawValue);
        } else {
            const regExp = new RegExp(regex);
            // we testen de inputValue gezien dit de waarde is die de gebruiker ingeeft
            return regExp.test(inputValue);
        }
    },
};
