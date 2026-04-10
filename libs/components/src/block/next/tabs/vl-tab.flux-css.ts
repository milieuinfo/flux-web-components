import { vlFocusOutlineMixin } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlTabFluxStyles: CSSResult = css`
    :host {
        --vl-tab--padding-inline: 1.3rem;
    }

    :host,
    :host(:visited),
    :host > a,
    :host > a:visited {
        color: var(--vl-color--text-action);
        cursor: pointer;
        display: block;
        font-size: var(--vl-font-size--small);
        font-weight: 500;
        padding: 1.1rem var(--vl-tab--padding-inline) 1.2rem;
        position: relative;
        text-decoration: none;

        &::after {
            background-color: transparent;
            bottom: -1px;
            content: '';
            display: block;
            height: 0.3rem;
            left: var(--vl-tab--padding-inline);
            position: absolute;
            width: calc(100% - 2 * var(--vl-tab--padding-inline));
            transition: background-color 0.2s ease-out;
        }
    }

    :host([selected]),
    :host([selected]) > a {
        color: var(--vl-color--text-default);
    }

    :host(:hover),
    :host(:hover) > a {
        color: var(--vl-color--hover-text-action);
    }

    :host(:focus),
    :host(:focus) > a {
        ${vlFocusOutlineMixin()};
        outline-offset: -2px;
    }

    :host([selected]),
    :host([selected]) > a,
    :host(:hover),
    :host(:hover) > a,
    :host(:focus),
    :host(:focus) > a,
    :host(:active),
    :host(:active) > a {
        &::after {
            background-color: var(--vl-color--text-default);
        }
    }

    :host:has(a) {
        padding: 0;
        &::after {
            display: none;
        }
    }
    :host(:focus):has(a) {
        outline: none;
    }
`;
