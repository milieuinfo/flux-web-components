import { vlHyphenateMixin, vlMediaScreenSmall } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';
import {
    vlHeading1,
    vlHeading2,
    vlHeading3,
    vlHeading4,
    vlHeading5,
    vlHeading6,
} from '../heading-style/vl-heading-style.css';

const headingList = [1, 2, 3, 4, 5, 6];

export const vlTitleStyles: CSSResult[] = [
    css`
        h1,
        .h1 {
            ${vlHeading1}
        }

        h2,
        .h2 {
            ${vlHeading2}
        }

        h3,
        .h3 {
            ${vlHeading3}
        }

        h4,
        .h4 {
            ${vlHeading4}
        }

        h5,
        .h5 {
            ${vlHeading5}
        }

        h6,
        .h6 {
            ${vlHeading6}
        }

        /* als anoniem flex item zou de tekst nooit smaller worden dan zijn langste woord */
        .vl-title__text {
            min-width: 0;
        }
    `,
    // overflow-wrap: break-word en niet anywhere: dat laat de min-content ongemoeid, zodat de titel in een krappe
    // flex-rij op desktop minstens zo breed blijft als zijn langste woord.
    ...headingList.map(
        (heading) => css`
            h${heading}, .h${heading} {
                display: flex;
                align-items: center;
                overflow-wrap: break-word;
            }

            h${heading}.alt, .h${heading}.alt {
                text-transform: uppercase;
                font-weight: 500;
                border-bottom: 3px solid rgb(232, 235, 238);
                padding: 1.3rem 0 0.7rem;
                margin: 0 0 2rem;
            }

            h${heading}.underline, .h${heading}.underline {
                border-bottom: 1px solid #cbd2da;
                margin-bottom: 1.5rem;
            }

            h${heading}.no-space-bottom, .h${heading}.no-space-bottom {
                margin-bottom: 0;
            }

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                h${heading}, .h${heading} {
                    ${vlHyphenateMixin()}
                    overflow-wrap: anywhere;
                }

                h${heading}.underline, .h${heading}.underline {
                    margin-bottom: 1rem;
                }
            }
        `,
    ),
];
