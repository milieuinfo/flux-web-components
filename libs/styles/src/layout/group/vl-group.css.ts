import { css, CSSResult } from 'lit';
import { vlMediaScreenExtraSmall, vlMediaScreenMedium, vlMediaScreenSmall } from '../../base/var/vl-media-screen.css';

export const vlGroupStyles: CSSResult = css`
    .vl-group {
        display: flex;
        gap: 1.4rem;

        &.vl-group--column {
            flex-direction: column;
        }

        &.vl-group--stretch-children {
            & > * {
                width: 100%;
            }
        }

        &.vl-group--no-gap {
            gap: 0;
        }

        &.vl-group--no-row-gap {
            row-gap: 0;
        }

        &.vl-group--no-column-gap {
            column-gap: 0;
        }

        &.vl-group--wrap {
            flex-wrap: wrap;
        }

        &.vl-group--space-between {
            justify-content: space-between;
        }

        &.vl-group--justify-start {
            justify-content: flex-start;
        }

        &.vl-group--justify-center {
            justify-content: center;
        }

        &.vl-group--justify-end {
            justify-content: flex-end;
        }

        &.vl-group--align-start {
            align-items: flex-start;
        }

        &.vl-group--align-center {
            align-items: center;
        }

        &.vl-group--align-end {
            align-items: flex-end;
        }

        &.vl-group--baseline {
            align-items: baseline;

            vl-link::part(link),
            vl-link::part(button) {
                align-items: baseline;
            }
            vl-link::part(icon) {
                align-self: center;
            }
        }

        &.vl-group--separator-row {
            > * + * {
                &::before {
                    content: '';
                    border-left: 1px solid #cbd2da;
                    padding-left: calc(1.4rem - 1px);
                    margin-top: 0.6rem;
                    margin-bottom: 0.6rem;
                }
            }
        }

        &.vl-group--separator-column {
            > * {
                padding-top: 1.5rem;
                border-top: 1px solid #cbd2da;
            }

            > :last-child {
                padding-bottom: 1.5rem;
                border-bottom: 1px solid #cbd2da;
            }
        }

        &.vl-group--input-group {
            gap: 0;

            :first-child:focus {
                z-index: 1;
            }
        }

        @media screen and (min-width: ${vlMediaScreenMedium}px) {
            &.vl-group--collapse-l {
                flex-direction: column;
                align-items: flex-start;
            }
        }

        @media screen and (max-width: ${vlMediaScreenMedium}px) {
            &.vl-group--collapse-m {
                flex-direction: column;
                align-items: flex-start;
            }
        }

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            &.vl-group--collapse-s {
                flex-direction: column;
                align-items: flex-start;
            }
        }

        @media screen and (max-width: ${vlMediaScreenExtraSmall}px) {
            &.vl-group--collapse-xs {
                flex-direction: column;
                align-items: flex-start;
            }
        }
    }
`;
