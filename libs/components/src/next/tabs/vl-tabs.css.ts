import { css, CSSResult } from 'lit';

// deze css is de gegenereerde uit @domg/govflanders-style - met de iconen verwijderd
export const tabsStyle: CSSResult = css`
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

    .vl-tabs {
        margin-bottom: 3rem;
        border-bottom: 1px #cbd2da solid;
        font-size: 0;
        text-align: left;
    }

    .vl-tabs--overflow {
        position: relative;
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        background-repeat: no-repeat;
        overflow: -moz-scrollbars-none;
        -ms-overflow-style: none;
        scrollbar-width: none; /* Firefox */
    }

    .vl-tabs--overflow::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
    }

    .vl-tabs--visible-overflow {
        overflow: visible;
    }

    .vl-tabs__wrapper {
        position: relative;
    }

    .vl-tabs__wrapper--fit-to-content {
        display: inline-flex;
    }

    .vl-tabs__wrapper--overflow::after,
    .vl-tabs__wrapper--overflow::before {
        content: '';
        position: absolute;
        width: 35px;
        height: calc(100% + 1px);
        display: block;
        pointer-events: none;
        top: 0;
        opacity: 0;
        transition: opacity 0.25s;
        z-index: 1;
    }

    .vl-tabs__wrapper--overflow::before {
        left: -1px;
        right: auto;
        background-image: linear-gradient(to left, rgba(255, 255, 255, 0) 0%, white 70%, white 100%);
    }

    .vl-tabs__wrapper--overflow::after {
        right: -1px;
        left: auto;
        background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, white 70%, white 100%);
    }

    .vl-tabs__wrapper--overflow-right::after {
        opacity: 1;
    }

    .vl-tabs__wrapper--overflow-left::before {
        opacity: 1;
    }

    .no-js .vl-tabs {
        display: none;
    }

    @media screen and (max-width: 767px) {
        .vl-tabs:not(.vl-tabs--overflow) {
            display: none;
            position: relative;
            left: -1.5rem;
            width: calc(100% + 3rem);
            margin: 0 0 1rem;
            padding: 0.4rem 0;
            border-top: 1px #f7f9fc solid;
            border-bottom: 1px #f7f9fc solid;
        }

        .vl-tabs:not(.vl-tabs--overflow)[show='true'] {
            display: block;
        }
    }

    .vl-tabs--alt {
        position: relative;
    }

    .vl-tabs--alt::before {
        position: absolute;
        bottom: -1px;
        left: -200%;
        width: 500%;
        height: 1px;
        background: #cbd2da;
        content: '';
    }

    .vl-tab {
        display: inline-block;
        position: relative;
        text-align: left;
        vertical-align: top;
        top: 1px;
        padding: 1rem 0;
        margin: 0 1.3rem;
        transition: all 0.2s;
        border-bottom: 3px solid transparent;
        font-family: 'Flanders Art Sans', sans-serif;
        font-size: 1.6rem;
        font-weight: 500;
        text-decoration: none;
    }

    .vl-tab:first-child .vl-tab__link {
        margin-left: 0;
    }

    .vl-tab:last-child .vl-tab__link {
        margin-right: 0;
    }

    .vl-tab:hover,
    .vl-tab:focus {
        background-color: transparent;
        border-bottom-color: #333332;
    }

    .vl-tab--active {
        color: #333332;
        border-bottom: 3px solid #333332;
        background-color: transparent;
    }

    .vl-tab--active:visited {
        color: #333332;
    }

    @media screen and (max-width: 767px) {
        [tabs] .vl-tabs:not(.vl-tabs--overflow) .vl-tab--active {
            border: 0;
        }
    }
    @media screen and (max-width: 767px) {
        .vl-tab {
            font-size: 1.4rem;
            margin: 0 0.8rem;
        }

        .vl-tabs:not(.vl-tabs--overflow) .vl-tab {
            margin: 0;
        }

        [tabs] .vl-tabs:not(.vl-tabs--overflow) .vl-tab {
            display: block;
            top: 0;
            padding: 0.7rem 1.5rem;
            border: 0;
            font-size: 1.5rem;
        }

        [tabs] .vl-tabs:not(.vl-tabs--overflow) .vl-tab:first-of-type {
            width: calc(100% - 4.2rem);
        }
    }

    .vl-tab__pane {
        display: none;
    }

    .vl-tab__pane[show='true'] {
        display: block;
    }

    .vl-tab__pane[role='tabpanel']:focus {
        box-shadow: 0 0 0 2px #fff, 0 0 0 5px rgba(0, 85, 204, 0.65);
        outline: transparent solid 0.2rem;
    }

    @supports (outline-offset: 2px) {
        .vl-tab__pane[role='tabpanel']:focus {
            box-shadow: none;
            outline: 3px solid rgba(0, 85, 204, 0.65);
            outline-offset: 2px;
        }
    }
    @supports (outline-offset: 2px) {
        .vl-tab__pane[role='tabpanel']:focus {
            box-shadow: none;
            outline: 3px solid rgba(0, 85, 204, 0.65);
            outline-offset: 2px;
        }
    }

    .no-js .vl-tab__pane {
        display: block;
    }

    .vl-tabs__toggle {
        display: none;
        position: relative;
        left: -1.5rem;
        width: calc(100% + 3rem);
        height: 4.2rem;
        margin: 0 auto 1rem;
        padding: 0 0 0 1.5rem;
        border: 0;
        border-top: 1px #cbd2da solid;
        border-bottom: 1px #cbd2da solid;
        background: none;
        font-family: 'Flanders Art Sans', sans-serif;
        font-size: 1.5rem;
        font-weight: 500;
        text-align: left;
        cursor: pointer;
    }

    .vl-tabs__toggle span {
        display: block;
        width: calc(100% - 6rem);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: #05c;
    }

    .vl-tabs__toggle::before,
    .vl-tabs__toggle::after {
        font-family: 'vlaanderen-icon' !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-style: normal;
        font-variant: normal;
        font-weight: normal;
        text-decoration: none;
        text-transform: none;
    }

    .vl-tabs__toggle::before {
        content: '\\f126';
    }

    .vl-tabs__toggle::before {
        position: absolute;
        font-size: 1.4rem;
    }

    .vl-tabs__toggle::before {
        top: 0;
        right: 0;
        padding: 1.2rem 1.4rem;
        transform: rotate(90deg);
        transition: color 0.2s ease-in-out;
        font-size: 1.5rem;
        color: #05c;
    }

    .vl-tabs__toggle:hover,
    .vl-tabs__toggle:focus {
        text-decoration: underline;
        text-decoration-color: #05c;
    }

    .vl-tabs__toggle:hover::before,
    .vl-tabs__toggle:focus::before {
        color: #05c;
    }

    .vl-tabs__toggle:hover::after,
    .vl-tabs__toggle:focus::after {
        color: #05c;
    }

    .vl-tabs__toggle::after {
        position: absolute;
        top: 0;
        right: 4.2rem;
        width: 1px;
        height: 100%;
        background: #cbd2da;
        content: '';
    }

    .vl-tabs__toggle:focus {
        outline: thin dotted;
    }

    .vl-tabs__toggle[close='true'] {
        position: absolute;
        top: 0;
        right: -1.5rem;
        left: auto;
        width: 4.2rem;
        height: 4.2rem;
        border: 0;
        z-index: 2;
    }

    .vl-tabs__toggle[close='true']::after {
        display: none;
    }

    .vl-tabs__toggle[close='true']::before {
        content: '\\f181';
    }

    .vl-tabs__toggle[close='true']::before {
        padding: 1.4rem;
        font-size: 1.3rem;
    }

    .vl-tabs__toggle[close='true'] span {
        display: none;
    }

    @media screen and (max-width: 767px) {
        .vl-tabs__toggle {
            display: block;
        }
    }
`;
