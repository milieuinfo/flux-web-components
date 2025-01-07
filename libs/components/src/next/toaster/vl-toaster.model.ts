export declare type SideHorizontal = 'right' | 'left';
export declare type SideVertical = 'top' | 'bottom';
export declare type Placement = `${SideVertical}-${SideHorizontal}`;

export const TOASTER_PLACEMENT = {
    TOP_LEFT: 'top-left',
    TOP_RIGHT: 'top-right',
    BOTTOM_LEFT: 'bottom-left',
    BOTTOM_RIGHT: 'bottom-right',
} as const satisfies Record<string, Placement>;

export type TOASTER_PLACEMENT = (typeof TOASTER_PLACEMENT)[keyof typeof TOASTER_PLACEMENT];
