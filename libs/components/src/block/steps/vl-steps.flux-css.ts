import { vlMediaScreenSmall } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlStepsStyles: CSSResult = css`
    .vl-steps {
        margin-bottom: 3rem;
    }

    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        .vl-steps {
            margin-bottom: 1.5rem;
        }
    }
`;
