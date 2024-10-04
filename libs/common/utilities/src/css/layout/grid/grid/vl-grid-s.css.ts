import { css, CSSResult } from 'lit';

/* @formatter:off */
export const gridSmallStyles = (): CSSResult => css`
    /* in order for this to work, all elements must have a defined width and height */
    &.vl-grid-next--s-justify-items-start {
        justify-items: start;
    }
    &.vl-grid-next--s-justify-items-end {
        justify-items: end;
    }
    &.vl-grid-next--s-justify-items-center {
        justify-items: center;
    }
    &.vl-grid-next--s-justify-items-stretch {
        justify-items: stretch;
    }

    /* in order for this to work, all elements must have a defined width and height */
    &.vl-grid-next--s-align-items-start {
        align-items: start;
    }
    &.vl-grid-next--s-align-items-end {
        align-items: end;
    }
    &.vl-grid-next--s-align-items-center {
        align-items: center;
    }
    &.vl-grid-next--s-align-items-stretch {
        align-items: stretch;
    }
`;
/* @formatter:on */
