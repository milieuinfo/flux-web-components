import { css, CSSResult, unsafeCSS } from 'lit';
import selectRichComponentRawCss from './vl-select-rich.component.raw.css?raw';

export const vlSelectRichComponentStyles: CSSResult = css`
    ${unsafeCSS(selectRichComponentRawCss)}

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    /* ===================================================================
       Choices.js Container (Outer)
       =================================================================== */

    .js-vl-select {
        position: relative;
        border-radius: 0.3rem;
        z-index: var(--vl-z-layer--select-dropdown);
    }

    .js-vl-select.is-open {
        z-index: var(--vl-z-layer--select-dropdown-open);
    }

    .js-vl-select.is-open .vl-select__inner {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .js-vl-select.is-flipped .vl-select__inner {
        border-radius: 0 0 0.3rem 0.3rem;
    }

    .js-vl-select.is-flipped .vl-select__list--dropdown {
        top: auto;
        bottom: 100%;
        transform: translateY(0.1rem);
        border-radius: 0.3rem 0.3rem 0 0;
    }

    /* ===================================================================
       Nav-Down Icon
       =================================================================== */

    /* De nav-down pijl staat op de combobox-container via ::before. We gebruiken
       enkel .vl-icon--nav-down (codepoint uit de gedeelde icon-mapping, FLUX-172),
       niet de .vl-icon basis-class: die zet display/font-family/font-size op het
       element zelf, wat in de dropdown-kinderen zou lekken. Het icon-font zetten we
       daarom hier rechtstreeks op de pseudo. */
    .js-vl-select.vl-icon--nav-down:before {
        font-family: var(--vl-icon-font);
        color: var(--vl-select-rich--nav-icon-color);
        position: absolute;
        right: 1.3rem;
        font-size: 1.3rem;
        top: 50%;
        transform: translateY(-50%);
    }

    /* ===================================================================
       Inner Container
       =================================================================== */

    .js-vl-select .vl-select__inner {
        font-size: var(--vl-font-size--small);
        font-family: var(--vl-font);
        color: #666;
        background-color: var(--vl-color--background-default);
        padding: 0.5rem 6rem 0.4rem 1rem;
        border: 0.1rem solid var(--vl-color--grey-800);
        border-radius: 0.3rem;
        border-color: var(--vl-color--border-alt);
        overflow: hidden;
    }

    .js-vl-select .vl-select__inner .vl-select,
    .js-vl-select .vl-select__inner .vl-multiselect,
    .js-vl-select .vl-select__inner select {
        display: none !important;
    }

    /* ===================================================================
       Hover State
       =================================================================== */

    .js-vl-select:hover:not(.is-disabled) .vl-select__inner {
        border-color: rgba(0, 85, 204, 0.65);
        box-shadow: inset 0 0 0 0.1rem rgba(0, 85, 204, 0.65);
    }

    /* ===================================================================
       Focus & Open State
       =================================================================== */

    .js-vl-select.is-focused {
        box-shadow:
            0 0 0 2px #fff,
            0 0 0 5px rgba(0, 85, 204, 0.65);
        outline: transparent solid 0.2rem;
    }

    @supports (outline-offset: 2px) {
        .js-vl-select.is-focused {
            box-shadow: none;
            outline: 3px solid rgba(0, 85, 204, 0.65);
            outline-offset: 2px;
        }
    }

    .js-vl-select:not(.is-disabled) {
        &:focus,
        &.is-focused,
        &.is-open {
            box-shadow:
                0 0 0 2px #fff,
                0 0 0 5px rgba(0, 85, 204, 0.65);
            outline: transparent solid 0.2rem;

            @supports (outline-offset: 2px) {
                box-shadow: none;
                outline: 3px solid rgba(0, 85, 204, 0.65);
                outline-offset: 2px;
            }

            &:hover .vl-select__inner {
                box-shadow: none;
                border-color: var(--vl-color--border-alt);
            }
        }
    }

    /* ===================================================================
       Disabled State
       =================================================================== */

    .js-vl-select.is-disabled {
        border-color: var(--vl-color--grey-800);
        background-color: var(--vl-color--border-alt--background) !important;
        outline: 0;
    }

    .js-vl-select.is-disabled .vl-select__inner {
        border-color: var(--vl-color--border-alt);
    }

    .js-vl-select.is-disabled .vl-select__item {
        color: #707070;
        cursor: default;
    }

    .js-vl-select.is-disabled .vl-select__list--multiple .vl-select__item {
        padding-right: 1.4rem;

        .vl-pill__close {
            display: none;
        }
    }

    /* ===================================================================
       Error State
       =================================================================== */

    .js-vl-select .vl-select__inner:has(select.vl-select--error) {
        border-color: var(--vl-color--error);
        background-color: #fbebec;
    }

    /* ===================================================================
       Success State
       =================================================================== */

    .js-vl-select .vl-select__inner:has(select.vl-select--success) {
        border-color: var(--vl-color--success);
        background-color: #e6f5ed;
    }

    /* ===================================================================
       Select-One Type — Inner & Items
       =================================================================== */

    .js-vl-select[data-type*='select-one'] .vl-input-field {
        display: block;
        padding: 0;
        color: #333332;
        height: 3.5rem;
        line-height: 3.5rem;
        overflow: hidden;
        white-space: nowrap;
    }

    .js-vl-select[data-type*='select-one'] .vl-select__list--dropdown .vl-input-field {
        width: calc(100% - (2 * 2rem));
        margin: 2rem;
        padding: 0 1rem;
        height: 3.5rem;
        line-height: 3.5rem;
        font-family: var(--vl-font);
        font-size: var(--vl-font-size--small);
        border: 0.1rem solid var(--vl-color--grey-800);
        border-radius: 0.3rem;
        background-color: #fff;
    }

    .js-vl-select[data-type*='select-one'] .vl-select__list--dropdown .vl-input-field:focus {
        outline: 3px solid rgba(0, 85, 204, 0.65);
        outline-offset: 2px;
        box-shadow: none;
    }

    .js-vl-select[data-type*='select-one'] .vl-select__item--selectable {
        min-height: calc(3.5rem - 1.2rem);
        height: calc(3.5rem - 1.2rem);
    }

    .js-vl-select[data-type*='select-one'] .vl-select__inner {
        height: 3.5rem;
        line-height: 3.5rem;
        padding-right: 3.5rem;
    }

    /* ===================================================================
       Select-One — Close/Delete Button
       =================================================================== */

    .js-vl-select[data-type*='select-one'] .vl-pill__close {
        border: 0;
        display: inline-flex;
        margin-left: auto;
    }

    /* Vroeger erfde dit kruisje de UA-default button-grootte (~1.3rem). Sinds de
       .vl-icon class (FLUX-172) zet font-size: 1em die op de oudergrootte (1.6rem),
       waardoor het kruisje groter werd. Expliciet terugzetten op de oude grootte. */
    .js-vl-select[data-type*='select-one'] .vl-pill__close.vl-icon--close::before {
        font-size: 1.3rem;
    }

    .js-vl-select[data-type='select-one'] .vl-select__inner .vl-pill__close {
        margin: 0.1rem 0 0 auto;
        border-radius: 0.3rem;

        &:hover,
        &:focus {
            box-shadow: none;
            border: var(--vl-select-rich--button-hover-border) 0.1rem solid;
            background-color: var(--vl-select-rich--button-hover-bg);
            color: var(--vl-select-rich--button-hover-color);
            outline: none;
        }
    }

    .js-vl-select[data-type*='select-one'] .vl-pill__close:hover,
    .js-vl-select[data-type*='select-one'] .vl-pill__close:focus,
    .js-vl-select[data-type*='select-one'] .vl-pill__close:active {
        color: var(--vl-select-rich--button-hover-color);
    }

    .js-vl-select[data-type*='select-one'].is-disabled .vl-pill__close,
    .js-vl-select[data-type*='select-one'] .vl-select__placeholder .vl-pill__close {
        display: none;
    }

    /* ===================================================================
       Select-Multiple Type
       =================================================================== */

    .js-vl-select[data-type*='select-multiple'],
    .js-vl-select[data-type*='text'] {
        background-color: #fff;
    }

    .js-vl-select[data-type*='select-multiple'] .vl-select__inner,
    .js-vl-select[data-type*='text'] .vl-select__inner {
        cursor: text;
    }

    .js-vl-select[data-type*='select-multiple'] .vl-input-field,
    .js-vl-select[data-type*='text'] .vl-input-field {
        display: inline;
        padding: 0;
        font-family: var(--vl-font);
        font-size: var(--vl-font-size--small);
        line-height: 2.2rem;
        height: 2.4rem;
    }

    .js-vl-select[data-type*='select-multiple'] .vl-input-field:focus,
    .js-vl-select[data-type*='text'] .vl-input-field:focus {
        outline: 0;
        box-shadow: none;
    }

    /* ===================================================================
       Lists (general)
       =================================================================== */

    .js-vl-select .vl-select__list {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .js-vl-select .vl-select__list--single {
        display: inline-block;
        width: 100%;
    }

    .js-vl-select .vl-select__list--multiple {
        display: inline-flex;
        align-content: center;
        max-width: 100%;
    }

    .js-vl-select .vl-select__list--multiple .vl-select__item {
        margin: 0.2rem 0.6rem 0.5rem 0;
        display: inline-flex;
        /* De algemene .vl-select__item regel forceert height: 2.3rem; voor een pill
           is dat 0.1rem te laag t.o.v. de close-button (2.4rem + negatieve marges),
           waardoor de onderrand onder het kruisje dubbel/verschoven oogt. De pill
           zijn natuurlijke hoogte (line-height + randen = 2.4rem) teruggeven. */
        height: auto;
        min-height: 0;
    }

    .js-vl-select .vl-select__list--multiple .vl-select__item[data-deletable] {
        padding-right: 0;
    }

    .js-vl-select .vl-select__list--multiple .vl-input-field {
        padding: 0.4rem 0 0.4rem 0.2rem;
    }

    /* ===================================================================
       Dropdown List
       =================================================================== */

    .js-vl-select .vl-select__list--dropdown {
        display: none;
        position: absolute;
        top: 100%;
        width: 100%;
        transform: translateY(-0.1rem);
        border: 0.1rem var(--vl-color--grey-800) solid;
        background-color: #fff;
        z-index: 1;
        border-bottom-left-radius: 0.3rem;
        border-bottom-right-radius: 0.3rem;
    }

    .js-vl-select .vl-select__list--dropdown.is-active {
        display: block;
    }

    .js-vl-select .vl-select__list--dropdown .vl-select__list {
        position: relative;
        max-height: 35vh;
        overflow: auto;
        will-change: scroll-position;
        -webkit-overflow-scrolling: touch;
    }

    .js-vl-select .vl-select__list--dropdown .vl-input-field + .vl-select__list {
        border-top: 0.1rem solid var(--vl-color--grey-800);
    }

    /* ===================================================================
       Dropdown Items
       =================================================================== */

    .js-vl-select .vl-select__list--dropdown .vl-select__item {
        width: 100%;
        min-height: 0;
        height: auto;
        padding-top: 0.8rem;
        padding-bottom: 0.8rem;
        padding-left: 3rem;
        border: 0;
        color: #000;
        font-weight: normal;
        text-decoration: none;
    }

    .js-vl-select .vl-select__list--dropdown .vl-select__item:not(:first-of-type) {
        border-top: 0.1rem #cbd2da solid;
    }

    /* Flux override: group borders */
    .js-vl-select .vl-select__list--dropdown .vl-select__list .vl-select__group {
        border-top: none;
    }

    .js-vl-select .vl-select__list--dropdown .vl-select__list .vl-select__group ~ .vl-select__group {
        border-top: 0.1rem solid rgb(104, 116, 131);
    }

    /* Flux override: item borders (sibling-based) */
    .js-vl-select
        .vl-select__list--dropdown
        .vl-select__list
        :not(.vl-select__group)
        .vl-select__item:not(.vl-select__placeholder) {
        border-top: none;
    }

    .js-vl-select
        .vl-select__list--dropdown
        .vl-select__list
        :not(.vl-select__group)
        .vl-select__item:not(.vl-select__placeholder)
        ~ .vl-select__item {
        border-top: 0.1rem solid rgb(104, 116, 131);
    }

    @media screen and (min-width: 767px) {
        .js-vl-select .vl-select__list--dropdown .vl-select__item--selectable {
            padding-right: 10rem;
        }

        .js-vl-select .vl-select__list--dropdown .vl-select__item--selectable::after {
            position: absolute;
            top: 50%;
            right: 1rem;
            transform: translateY(-50%);
            content: attr('data-select-text');
            opacity: 0.5;
        }
    }

    .js-vl-select .vl-select__list--dropdown .vl-select__item--selectable.is-highlighted {
        position: relative;
        background-color: var(--vl-select-rich--item-highlight-bg);
    }

    .js-vl-select .vl-select__list--dropdown .vl-select__item[aria-selected='true'] {
        background-color: var(--vl-select-rich--item-highlight-bg);
    }

    /* ===================================================================
       Items (General)
       =================================================================== */

    .js-vl-select .vl-select__item {
        cursor: default;
        display: flex;
        align-items: center;
        min-height: calc(3.5rem - 1.2rem);
        height: calc(3.5rem - 1.2rem);
    }

    .js-vl-select .vl-select__item--disabled {
        background-color: var(--vl-color--border-alt--background) !important;
        border-color: var(--vl-color--border-alt);
        color: #707070 !important;
        cursor: not-allowed;
        user-select: none;
    }

    .js-vl-select .vl-select__item--disabled:hover {
        background-color: var(--vl-color--border-alt--background);
    }

    .js-vl-select .vl-select__item span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .js-vl-select .vl-select__item--choice.vl-select__placeholder {
        display: none;
    }

    /* ===================================================================
       Placeholder
       =================================================================== */

    .js-vl-select .vl-select__placeholder {
        opacity: 0.5;
    }

    .js-vl-select .vl-select__item.vl-select__placeholder {
        opacity: 1;
        color: var(--vl-select-rich--placeholder-color);
    }

    /* ===================================================================
       Groups
       =================================================================== */

    .js-vl-select .vl-select__group {
        display: block;
    }

    .js-vl-select .vl-select__group:not(:first-of-type) {
        border-top: 0.1rem solid var(--vl-color--grey-800);
    }

    .js-vl-select .vl-select__group .vl-select__heading {
        padding: 0.6rem 2rem;
        color: var(--vl-select-rich--group-heading-color);
        font-weight: 500;
    }

    /* ===================================================================
       Input Field (inside Choices.js)
       =================================================================== */

    .js-vl-select .vl-input-field {
        display: inline-block;
        max-width: 100%;
        border: 0;
        background-color: transparent;
        vertical-align: baseline;
    }

    /* ===================================================================
       Pill Styles (Multiselect tags)
       =================================================================== */

    .vl-pill__text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
    }

    .vl-pill {
        display: inline-flex;
        max-width: 100%;
        align-items: center;
        background-color: #fff;
        font-size: 1.4rem;
        font-weight: 500;
        color: #4d4d4b;
        text-decoration: none;
        vertical-align: middle;
        border-radius: 0.3rem;
        border: 0.1rem solid var(--vl-color--grey-800);
        transition:
            color 0.2s,
            background-color 0.2s,
            box-shadow 0.2s;
        padding: 0 1.4rem;
        line-height: calc(2.4rem - 0.2rem);
        min-width: 0;
    }

    .vl-pill__close {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--vl-select-rich--button-color);
        width: 2.4rem;
        height: 2.4rem;
        border: 0.1rem solid var(--vl-color--grey-800);
        text-decoration: none;
        margin-left: 1.4rem;
        padding: 0;
        border-radius: 0 0.3rem 0.3rem 0;
        transition:
            color 0.2s,
            background-color 0.2s,
            box-shadow 0.2s;
        margin-top: -0.1rem;
        margin-right: -0.1rem;
        margin-bottom: -0.1rem;
        min-width: 2.4rem;
    }

    .vl-pill__close:hover:not([disabled]) {
        color: var(--vl-select-rich--button-hover-color);
        box-shadow: inset 0 0 0 0.1rem var(--vl-select-rich--button-hover-border);
        border: var(--vl-select-rich--button-hover-border) 0.1rem solid;
        background-color: var(--vl-select-rich--button-hover-bg);
    }

    .vl-pill__close:focus {
        outline: transparent solid 0.2rem;
        border: var(--vl-select-rich--button-hover-border) 0.1rem solid;
        box-shadow:
            0 0 0 2px #fff,
            0 0 0 5px rgba(0, 85, 204, 0.65),
            inset 0 0 0 0.1rem var(--vl-select-rich--button-hover-border);
    }

    .is-disabled .vl-pill__close,
    .vl-pill__close[disabled] {
        color: var(--vl-color--grey-800);
        cursor: default;
    }

    .vl-pill__close__icon {
        line-height: 0;
    }

    .vl-pill__close__icon::before {
        display: inline-block;
        font-size: 0.8rem;
        text-indent: 0;
        line-height: 1;
        font-weight: bold;
    }
`;
