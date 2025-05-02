import { css, CSSResult } from 'lit';
import { vlLegacyStyles } from '@domg-wc/styles';

const styles: CSSResult = css`
    :host {
        display: inline-block;
        position: relative;
    }

    .vl-proza-message--updatable:hover {
        box-shadow: 0 0 0 1px #e8ebee;
    }

    .vl-proza-message--updatable {
        display: inline-flex;
        align-items: center;
    }
    .vl-proza-message--updatable > *:not(:last-child) {
        padding-right: 0.5em;
    }
    .vl-proza-message--updatable #actions {
        display: inline-flex;
        align-items: center;
    }
    .vl-proza-message--updatable #actions > *:not(:last-child) {
        margin-right: 0.3em;
    }

    :host(.vl-proza-message__block) .vl-proza-message--updatable {
        align-items: end;
    }

    vl-button::part(button) {
        cursor: pointer !important;
        height: 1.5em !important;
        width: 1.5em !important;
        background-color: #e8ebee !important;
        border: 0;
    }
    vl-button::part(button):hover {
        background-color: #cbd2da !important;
    }

    vl-button::part(icon) {
        color: #000;
    }
    vl-button::part(icon):hover {
        mix-blend-mode: hard-light;
    }

    vl-icon::part(icon) {
        font: icon !important;
        vertical-align: middle !important;
    }
`;
export default [...vlLegacyStyles, styles] as CSSResult[];
