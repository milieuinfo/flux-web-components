import { vlMediaScreenMedium } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlNavLinkStyles: CSSResult = css`
    /* de padding-block is de ruimte die de actieve achtergrond inneemt: zo blijft die binnen de host */
    :host {
        display: block;
        position: relative;
        padding-block: var(--vl-spacing--xxsmall);
    }

    :host > .vl-group {
        position: relative;
        padding-inline: var(--vl-spacing--normal);
        padding-block: 0.2rem;
    }

    /* buiten de flex-flow, even groot als .vl-group: de badge positioneert zich zoals voorheen tegenover .vl-group */
    .vl-nav-link__badge {
        position: absolute;
        inset: 0;
        pointer-events: none;
    }

    slot[name='link-badge']::slotted(*) {
        --vl-nav-link-badge-size: 1.8rem;

        position: absolute;
        top: calc(50% - var(--vl-nav-link-badge-size) / 2);
        /* verticaal gecentreerd op een hele pixel: op een halve pixel snappen de pil en de tekst op een scherm met
           pixelverhouding 1 elk een andere kant op, en staat de tekst te hoog */
        top: round(down, calc(50% - var(--vl-nav-link-badge-size) / 2), 1px);
        right: calc(var(--vl-spacing--normal) + 0.8rem);
        pointer-events: none;
        min-width: var(--vl-nav-link-badge-size);
        max-width: 50%;
        height: var(--vl-nav-link-badge-size);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: calc(var(--vl-nav-link-badge-size) / 2);
        color: var(--vl-color--text-inverse);
        background-color: var(--vl-color--background-error);
        border: 1px solid var(--vl-color--background-error);
        padding: 0 0.3rem !important;
        font-size: 0.6em !important;
        font-weight: bold !important;
    }

    vl-button:first-child {
        flex: 1;

        &::part(button),
        &::part(link) {
            justify-content: flex-start;
        }
    }

    :host([collapsed]) {
        @media screen and (min-width: ${vlMediaScreenMedium + 1}px) {
            & > .vl-group {
                padding-inline: 0;
            }
            vl-button::part(button),
            vl-button::part(link) {
                font-size: 0;
                width: 100%;
                padding-inline: 0;
                justify-content: center !important;
            }
            vl-button::part(icon) {
                font-size: var(--vl-font-size);
            }
            slot[name='link-action'] {
                display: none;
            }
            slot[name='link-badge']::slotted(*) {
                font-size: 0.5em !important;
                min-width: 1rem !important;
                height: 1rem !important;
                border-radius: 0.5rem !important;
                right: 0.2rem;
                top: 0;
                padding: 0.2rem !important;
            }
        }
    }

    :host([active]) {
        background-color: var(--vl-color--background-action-subtle);

        vl-button::part(button),
        vl-button::part(link) {
            color: var(--vl-color--text-default);
        }

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: var(--vl-spacing--xxsmall);
            height: 100%;
            background-color: var(--vl-color--action);
        }
    }
`;
