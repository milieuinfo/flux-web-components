import { vlMediaScreenExtraSmall, vlMediaScreenSmall } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlHttpErrorMessageFluxStyles: CSSResult = css`
    #info {
        font-size: small;
    }

    dl {
        display: grid;
        grid-template-columns: max-content auto;
        color: dimgray;
    }

    dt,
    dd {
        padding-right: 15px;
    }

    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        .vl-form-message-container.vl-grid {
            > div:nth-child(1) {
                order: 2;
            }
            > div:nth-child(2) {
                order: 1;
            }
            img {
                display: flex;
                width: 50%;
                justify-self: center; /* Dit is nodig omdat binnen een grid bij procentuele breedte, nog altijd de volledige
        breedte word in acht genomen om te centreren */
            }
        }
    }

    @media (min-width: ${vlMediaScreenExtraSmall}px) and (max-width: ${vlMediaScreenSmall}px) {
        .vl-form-message-container.vl-grid {
            > div:nth-child(1) {
                grid-column: 3 / 11;
            }
            > div:nth-child(2) {
                grid-column: 3 / 11;
            }
        }
    }
`;
