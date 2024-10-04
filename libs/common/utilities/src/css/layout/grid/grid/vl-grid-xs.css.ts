import { css, CSSResult } from 'lit';

/* @formatter:off */
export const gridExtraSmallStyles = (): CSSResult => css`
    /* in order for this to work, all elements must have a defined width and height */
    &.vl-grid-next--xs-justify-items-start {
        justify-items: start;
    }
    &.vl-grid-next--xs-justify-items-end {
        justify-items: end;
    }
    &.vl-grid-next--xs-justify-items-center {
        justify-items: center;
    }
    &.vl-grid-next--xs-justify-items-stretch {
        justify-items: stretch;
    }

    /* in order for this to work, all elements must have a defined width and height */
    &.vl-grid-next--xs-align-items-start {
        align-items: start;
    }
    &.vl-grid-next--xs-align-items-end {
        align-items: end;
    }
    &.vl-grid-next--xs-align-items-center {
        align-items: center;
    }
    &.vl-grid-next--xs-align-items-stretch {
        align-items: stretch;
    }
`;
/* @formatter:on */
