import { css, CSSResult } from 'lit';

// dit zijn specifieke css toevoeging die niet uit de @domg/govflanders-style komt
const styles: CSSResult = css`
    .vl-tab__link {
        cursor: pointer;
    }

    .vl-tab__link {
        text-decoration: none;
    }

    .vl-tab.vl-tab--active > .vl-tab__link {
        color: var(--vl-theme-fg-color);
    }

    .vl-tab__pane[role='tabpanel']:focus {
        outline: none;
    }

    /* Functional header styles */

    :host(.vl-tabs--within-functional-header) .vl-tabs {
        margin-bottom: 0;
        border-bottom: none;
    }

    @media screen and (max-width: 767px) {
        :host(.vl-tabs--within-functional-header) .vl-tabs {
            margin-bottom: 0;
            margin-top: 0;
        }
    }

    :host(.vl-tabs--within-functional-header) .vl-tab {
        top: 0;
        margin: 0 2rem 0 0;
        padding: 0;
    }

    :host(.vl-tabs--within-functional-header) .vl-tab__link {
        padding: 1rem 0;
        border: 0;
        text-decoration: none;
    }

    @media screen and (max-width: 767px) {
        :host(.vl-tabs--within-functional-header) .vl-tab__link {
            padding: 0.5rem 0;
        }
    }

    :host(.vl-tabs--within-functional-header) .vl-tabs__toggle {
        border: none;
        margin: 0;

        &:after {
            display: none;
        }
    }

    :host([display-style='tabs']) .vl-tabs:not(.vl-tabs--overflow) {
        display: block;
        position: relative;
        left: unset;
        width: unset;
        margin: 0 0 3rem 0;
        padding: 0;
        border: 0;
        border-bottom: 1px #cbd2da solid;
        line-height: unset;
    }

    :host([display-style='tabs']) [data-vl-tabs] .vl-tabs:not(.vl-tabs--overflow) .vl-tab {
        display: inline-block;
        position: relative;
        margin: 0 1.3rem;
        border-bottom: 3px solid transparent;
    }

    :host([display-style='tabs']) .vl-tabs__toggle {
        display: none;
    }

    :host([display-style='tabs']) [data-vl-tabs] .vl-tabs:not(.vl-tabs--overflow) .vl-tab:first-of-type {
        width: unset;
    }

    :host([display-style='tabs']) [data-vl-tabs] .vl-tabs:not(.vl-tabs--overflow) .vl-tab--active {
        border-bottom: 3px solid;
    }

    :host([display-style='tabs']) [data-vl-tabs] .vl-tabs:not(.vl-tabs--overflow) .vl-tab:hover,
    .vl-tab:focus {
        border-bottom-color: var(--vl-theme-fg-color);
    }

    :host([display-style='collapsed']) .vl-tabs:not(.vl-tabs--overflow) {
        display: none;
        position: relative;
        left: -1.5rem;
        width: calc(100% + 3rem);
        margin: 0 0 1rem;
        padding: 0.4rem 0;
        border-top: 1px #f7f9fc solid;
        border-bottom: 1px #f7f9fc solid;
        line-height: 1.33;
    }

    :host([display-style='collapsed']) .vl-tabs:not(.vl-tabs--overflow)[data-vl-show='true'] {
        display: block;
    }

    :host([display-style='collapsed']) .vl-tabs__toggle {
        display: block;
    }

    :host([display-style='collapsed']) [data-vl-tabs] .vl-tabs:not(.vl-tabs--overflow) .vl-tab:first-of-type {
        width: calc(100% - 4.2rem);
    }

    :host([display-style='collapsed']) [data-vl-tabs] .vl-tabs:not(.vl-tabs--overflow) .vl-tab {
        display: block;
        top: 0;
        padding: 0.7rem 1.5rem;
        border: 0;
        font-size: 1.5rem;
        margin: 0;
    }
`;
export default styles;
