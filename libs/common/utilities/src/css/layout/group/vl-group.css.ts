import { css, CSSResult } from 'lit';
import { vlMediaScreenExtraSmall, vlMediaScreenMedium, vlMediaScreenSmall } from '../../base/var/vl-media-screen.css';

export const vlGroupStyles: CSSResult = css`
    .vl-group-next {
        display: flex;
        align-items: center;
        gap: 1.4rem;

        &.vl-group-next--column {
            flex-direction: column;

            * {
                width: 100%;
            }
        }

        &.vl-group-next--no-gap {
            gap: 0;
        }

        &.vl-group-next--space-between {
            justify-content: space-between;
        }

        &.vl-group-next--justify-center {
            justify-content: center;
        }

        &.vl-group-next--justify-end {
            justify-content: flex-end;
        }

        &.vl-group-next--baseline {
            align-items: baseline;

            vl-link-next::part(link),
            vl-link-next::part(button) {
                align-items: baseline;
            }
            vl-link-next::part(icon) {
                align-self: center;
            }
        }

        &.vl-group-next--separator-row {
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

        &.vl-group-next--separator-column {
            > * {
                padding-top: 1.5rem;
                border-top: 1px solid #cbd2da;
            }

            > :last-child {
                padding-bottom: 1.5rem;
                border-bottom: 1px solid #cbd2da;
            }
        }

        &.vl-group-next--input-group {
            gap: 0;

            .vl-input-field:focus,
            input:focus,
            .vl-input-addon-next:focus {
                z-index: 1;
                border-left-width: 1px;
            }

            .vl-input-field:hover {
                border-width: 0.2rem;
                padding: 0 0.9rem;
            }

            :first-child {
                border-right-width: 0 !important;
            }

            :first-child:focus {
                z-index: 1;
                border-right-width: 1px;
            }
        }

        @media screen and (min-width: ${vlMediaScreenMedium}px) {
            &.vl-group-next--collapse-l {
                flex-direction: column;
                align-items: flex-start;
            }
        }

        @media screen and (max-width: ${vlMediaScreenMedium}px) {
            &.vl-group-next--collapse-m {
                flex-direction: column;
                align-items: flex-start;
            }
        }

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            &.vl-group-next--collapse-s {
                flex-direction: column;
                align-items: flex-start;
            }
        }

        @media screen and (max-width: ${vlMediaScreenExtraSmall}px) {
            &.vl-group-next--collapse-xs {
                flex-direction: column;
                align-items: flex-start;
            }
        }
    }
`;
