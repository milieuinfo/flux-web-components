import { css, unsafeCSS } from 'lit';
import { vlFocusOutlineMixin } from '../../base/mixin/vl-outlines.css';
import { vlMediaScreenSmall } from '../../base/var/vl-media-screen.css';

export const vlLinkStyles = (selector = 'a') => css`
    ${unsafeCSS(selector)} {
        /* Reset styles (gebaseerd op DV _reset.scss) */
        margin: 0;
        border: 0;
        padding: 0;

        /* Link styles (gebaseerd op DV _anchor.scss en _link.scss) */
        display: inline-flex;
        align-items: center;
        word-break: break-word;
        color: var(--vl-color--action);
        cursor: pointer;

        &:hover {
            color: var(--vl-color--action-hover);
            text-decoration: none;
        }

        &:focus {
            ${vlFocusOutlineMixin()}
        }

        &:focus,
        &:active {
            color: var(--vl-color--action-active);
        }

        &:visited {
            color: var(--vl-color--action-visited);
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
            color: var(--vl-color--error);

            &:hover,
            &:focus,
            &:active,
            &:visited {
                color: var(--vl-color--error-hover);
            }
        }

        /* Icon styles */

        .vl-icon.vl-icon--external {
            color: var(--vl-color--text-light);
        }

        &:hover,
        &:focus,
        &:active {
            .vl-icon.vl-icon--external {
                color: var(--vl-color--text-light);
            }
        }

        /* Moet op deze manier gedefinieerd worden of de styles werken niet, visited doet raar. */

        &:visited .vl-icon {
            color: var(--vl-color--action-visited);
        }

        &:visited .vl-icon.vl-icon--external {
            color: var(--vl-color--text-light);
        }

        &.error:visited .vl-icon {
            color: var(--vl-color--error-hover);
        }

        &.error:visited .vl-icon.vl-icon--external {
            color: var(--vl-color--text-light);
        }
    }
`;
