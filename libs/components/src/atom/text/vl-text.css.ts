import { vlMediaScreenSmall } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlTextStyles: CSSResult = css`
    .vl-text {
        &.vl-text--success {
            color: var(--vl-color--success-text);
        }

        &.vl-text--warning {
            color: var(--vl-color--warning-text);
        }

        &.vl-text--error {
            color: var(--vl-color--error);
        }

        &.vl-text--bold {
            font-weight: 500;
        }

        &.vl-text--italic {
            font-style: italic;
        }

        &.vl-text--underline {
            text-decoration: underline;
        }

        &.vl-text--annotation {
            color: var(--vl-color--text-alt);
        }

        &.vl-text--small {
            font-size: 1.4rem;
        }

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            &.vl-text--small {
                font-size: 1.3rem;
            }
        }
    }
`;
