export const MARGINS: { [key: string]: string } = {
    none: '0',
    small: '0.5rem',
    medium: '1rem',
    large: '2rem',
} as const;

export type MARGINS = (typeof MARGINS)[keyof typeof MARGINS];

export const PADDINGS: { [key: string]: string } = {
    none: '0',
    small: '0.5rem',
    medium: '1rem',
    large: '2rem',
} as const;

export type PADDINGS = (typeof PADDINGS)[keyof typeof PADDINGS];

export const ICON_PLACEMENT = {
    BEFORE: 'before',
    AFTER: 'after',
} as const;

export type ICON_PLACEMENT = (typeof ICON_PLACEMENT)[keyof typeof ICON_PLACEMENT];
