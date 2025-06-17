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
            background-color: var(--vl-color--background-alt);
            border: 1px solid var(--vl-color--mischka-grey);
            border-radius: 50%;
        }
    }

    slot[name='title-label'] {
        display: inline-block;
        margin-left: 3rem;
    }
`;
