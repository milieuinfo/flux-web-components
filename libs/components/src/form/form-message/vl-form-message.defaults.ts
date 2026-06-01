export type FormMessageVariant = 'error' | 'success' | 'annotation';

export const formMessageDefaults = {
    show: false as boolean,
    preLine: false as boolean,
    for: null as string | null,
    state: null as keyof ValidityState | null,
    variant: 'error' as FormMessageVariant,
} as const;
