import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent } from '@domg-wc/components/atom';
import { VlPopoverActionComponent, VlPopoverActionListComponent, VlPopoverComponent } from '@domg-wc/components/block';
import { VlHeader } from '@domg-wc/components/compliance';
import { vlMediaScreenMedium } from '@domg-wc/styles';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-component')
export class AppComponent extends LitElement {
    static {
        registerWebComponents([VlHeader, VlPopoverComponent, VlPopoverActionListComponent, VlPopoverActionComponent]);
    }

    firstUpdated(): void {
        const openMobileNavigationButton = this.querySelector<VlButtonComponent>('#vl-app-open-mobile-navigation-button');
        const closeMobileNavigationButton = this.querySelector<VlButtonComponent>('#vl-app-close-mobile-navigation-button');
        const toggleNavigationButton = this.querySelector<VlButtonComponent>('#vl-app-toggle-navigation-button');
        const navigation = this.querySelector('.vl-app__navigation');
        openMobileNavigationButton?.addEventListener('click', () => {
            navigation?.classList.add('vl-app__navigation--mobile');
            closeMobileNavigationButton?.shadowRoot?.querySelector('button')?.focus();
        });
        closeMobileNavigationButton?.addEventListener('click', () => {
            navigation?.classList.remove('vl-app__navigation--mobile');
            openMobileNavigationButton?.shadowRoot?.querySelector('button')?.focus();
        });
        toggleNavigationButton?.addEventListener('click', () => {
            navigation?.classList.toggle('vl-app__navigation--collapsed');
            this.setAttribute('aria-expanded', navigation?.classList.contains('vl-app__navigation--collapsed') ? 'false' : 'true');
        });
    }

    render() {
        return html`
            <style>
                :root {
                    --vl-header-height: 43px;
                    --vl-footer-height: 128px;
                }

                /* App layout */
                .vl-app {
                    display: flex;
                    flex-direction: row;
                    height: calc(100vh - var(--vl-header-height) - var(--vl-footer-height));
                }
                @media screen and (max-width: ${vlMediaScreenMedium}px) {
                    .vl-app {
                        display: block;
                        height: 100%;
                    }
                }

                /* Common Header Styles */
                .vl-app__navigation-header,
                .vl-app__content-header {
                    min-height: 8.8rem;
                    padding: var(--vl-spacing--normal);
                    border-bottom: 1px solid var(--vl-color--border-default);
                    display: flex;
                    align-items: center;
                    gap: var(--vl-spacing--xsmall);
                }

                /* Navigation Panel */
                .vl-app__navigation {
                    flex: 0 1 300px;
                    background-color: var(--vl-color--background-subtle);
                    border-right: 1px solid var(--vl-color--border-default);
                    display: grid;
                    grid-template-areas:
                        'navigation-header'
                        'navigation'
                        'navigation-footer';
                    grid-template-columns: 1fr;
                    grid-template-rows: auto 1fr auto;

                    nav {
                        grid-area: navigation;
                        padding: var(--vl-spacing--medium);
                        overflow-y: auto;
                        max-height: 100%;
                    }
                    nav ul.vl-stacked-small {
                        gap: var(--vl-spacing--xsmall);
                    }
                    nav > ul > li.vl-group > vl-button:first-child {
                        flex: 1;

                        &::part(button) {
                            justify-content: flex-start;
                        }
                    }

                    @media screen and (max-width: ${vlMediaScreenMedium}px) {
                        display: none;
                    }

                    &.vl-app__navigation--mobile {
                        @media screen and (max-width: ${vlMediaScreenMedium}px) {
                            display: flex;
                            flex-direction: column;
                            height: calc(100vh - var(--vl-header-height));
                            position: fixed;
                            top: var(--vl-header-height);
                            left: 0;
                            width: 100%;

                            + .vl-app__content {
                                display: none;
                            }
                        }
                    }

                    &.vl-app__navigation--collapsed {
                        @media screen and (min-width: ${vlMediaScreenMedium}px) {
                            flex-basis: 4.1rem;
                            overflow: hidden;

                            vl-button::part(button) {
                                font-size: 0;
                                width: 100%;
                                padding-inline: 0;
                                justify-content: center !important;
                            }
                            vl-button::part(icon) {
                                font-size: var(--vl-font-size);
                            }
                            nav {
                                padding-inline: 0.3rem;
                                text-align: center;
                            }
                            .vl-app__navigation-header {
                                padding-inline: 0.8rem;
                            }
                            .vl-app__navigation-header-user > span {
                                display: none;
                            }
                            .vl-app__navigation-header-user > vl-badge {
                                width: 2.4rem;
                                height: 2.4rem;
                                font-size: 0.6em;
                            }
                            li > * {
                                display: none;
                            }
                            li > vl-button:first-child {
                                display: block;
                            }
                            #vl-app-toggle-navigation-button {
                                display: block;
                                transform: rotate(180deg);
                            }
                        }
                    }
                }
                .vl-app__navigation-header {
                    grid-area: navigation-header;
                    font-size: var(--vl-font-size--large);
                    font-weight: 500;
                    justify-content: space-between;
                }
                .vl-app__navigation-header-user {
                    display: flex;
                    align-items: center;
                    gap: var(--vl-spacing--xsmall);
                }
                .vl-app__navigation-footer {
                    grid-area: navigation-footer;
                    padding: 5px;

                    vl-button::part(button) {
                        justify-content: flex-start;
                    }

                    @media screen and (max-width: ${vlMediaScreenMedium}px) {
                        display: none;
                    }
                }
                .vl-app__navigation-open-mobile,
                .vl-app__navigation-close-mobile {
                    display: none;

                    @media screen and (max-width: ${vlMediaScreenMedium}px) {
                        display: block;
                    }
                }

                /* Content Panel */
                .vl-app__content {
                    flex: 1;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    min-width: 0; /* allow flex children to shrink */
                }
                .vl-app__content-header {
                    justify-content: flex-end;
                    flex-wrap: wrap;
                }
                .vl-app__content-header-title,
                .vl-app__content-header-actions {
                    display: flex;
                    gap: var(--vl-spacing--xsmall);
                    align-items: center;
                }
                .vl-app__content-header-title {
                    flex: 1;
                    min-width: 0; /* Important for flex and ellipsis */
                }
                .vl-app__content-header-title vl-title::part(h1) {
                    font-size: var(--vl-font-size--large);
                    word-break: break-word;
                }
                .vl-app__content-header-actions {
                    flex-wrap: wrap;
                }
                .vl-app__content-area {
                    flex: 1;
                    min-height: 0; /* allow flex children to shrink */
                    overflow-x: hidden;
                    overflow-y: auto;

                    &.vl-app__content-area--padded {
                        padding: var(--vl-spacing--medium);
                    }
                }

                /* Component overrides */
                vl-badge {
                    width: 2.4rem;
                    height: 2.4rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background-color: var(--vl-color--background-default);
                    border: 1px solid var(--vl-color--border-default);
                }
                vl-badge[large] {
                    width: 4.5rem;
                    height: 4.5rem;
                }
            </style>

            <div class="vl-app">
                <!-- header is altijd sticky bovenaan -->
                <vl-header development identifier="59188ff6-662b-45b9-b23a-964ad48c2bfb" simple></vl-header>
                <!-- navigation is altijd 100% hoog tussen header en footer -->
                <!-- navigation kan ingeklapt worden tot ongeveer breedte van icon-only knop met wat margin -->
                <!-- navigation verdwijnt in hamburger menu op mobile -->
                <!-- mobiele navigation neemt volledig scherm in onder de header wanneer opengeklapt -->
                <div class="vl-app__navigation">
                    <div class="vl-app__navigation-header">
                        <div class="vl-app__navigation-header-user">
                            <!-- vl-badge: te ontwikkelen -->
                            <vl-badge large>
                                <!-- initialen of logo -->
                                <vl-icon icon="building-big"></vl-icon>
                            </vl-badge>
                            <span>Bedrijfsnaam</span>
                        </div>
                        <div class="vl-app__navigation-close-mobile">
                            <vl-button id="vl-app-close-mobile-navigation-button" icon="close" ghost></vl-button>
                        </div>
                    </div>
                    <nav id="vl-app-navigation">
                        <ul class="vl-stacked vl-stacked-small">
                            <li class="vl-group vl-group--align-center">
                                <!-- actieve item krijgt tertiary attribuut en aria-current -->
                                <!-- werkt aria-current op vl-button? of moet dit naar het li-element? -->
                                <vl-button icon="places-home" tertiary aria-current="page" block>Overzicht</vl-button>
                            </li>
                            <li class="vl-group vl-group--align-center">
                                <!-- een nav item kan een icon-only actie knop hebben -->
                                <vl-button icon="list" ghost block>[beheer items]</vl-button>
                                <vl-button icon="plus-circle-filled" label="[x] toevoegen" ghost></vl-button>
                            </li>
                            <li class="vl-group vl-group--align-center">
                                <!-- een nav item kan een badge hebben -->
                                <!-- vl-badge: te ontwikkelen -->
                                <!-- aria-describedby support, hoe oplossen in shadow DOM? -->
                                <vl-button icon="bell" ghost aria-describedby="notifications" block
                                    >Notificaties</vl-button
                                >
                                <vl-badge id="notifications">8</vl-badge>
                            </li>

                            <li class="vl-group vl-group--align-center">
                                <vl-button icon="places-home" ghost block>Item 4</vl-button>
                            </li>
                            <li class="vl-group vl-group--align-center">
                                <vl-button icon="places-home" ghost block>Item 5</vl-button>
                            </li>
                            <li class="vl-group vl-group--align-center">
                                <vl-button icon="places-home" ghost block>Item 6</vl-button>
                            </li>
                            <li class="vl-group vl-group--align-center">
                                <vl-button icon="places-home" ghost block>Item 7</vl-button>
                            </li>
                            <li class="vl-group vl-group--align-center">
                                <vl-button icon="places-home" ghost block>Item 8</vl-button>
                            </li>
                            <li class="vl-group vl-group--align-center">
                                <vl-button icon="places-home" ghost block>Item 9</vl-button>
                            </li>
                            <li class="vl-group vl-group--align-center">
                                <vl-button icon="places-home" ghost block>Item 10</vl-button>
                            </li>
                            <li class="vl-group vl-group--align-center">
                                <vl-button icon="places-home" ghost block>Item 11</vl-button>
                            </li>
                            <li class="vl-group vl-group--align-center">
                                <vl-button icon="places-home" ghost block>Item 12</vl-button>
                            </li>
                            <li class="vl-group vl-group--align-center">
                                <vl-button icon="places-home" ghost block>Item 13</vl-button>
                            </li>
                            <li class="vl-group vl-group--align-center">
                                <vl-button icon="places-home" ghost block>Item 14</vl-button>
                            </li>
                            <li class="vl-group vl-group--align-center">
                                <vl-button icon="places-home" ghost block>Item 15</vl-button>
                            </li>
                            <li class="vl-group vl-group--align-center">
                                <vl-button icon="places-home" ghost block>Item 16</vl-button>
                            </li>
                            <li class="vl-group vl-group--align-center">
                                <vl-button icon="places-home" ghost block>Item 17</vl-button>
                            </li>
                            <li class="vl-group vl-group--align-center">
                                <vl-button icon="places-home" ghost block>Item 18</vl-button>
                            </li>
                            <li class="vl-group vl-group--align-center">
                                <vl-button icon="places-home" ghost block>Item 19</vl-button>
                            </li>
                            <li class="vl-group vl-group--align-center">
                                <vl-button icon="places-home" ghost block>Item 20</vl-button>
                            </li>
                        </ul>
                    </nav>
                    <div class="vl-app__navigation-footer">
                        <!-- nakijken of hier aria-controls en aria-expanded op moeten -->
                        <vl-button
                            id="vl-app-toggle-navigation-button"
                            icon="nav-left-double"
                            ghost
                            block
                            aria-expanded="true"
                            aria-controls="vl-app-navigation"
                            >Paneel inklappen</vl-button
                        >
                    </div>
                </div>
                <!-- content is altijd 100% hoog tussen header en footer -->
                <!-- content is altijd 100% breed naast navigation -->
                <main class="vl-app__content">
                    <div class="vl-app__content-header">
                        <div class="vl-app__content-header-title">
                            <div class="vl-app__navigation-open-mobile">
                                <vl-button id="vl-app-open-mobile-navigation-button" icon="menu" ghost></vl-button>
                            </div>
                            <vl-icon icon="places-home" large></vl-icon>
                            <vl-title type="h1" no-space-bottom>Page title</vl-title>
                        </div>
                        <!-- een pagina header kan acties hebben of een search balk -->
                        <div class="vl-app__content-header-actions">
                            <!-- zoeken -->
                            <div class="vl-group vl-group--input-group">
                                <vl-input-field
                                    name="search"
                                    id="search"
                                    input-group
                                    placeholder="Zoek op deze pagina"
                                ></vl-input-field>
                                <vl-button tertiary label="Zoeken" icon="search" input-group></vl-button>
                            </div>
                            <!-- acties -->
                            <vl-button icon="add" secondary>Nieuw item</vl-button>
                            <vl-button icon="bin" error>Verwijderen</vl-button>
                        </div>
                    </div>
                    <div class="vl-app__content-area vl-app__content-area--padded">
                        <!-- de content area is default 100% hoog en breed -->
                        <!-- de content area kan 30px padding hebben, als de content niet container-vullend moet zijn -->
                        <!-- de content area kan een max-width van 1280px hebben, als de content niet container-vullend moet zijn -->
                        <!-- de content area kan links en rechts uitklapbare panelen hebben (nog niet in deze versie) -->

                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                        content<br />
                    </div>
                </main>
                <!-- te bekijken wat er met de footer moet gebeuren op mobile, niet sticky onderaan en content niet beperken tot scherm hoogte? -->
                <vl-footer development identifier="0337f8dc-3266-4e7a-8f4a-95fd65189e5b"></vl-footer>
            </div>
        `;
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        // gaat shadow dom uitzetten
        return this;
    }
}
