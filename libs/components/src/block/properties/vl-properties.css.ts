import { vlMediaScreenSmall } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

const collapsedDt = (): CSSResult => {
    return css`
        font-size: 1.6rem;
    `;
};

const collapsedDd = (): CSSResult => {
    return css`
        grid-column: 1;
        font-size: 1.6rem;
        margin-inline-start: initial;
    `;
};

export const labelWidthPercentage = (labelWidth: number): CSSResult => {
    return css`
        dl,
        dl .item {
            grid-template-columns: [labels] ${labelWidth}% [data] auto;
        }

        dl .column--full-width,
        dl .column--full-width .item {
            grid-template-columns: [labels] ${labelWidth / 2}% [data] auto;
        }
    `;
};

export const sizeQueryStyles = css`
    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        dl,
        dl .item {
            grid-template-columns: 100%;
        }

        /* Collapse 2-column grid to single column on small screens */
        dl:has(> .column) {
            grid-template-columns: 1fr;
        }

        /* Reset column placement so all items stack in a single column */
        .column:nth-child(1):not(.column--full-width) > .item,
        .column:nth-child(2):not(.column--full-width) > .item {
            grid-column: 1;
        }

        dd {
            ${collapsedDd()}
        }

        dt {
            ${collapsedDt()}
        }
    }
`;

export const propertiesStyles: CSSResult = css`
    :host {
        display: block;
    }

    /* display:contents makes .column transparent to the dl grid while keeping DOM structure */
    .column {
        display: contents;
    }

    dl {
        display: grid;
        word-break: break-word;
    }

    dl:has(.item) {
        display: flow-root;
        margin-block: 0;
    }

    /* Override to CSS Grid when columns are present; same specificity as dl:has(.item) so
       source order (this rule comes after) makes display:grid win for the column case */
    dl:has(> .column) {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    dl .item {
        display: grid;
        padding-bottom: 2rem;
    }

    /* Place items from the first and second column into their respective grid tracks.
       Items from both columns share row tracks in the dl grid, achieving cross-column alignment. */
    .column:nth-child(1):not(.column--full-width) > .item {
        grid-column: 1;
    }

    .column:nth-child(2):not(.column--full-width) > .item {
        grid-column: 2;
    }

    .column--full-width > .item {
        grid-column: 1 / -1;
    }

    dt {
        font-size: 1.8rem;
        color: var(--vl-color--label);
        padding-right: 1rem;
        grid-column: 1;
    }

    .collapsed dt {
        ${collapsedDt()}
    }

    dd {
        font-size: 1.8rem;
        grid-column: 2;
        margin-inline-start: initial;
    }

    .collapsed dd {
        ${collapsedDd()}
    }

    .collapsed .item,
    dl:has(.collapsed) {
        grid-template-columns: 100%;
    }
`;
