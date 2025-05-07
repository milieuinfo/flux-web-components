import { css } from 'lit';
import { vlMediaScreenMedium, vlMediaScreenSmall } from '@domg-wc/styles';

const headingBase = css`
    /* Reset styles (gebaseerd op DV _reset.scss) */
    margin: 0;
    border: 0;
    padding: 0;
    vertical-align: baseline;

    /* Title styles (gebaseerd op DV vl-ui-titles/src/scss/_titles.scss) */
    font-weight: 500;
`;

export const vlHeading1 = css`
    ${headingBase};

    font-size: 4.4rem;
    margin-bottom: 6rem;
    line-height: 1.18;

    @media screen and (max-width: ${vlMediaScreenMedium}px) {
        font-size: 4rem;
        margin-bottom: 4.5rem;
    }

    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        font-size: 3rem;
        margin-bottom: 3rem;
    }
`;

export const vlHeading2 = css`
    ${headingBase};

    font-size: 3.2rem;
    margin-bottom: 2rem;
    line-height: 1.24;

    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        font-size: 2.6rem;
        margin-bottom: 1.5rem;
    }
`;

export const vlHeading3 = css`
    ${headingBase};

    font-size: 2.6rem;
    margin-bottom: 2rem;
    line-height: 1.3;

    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        font-size: 2.2rem;
        margin-bottom: 1.5rem;
    }
`;

export const vlHeading4 = css`
    ${headingBase};

    font-size: 2.2rem;
    margin-bottom: 1.8rem;
    line-height: 1.36;

    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        font-size: 2rem;
        margin-bottom: 1.4rem;
    }
`;

export const vlHeading5 = css`
    ${headingBase};

    font-size: 2rem;
    margin-bottom: 1.6rem;
    line-height: 1.4;

    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        font-size: 1.8rem;
        margin-bottom: 1.2rem;
    }
`;

export const vlHeading6 = css`
    ${headingBase};

    font-size: 1.8rem;
    margin-bottom: 1.4rem;
    line-height: 1.44;

    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        font-size: 1.8rem;
        margin-bottom: 1rem;
    }
`;
