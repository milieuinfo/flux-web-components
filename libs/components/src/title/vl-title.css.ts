import {
    vlHeading1,
    vlHeading2,
    vlHeading3,
    vlHeading4,
    vlHeading5,
    vlHeading6,
    vlMediaScreenSmall,
} from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

const headingList = [1, 2, 3, 4, 5, 6];

export const vlTitleStyles: CSSResult[] = [
    css`
        h1 {
            ${vlHeading1}
        }

        h2 {
            ${vlHeading2}
        }

        h3 {
            ${vlHeading3}
        }

        h4 {
            ${vlHeading4}
        }

        h5 {
            ${vlHeading5}
        }

        h6 {
            ${vlHeading6}
        }
    `,
    ...headingList.map(
        (heading) =>
            css`
                h${heading} {
                    display: flex;
                    align-items: center;
                }

                h${heading}.alt {
                    text-transform: uppercase;
                    font-weight: 500;
                    border-bottom: 3px solid rgb(232, 235, 238);
                    padding: 1.3rem 0 0.7rem;
                    margin: 0 0 2rem;
                }

                h${heading}.underline {
                    border-bottom: 1px solid #cbd2da;
                    margin-bottom: 1.5rem;
                }

                h${heading}.no-space-bottom {
                    margin-bottom: 0;
                }

                @media screen and (max-width: ${vlMediaScreenSmall}px) {
                    h${heading}.underline {
                        margin-bottom: 1rem;
                    }
                }
            `
    ),
];
