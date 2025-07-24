export const INFO_TILE_SIZE = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
} as const;

export type INFO_TILE_SIZE = (typeof INFO_TILE_SIZE)[keyof typeof INFO_TILE_SIZE];

export const INFO_TILE_TYPE = {
    DEFAULT: 'default',
    ALT: 'alt',
    WARNING: 'warning',
    ERROR: 'error',
    SUCCESS: 'success',
} as const;

export type INFO_TILE_TYPE = (typeof INFO_TILE_TYPE)[keyof typeof INFO_TILE_TYPE];