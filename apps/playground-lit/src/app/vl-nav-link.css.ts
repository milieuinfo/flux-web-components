import { vlMediaScreenMedium } from '@domg-wc/styles';
import { css } from 'lit';

export const vlNavLinkStyles = css`
    :host > .vl-group {
        position: relative;
    }

    slot[name='link-badge']::slotted(*) {
        position: absolute;
        right: 0.8rem;
        pointer-events: none;
    }

    vl-button:first-child {
        flex: 1;

        &::part(button),
        &::part(link) {
            justify-content: flex-start;
        }
    }

    :host([collapsed]) {
        @media screen and (min-width: ${vlMediaScreenMedium}px) {
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
                right: 0;
                top: 0;
                padding: 0.2rem !important;
            }
        }
    }
`;
