import { css, CSSResult, unsafeCSS } from 'lit';
import { vlHeading5 } from '@domg-wc/styles';

const borderWidth = '1px';
const borderLeftWidth = '0.5rem';

const styles: CSSResult = css`
    /* Doormat styles (gebaseerd op DV _doormat.scss) */
    .vl-doormat {
        display: flex;
        position: relative;
        padding: var(--vl-spacing--small) var(--vl-spacing--normal);
        background-color: var(--vl-color--background);
        text-decoration: none;
        border: ${unsafeCSS(borderWidth)} solid var(--vl-color--border);
        align-items: flex-start;

        &:before,
        .vl-doormat__graphic-wrapper:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            background-color: var(--vl-color--accent);
            width: ${unsafeCSS(borderLeftWidth)};
            height: 100%;
        }

        &:hover,
        &:focus {
            .vl-doormat__title {
                text-decoration: underline;
            }

            .vl-doormat__graphic {
                transform: scale(1.05);
            }
        }

        .vl-doormat__title {
            ${vlHeading5}
        }

        .vl-doormat__text {
            color: var(--vl-color--text);
            margin-top: var(--vl-spacing--xsmall);
        }

        .vl-doormat__image {
            max-width: 15rem;
            margin-left: var(--vl-spacing--small);
            order: 2;
        }

        &.vl-doormat--alt {
            background-color: var(--vl-color--background-alt);
        }

        &.vl-doormat--graphic {
            flex-direction: column;
        }

        .vl-doormat__graphic-wrapper {
            display: flex;
            position: relative;
            overflow: hidden;
            width: calc(100% + (var(--vl-spacing--normal) + ${unsafeCSS(borderWidth)}) * 2);
            margin-left: calc(
                (var(--vl-spacing--small) + ${unsafeCSS(borderLeftWidth)} + ${unsafeCSS(borderWidth)}) * -1
            );
            margin-top: calc((var(--vl-spacing--small) + ${unsafeCSS(borderWidth)}) * -1);
            margin-bottom: var(--vl-spacing--small);

            &:before {
                background-color: var(--vl-color--doormat-background);
                width: calc(${unsafeCSS(borderLeftWidth)} + ${unsafeCSS(borderWidth)});
                z-index: 2;
            }
        }

        .vl-doormat__graphic {
            display: block;
            width: 100%;
            transition: transform 0.2s;
        }
    }
`;
export default styles;
