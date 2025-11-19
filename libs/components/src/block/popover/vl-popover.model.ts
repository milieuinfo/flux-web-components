export const POPOVER_STRATEGY = {
    ABSOLUTE: 'absolute',
    FIXED: 'fixed',
} as const;

export type POPOVER_STRATEGY = (typeof POPOVER_STRATEGY)[keyof typeof POPOVER_STRATEGY];

export const POPOVER_TYPE = {
    POPOVER: 'popover',
    TOOLTIP: 'tooltip',
} as const;

export type POPOVER_TYPE = (typeof POPOVER_TYPE)[keyof typeof POPOVER_TYPE];

export const POPOVER_ARIA_TYPE = {
    LABEL: 'label',
    DESCRIPTION: 'description',
} as const;

export type POPOVER_ARIA_TYPE = (typeof POPOVER_ARIA_TYPE)[keyof typeof POPOVER_ARIA_TYPE];