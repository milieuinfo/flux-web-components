import { ICON_PLACEMENT } from '@domg-wc/common';

export const linkDefaults = {
    href: '' as string,
    label: '' as string,
    bold: false as boolean,
    small: false as boolean,
    large: false as boolean,
    error: false as boolean,
    external: false as boolean,
    // null = attribuut afwezig; lege string betekent downloaden met de bestandsnaam die de browser kiest
    download: null as string | null,
    icon: '' as string,
    iconPlacement: '' as ICON_PLACEMENT,
    buttonAsLink: false as boolean,
    type: 'button' as 'button' | 'submit' | 'reset',
} as const;
