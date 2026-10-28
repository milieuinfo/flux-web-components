export const infoTileDefaults = {
    open: false as boolean,
    toggleable: false as boolean,
    clickable: false as boolean,
    clickableLabel: '' as string,
    center: false as boolean,
    fullHeight: false as boolean,
    size: '' as string,
    icon: '' as string,
    iconAsBadge: false as boolean,
    type: '' as string,
    headingLevel: '' as string,
    highlight: false as boolean,
    highlightLeft: false as boolean,
} as const;

export type InfoTileDefaults = typeof infoTileDefaults;
