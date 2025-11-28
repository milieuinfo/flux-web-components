export const BREADCRUMB_ITEM_TYPE = {
    LINK: 'link',
    BUTTON: 'button',
    TEXT: 'text',
} as const;

export type BREADCRUMB_ITEM_TYPE = (typeof BREADCRUMB_ITEM_TYPE)[keyof typeof BREADCRUMB_ITEM_TYPE];
