import { vlFocusOutlineMixin } from '@domg-wc/styles';
import { css, CSSResult, unsafeCSS } from 'lit';
import { vlIconMapping } from './vl-icon-style-mapping.css';

export const vlIconStyles: CSSResult = css`
    ${unsafeCSS(vlIconMapping)}
    /* Icon styles - gebaseerd op DV _icon.scss */
    .vl-icon {
        font-family: var(--vl-icon-font);
        font-size: 1em;
        line-height: 1;
        display: inline;
        color: inherit;
        vertical-align: middle;

        &:before,
        &:after {
            display: inline-block;
            text-decoration: none;
            transition: transform 0.2s;
        }

        &.vl-icon--small {
            font-size: 0.8em;
        }

        &.vl-icon--large {
            font-size: 1.2em;
        }

        &.vl-icon--light {
            color: var(--vl-color--icon-subtle);
        }

        &.vl-icon--right-margin,
        &.vl-icon--before {
            margin-right: 0.5em;
        }

        &.vl-icon--left-margin,
        &.vl-icon--after {
            margin-left: 0.5em;
        }

        &.vl-icon--clickable {
            cursor: pointer;
            color: var(--vl-color--action);

            &:hover {
                color: var(--vl-color--action-hover);
            }

            &:focus {
                ${vlFocusOutlineMixin()}
            }

            &:focus,
            &:active {
                color: var(--vl-color--action-active);
            }
        }
    }
`;
