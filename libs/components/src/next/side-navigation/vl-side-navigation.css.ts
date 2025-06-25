import { vlMediaScreenSmall } from '@domg-wc/common-utilities/css';
import { css, CSSResult } from 'lit';

export const vlSideNavigationStyles: CSSResult = css`
    .vl-side-navigation-next {
        max-height: 90vh;
    }

    .vl-side-navigation-next a {
        text-decoration: none;
    }

    .vl-side-navigation-next a:hover,
    .vl-side-navigation-next a:focus {
        text-decoration: underline;
    }

    .js-vl-scrollspy-mobile--active .vl-side-navigation-next {
        display: block !important;
    }

    .vl-side-navigation-next .js-vl-scrollspy-active {
        color: #333332;
        position: relative;
    }

    .vl-side-navigation-next .js-vl-scrollspy-active::before {
        content: '';
        height: 90%;
        display: block;
        position: absolute;
        left: -12px;
        top: 1px;
        bottom: 0;
        width: 3px;
        background-color: #5990de;
    }

    @media screen and (min-width: ${vlMediaScreenSmall}px) {
        .vl-side-navigation-next::-webkit-scrollbar {
            width: 16px;
            height: 20px;
        }

        .vl-side-navigation-next::-webkit-scrollbar-thumb {
            height: 8px;
            border: 6px solid rgba(0, 0, 0, 0);
            border-radius: 7px;
            background-clip: padding-box;
            background-color: #e8ebee;
        }

        .vl-side-navigation-next::-webkit-scrollbar-button {
            display: none;
            width: 0;
            height: 0;
        }

        .vl-side-navigation-next::-webkit-scrollbar-corner {
            background-color: transparent;
        }

        .vl-side-navigation-next[side-navigation-scrollable] {
            max-height: none;
        }
    }

    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        .vl-side-navigation-next {
            display: none;
            min-height: 10rem;
            max-height: calc(100vh - 15rem);
            padding: 1.5rem 1rem 1.5rem 1.5rem;
            background: #fff;
            box-shadow: 0 0 2.1rem rgba(0, 0, 0, 0.3);
            animation: fade-transition 0.3s;
        }
    }

    /* side-navigation__content - content */

    .vl-side-navigation-next__content {
        font-size: 1.6rem;
    }

    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        .vl-side-navigation-next__content {
            font-size: 1.6rem;
        }
    }

    /* scrollspy__content - reference */

    .js-vl-scrollspy__content {
        border-radius: 5rem;
    }

    .js-vl-scrollspy__content .js-vl-scrollspy__toggle {
        display: none;
        cursor: pointer;
    }

    .js-vl-scrollspy__content .js-vl-scrollspy__toggle::before,
    .js-vl-scrollspy__content .js-vl-scrollspy__toggle::after {
        font-family: 'vlaanderen-icon' !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-style: normal;
        font-variant: normal;
        font-weight: normal;
        text-decoration: none;
        text-transform: none;
    }

    .js-vl-scrollspy__content .js-vl-scrollspy__toggle::before {
        content: '\\f13f';
    }

    .js-vl-scrollspy__content .js-vl-scrollspy__toggle::before {
        position: absolute;
        top: 50%;
        right: 1rem;
        transform: translateY(-50%);
        color: #fff;
        font-size: 1.1rem;
    }

    .js-vl-scrollspy__content .js-vl-scrollspy__toggle.js-vl-scrollspy__toggle--fixed {
        position: fixed;
        top: auto;
        right: auto;
        bottom: 4rem;
        left: calc(100% - 6rem);
        height: 5rem;
        border-radius: 5rem;
        font-size: 0;
        z-index: 3;
    }

    .js-vl-scrollspy__content .js-vl-scrollspy__toggle.js-vl-scrollspy__toggle--fixed::before {
        right: auto;
        left: 2rem;
        line-height: 2.7rem;
    }

    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        .js-vl-scrollspy__content {
            display: block;
            position: relative;
            padding: 4rem 0 0;
        }

        .js-vl-scrollspy__content .js-vl-scrollspy__toggle {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
        }
    }

    /* toggle */

    .vl-side-navigation-next__toggle,
    .vl-side-navigation-next__toggle a {
        display: block;
        position: relative;
        font-weight: 500;
        box-shadow: none;
        margin: 13px 0;
    }
    .vl-side-navigation-next__toggle + ul .vl-side-navigation-next__item a {
        margin: 0;
    }

    .vl-side-navigation__toggle:has(vl-icon-next) > a {
        padding-right: 2rem;
    }

    .vl-side-navigation__toggle[aria-expanded='true'] vl-icon-next::part(icon)::before {
        transform: rotate(90deg);
    }

    .vl-side-navigation-next__toggle[aria-expanded='true'] + ul {
        display: block;
        animation: side-navigation-transition 0.3s;
    }

    .vl-side-navigation-next__toggle[aria-expanded='true'] + ul .vl-side-navigation-next__toggle:first-child {
        margin-top: 0;
    }

    .vl-side-navigation-next__toggle vl-icon-next {
        font-size: 1.6rem;
        position: absolute;
        top: 50%;
        right: 0.4rem;
        transform: translateY(-50%);
    }

    .vl-side-navigation-next__toggle vl-icon-next::part(icon)::before {
        transition: transform 0.1s ease-in-out;
    }

    /* group */

    .vl-side-navigation-next__group {
        margin-bottom: 2rem;
    }

    .vl-side-navigation-next__group:last-child {
        margin-bottom: 0;
    }

    .vl-side-navigation-next__group--has-title {
        padding-top: 3rem;
        border-top-width: 3px;
    }

    .vl-side-navigation-next__group--spaced .vl-side-navigation-next__item:not(:last-child) {
        margin-bottom: 1.5rem;
    }

    .vl-side-navigation-next__group--has-title .vl-side-navigation-next__item + .vl-side-navigation-next__item {
        margin-top: 0.5rem;
    }

    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        .vl-side-navigation-next__group {
            padding: 0;
            border: 0 !important;
        }

        .vl-side-navigation-next__group--has-title {
            padding-top: 1.5rem;
        }
    }

    /* item */

    .vl-side-navigation-next__item a {
        font-weight: 500;
        display: block;
        margin: 13px 0;
    }

    .vl-side-navigation-next__item > ul {
        display: none;
        padding: 0 0 0.15rem 2rem;
    }

    .vl-side-navigation-next__item > ul.vl-side-navigation-next__subgroup--active {
        display: block;
    }

    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        .vl-side-navigation-next__item {
            padding: 0;
            font-size: 1.4rem;
        }

        .vl-side-navigation-next__item > a {
            display: block;
            margin: 0.7rem 0 1.4rem;
        }

        .vl-side-navigation-next__item:last-child > a {
            margin-bottom: 0.7rem;
        }

        .vl-side-navigation-next__item > ul {
            padding: 0 1rem 0.15rem 1.3rem;
        }
    }

    /* title */

    .vl-side-navigation-next__title {
        display: block;
        margin-bottom: 20px;
        font-size: 15px;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #687483;
        font-weight: 500;
    }

    /* print */

    // fix voor UIG-2288: er worden in Chrome veel extra blanco pagina's toegevoegd tijdens het printen
    @media print {
        [is='vl-side-navigation-reference-next'] .resize-sensor {
            display: none !important;
        }
    }
`;
