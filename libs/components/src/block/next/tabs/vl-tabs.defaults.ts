export const tabsDefaults = {
    defaultSlot: '' as string,
    panelSlot: '' as string,
    label: '' as string,
    horizontalNavigation: false as boolean,
    noBorder: false as boolean,
} as const;

export type TabsDefaults = typeof tabsDefaults;
