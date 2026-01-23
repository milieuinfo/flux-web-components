import { css, CSSResult } from 'lit';

export const vFormMessageFluxStyles: CSSResult = css`
    /* Base form message styles */
    .vl-form__error,
    .vl-form__success {
        font-size: 1.6rem;
        font-weight: 500;
        color: #333332;
        font-size: 1.4rem;
        margin-bottom: 0.5rem;
    }

    @media screen and (max-width: 767px) {
        .vl-form__error,
        .vl-form__success {
            font-size: 1.6rem;
        }
    }

    .vl-form__error--block,
    .vl-form__success--block {
        display: block;
    }

    .vl-form__error .vl-vi,
    .vl-form__success .vl-vi {
        margin-left: 0.5rem;
        font-size: 0.8rem;
    }

    /* Error state */
    .vl-form__error {
        color: #d2373c;
        margin-top: 0.2rem;
    }

    /* Success state */
    .vl-form__success {
        color: #007a37;
    }

    /* Annotation */
    .vl-form__annotation {
        font-size: 1.6rem;
        font-weight: 500;
        color: #333332;
        font-size: 1.4rem;
        line-height: 2rem;
        font-weight: normal;
    }

    @media screen and (max-width: 767px) {
        .vl-form__annotation {
            font-size: 1.3rem;
        }
    }

    /* Custom flux styles */
    .vl-pre-line {
        white-space: pre-line;
    }
`;
