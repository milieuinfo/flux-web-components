import { vlFocusOutlineMixin, vlMediaScreenSmall } from '@domg-wc/styles';
import { css } from 'lit';

const activeStateStyles = css`
    color: var(--vl-color--text);
    position: relative;
    font-weight: 500;
`;

const activeStateIndicator = css`
    content: '';
    height: 90%;
    display: block;
    position: absolute;
    left: -12px;
    top: 1px;
    bottom: 0;
    width: 3px;
    background-color: var(--vl-color--action-400);
`;

/**
 * CSS mixin for custom TOC toggle button styles.
 * Use this mixin to style vl-button elements used as toggle buttons in custom TOCs.
 */
export const customTocToggleButtonMixin = css`
    flex-shrink: 0;
    width: 2.4rem;
    height: 2.4rem;
    margin: 0;

    &::part(button) {
        padding: 0;
        min-height: unset;
        width: 2.4rem;
        height: 2.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.3rem;

        .vl-icon {
            transition: transform 0.1s ease-in-out;
        }
    }

    &.showing-children::part(button) .vl-icon {
        transform: rotate(90deg);
    }
`;

/**
 * CSS mixin for custom TOC nav-item-wrapper styles.
 * Use this mixin to style the wrapper div containing link + toggle button.
 */
export const customTocNavItemWrapperMixin = css`
    display: flex;
    align-items: center;
    gap: 0;
    margin: 13px 0;

    vl-link {
        flex: 1;
        display: block;
        width: auto;
        margin: 0;
        padding-right: var(--vl-spacing--xxsmall);
    }

    a {
        flex: 1;
        display: block;
        width: auto;
        margin: 0;
        padding-right: var(--vl-spacing--xxsmall);
    }
`;

export const vlSideNavigationLightDomStyles = css`
    vl-side-navigation-next {
        a.active {
            ${activeStateStyles}

            &::before {
                ${activeStateIndicator}
            }
        }

        vl-link.active {
            position: relative;
            display: inline-block;

            &::before {
                ${activeStateIndicator}
            }
        }

        vl-link.active::part(link) {
            ${activeStateStyles}
        }

        /* Match auto-generated nav link text-decoration and font-weight for custom TOC */
        a {
            text-decoration: none;
            font-weight: 500;

            &:hover {
                text-decoration: underline;
            }

            &:focus {
                text-decoration: underline;
                ${vlFocusOutlineMixin()}
            }
        }

        vl-link::part(link) {
            text-decoration: none;
            font-weight: 500;

            &:hover {
                text-decoration: underline;
            }

            &:focus {
                text-decoration: underline;
                ${vlFocusOutlineMixin()}
            }
        }

        /* Custom TOC styles for slotted content */
        ul {
            list-style: none;
            padding: 0;
            margin: 0;

            ul {
                display: block;
                padding: 0 0 0.15rem var(--vl-spacing--normal);

                &[hidden] {
                    display: none;
                }
            }
        }

        li {
            margin: 0;
            padding: 0;
        }

        .nav-item-wrapper {
            ${customTocNavItemWrapperMixin}

            vl-button.toggle-button {
                ${customTocToggleButtonMixin}
            }
        }

        /* ensure nested lists don't have the wrapper margin */
        li ul .nav-item-wrapper {
            margin: 0;
        }
    }

    vl-side-navigation-next[child-spacing="medium"] {
        ul ul {
            padding-bottom: 0;
        }

        li ul li {
            margin: var(--vl-side-navigation--child-spacing-margin) 0;

            /* reset: li provides the spacing, not the nested .nav-item-wrapper */
            .nav-item-wrapper {
                margin: 0;
            }
        }
    }
`;

const mobileStyles = css`
    :host {
        position: static;
        display: contents;
    }

    table-of-contents {
        position: fixed;
        top: initial;
        left: 0;
        bottom: 0;
        min-height: 10rem;
        max-height: calc(100vh - 15rem);
        background: #fff;
        box-shadow: 0 0 2.1rem rgba(0, 0, 0, 0.3);
        width: -webkit-fill-available;
        margin: var(--vl-spacing--small);
        padding: var(--vl-spacing--small) var(--vl-spacing--medium);
    }

    nav {
        font-size: 1.6rem;
    }

    #close-button {
        display: block;
        position: absolute;
        top: 0;
        right: 50%;
        transform: translate(50%, -50%);

        &::part(button) {
            border-radius: 5rem;
        }
    }

    #show-toc-button:not([hidden]) {
        display: block;
        position: fixed;
        bottom: var(--vl-spacing--large);
        right: 0;

        &::part(button) {
            padding: var(--vl-spacing--xsmall) 0 var(--vl-spacing--xsmall) var(--vl-spacing--xsmall);
            border-radius: 5rem 0 0 5rem;
        }
    }

    [hidden] {
        display: none;
    }
`;

export const vlSideNavigationStyles = css`
    :host {
        display: block;
        align-self: start;
        position: sticky;
        top: var(--vl-side-navigation-top, 50px);
        z-index: 1000;
    }

    :host {
        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            ${mobileStyles}
        }
    }

    :host([compact]) {
        ${mobileStyles} @media screen and (width > ${vlMediaScreenSmall}px) {
            table-of-contents {
                min-width: 320px;
                width: fit-content;
                max-width: 90vw;
                left: unset;
                right: 0;
                overflow-y: unset;
            }
        }
    }

    table-of-contents {
        height: fit-content;
        max-height: 90vh;
        padding: 0 var(--vl-spacing--small);
        font-family: 'Flanders Art Sans', sans-serif;
        background-color: var(--vl-color--white);
    }

    @media screen and (width > ${vlMediaScreenSmall}px) {
        table-of-contents {
            overflow-y: auto;
        }
    }

    .navigation-title {
        margin-bottom: var(--vl-spacing--normal);
        font-size: var(--vl-font-size--small);
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--vl-color--text-subtle);
        font-weight: 500;
    }

    nav {
        background-color: var(--vl-color--white);
        padding: var(--vl-spacing--small);
        overflow-y: auto;
        font-size: var(--vl-font-size--small);

        a,
        button {
            display: block;
            font-weight: 500;
            margin: 13px 0;
            text-decoration: none;
            position: relative;
            padding: 0;
            background: none;
            border: none;
            cursor: pointer;
            font-family: inherit;
            font-size: inherit;
            text-align: left;
            width: 100%;

            &:hover {
                text-decoration: underline;
                background-color: transparent;
            }

            &:focus {
                text-decoration: underline;
                background-color: transparent;
                ${vlFocusOutlineMixin()}
            }

            &.active {
                ${activeStateStyles}
                background-color: transparent;
                border-left: none;

                &::before {
                    ${activeStateIndicator}
                }
            }
        }

        ul {
            list-style: none;
            padding: 0;
            margin: 0;

            ul {
                display: block;
                padding: 0 0 0.15rem var(--vl-spacing--normal);

                &[hidden] {
                    display: none;
                }

                a,
                button {
                    margin: 0;
                }
            }
        }

        li {
            margin: 0;
            padding: 0;

            .nav-item-wrapper {
                display: flex;
                align-items: center;
                gap: 0;
                margin: 13px 0;

                a {
                    flex: 1;
                    display: block;
                    width: auto;
                    margin: 0 var(--vl-spacing--xxsmall) 0 0;
                    padding-right: var(--vl-spacing--xxsmall);
                }

                button.toggle-button {
                    flex-shrink: 0;
                    width: 2.4rem;
                    height: 2.4rem;
                    padding: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0;
                    border-radius: 0.3rem;
                    color: var(--vl-color--action-400);

                    &:hover {
                        background-color: transparent;
                        color: var(--vl-color--text);
                        text-decoration: none;
                    }

                    &:focus {
                        ${vlFocusOutlineMixin()}
                        background-color: transparent;
                    }

                    i.vl-icon {
                        &::before {
                            transition: transform 0.1s ease-in-out;
                        }

                        &.showing-children::before {
                            transform: rotate(90deg);
                        }
                    }
                }
            }

            /* ensure nested lists don't have the wrapper margin */

            ul li .nav-item-wrapper {
                margin: 0;
            }
        }

        @media screen and (max-width: ${vlMediaScreenSmall}px) {
            max-height: 60vh;
        }
    }

    :host([child-spacing="medium"]) nav {
        ul ul {
            padding-bottom: 0;

            a,
            button {
                margin: var(--vl-side-navigation--child-spacing-margin) 0;
            }
        }

        li ul li .nav-item-wrapper {
            margin: var(--vl-side-navigation--child-spacing-margin) 0;

            /* reset: wrapper provides the spacing, not the individual a/button */
            a,
            button {
                margin: 0;
            }
        }
    }

    #close-button,
    #show-toc-button {
        display: none;
    }

    @media screen and (width > ${vlMediaScreenSmall}px) {
        :host {
            order: 1;

            /* Firefox standard properties */
            scrollbar-width: thin;
            scrollbar-color: var(--vl-color--grey-200) transparent;

            /* Webkit browsers (Chrome, Safari, Edge) */

            &::-webkit-scrollbar {
                width: 16px;
                height: 20px;

                &-thumb {
                    height: 8px;
                    border: 6px solid rgba(0, 0, 0, 0);
                    border-radius: 7px;
                    background-clip: padding-box;
                    background-color: var(--vl-color--grey-200);
                }

                &-button {
                    display: none;
                    width: 0;
                    height: 0;
                }

                &-corner {
                    background-color: transparent;
                }
            }
        }
    }
`;
