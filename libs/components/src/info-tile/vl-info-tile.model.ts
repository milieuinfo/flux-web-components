export const INFO_TILE_SIZE = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
} as const;

export type INFO_TILE_SIZE = (typeof INFO_TILE_SIZE)[keyof typeof INFO_TILE_SIZE];
