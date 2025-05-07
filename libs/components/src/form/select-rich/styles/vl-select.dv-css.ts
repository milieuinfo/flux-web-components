// Dit zijn de aangepaste vl-select styles van DV.
// DV maakt gebruik van een 'data:' attribuut om een nav-down svg op te halen van w3.org.
// Hierdoor breekt CSP tenzij we alle 'data:' attributen gaan whitelisten, wat niet de bedoeling is.
// Deze 'data:' attributen zijn verwijderd zodat we toch CSP compliant kunnen zijn.
// In de vl-select-rich.flux-css.ts staan de vervangende styles voor de nav-down svg.
// Er stonden ook een aantal dubbele styles in deze file, deze zijn ook verwijderd.

import { css } from 'lit';
const style = css`
    .vl-select:focus::-ms-value {
        background: inherit;
        color: inherit;
    }
    .vl-select::-ms-expand {
        display: none;
    }
    .vl-select:hover:not([disabled]) {
        border: 0.2rem solid rgba(0, 85, 204, 0.65);
        padding: 0 3.9rem 0 1.4rem;
        line-height: 3.2rem;
        background-position: calc(100% - 1.4rem) 50%;
    }
    .vl-select:hover:not([disabled]).vl-select--error,
    .vl-select:hover:not([disabled]).invalid.validated {
        border-color: #d2373c;
    }
    .vl-select:hover:not([disabled]).vl-select--success,
    .vl-select:hover:not([disabled]).valid.validated {
        border-color: #009e47;
    }
    .vl-select:focus {
        box-shadow: 0 0 0 2px #fff, 0 0 0 5px rgba(0, 85, 204, 0.65);
        outline: transparent solid 0.2rem;
    }
    @supports (outline-offset: 2px) {
        .vl-select:focus {
            box-shadow: none;
            outline: 3px solid rgba(0, 85, 204, 0.65);
            outline-offset: 2px;
        }
    }
    .vl-select[disabled],
    .vl-select--disabled {
        border-color: #8695a8;
        background-color: #f3f5f6;
        color: var(--vl-theme-fg-color-70);
    }
    .vl-select--block {
        display: block;
        width: 100%;
    }
    @media screen and (max-width: 767px) {
        .vl-select {
            height: 3.5rem;
            line-height: 3.5rem;
            font-size: 1.6rem;
        }
    }
    @media all and (min-width: 0\\0) and (min-resolution: 0.001dpcm) {
        .vl-select {
            padding-right: 0;
            background-image: none;
        }
    }
    .no-js [select]:focus::-ms-value {
        background: inherit;
        color: inherit;
    }
    .js-vl-select {
        position: relative;
        border-radius: 0.3rem;
        z-index: var(--vl-z-layer--select-dropdown);
    }
    .js-vl-select.is-disabled {
        border-color: #687483;
        background-color: #f3f5f6 !important;
        outline: 0;
    }
    .js-vl-select.is-disabled .vl-select__inner {
        border-color: #8695a8;
    }
    .js-vl-select.is-disabled .vl-select__item {
        color: var(--vl-theme-fg-color-70);
        cursor: default;
    }
    .js-vl-select.is-focused {
        box-shadow: 0 0 0 2px #fff, 0 0 0 5px rgba(0, 85, 204, 0.65);
        outline: transparent solid 0.2rem;
    }
    @supports (outline-offset: 2px) {
        .js-vl-select.is-focused {
            box-shadow: none;
            outline: 3px solid rgba(0, 85, 204, 0.65);
            outline-offset: 2px;
        }
    }
    .js-vl-select.is-open {
        z-index: var(--vl-z-layer--select-dropdown-open);
    }
    .js-vl-select.is-open .vl-select__inner {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
    .js-vl-select.is-open::after {
        transform: translateY(-0.75rem);
        border-color: transparent transparent #000;
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
    .js-vl-select:hover:not(.is-disabled) .vl-select__inner {
        border-color: rgba(0, 85, 204, 0.65);
        box-shadow: inset 0 0 0 0.1rem rgba(0, 85, 204, 0.65);
    }
    .js-vl-select[data-type*='select-one'] .vl-input-field {
        display: block;
        padding: 0;
        color: #333332;
        overflow: hidden;
        white-space: nowrap;
    }
    .js-vl-select[data-type*='select-one'] .vl-select__list--dropdown .vl-input-field {
        width: calc(100% - (2 * 2rem));
        margin: 2rem;
        padding: 0 1rem;
        border: 0.1rem solid #687483;
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
    .js-vl-select[data-type*='select-one'][dir='rtl']::after {
        right: auto;
        left: 1.15rem;
    }
    .js-vl-select[data-type*='select-one'][dir='rtl'] .vl-pill__close {
        margin-right: auto;
        margin-left: 0;
    }
    .js-vl-select[data-type*='select-one'] .vl-pill__close {
        border: 0;
        display: inline-flex;
        margin-left: auto;
    }
    .js-vl-select[data-type*='select-one'] .vl-pill__close:hover,
    .js-vl-select[data-type*='select-one'] .vl-pill__close:focus,
    .js-vl-select[data-type*='select-one'] .vl-pill__close:active {
        color: #003bb0;
    }
    .js-vl-select[data-type*='select-one'].is-disabled .vl-pill__close,
    .js-vl-select[data-type*='select-one'] .vl-select__placeholder .vl-pill__close {
        display: none;
    }
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
        line-height: 2.2rem;
        height: 2.4rem;
    }
    .js-vl-select[data-type*='select-multiple'] .vl-input-field:focus,
    .js-vl-select[data-type*='text'] .vl-input-field:focus {
        outline: 0;
        box-shadow: none;
    }
    .js-vl-select__group {
        padding: 0.3rem 0.5rem 0.3rem 0;
        border-top: 0.1rem solid #687483;
        text-decoration: none;
    }
    .js-vl-select .vl-select__inner {
        padding: 0.5rem 6rem 0.4rem 1rem;
        border: 0.1rem solid #687483;
        border-radius: 0.3rem;
        color: #666;
        font-family: 'Flanders Art Sans', sans-serif;
        overflow: hidden;
    }
    .is-open .js-vl-select .vl-select__inner {
        border-bottom: 0;
    }
    .js-vl-select .vl-select__list {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .js-vl-select .vl-select__list--single {
        display: inline-block;
        width: 100%;
    }
    [dir='rtl'] .js-vl-select .vl-select__list--single {
        padding-right: 0.5rem;
        padding-left: 1.5rem;
    }
    .js-vl-select .vl-select__list--multiple {
        display: inline-flex;
        align-content: center;
        max-width: 100%;
    }
    .js-vl-select .vl-select__list--multiple .vl-select__item {
        margin: 0.2rem 0.6rem 0.5rem 0;
        display: inline-flex;
    }
    .js-vl-select .vl-select__list--multiple .vl-select__item[data-deletable] {
        padding-right: 0;
    }
    [dir='rtl'] .js-vl-select .vl-select__list--multiple--multiple {
        margin-right: 0;
        margin-left: 0.375rem;
    }
    .js-vl-select .vl-select__list--multiple .vl-input-field {
        padding: 0.4rem 0 0.4rem 0.2rem;
    }
    .js-vl-select .vl-select__list--dropdown {
        display: none;
        position: absolute;
        top: 100%;
        width: 100%;
        transform: translateY(-0.1rem);
        border: 0.1rem #687483 solid;
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
        border-top: 0.1rem solid #687483;
    }
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
    [dir='rtl'] .js-vl-select .vl-select__list--dropdown .vl-select__item {
        text-align: right;
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
        [dir='rtl'] .js-vl-select .vl-select__list--dropdown .vl-select__item--selectable {
            padding-right: 1rem;
            padding-left: 10rem;
            text-align: right;
        }
        [dir='rtl'] .js-vl-select .vl-select__list--dropdown .vl-select__item--selectable::after {
            right: auto;
            left: 1rem;
        }
    }
    .js-vl-select .vl-select__list--dropdown .vl-select__item--selectable.is-highlighted {
        position: relative;
        background-color: rgba(179, 207, 245, 0.3);
    }
    .js-vl-select .vl-select__list--dropdown .vl-select__item[aria-selected='true'] {
        background-color: rgba(179, 207, 245, 0.3);
    }
    .js-vl-select .vl-select__item {
        cursor: default;
        display: flex;
        align-items: center;
    }
    .js-vl-select .vl-select__item--disabled {
        background-color: #f3f5f6 !important;
        border-color: #8695a8;
        color: var(--vl-theme-fg-color-70) !important;
        cursor: not-allowed;
        user-select: none;
    }
    .js-vl-select .vl-select__item--disabled:hover {
        background-color: #f3f5f6;
    }
    .js-vl-select .vl-select__item span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .js-vl-select .vl-input-field {
        display: inline-block;
        max-width: 100%;
        border: 0;
        background-color: transparent;
        vertical-align: baseline;
    }
    [dir='rtl'] .js-vl-select .vl-input-field {
        padding-right: 0.2rem;
        padding-left: 0;
    }
    .js-vl-select .vl-select__placeholder {
        opacity: 0.5;
    }
    .js-vl-select .vl-select__group {
        display: block;
    }
    .js-vl-select .vl-select__group:not(:first-of-type) {
        border-top: 0.1rem solid #687483;
    }
    .js-vl-select .vl-select__group .vl-select__heading {
        padding: 0.6rem 2rem;
        color: #4d4d4b;
        font-weight: 500;
    }
    .vl-select--error .js-vl-select {
        background-color: #d2373c;
        border: 0.2rem solid #d2373c;
        box-shadow: inset 0 0 0 0.1rem #d2373c;
    }
    .vl-select--error .js-vl-select:focus {
        background-color: #fff;
    }
    .vl-select--success .js-vl-select {
        border-color: #009e47;
        background-color: #e6f5ed;
        border-width: 0.2rem;
        border-style: solid;
    }
`;
export default style;
