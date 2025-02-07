import { css, CSSResult } from 'lit';

// deze css is gegenereerd uit de oude custom scss
// uitzonderlijk gebruik makend van de v3 versie van search: @import "@govflanders-v3/vl-ui-search/src/scss/search";
const styles: CSSResult = css`
    :root {
        --vl-theme-primary-color: #ffe615;
        --vl-theme-primary-color-60: #fff073;
        --vl-theme-primary-color-70: #ffee5b;
        --vl-theme-primary-color-rgba-30: rgba(255, 230, 21, 0.3);
        --vl-theme-fg-color: #333332;
        --vl-theme-fg-color-60: #858584;
        --vl-theme-fg-color-70: #707070;
    }

    .vl-vi::before,
    .vl-vi::after {
        font-family: 'vlaanderen-icon' !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-style: normal;
        font-variant: normal;
        font-weight: normal;
        text-decoration: none;
        text-transform: none;
        display: inline-block;
        vertical-align: middle;
    }
    .vl-vi.vl-vi-u-180deg::before {
        display: inline-block;
        transform: rotate(180deg);
        vertical-align: middle;
    }

    .vl-vi-u-xs::before {
        font-size: 0.8rem;
    }

    .vl-vi-u-s::before {
        font-size: 1.3rem;
    }

    .vl-vi-u-m::before {
        font-size: 1.7rem;
    }

    .vl-vi-u-l::before {
        font-size: 2rem;
    }

    .vl-vi-u-xl::before {
        font-size: 2.2rem;
    }

    .vl-vi-u-90deg::before {
        display: inline-block;
        transform: rotate(90deg);
    }

    .vl-vi-u-180deg::before {
        display: inline-block;
        transform: rotate(180deg);
    }

    .vl-search {
        position: relative;
    }
    .vl-search--inline {
        display: inline-block;
        width: 25rem;
        max-width: 100%;
    }
    @media screen and (max-width: 767px) {
        .vl-search--inline {
            display: block;
            width: auto;
        }
    }
    .vl-search--inline .vl-search__submit,
    .vl-search--inline .vl-search__label {
        display: block;
        padding: 0;
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 4.3rem;
        color: #fff;
        font-size: 0 !important;
    }
    .vl-search--inline .vl-search__submit .vl-vi,
    .vl-search--inline .vl-search__label .vl-vi {
        font-size: 1.7rem;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .vl-search--inline .vl-search__label {
        color: #333332;
    }
    .vl-search--inline .vl-search__submit {
        z-index: -1;
        opacity: 0;
        transform: translateX(100%);
        margin-bottom: -2rem;
        height: 3.5rem;
    }
    .vl-search--inline .vl-search__submit:focus,
    .vl-search--inline .vl-search__submit:focus + .vl-search__submit,
    .vl-search--inline .vl-search__input:focus,
    .vl-search--inline slot[name='input']:focus,
    .vl-search--inline .vl-search__input:focus + .vl-search__submit,
    .vl-search--inline slot[name='input']:focus + .vl-search__submit {
        z-index: 1;
        opacity: 1;
        transform: translateX(0%);
    }
    .vl-search--inline .vl-search__submit:focus {
        transition: none;
    }
    .vl-search--inline .vl-search__input,
    .vl-search--inline slot[name='input'] {
        display: block;
        width: 100%;
        text-align: left;
    }
    .vl-search--inline .vl-search__input:focus,
    .vl-search--inline slot[name='input']:focus {
        width: calc(100% - 4.7rem);
        padding-right: 0;
    }
    .vl-search--inline .vl-search__input:valid + .vl-search__submit,
    .vl-search--inline slot[name='input']:valid + .vl-search__submit {
        transition: none;
        z-index: 1;
        opacity: 1;
        transform: translateX(0%);
    }
    .vl-search--block {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 2rem 1.5rem;
        background-color: #f7f9fc;
    }
    @media screen and (max-width: 767px) {
        .vl-search--block {
            padding-left: 3%;
            padding-right: 3%;
            position: relative;
            width: 100vw;
            left: 50%;
            right: 50%;
            margin-left: -50vw;
            margin-right: -50vw;
        }
    }
    @media screen and (max-width: 767px) {
        .vl-search--block {
            display: block;
            padding: 1.5rem 1rem;
        }
    }
    .vl-search--block .vl-search__label {
        color: #4d4d4b;
        font-weight: 400;
        font-size: 1.6rem;
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    @media screen and (max-width: 767px) {
        .vl-search--block .vl-search__label {
            font-size: 1.6rem;
        }
    }
    .vl-search--block .vl-search__input,
    .vl-search--block slot[name='input'] {
        flex: 6;
        margin: 0 2rem;
    }
    @media screen and (max-width: 1023px) {
        .vl-search--block .vl-search__input,
        .vl-search--block slot[name='input'] {
            margin: 0 1rem;
            flex: 4;
        }
    }
    @media screen and (max-width: 767px) {
        .vl-search--block .vl-search__input,
        .vl-search--block slot[name='input'] {
            margin: 0;
            display: block;
            width: 100%;
            margin-bottom: 1.5rem;
        }
    }
    .vl-search--block.vl-search--alt {
        background-color: #fff;
    }

    slot[name='input'] {
        display: block;
    }

    :host([data-vl-inline][data-vl-has-input-slot]) .vl-search__label {
        z-index: var(--vl-z-layer--search);
    }

    :host([data-vl-inline]) .vl-search {
        width: var(--vl-search-width, 25rem);
    }
    :host([data-vl-inline]) slot[name='input'] {
        box-sizing: content-box;
    }
    :host([data-vl-inline]) slot[name='input'] + .vl-search__submit {
        display: none;
    }
    :host([data-vl-inline]) slot[name='input'].is-open + .vl-search__submit {
        transition: opacity 0.2s, transform 0.2s;
        z-index: var(--vl-z-layer--search);
        opacity: 1;
        transform: translateX(0%);
        display: block;
    }
    :host([data-vl-inline]) ::slotted(.js-vl-select) {
        background: white !important;
        box-shadow: 0px 0px 0px 1px inset #687483;
        margin-right: 0rem !important;
    }
    :host([data-vl-inline]) ::slotted(.js-vl-select:hover) {
        box-shadow: 0px 0px 0px 2px inset rgba(0, 85, 204, 0.65);
    }
    :host([data-vl-inline]) ::slotted(.is-open),
    :host([data-vl-inline]) ::slotted(.is-focused) {
        margin-right: 4.7rem !important;
        border: 0.1rem solid #687483 !important;
    }
`;
export default styles;
