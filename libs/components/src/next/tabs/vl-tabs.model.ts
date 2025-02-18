export const DISPLAY_STYLE = {
    DEFAULT: 'default',
    TABS: 'tabs',
    COLLAPSED: 'collapsed',
} as const;

export type DisplayStyle = (typeof DISPLAY_STYLE)[keyof typeof DISPLAY_STYLE];
