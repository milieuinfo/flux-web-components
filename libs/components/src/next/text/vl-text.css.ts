import {vlMediaScreenSmall} from "@domg-wc/common-utilities/css";
import { css, CSSResult } from 'lit';

export const vlTextStyles: CSSResult = css`
    .vl-text-next {
        &.vl-text-next--success {
            color: var(--vl-color--success-text);
        }

        &.vl-text-next--warning {
            color: var(--vl-color--warning-text);
        }

        &.vl-text-next--error {
            color: var(--vl-color--error);
        }

        &.vl-text-next--bold {
            font-weight: 500;
        }

        &.vl-text-next--italic {
            font-style: italic;
        }

        &.vl-text-next--underline {
            text-decoration: underline;
        }

        &.vl-text-next--annotation {
            color: var(--vl-color--text-alt);
        }

        &.vl-text-next--small {
            font-size: 1.4rem;
        }

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            &.vl-text-next--small {
                font-size: 1.3rem;
            }
        }
    }
`;
