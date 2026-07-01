import { Validator } from '@open-wc/form-control';

export type CompositeValues = { first: string; second: string };

export type CompositeCustomValidator = (values: CompositeValues) => string | null | undefined;

type SlottableValueElement = HTMLElement & { value?: string };

type CompositeInstance = HTMLElement & {
    required: boolean;
    error: boolean;
    customValidator?: CompositeCustomValidator;
};

const SLOTS = ['first', 'second'] as const;
type Slot = (typeof SLOTS)[number];

const SLOT_LABELS: Record<Slot, string> = {
    first: 'Eerste waarde',
    second: 'Tweede waarde',
};

const fieldForSlot = (instance: HTMLElement, slot: Slot): SlottableValueElement | null =>
    instance.querySelector<SlottableValueElement>(`[slot="${slot}"]`);

const rawValueForSlot = (instance: HTMLElement, slot: Slot): string => fieldForSlot(instance, slot)?.value ?? '';

const slotValues = (instance: HTMLElement): CompositeValues => ({
    first: rawValueForSlot(instance, 'first'),
    second: rawValueForSlot(instance, 'second'),
});

const numericValueForSlot = (instance: HTMLElement, slot: Slot): number => {
    const value = rawValueForSlot(instance, slot);
    if (value === '') return NaN;
    return parseFloat(value);
};

const constraintForSlot = (instance: HTMLElement, slot: Slot, attr: 'min' | 'max'): number => {
    const raw = fieldForSlot(instance, slot)?.getAttribute(attr);
    if (raw === null || raw === undefined || raw === '') return NaN;
    return parseFloat(raw);
};

export const requiredAllValidator: Validator = {
    attribute: 'required',
    key: 'valueMissing',
    message: 'Alle velden zijn verplicht.',
    isValid(instance: CompositeInstance): boolean {
        const required = instance.hasAttribute('required') || instance.required;
        if (!required) return true;
        return SLOTS.every((slot) => rawValueForSlot(instance, slot) !== '');
    },
};

export const rangeUnderflowValidator: Validator = {
    key: 'rangeUnderflow',
    message(instance: CompositeInstance): string {
        const msgs: string[] = [];
        for (const slot of SLOTS) {
            const value = numericValueForSlot(instance, slot);
            const min = constraintForSlot(instance, slot, 'min');
            if (!Number.isNaN(value) && !Number.isNaN(min) && value < min) {
                msgs.push(`${SLOT_LABELS[slot]} moet minstens ${min} zijn`);
            }
        }
        return msgs.join('; ') || 'Waarde ligt onder het minimum.';
    },
    isValid(instance: CompositeInstance): boolean {
        for (const slot of SLOTS) {
            const value = numericValueForSlot(instance, slot);
            const min = constraintForSlot(instance, slot, 'min');
            if (!Number.isNaN(value) && !Number.isNaN(min) && value < min) return false;
        }
        return true;
    },
};

export const rangeOverflowValidator: Validator = {
    key: 'rangeOverflow',
    message(instance: CompositeInstance): string {
        const msgs: string[] = [];
        for (const slot of SLOTS) {
            const value = numericValueForSlot(instance, slot);
            const max = constraintForSlot(instance, slot, 'max');
            if (!Number.isNaN(value) && !Number.isNaN(max) && value > max) {
                msgs.push(`${SLOT_LABELS[slot]} mag maximaal ${max} zijn`);
            }
        }
        return msgs.join('; ') || 'Waarde ligt boven het maximum.';
    },
    isValid(instance: CompositeInstance): boolean {
        for (const slot of SLOTS) {
            const value = numericValueForSlot(instance, slot);
            const max = constraintForSlot(instance, slot, 'max');
            if (!Number.isNaN(value) && !Number.isNaN(max) && value > max) return false;
        }
        return true;
    },
};

export const customErrorValidator: Validator = {
    attribute: 'error',
    key: 'customError',
    message(instance: CompositeInstance): string {
        if (instance.error) return 'Dit veld bevat een fout.';
        if (!instance.customValidator) return 'Ongeldige invoer.';
        const values = slotValues(instance);
        if (values.first === '' || values.second === '') return 'Ongeldige invoer.';
        const result = instance.customValidator(values);
        return typeof result === 'string' && result.length > 0 ? result : 'Ongeldige invoer.';
    },
    isValid(instance: CompositeInstance): boolean {
        if (instance.error) return false;
        if (!instance.customValidator) return true;
        const values = slotValues(instance);
        if (values.first === '' || values.second === '') return true;
        const result = instance.customValidator(values);
        return result == null || result === '';
    },
};
