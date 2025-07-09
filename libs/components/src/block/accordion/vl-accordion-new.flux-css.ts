import { css, CSSResult } from 'lit';

export const vlAccordionNewFluxStyles: CSSResult = css`
    details {
        > div {
            padding: 2.2rem;
        }
        > summary {
            font-weight: bold;
            text-decoration: none;
            font: var(--vl-font);
            color: var(--vl-color--action);
            display: flex;
            gap: 1rem;
            text-decoration: none;
            align-items: center;

            > vl-title:hover {
                text-decoration: underline;
            }
        }
        > summary::before {
            /* TODO vl-icon mixin maken om onderstaande met custom selector te kunnen gebruiken  */
            font-family: var(--vl-icon-font);
            font-size: 1em;
            font-weight: normal;
            line-height: 1;
            color: inherit;
            vertical-align: middle;
            display: inline-block;
            /* component specifieke CSS */
            text-decoration: none;
            transition: transform 0.2s;
            transform: rotate(360deg);
        }
        /* safari specifieke styling */
        > summary::-webkit-details-marker {
            display: none;
        }
    }

    details[open] > summary::before {
        transform: rotate(180deg);
    }
`;
