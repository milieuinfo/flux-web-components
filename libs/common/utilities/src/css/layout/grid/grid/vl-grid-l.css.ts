import { css, CSSResult } from 'lit';

/* @formatter:off */
export const gridLargeStyles = (): CSSResult => css`
    /* in order for this to work, all elements must have a defined width and height */
    &.vl-grid--justify-items-start {
        justify-items: start;
    }
    &.vl-grid--justify-items-end {
        justify-items: end;
    }
    &.vl-grid--justify-items-center {
        justify-items: center;
    }
    &.vl-grid--justify-items-stretch {
        justify-items: stretch;
    }

    /* in order for this to work, all elements must have a defined width and height */
    &.vl-grid--align-items-start {
        align-items: start;
    }
    &.vl-grid--align-items-end {
        align-items: end;
    }
    &.vl-grid--align-items-center {
        align-items: center;
    }
    &.vl-grid--align-items-stretch {
        align-items: stretch;
    }
`;
/* @formatter:on */
