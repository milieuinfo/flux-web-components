import { vlMediaScreenSmall } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

const collapsedDt = (): CSSResult => {
    return css`
        font-size: 1.6rem;
    `;
};

const collapsedDd = (): CSSResult => {
    return css`
        font-size: 1.6rem;
        &:has(+ dt) {
            padding-bottom: 2rem;
        }
    `;
};

export const labelWidthPercentage = (labelWidth: number): CSSResult => {
    return css`
        dl:has(> dt),
        .column {
            grid-template-columns: [labels] ${labelWidth}% [data] auto;
        }

        .column--full-width {
            grid-template-columns: [labels] ${labelWidth / 2}% [data] auto;
        }
    `;
};

export const sizeQueryStyles = css`
    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        dl {
            display: flex;
            flex-direction: column;
            row-gap: 2rem;
        }

        dl:has(> dt),
        .column,
        .column--full-width {
            display: block;
        }

        dt {
            ${collapsedDt()};
        }

        dd {
            ${collapsedDd()};
        }
    }
`;

export const propertiesStyles: CSSResult = css`
    :host {
        display: block;
    }

    dl {
        display: grid;
        word-break: break-word;
        grid-template-columns: 1fr 1fr;
        gap: 2rem 0;
        padding-bottom: 2rem;
    }
    :host([no-padding-bottom]) {
        dl {
            padding-bottom: 0;
        }
    }

    dt,
    dd {
        font-size: 1.8rem;
        hyphens: auto;
        padding-right: 1rem;
    }

    dt {
        color: var(--vl-color--label);
        grid-column: 1;
    }

    dd {
        grid-column: 2;
    }

    /* Column layout */
    .column,
    .column--full-width {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-auto-rows: auto;
        grid-auto-flow: row;

        & > dt {
            grid-column: 1;
        }
        & > dd {
            grid-column: 2;
        }
    }

    .column--full-width {
        grid-column: 1 / -1;
    }

    /* Stacked layout */
    dl:has(.stacked),
    dl:has(.collapsed) {
        grid-template-columns: 100%;
    }

    .stacked dt,
    .collapsed dt {
        ${collapsedDt()};
    }

    .stacked dd,
    .collapsed dd {
        ${collapsedDd()};
    }
`;
