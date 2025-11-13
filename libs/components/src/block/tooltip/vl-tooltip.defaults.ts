import { popoverDefaults, PopoverDefaults } from '../popover/vl-popover.defaults';

export type TooltipDefaults = Omit<PopoverDefaults, 'trigger' | 'hideOnClick' | 'contentPadding'>;

const { trigger, hideOnClick, contentPadding, ...rest } = popoverDefaults;
export const tooltipDefaults: TooltipDefaults = rest;
