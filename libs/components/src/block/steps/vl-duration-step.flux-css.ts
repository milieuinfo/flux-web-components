import { vlMediaScreenSmall } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlDurationStepFluxStyles: CSSResult = css`
    :host {
        --vl-duration-step--font-size: 1.6rem;
        --vl-duration-step--padding-left: 7rem;
        --vl-duration-step--margin-block: 2.5rem;
        --vl-duration-step--indicator-left: 2.1rem;
        --vl-duration-step--indicator-top: 0;
        --vl-duration-step--line-top: 0.6rem;
    }

    .vl-duration-step {
        position: relative;
        font-size: var(--vl-duration-step--font-size);
        color: var(--vl-color--text-subtle);
        padding-left: var(--vl-duration-step--padding-left);
        margin-block: var(--vl-duration-step--margin-block);

        &::before,
        &::after {
            content: '';
            position: absolute;
            display: block;
            left: var(--vl-duration-step--indicator-left);
        }

        &::before {
            background: var(--vl-color--grey-400);
            width: 0.3rem;
            top: var(--vl-duration-step--indicator-top);
            bottom: calc(5rem + 0.65rem + 1.3rem + 0.5rem);
            margin-left: -0.1rem;
            z-index: 1;
        }

        &::after {
            width: 1.3rem;
            height: 1.3rem;
            border-radius: 50%;
            background-color: var(--vl-color--grey-1000);
            z-index: 2;
            outline: 3px solid var(--vl-color--white);
            top: var(--vl-duration-step--line-top);
            transform: translateX(-50%);
        }

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            --vl-duration-step--font-size: 1.4rem;
            --vl-duration-step--padding-left: 5rem;
            --vl-duration-step--margin-block: 2rem;
            --vl-duration-step--indicator-left: 1.75rem;
            --vl-duration-step--indicator-top: 0.4rem;
            --vl-duration-step--line-top: 0.3rem;
        }
    }
`;
