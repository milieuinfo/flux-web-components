export const SIZE = {
    XS: 'xs',
    S: 's',
    L: 'l',
} as const;

export type SIZE = typeof SIZE[keyof typeof SIZE];
