import { vlMediaScreenSmall } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlContactCardFluxStyles: CSSResult = css`
    @media screen and (min-width: ${vlMediaScreenSmall}px) {
        .vl-contact-data .vl-grid .vl-column:not(:first-child) {
            padding-top: 0.8rem;
        }
    }
`;
