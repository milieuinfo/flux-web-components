import { vlMediaScreenSmall } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlSideNavigationStyles: CSSResult = css`
    .vl-side-navigation {
        max-height: 90vh;
    }

    .vl-side-navigation a {
        text-decoration: none;
    }

    .vl-side-navigation a:hover,
    .vl-side-navigation a:focus {
        text-decoration: underline;
    }

    .js-vl-scrollspy-mobile--active .vl-side-navigation {
        display: block !important;
    }

    .vl-side-navigation .js-vl-scrollspy-active {
        color: #333332;
        position: relative;
    }

    .vl-side-navigation .js-vl-scrollspy-active::before {
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
        .vl-side-navigation::-webkit-scrollbar {
            width: 16px;
            height: 20px;
        }

        .vl-side-navigation::-webkit-scrollbar-thumb {
            height: 8px;
            border: 6px solid rgba(0, 0, 0, 0);
            border-radius: 7px;
            background-clip: padding-box;
            background-color: #e8ebee;
        }

        .vl-side-navigation::-webkit-scrollbar-button {
            display: none;
            width: 0;
            height: 0;
        }

        .vl-side-navigation::-webkit-scrollbar-corner {
            background-color: transparent;
        }

        .vl-side-navigation[side-navigation-scrollable] {
            max-height: none;
        }
    }

    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        .vl-side-navigation {
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

    .vl-side-navigation__content {
        font-size: 1.6rem;
    }

    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        .vl-side-navigation__content {
            font-size: 1.6rem;
        }
    }

    /* scrollspy__content - reference */

    .js-vl-scrollspy__content .js-vl-scrollspy__toggle {
        display: none;
        cursor: pointer;
    }

    .js-vl-scrollspy__content .js-vl-scrollspy__toggle::before {
        position: absolute;
        top: 50%;
        right: 1rem;
        transform: translateY(-50%);
        color: #fff;
        font-family: var(--vl-icon-font, 'vlaanderen-icon');
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

    .vl-side-navigation__toggle,
    .vl-side-navigation__toggle a {
        display: block;
        position: relative;
        font-weight: 500;
        box-shadow: none;
        margin: 13px 0;
    }
    .vl-side-navigation__toggle + ul .vl-side-navigation__item a {
        margin: 0;
    }

    .vl-side-navigation__toggle:has(vl-icon) > a {
        padding-right: 2rem;
    }

    .vl-side-navigation__toggle[aria-expanded='true'] vl-icon::part(icon)::before {
        transform: rotate(90deg);
    }

    .vl-side-navigation__toggle[aria-expanded='true'] + ul {
        display: block;
        animation: side-navigation-transition 0.3s;
    }

    @media (prefers-reduced-motion: reduce) {
        .vl-side-navigation__toggle[aria-expanded='true'] + ul {
            animation-duration: 0s;
        }
    }

    .vl-side-navigation__toggle[aria-expanded='true'] + ul .vl-side-navigation__toggle:first-child {
        margin-top: 0;
    }

    .vl-side-navigation__toggle vl-icon {
        font-size: 1.6rem;
        position: absolute;
        top: 50%;
        right: 0.4rem;
        transform: translateY(-50%);
    }

    .vl-side-navigation__toggle vl-icon::part(icon)::before {
        transition: transform 0.1s ease-in-out;
    }

    /* group */

    .vl-side-navigation__group {
        margin-bottom: 2rem;
    }

    .vl-side-navigation__group:last-child {
        margin-bottom: 0;
    }

    .vl-side-navigation__group--has-title {
        padding-top: 3rem;
        border-top-width: 3px;
    }

    .vl-side-navigation__group--spaced .vl-side-navigation__item:not(:last-child) {
        margin-bottom: 1.5rem;
    }

    .vl-side-navigation__group--has-title .vl-side-navigation__item + .vl-side-navigation__item {
        margin-top: 0.5rem;
    }

    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        .vl-side-navigation__group {
            padding: 0;
            border: 0 !important;
        }

        .vl-side-navigation__group--has-title {
            padding-top: 1.5rem;
        }
    }

    /* item */

    .vl-side-navigation__item a {
        font-weight: 500;
        display: block;
        margin: 13px 0;
    }

    .vl-side-navigation__item > ul {
        display: none;
        padding: 0 0 0.15rem 2rem;
    }

    .vl-side-navigation__item > ul.vl-side-navigation__subgroup--active {
        display: block;
    }

    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        .vl-side-navigation__item {
            padding: 0;
            font-size: 1.4rem;
        }

        .vl-side-navigation__item > a {
            display: block;
            margin: 0.7rem 0 1.4rem;
        }

        .vl-side-navigation__item:last-child > a {
            margin-bottom: 0.7rem;
        }

        .vl-side-navigation__item > ul {
            padding: 0 1rem 0.15rem 1.3rem;
        }
    }

    /* title */

    .vl-side-navigation__title {
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
        vl-side-navigation-reference .resize-sensor {
            display: none !important;
        }
    }

    @keyframes side-navigation-transition {
        0% {
            display: none;
            transform: translateX(-10px);
        }
        1% {
            display: block;
            transform: translateX(-10px);
        }
        100% {
            display: block;
            transform: translateX(0);
            opacity: 1;
        }
    }

    .js-vl-scrollspy-placeholder {
        display: none;
        position: fixed;
        top: auto;
        bottom: 1.5rem;
        left: 1.5rem;
        width: calc(100% - 3rem);
        outline: none;
        z-index: 4;
    }
    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        .js-vl-scrollspy-placeholder {
            height: auto;
        }
    }
    .js-vl-scrollspy-placeholder.js-vl-scrollspy-mobile--active {
        display: block;
    }

    .js-vl-scrollspy__close {
        position: absolute;
        top: -1.8rem;
        right: 0;
        left: 0;
        width: 3rem;
        height: 3rem;
        margin: auto;
        border: 0;
        border-radius: 3rem;
        background-color: #05c;
        color: #fff;
        font-size: 0;
        cursor: pointer;
        z-index: 5;
    }
    .js-vl-scrollspy__close::before {
        font-family: var(--vl-icon-font, 'vlaanderen-icon');
        font-size: 1.2rem;
        line-height: 2.6rem;
    }
    .js-vl-scrollspy__close:focus {
        outline: thin dotted;
    }

    .js-vl-sticky {
        position: relative;
        transform: translate3d(0, 0, 0);
        will-change: position, transform;
        z-index: 2;
    }
    .js-vl-sticky--viewport-top,
    .js-vl-sticky--viewport-bottom {
        position: fixed;
    }
    .js-vl-sticky--container-bottom,
    .js-vl-sticky--viewport-unbottom {
        position: relative;
    }

    .js-vl-sticky--placeholder {
        position: relative;
        width: 100%;
        will-change: min-height;
    }
`;
