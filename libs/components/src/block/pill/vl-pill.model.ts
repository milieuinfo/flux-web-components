export const TYPE = {
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
} as const;

export type TYPE = typeof TYPE[keyof typeof TYPE];
