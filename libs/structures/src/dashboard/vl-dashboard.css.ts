import { vlMediaScreenMedium } from '@domg-wc/styles';
import { css, CSSResult } from 'lit';

export const vlDashboardStyles: CSSResult = css`
    /* de horizontale padding van de inhoud: de vl-dashboard-header en de mobiele balk gebruiken ze, en de afnemer
       hergebruikt ze voor de inhoud van zijn pagina, zodat alles op dezelfde lijn begint */
    :host {
        --vl-dashboard-content-inline-padding: var(--vl-spacing--medium);

        @media screen and (max-width: ${vlMediaScreenMedium}px) {
            --vl-dashboard-content-inline-padding: var(--vl-spacing--normal);
        }
    }

    .vl-dashboard {
        display: flex;
        flex-direction: row;
        height: calc(100dvh - var(--vl-dashboard-header-height, 43px) - var(--vl-dashboard-footer-height, 128px));
    }
    @media screen and (max-width: ${vlMediaScreenMedium}px) {
        .vl-dashboard {
            display: block;
            height: 100%;
        }
    }

    .vl-dashboard__navigation-header {
        box-sizing: border-box;
        min-height: 8.8rem;
        padding: var(--vl-spacing--normal);
        border-bottom: 1px solid var(--vl-color--border-default);
        display: flex;
        align-items: center;
        gap: var(--vl-spacing--xsmall);
    }

    /* Navigation Panel */
    .vl-dashboard__navigation {
        flex: 0 1 var(--vl-dashboard-navigation-width, 300px);
        background-color: var(--vl-color--background-subtle);
        border-right: 1px solid var(--vl-color--border-default);
        display: grid;
        grid-template-areas:
            'navigation-header'
            'navigation'
            'navigation-utils'
            'navigation-footer';
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr auto auto;

        .vl-dashboard__navigation-main {
            grid-area: navigation;
            /* een vl-nav-link draagt zelf --vl-spacing--xxsmall boven en onder zich, voor zijn actieve achtergrond */
            padding-block: calc(var(--vl-spacing--normal) - var(--vl-spacing--xxsmall));
            overflow-y: auto;
            max-height: 100%;
        }
        .vl-dashboard__navigation-main div[role='list'] {
            display: flex;
            flex-direction: column;
        }

        @media screen and (max-width: ${vlMediaScreenMedium}px) {
            display: none;
        }

        /* blijft in de flow, zodat de navigatie geen inhoud na het dashboard bedekt (WCAG 2.4.11) */
        &.vl-dashboard__navigation--mobile {
            @media screen and (max-width: ${vlMediaScreenMedium}px) {
                display: flex;
                flex-direction: column;
                min-height: calc(100dvh - var(--vl-dashboard-header-height, 43px));

                + .vl-dashboard__content {
                    display: none;
                }
            }
        }

        &.vl-dashboard__navigation--collapsed {
            @media screen and (min-width: ${vlMediaScreenMedium + 1}px) {
                flex-basis: 4.1rem;
                overflow: hidden;

                .vl-dashboard__navigation-footer,
                .vl-dashboard__navigation-utils {
                    vl-button::part(button),
                    vl-button::part(link) {
                        font-size: 0;
                        width: 100%;
                        padding-inline: 0;
                        justify-content: center !important;
                    }
                    vl-button::part(icon) {
                        font-size: var(--vl-font-size);
                    }
                }
                .vl-dashboard__navigation-main,
                .vl-dashboard__navigation-utils {
                    text-align: center;
                }
                .vl-dashboard__navigation-header {
                    justify-content: center;
                    padding-inline: 0;
                }
                .vl-dashboard__navigation-header-user > .vl-dashboard__user-name {
                    display: none;
                }
                .vl-dashboard__navigation-header-user > .vl-dashboard__user-badge {
                    width: 2.4rem;
                    height: 2.4rem;
                    font-size: 0.6em;
                }
                #toggle-navigation-button {
                    display: block;
                    transform: rotate(180deg);
                }
            }
        }
    }
    .vl-dashboard__navigation-header {
        grid-area: navigation-header;
        font-size: var(--vl-font-size--large);
        font-weight: 500;
        justify-content: space-between;
    }
    .vl-dashboard__navigation-header-user {
        display: flex;
        align-items: center;
        gap: var(--vl-spacing--xsmall);
    }
    .vl-dashboard__navigation-utils {
        grid-area: navigation-utils;
        border-top: 1px solid var(--vl-color--border-default);
        background-color: var(--vl-color--background-default);
        overflow-x: hidden;

        vl-button::part(button) {
            justify-content: flex-start;
        }

        @media screen and (max-width: ${vlMediaScreenMedium}px) {
            overflow-x: unset;
        }
    }
    .vl-dashboard__navigation-utils div[role='list'] {
        display: flex;
        flex-direction: column;
    }
    .vl-dashboard__navigation-footer {
        grid-area: navigation-footer;
        padding: var(--vl-spacing--xxsmall);
        border-top: 1px solid var(--vl-color--border-default);

        @media screen and (max-width: ${vlMediaScreenMedium}px) {
            display: none;
        }
    }
    .vl-dashboard__navigation-close-mobile {
        display: none;

        @media screen and (max-width: ${vlMediaScreenMedium}px) {
            display: block;
        }
    }

    /* de mobiele balk met de knop om de navigatie te openen, enkel op een smal scherm */
    .vl-dashboard__mobile-bar {
        display: none;

        @media screen and (max-width: ${vlMediaScreenMedium}px) {
            box-sizing: border-box;
            display: flex;
            align-items: center;
            position: sticky;
            top: var(--vl-dashboard-header-height, 43px);
            z-index: 2;
            height: var(--vl-dashboard-mobile-bar-height);
            padding-inline: var(--vl-dashboard-content-inline-padding);
            border-bottom: 1px solid var(--vl-color--border-default);
            background-color: var(--vl-color--background-default);
        }
    }

    .vl-dashboard__navigation-open-mobile {
        position: relative;
    }
    .vl-dashboard__mobile-nav-badge {
        position: absolute;
        top: var(--vl-spacing--xxsmall);
        right: var(--vl-spacing--xxsmall);
        width: 0.9rem;
        height: 0.9rem;
        border-radius: 50%;
        background-color: var(--vl-color--background-error);
        border: 1px solid var(--vl-color--background-default);
        pointer-events: none;
    }

    .vl-dashboard__navigation-close-mobile {
        margin-left: auto;
        margin-block: var(--vl-spacing--normal);
        margin-right: var(--vl-spacing--normal);

        @media screen and (max-width: ${vlMediaScreenMedium}px) {
            & + .vl-dashboard__navigation-main {
                border-top: 1px solid var(--vl-color--border-default);
            }
        }
    }

    .vl-dashboard__navigation-header {
        .vl-dashboard__navigation-close-mobile {
            margin: 0;
        }
    }

    /* Content Panel */
    .vl-dashboard__content {
        /* intern, geen publieke API */
        --vl-dashboard-mobile-bar-height: 5.6rem;

        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        min-width: 0; /* allow flex children to shrink */
        position: relative;
    }
    /* op desktop scrolt de inhoud hier; een vl-dashboard-header blijft er bovenaan staan (sticky, top 0) */
    .vl-dashboard__content-area {
        flex: 1;
        min-height: 0; /* allow flex children to shrink */
        overflow-x: hidden;
        overflow-y: auto;

        /* op mobiel scrolt de pagina: geen scrollcontainer, en de vl-dashboard-header blijft onder de mobiele balk */
        @media screen and (max-width: ${vlMediaScreenMedium}px) {
            overflow-x: clip;
            overflow-y: visible;
            /* intern, geen publieke API: gelezen door vl-dashboard-header */
            --vl-dashboard-header-sticky-top: calc(
                var(--vl-dashboard-header-height, 43px) + var(--vl-dashboard-mobile-bar-height)
            );
        }
    }

    .vl-dashboard__user-name {
        text-wrap: pretty;
        line-height: 1.1;
    }

    [hidden] {
        display: none !important;
    }
`;
