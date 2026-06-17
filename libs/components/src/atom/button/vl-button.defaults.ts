import { ICON_PLACEMENT } from '@domg-wc/common';

export const buttonDefaults = {
    type: 'button' as 'button' | 'submit' | 'reset',
    disabled: false as boolean,
    error: false as boolean,
    block: false as boolean,
    large: false as boolean,
    wide: false as boolean,
    narrow: false as boolean,
    secondary: false as boolean,
    tertiary: false as boolean,
    ghost: false as boolean,
    loading: false as boolean,
    icon: '' as string,
    iconPlacement: 'before' as ICON_PLACEMENT,
    toggle: false as boolean,
    controlled: false as boolean,
    ctaLink: '' as string,
    // null = attribuut afwezig; lege string betekent downloaden met de bestandsnaam die de browser kiest
    download: null as string | null,
    external: false as boolean,
    inputGroup: false as boolean,
    label: '' as string,
    on: false as boolean,
} as const;
