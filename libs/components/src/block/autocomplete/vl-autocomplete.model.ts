export const CAPTION_FORMAT = {
    TITLE: 'title-only',
    SUBTITLE: 'subtitle-only',
    VALUE: 'value-only',
    TITLE_SUBTITLE_VERTICAL: 'title-subtitle-vertical',
    TITLE_SUBTITLE_HORIZONTAL: 'title-subtitle-horizontal',
    SUBTITLE_TITLE_HORIZONTAL: 'subtitle-title-horizontal',
} as const;

export type CAPTION_FORMAT = typeof CAPTION_FORMAT[keyof typeof CAPTION_FORMAT];

export const GROUP_BY = {
    TITLE: 'title',
    SUBTITLE: 'subtitle',
} as const;

export type GROUP_BY = typeof GROUP_BY[keyof typeof GROUP_BY];
