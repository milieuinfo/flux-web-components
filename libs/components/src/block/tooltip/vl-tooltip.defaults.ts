import { popoverDefaults, PopoverDefaults } from '../popover/vl-popover.defaults';
import { TOOLTIP_TYPE } from './vl-tooltip.model';

export type TooltipDefaults = Omit<PopoverDefaults, 'trigger' | 'hideOnClick' | 'contentPadding'> & {
    type: TOOLTIP_TYPE;
};

const { trigger, hideOnClick, contentPadding, ...rest } = popoverDefaults;

export const tooltipDefaults: TooltipDefaults = {
    ...rest,
    type: TOOLTIP_TYPE.DESCRIPTION,
};
