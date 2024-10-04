import { css, CSSResult } from 'lit';
import { vlFocusOutlineMixin } from '../../base/mixin/vl-outlines.css';
import { vlMediaScreenSmall } from '../../base/var/vl-media-screen.css';

export const vlLinkStyles: CSSResult = css`
    a {
        /* Reset styles (gebaseerd op DV _reset.scss) */
        margin: 0;
        border: 0;
        padding: 0;

        /* Link styles (gebaseerd op DV _anchor.scss en _link.scss) */
        display: inline-flex;
        align-items: center;
        word-break: break-word;
        color: var(--vl-action-color);
        cursor: pointer;

        &:hover {
            color: var(--vl-action-color--hover);
            text-decoration: none;
        }

        &:focus {
            ${vlFocusOutlineMixin()}
        }

        &:focus,
        &:active {
            color: var(--vl-action-color--active);
        }

        &:visited {
            color: var(--vl-action-color--visited);
        }

        &.bold {
            font-weight: 500;
            text-decoration: none;

            &:hover,
            &:focus,
            &:active {
                text-decoration: underline;
            }
        }

        &.small {
            font-size: var(--vl-font-size--small);

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                font-size: calc(var(--vl-font-size--small) - 0.1rem);
            }
        }

        &.large {
            font-size: var(--vl-font-size--large);

            @media screen and (max-width: ${vlMediaScreenSmall}px) {
                font-size: calc(var(--vl-font-size--large) - 0.2rem);
            }
        }

        &.error {
            color: var(--vl-error-color);

            &:hover,
            &:focus,
            &:active,
            &:visited {
                color: var(--vl-error-color--hover);
            }
        }

        /* Icon styles */

        .vl-icon {
            &:before {
                display: inline-block;
                text-decoration: none;
            }

            &.vl-icon--before {
                margin-right: 0.4rem;
            }

            &.vl-icon--after {
                margin-left: 0.4rem;
            }

            &.vl-icon--external {
                color: var(--vl-light-text-color);
            }
        }

        &:hover,
        &:focus,
        &:active {
            .vl-icon.vl-icon--external {
                color: var(--vl-light-text-color);
            }
        }

        /* Moet op deze manier gedefinieerd worden of de styles werken niet, visited doet raar. */

        &:visited .vl-icon {
            color: var(--vl-action-color--visited);
        }

        &:visited .vl-icon.vl-icon--external {
            color: var(--vl-light-text-color);
        }

        &.error:visited .vl-icon {
            color: var(--vl-error-color--hover);
        }

        &.error:visited .vl-icon.vl-icon--external {
            color: var(--vl-light-text-color);
        }
    }
`;
