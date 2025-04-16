import { css, CSSResult } from 'lit';

/* @formatter:off */
export const gridMediumStyles = (): CSSResult => css`
    /* in order for this to work, all elements must have a defined width and height */
    &.vl-grid--m-justify-items-start {
        justify-items: start;
    }
    &.vl-grid--m-justify-items-end {
        justify-items: end;
    }
    &.vl-grid--m-justify-items-center {
        justify-items: center;
    }
    &.vl-grid--m-justify-items-stretch {
        justify-items: stretch;
    }

    /* in order for this to work, all elements must have a defined width and height */
    &.vl-grid--m-align-items-start {
        align-items: start;
    }
    &.vl-grid--m-align-items-end {
        align-items: end;
    }
    &.vl-grid--m-align-items-center {
        align-items: center;
    }
    &.vl-grid--m-align-items-stretch {
        align-items: stretch;
    }
`;
/* @formatter:on */
