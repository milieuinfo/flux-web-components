import { vlMediaScreenSmall } from '@domg-wc/common-utilities/css';
import { css, CSSResult } from 'lit';

const columnWidth = (widthPercentage: number): CSSResult => {
    return css`
        width: calc(${widthPercentage}% - 1rem);
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

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            dl {
                grid-template-columns: 100%;
            }

            dl .item {
                grid-template-columns: 100%;
            }
        }
    `;
};

const styles: CSSResult = css`
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
        display: initial;
    }

    dl .item {
        display: grid;
        padding-bottom: 2rem;
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
    }

    .collapsed dd {
        ${collapsedDd()}
    }

    @media screen and (max-width: ${vlMediaScreenSmall}px) {
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
export default styles;
