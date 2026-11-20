export const HEADLINE_LEVELS = ['h2', 'h3', 'h4', 'h5', 'h6'] as const;

export type HeadlineLevel = (typeof HEADLINE_LEVELS)[number];

export const dataFigureDefaults = {
    headline: '' as string,
    headlineLevel: 'h3' as HeadlineLevel,
    subtitle: '' as string,
} as const;
