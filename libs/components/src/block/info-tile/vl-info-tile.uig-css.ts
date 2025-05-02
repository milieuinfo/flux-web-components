import { css, CSSResult } from 'lit';

// deze css is gegenereerd uit de oude custom scss
const styles: CSSResult = css`
    :host .vl-info-tile__header {
        flex-direction: column;
    }
    :host .vl-info-tile__header__wrapper {
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

    slot[name='title-label'] {
        display: inline-block;
        margin-left: 3rem;
    }
`;
export default styles;
