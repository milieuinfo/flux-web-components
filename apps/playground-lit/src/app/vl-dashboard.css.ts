import { vlMediaScreenMedium } from '@domg-wc/styles';
import { css } from 'lit';

export const vlDashboardStyles = css`
    .vl-dashboard {
        display: flex;
        flex-direction: row;
        height: calc(100vh - var(--vl-dashboard-header-height, 43px) - var(--vl-dashboard-footer-height, 128px));
    }
    @media screen and (max-width: ${vlMediaScreenMedium}px) {
        .vl-dashboard {
            display: block;
            height: 100%;
        }
    }

    /* Common Header Styles */
    .vl-dashboard__navigation-header,
    .vl-dashboard__content-header {
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
            padding: var(--vl-spacing--medium);
            overflow-y: auto;
            max-height: 100%;
        }
        .vl-dashboard__navigation-main div[role='list'] {
            display: flex;
            flex-direction: column;
            gap: var(--vl-spacing--xsmall);
        }

        @media screen and (max-width: ${vlMediaScreenMedium}px) {
            display: none;
        }

        &.vl-dashboard__navigation--mobile {
            @media screen and (max-width: ${vlMediaScreenMedium}px) {
                display: flex;
                flex-direction: column;
                height: calc(100vh - var(--vl-header-height, 43px));
                position: fixed;
                top: var(--vl-header-height, 43px);
                left: 0;
                width: 100%;

                + .vl-dashboard__content {
                    display: none;
                }
            }
        }

        &.vl-dashboard__navigation--collapsed {
            @media screen and (min-width: ${vlMediaScreenMedium}px) {
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
                    padding-inline: 0.3rem;
                    text-align: center;
                }
                .vl-dashboard__navigation-header {
                    padding-inline: 0.8rem;
                }
                .vl-dashboard__navigation-header-user > user-name {
                    display: none;
                }
                .vl-dashboard__navigation-header-user > user-badge {
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
        padding: var(--vl-spacing--medium);
        border-top: 1px solid var(--vl-color--border-default);
        background-color: var(--vl-color--grey-200);

        vl-button::part(button) {
            justify-content: flex-start;
        }
    }
    .vl-dashboard__navigation-footer {
        grid-area: navigation-footer;
        padding: 5px;
        border-top: 1px solid var(--vl-color--border-default);

        vl-button::part(button) {
            justify-content: flex-start;
        }

        @media screen and (max-width: ${vlMediaScreenMedium}px) {
            display: none;
        }
    }
    .vl-dashboard__navigation-open-mobile,
    .vl-dashboard__navigation-close-mobile {
        display: none;

        @media screen and (max-width: ${vlMediaScreenMedium}px) {
            display: block;
        }
    }

    /* Content Panel */
    .vl-dashboard__content {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        min-width: 0; /* allow flex children to shrink */
    }
    .vl-dashboard__content-header {
        justify-content: flex-end;
        flex-wrap: wrap;
    }
    .vl-dashboard__content-header-title,
    .vl-dashboard__content-header-actions {
        display: flex;
        gap: var(--vl-spacing--xsmall);
        align-items: center;
    }
    .vl-dashboard__content-header-title {
        flex: 1 1 var(--vl-dashboard-title-min-width, 300px);
        min-width: 0; /* Important for flex and ellipsis */
    }
    .vl-dashboard__content-header-title vl-title::part(h1) {
        font-size: var(--vl-font-size--large);
        word-break: break-word;
    }
    .vl-dashboard__content-header-actions {
        flex-wrap: wrap;
    }
    .vl-dashboard__content-area {
        flex: 1;
        min-height: 0; /* allow flex children to shrink */
        overflow-x: hidden;
        overflow-y: auto;
    }

    user-badge {
        width: 4.5rem;
        height: 4.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: var(--vl-color--background-default);
        border: 1px solid var(--vl-color--border-default);
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    [hidden] {
        display: none !important;
    }
`;
