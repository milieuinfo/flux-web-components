import { css, CSSResult } from 'lit';

// deze css is gegenereerd uit de oude custom scss
export const vlInfoTyleFluxStyles: CSSResult = css`
    :host .vl-info-tile__header {
        flex-direction: row;
    }
    :host .vl-info-tile__header__wrapper {
        flex: 1 0 auto;
        display: flex;
        justify-content: space-between;
    }
    :host([toggleable]) .vl-info-tile__header__wrapper .vl-toggle {
        width: 100%;
        text-decoration: none;
    }
    :host([toggleable]) .vl-info-tile__header__wrapper .vl-toggle:hover,
    :host([toggleable]) .vl-info-tile__header__wrapper .vl-toggle:focus {
        text-decoration: underline;
    }
    :host([toggleable]) .vl-info-tile__title-wrapper {
        flex: 1;
    }
    :host([toggleable]) .vl-info-tile__header__title {
        flex-grow: 1;
    }
    :host([toggleable]) .vl-info-tile__header__subtitle {
        margin-left: 2rem;
    }
    :host([toggleable]) .vl-info-tile.js-vl-accordion:not(.js-vl-accordion--open) .vl-info-tile__content {
        visibility: hidden;
        overflow: hidden;
        max-height: 0;
        margin: 0;
    }
    :host([toggleable]) .vl-info-tile.js-vl-accordion.js-vl-accordion--open .vl-info-tile__content {
        visibility: visible;
        max-height: 100%;
        margin-left: 2rem;
    }

    :host([toggleable])
        .vl-info-tile.js-vl-accordion.js-vl-accordion--open
        .vl-toggle
        > .vl-vi-arrow-right-fat::before {
        transform: rotate(-90deg);
    }

    :host .vl-info-tile__footer {
        margin-top: 1.5rem;
    }

    :host .vl-info-tile--center {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;

        .vl-info-tile__header {
            justify-self: center;
        }

        .vl-info-tile__badge__wrapper {
            display: flex;
            flex-wrap: wrap;
            place-content: center;
            margin-right: 0;
            margin-bottom: 1.4rem;
        }

        & > * {
            margin-top: 0;
            margin-bottom: 0;
        }
    }

    :host .vl-info-tile__icon {
        width: 4.5rem;
        height: 4.5rem;
        display: flex;
        flex-wrap: wrap;
        place-content: center center;

        &.vl-info-tile__icon--badge {
            background-color: var(--vl-color--background-subtle);
            border: 1px solid var(--vl-color--border-default);
            border-radius: 50%;
        }
    }

    slot[name='title-label'] {
        display: inline-block;
        margin-left: 3rem;
    }

    :host .vl-info-tile--alt {
        border-color: var(--vl-color--border-default);
        background-color: var(--vl-color--background-subtle);

        .vl-info-tile__icon--badge {
            background-color: white;
        }
    }

    :host .vl-info-tile--error {
        border-color: var(--vl-color--error-border);
        background-color: var(--vl-color--error-bg);

        .vl-info-tile__icon--badge {
            background-color: var(--vl-color--error);
            border-color: var(--vl-color--error);
            color: white;
        }
    }

    :host .vl-info-tile--success {
        border-color: var(--vl-color--success-border);
        background-color: var(--vl-color--success-bg);

        .vl-info-tile__icon--badge {
            background-color: var(--vl-color--success);
            border-color: var(--vl-color--success);
            color: white;
        }
    }

    :host .vl-info-tile--warning {
        border-color: var(--vl-color--warning-border);
        background-color: var(--vl-color--warning-bg);

        .vl-info-tile__icon--badge {
            background-color: var(--vl-color--warning);
            border-color: var(--vl-color--warning);
        }
    }

    :host .vl-info-tile--full-height {
        height: 100%;
    }

    button.info-tile-clickable {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        border: none;
    }

    .vl-info-tile__menu {
        z-index: 1;
    }
`;
