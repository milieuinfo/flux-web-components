export const BADGE_BACKGROUND = {
    SUBTLE: 'subtle',
    DEFAULT: 'default',
    PRIMARY: 'primary',
    ACTION: 'action',
} as const;

export type BadgeBackground = (typeof BADGE_BACKGROUND)[keyof typeof BADGE_BACKGROUND];

export const badgeDefaults = {
    icon: undefined as string | undefined,
    img: undefined as string | undefined,
    alt: '' as string,
    background: BADGE_BACKGROUND.SUBTLE as BadgeBackground,
} as const;
