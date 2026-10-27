import { vlMediaScreenMedium } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlNavSubStyles: CSSResult = css`
    :host {
        display: block;
    }

    /* de vl-nav-links dragen zelf hun verticale ruimte (padding-block), daarom geen padding of gap hier */
    .vl-nav-sub {
        border-block: 1px solid var(--vl-color--border-default);
        background: var(--vl-color--background-default);
    }

    /* het icoon en de tekst staan op dezelfde x-positie als die van een vl-nav-link: de padding van de link plus die
       van zijn ghost vl-button, en tussen icoon en tekst dezelfde 0.5em als vl-button (waarde van vl-icon.css.ts) */
    .vl-nav-sub__label {
        display: flex;
        align-items: center;
        gap: 0.5em;
        font-weight: 500;
        font-size: var(--vl-font-size--small);
        color: var(--vl-color--text-default);
        padding-left: calc(var(--vl-spacing--normal) + var(--vl-spacing--xsmall) + 0.2rem);
        padding-right: var(--vl-spacing--normal);
        padding-top: calc(var(--vl-spacing--xsmall) + var(--vl-spacing--xxsmall));
        padding-bottom: var(--vl-spacing--xsmall);
    }

    .vl-nav-sub__items {
        display: flex;
        flex-direction: column;
    }

    :host([collapsed]) {
        @media screen and (min-width: ${vlMediaScreenMedium + 1}px) {
            .vl-nav-sub__label-text {
                display: none;
            }
            .vl-nav-sub__label {
                justify-content: center;
                padding-inline: 0;
            }
        }
    }
`;
