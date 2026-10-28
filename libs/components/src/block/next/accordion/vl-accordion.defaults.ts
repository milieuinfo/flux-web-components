export const accordionDefaults = {
    open: false as boolean,
    toggleText: '' as string,
    openToggleText: '' as string,
    closeToggleText: '' as string,
    contentPadding: '' as string,
    headingLevel: '' as string,
    icon: '' as string,
    altBackground: false as boolean,
    bold: false as boolean,
    disabled: false as boolean,
} as const;

export type AccordionDefaults = typeof accordionDefaults;
