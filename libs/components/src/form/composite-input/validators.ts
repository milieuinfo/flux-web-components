import { Validator } from '@open-wc/form-control';

export type CompositeValues = Record<string, string>;

export type CompositeCustomValidator = (values: CompositeValues) => string | null | undefined;

export type SlottableValueElement = HTMLElement & { value?: string };

type CompositeInstance = HTMLElement & {
    required: boolean;
    error: boolean;
    customValidator?: CompositeCustomValidator;
};

export const keyFor = (field: Element): string | null => field.getAttribute('name') || null;

export const slottedFields = (instance: HTMLElement): SlottableValueElement[] =>
    Array.from(instance.children).filter((el): el is SlottableValueElement => 'value' in el && !!el.getAttribute('name'));

const rawValue = (field: SlottableValueElement): string => field.value ?? '';

const labelFor = (field: SlottableValueElement): string =>
    field.getAttribute('label') || field.getAttribute('name') || '';

const opsomming = (delen: string[]): string =>
    delen.length > 1 ? `${delen.slice(0, -1).join(', ')} en ${delen[delen.length - 1]}` : delen[0];

export const slotValues = (instance: HTMLElement): CompositeValues => {
    const values: CompositeValues = {};
    for (const field of slottedFields(instance)) {
        const key = keyFor(field);
        if (key) values[key] = rawValue(field);
    }
    return values;
};

export const requiredAllValidator: Validator = {
    attribute: 'required',
    key: 'valueMissing',
    message(instance: CompositeInstance): string {
        const ontbrekend = slottedFields(instance)
            .filter((field) => rawValue(field) === '')
            .map(labelFor)
            .filter((label) => label !== '');
        return ontbrekend.length > 0 ? `Gelieve ${opsomming(ontbrekend)} in te vullen.` : 'Alle velden zijn verplicht.';
    },
    isValid(instance: CompositeInstance): boolean {
        const required = instance.hasAttribute('required') || instance.required;
        if (!required) return true;
        const fields = slottedFields(instance);
        return fields.length > 0 && fields.every((field) => rawValue(field) !== '');
    },
};

export const customErrorValidator: Validator = {
    attribute: 'error',
    key: 'customError',
    message(instance: CompositeInstance): string {
        if (instance.error) return 'Dit veld bevat een fout.';
        if (!instance.customValidator) return 'Ongeldige invoer.';
        const result = instance.customValidator(slotValues(instance));
        return typeof result === 'string' && result.length > 0 ? result : 'Ongeldige invoer.';
    },
    isValid(instance: CompositeInstance): boolean {
        if (instance.error) return false;
        if (!instance.customValidator) return true;
        const fields = slottedFields(instance);
        if (fields.length === 0 || fields.some((field) => rawValue(field) === '')) return true;
        const result = instance.customValidator(slotValues(instance));
        return result == null || result === '';
    },
};
