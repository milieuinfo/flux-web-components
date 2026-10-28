import { vlFocusOutlineMixin, vlMediaScreenSmall } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlInfoTileStyles: CSSResult = css`
    :host {
        display: block;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    .info-tile {
        display: block;
        position: relative;
        padding: 1.7rem;
        border: 1px solid var(--vl-color--border-default);
    }

    .info-tile--m {
        padding: 2.5rem;
    }

    .info-tile--l {
        padding: 4.5rem;
    }

    .info-tile--full-height {
        height: 100%;
    }

    .info-tile--alt {
        border-color: var(--vl-color--border-default);
        background-color: var(--vl-color--background-subtle);

        .info-tile__icon--badge {
            background-color: var(--vl-color--white);
        }
    }

    .info-tile--error {
        border-color: var(--vl-color--error-border);
        background-color: var(--vl-color--error-bg);

        .info-tile__icon--badge {
            background-color: var(--vl-color--error);
            border-color: var(--vl-color--error);
            color: var(--vl-color--white);
        }
    }

    .info-tile--success {
        border-color: var(--vl-color--success-border);
        background-color: var(--vl-color--success-bg);

        .info-tile__icon--badge {
            background-color: var(--vl-color--success);
            border-color: var(--vl-color--success);
            color: var(--vl-color--white);
        }
    }

    .info-tile--warning {
        border-color: var(--vl-color--warning-border);
        background-color: var(--vl-color--warning-bg);

        .info-tile__icon--badge {
            background-color: var(--vl-color--warning);
            border-color: var(--vl-color--warning);
        }
    }

    :host([highlight]) .info-tile {
        box-shadow: inset 0 0.5rem 0 0 var(--vl-color--primary);
    }

    :host([highlight-left]) .info-tile {
        box-shadow: inset 0.5rem 0 0 0 var(--vl-color--primary);
    }

    .info-tile__header {
        display: flex;
        flex: 1;
        flex-direction: row;
        justify-content: flex-start;
    }

    .info-tile__badge {
        flex-shrink: 0;
        margin-right: 1.4rem;
    }

    .info-tile__header-wrapper {
        display: flex;
        flex: 1 1 auto;
        justify-content: space-between;
    }

    .info-tile__title {
        font-size: var(--vl-font-size);
        font-weight: 500;
        line-height: 1.25;
    }

    slot[name='title-label'] {
        display: inline-block;
        margin-left: var(--vl-spacing--medium);
    }

    .info-tile__subtitle {
        margin-top: 0.3rem;
        font-size: var(--vl-font-size--xsmall);
        line-height: 1.3;
        color: var(--vl-color--text-subtle);
    }

    .info-tile__content {
        flex: 1;
        font-size: var(--vl-font-size--small);
        color: var(--vl-color--text-default);
    }

    .info-tile__header + .info-tile__content {
        margin-top: var(--vl-spacing--xsmall);
    }

    .info-tile__footer {
        margin-top: var(--vl-spacing--small);
    }

    .info-tile__icon {
        display: flex;
        flex-wrap: wrap;
        place-content: center;
        width: 4.5rem;
        height: 4.5rem;
        font-size: var(--vl-font-size--large);

        &.info-tile__icon--badge {
            border: 1px solid var(--vl-info-tile-icon-border-color);
            border-radius: 50%;
            background-color: var(--vl-info-tile-icon-background-color);
            color: var(--vl-info-tile-icon-color);
        }
    }

    .info-tile--center {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--vl-spacing--small);
        text-align: center;

        .info-tile__header {
            display: block;
        }

        .info-tile__header-wrapper {
            width: 100%;
        }

        .info-tile__badge {
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

    .info-tile__clickable {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        border: none;
        background-color: transparent;
        cursor: pointer;

        &:focus-visible {
            ${vlFocusOutlineMixin()};
        }
    }

    :host([clickable]) .info-tile__actions {
        z-index: var(--vl-z-layer--info-tile-menu);
    }

    .info-tile--toggleable {
        .info-tile__title-wrapper {
            flex: 1;
        }

        .info-tile__title {
            display: flex;
            align-items: center;
        }

        .info-tile__subtitle {
            margin-left: 2.2rem;
        }

        .info-tile__content {
            margin: 0;
        }

        &.info-tile--open .info-tile__content {
            margin-top: var(--vl-spacing--xsmall);
        }

        &.info-tile--open:not(.info-tile--center) .info-tile__content {
            margin-left: var(--vl-spacing--normal);
        }
    }

    .info-tile__trigger {
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
        flex: 0 1 auto;
        padding: 0;
        border: 0;
        border-radius: 0;
        background-color: transparent;
        appearance: none;
        font-family: inherit;
        font-size: inherit;
        font-weight: 500;
        line-height: inherit;
        text-align: left;
        text-decoration: none;
        word-break: break-word;
        color: var(--vl-color--action);
        cursor: pointer;

        &:hover,
        &:focus {
            text-decoration: underline;
        }

        &:hover {
            color: var(--vl-color--action-hover);
        }

        &:focus,
        &:active {
            color: var(--vl-color--action-active);
        }

        &:focus-visible {
            ${vlFocusOutlineMixin()};
        }

        &:only-child {
            flex-grow: 1;
        }
    }

    .info-tile__toggle-icon {
        flex-shrink: 0;
        padding-right: 0.4rem;
        line-height: 1;
        color: inherit;

        &::part(icon)::before {
            transform: rotate(90deg);
            transition: transform 0.2s;
        }
    }

    .info-tile--open .info-tile__toggle-icon::part(icon)::before {
        transform: rotate(-90deg);
    }

    @media screen and (max-width: ${vlMediaScreenSmall}px) {
        .info-tile {
            padding: var(--vl-spacing--xsmall);
        }

        .info-tile--m,
        .info-tile--l {
            padding: var(--vl-spacing--normal);
        }

        .info-tile__title {
            font-size: 1.5rem;
        }

        .info-tile__content {
            font-size: 1.5rem;
        }

        .info-tile--toggleable .info-tile__subtitle {
            margin-left: var(--vl-spacing--normal);
        }

        .info-tile__toggle-icon {
            font-size: var(--vl-font-size--small);
        }
    }
`;
