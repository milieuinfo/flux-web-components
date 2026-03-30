import { vlMediaScreenSmall } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlDurationStepFluxStyles: CSSResult = css`
    .vl-duration-step {
        padding-block: 0;
        margin-block: 2.5rem;

        &::after {
            outline: 3px solid white;
        }

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            padding-block: 0;
            margin-block: 2rem;
        }
    }
`;
