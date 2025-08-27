import { PADDINGS } from '@domg-wc/common';
import { Placement, Strategy } from '@floating-ui/dom';

export type PopoverDefaults = {
    for: string;
    contentPadding: PADDINGS;
    trigger: string;
    hideArrow: boolean;
    hideOnClick: boolean;
    placement: Placement;
    open: boolean;
    distance: number;
    strategy: Strategy;
};

export const popoverDefaults: PopoverDefaults = {
    for: '',
    contentPadding: '2rem',
    trigger: 'click',
    hideArrow: false,
    hideOnClick: false,
    placement: 'bottom',
    open: false,
    distance: 10,
    strategy: 'absolute',
};
