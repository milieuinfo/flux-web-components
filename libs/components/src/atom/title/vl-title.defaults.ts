export const TITLE_TYPES = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

export const titleDefaults = {
    type: 'h1' as (typeof TITLE_TYPES)[number],
    underline: false as boolean,
    alt: false as boolean,
    noSpaceBottom: false as boolean,
} as const;
