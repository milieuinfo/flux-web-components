import { css, CSSResult } from 'lit';
import { mediaQueryMedium, mediaQuerySmall } from './media-queries.mixin.css';

const titleSizes = {
    1: css`
        font-size: var(--vl-h1-font-size);
        margin-bottom: 6rem;
        line-height: 1.18;

        ${mediaQueryMedium(
            css`
                font-size: var(--vl-h1-font-size-medium);
                margin-bottom: 4.5rem;
            `
        )}

        ${mediaQuerySmall(
            css`
                font-size: var(--vl-h1-font-size-small);
                margin-bottom: 3rem;
            `
        )}
    `,
    2: css`
        font-size: var(--vl-h2-font-size);
        margin-bottom: 2rem;
        line-height: 1.24;

        ${mediaQuerySmall(
            css`
                font-size: var(--vl-h2-font-size-small);
                margin-bottom: 1.5rem;
            `
        )}
    `,
    3: css`
        font-size: var(--vl-h3-font-size);
        margin-bottom: 2rem;
        line-height: 1.3;

        ${mediaQuerySmall(
            css`
                font-size: var(--vl-h3-font-size-small);
                margin-bottom: 1.5rem;
            `
        )}
    `,
    4: css`
        font-size: var(--vl-h4-font-size);
        margin-bottom: 1.8rem;
        line-height: 1.36;

        ${mediaQuerySmall(
            css`
                font-size: var(--vl-h4-font-size-small);
                margin-bottom: 1.4rem;
            `
        )}
    `,
    5: css`
        font-size: var(--vl-h5-font-size);
        margin-bottom: 1.6rem;
        line-height: 1.4;

        ${mediaQuerySmall(
            css`
                font-size: var(--vl-h5-font-size-small);
                margin-bottom: 1.2rem;
            `
        )}
    `,
    6: css`
        font-size: var(--vl-h6-font-size);
        margin-bottom: 1.4rem;
        line-height: 1.44;

        ${mediaQuerySmall(
            css`
                font-size: var(--vl-h6-font-size-small);
                margin-bottom: 1rem;
            `
        )}
    `,
};

export const title = (size: 1 | 2 | 3 | 4 | 5 | 6): CSSResult => css`
    /* Reset styles (gebaseerd op DV _reset.scss) */
    margin: 0;
    border: 0;
    padding: 0;
    vertical-align: baseline;

    /* Title styles (gebaseerd op DV vl-ui-titles/src/scss/_titles.scss) */
    font-weight: 500;
    ${titleSizes[size]}
`;
