import { vlMediaScreenSmall } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

const columnWidth = (widthPercentage: number): CSSResult => {
    return css`
        width: ${widthPercentage}%;
    `;
};

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

        .column {
            ${columnWidth(100)};
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

    .column {
        ${columnWidth(50)};
        float: left;
    }

    .column--full-width {
        ${columnWidth(100)};
        float: left;
    }

    dl {
        display: grid;
        word-break: break-word;
    }

    dl:has(.item) {
        display: flow-root;
        margin-block: 0;
    }

    dl .item {
        display: grid;
        padding-bottom: 2rem;
    }

    :host([no-padding-bottom]) dl .item:last-child {
        padding-bottom: 0;
    }

    dt,
    dd {
        font-size: 1.8rem;
        padding-right: 1rem;
        hyphens: auto;
    }

    dt {
        color: var(--vl-color--label);
        grid-column: 1;
    }

    .collapsed dt {
        ${collapsedDt()}
    }

    dd {
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
