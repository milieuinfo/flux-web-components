import { ICON_PLACEMENT } from '@domg-wc/common';

export const linkDefaults = {
    href: '' as string,
    label: '' as string,
    bold: false as boolean,
    small: false as boolean,
    large: false as boolean,
    error: false as boolean,
    external: false as boolean,
    icon: '' as string,
    iconPlacement: '' as ICON_PLACEMENT,
    buttonAsLink: false as boolean,
} as const;
