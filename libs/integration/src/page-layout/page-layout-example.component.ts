import { registerWebComponents, webComponent } from '@domg-wc/common-utilities';
import { GlobalStyles, vlContentBlockStyles, vlSectionStyles } from '@domg-wc/common-utilities/css';
import { VlAlert, VlFunctionalHeaderComponent, VlTemplate } from '@domg-wc/components';
import { VlParagraphComponent } from '@domg-wc/components/next/paragraph';
import {
    VlSideNavigationComponent,
    VlSideNavigationContentComponent,
    VlSideNavigationGroupComponent,
    VlSideNavigationItemComponent,
    VlSideNavigationReferenceComponent,
    VlSideNavigationToggleComponent,
} from '@domg-wc/components/next/side-navigation';
import { VlTitleComponent } from '@domg-wc/components/next/title';
import { vlElementsStyle, VlSideNavigationH5 } from '@domg-wc/elements';
import { VlFooter, VlHeader } from '@domg-wc/sections';
import { CSSResult, html, LitElement } from 'lit';

registerWebComponents([
    VlTemplate,
    VlHeader,
    VlFooter,
    VlFunctionalHeaderComponent,
    VlTitleComponent,
    VlParagraphComponent,
    VlAlert,
    VlSideNavigationReferenceComponent,
    VlSideNavigationComponent,
    VlSideNavigationContentComponent,
    VlSideNavigationH5,
    VlSideNavigationItemComponent,
    VlSideNavigationGroupComponent,
    VlSideNavigationToggleComponent,
]);

@webComponent('vl-page-layout-example')
export class VlPageLayoutExample extends LitElement {
    constructor() {
        super();

        GlobalStyles.getInstance().register();
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlSectionStyles, vlContentBlockStyles, vlElementsStyle];
    }

    get isFullWidth() {
        return this.hasAttribute('full-width');
    }

    render() {
        return html`
            <main>
                <vl-template>
                    <vl-header
                        slot="header"
                        data-vl-identifier="59188ff6-662b-45b9-b23a-964ad48c2bfb"
                        data-vl-development
                    ></vl-header>

                    <div slot="main">
                        <vl-functional-header
                            title="Pagina layout"
                            data-vl-hide-back-link
                            ?data-vl-full-width=${this.isFullWidth}
                        >
                            <div slot="sub-title">${this.isFullWidth ? 'Volledige breedte' : 'Standaard layout'}</div>
                        </vl-functional-header>

                        <section class="vl-section-next">
                            <div
                                class="vl-content-block-next ${this.isFullWidth
                                    ? 'vl-content-block-next--full-width'
                                    : ''}"
                            >
                                <div class="vl-grid-next vl-stacked-next-medium">
                                    <div
                                        class="vl-column-next vl-column-next--8 vl-column-next--m-8 vl-column-next--s-12 vl-column-next--xs-12"
                                    >
                                        <vl-side-navigation-reference-next>
                                            <vl-title-next type="h1"
                                                >${this.isFullWidth ? 'Volledige breedte' : 'Standaard layout'}
                                            </vl-title-next>
                                            <vl-alert-next icon="info-circle">
                                                ${this.isFullWidth
                                                    ? html`<span slot="title"
                                                              >Alternatieve volledige breedte layout</span
                                                          >
                                                          Dit is een layout voor applicaties die de volledige
                                                          schermbreedte nodig hebben. Gebruik dit enkel wanneer de
                                                          standaard layout niet mogelijk is, bijvoorbeeld in het geval
                                                          van uitgebreide data tabellen.`
                                                    : html`<span slot="title">Standaard layout</span>Dit is de standaard
                                                          layout voor applicaties. Gebruik de alternatieve "Volledige
                                                          breedte" variant enkel indien deze layout te smal is om alle
                                                          content duidelijk te visualiseren.`}
                                            </vl-alert-next>

                                            <vl-paragraph-next>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec purus
                                                nisi, pulvinar sed lacinia vel, placerat in dolor. In lacinia magna sed
                                                eros porta vulputate. Sed sodales, nisl in dapibus venenatis, tellus
                                                arcu molestie nunc, non facilisis est ante non odio. Pellentesque nec
                                                auctor justo. Proin ut risus et felis faucibus gravida. Fusce congue,
                                                est vitae eleifend pulvinar, justo erat semper magna, ut efficitur metus
                                                dui ut lacus. Mauris nisl nisi, semper et metus a, sagittis accumsan
                                                arcu. Nulla ultrices lectus nunc, eu tristique justo tempor non.
                                                Vestibulum lobortis pharetra bibendum.
                                            </vl-paragraph-next>

                                            <vl-title-next type="h2" id="content-1">Content 1</vl-title-next>
                                            <vl-paragraph-next>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec purus
                                                nisi, pulvinar sed lacinia vel, placerat in dolor. In lacinia magna sed
                                                eros porta vulputate. Sed sodales, nisl in dapibus venenatis, tellus
                                                arcu molestie nunc, non facilisis est ante non odio. Pellentesque nec
                                                auctor justo. Proin ut risus et felis faucibus gravida.
                                            </vl-paragraph-next>

                                            <vl-title-next type="h3" id="content-1-1">Content 1 - 1</vl-title-next>
                                            <vl-paragraph-next>
                                                Fusce congue, est vitae eleifend pulvinar, justo erat semper magna, ut
                                                efficitur metus dui ut lacus.
                                            </vl-paragraph-next>

                                            <vl-title-next type="h3" id="content-1-2">Content 1 - 2</vl-title-next>
                                            <vl-paragraph-next>
                                                Mauris nisl nisi, semper et metus a, sagittis accumsan arcu. Nulla
                                                ultrices lectus nunc, eu tristique justo tempor non.
                                            </vl-paragraph-next>

                                            <vl-title-next type="h3" id="content-1-3">Content 1 - 3</vl-title-next>
                                            <vl-paragraph-next>
                                                Vestibulum lobortis pharetra bibendum. Donec purus nisi, pulvinar sed
                                                lacinia vel, placerat in dolor.
                                            </vl-paragraph-next>

                                            <vl-title-next type="h3" id="content-1-4">Content 1 - 4</vl-title-next>
                                            <vl-paragraph-next>
                                                In lacinia magna sed eros porta vulputate. Sed sodales, nisl in dapibus
                                                venenatis, tellus arcu molestie nunc.
                                            </vl-paragraph-next>

                                            <vl-title-next type="h2" id="content-2">Content 2</vl-title-next>
                                            <vl-paragraph-next>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec purus
                                                nisi, pulvinar sed lacinia vel, placerat in dolor. In lacinia magna sed
                                                eros porta vulputate. Sed sodales, nisl in dapibus venenatis, tellus
                                                arcu molestie nunc, non facilisis est ante non odio.
                                            </vl-paragraph-next>

                                            <vl-title-next type="h3" id="content-2-1">Content 2 - 1</vl-title-next>
                                            <vl-paragraph-next>
                                                Pellentesque nec auctor justo. Proin ut risus et felis faucibus gravida.
                                            </vl-paragraph-next>

                                            <vl-title-next type="h3" id="content-2-2">Content 2 - 2</vl-title-next>
                                            <vl-paragraph-next>
                                                Fusce congue, est vitae eleifend pulvinar, justo erat semper magna, ut
                                                efficitur metus dui ut lacus.
                                            </vl-paragraph-next>

                                            <vl-title-next type="h3" id="content-2-3">Content 2 - 3</vl-title-next>
                                            <vl-paragraph-next>
                                                Mauris nisl nisi, semper et metus a, sagittis accumsan arcu. Nulla
                                                ultrices lectus nunc, eu tristique justo tempor non.
                                            </vl-paragraph-next>

                                            <vl-title-next type="h3" id="content-2-4">Content 2 - 4</vl-title-next>
                                            <vl-paragraph-next>
                                                Vestibulum lobortis pharetra bibendum. Donec purus nisi, pulvinar sed
                                                lacinia vel, placerat in dolor.
                                            </vl-paragraph-next>

                                            <vl-title-next type="h2" id="content-3">Content 3</vl-title-next>
                                            <vl-paragraph-next>
                                                In lacinia magna sed eros porta vulputate. Sed sodales, nisl in dapibus
                                                venenatis, tellus arcu molestie nunc.
                                            </vl-paragraph-next>
                                        </vl-side-navigation-reference-next>
                                    </div>
                                    <div
                                        class="vl-column-next vl-column-next--4 vl-column-next--m-4 vl-column-next--s-12 vl-column-next--xs-12"
                                    >
                                        <vl-side-navigation-next aria-label="inhoudsopgave">
                                            <vl-side-navigation-h5-next>Op deze pagina</vl-side-navigation-h5-next>
                                            <vl-side-navigation-content-next>
                                                <vl-side-navigation-group-next>
                                                    <vl-side-navigation-item-next parent="content-1">
                                                        <vl-side-navigation-toggle-next
                                                            href="#content-1"
                                                            child="content-1"
                                                        >
                                                            content 1
                                                        </vl-side-navigation-toggle-next>
                                                        <ul>
                                                            <vl-side-navigation-item-next>
                                                                <a href="#content-1-1" parent="content-1"
                                                                    >content 1 - 1</a
                                                                >
                                                            </vl-side-navigation-item-next>
                                                            <vl-side-navigation-item-next>
                                                                <a href="#content-1-2" parent="content-1"
                                                                    >content 1 - 2</a
                                                                >
                                                            </vl-side-navigation-item-next>
                                                            <vl-side-navigation-item-next>
                                                                <a href="#content-1-3" parent="content-1"
                                                                    >content 1 - 3</a
                                                                >
                                                            </vl-side-navigation-item-next>
                                                            <vl-side-navigation-item-next>
                                                                <a href="#content-1-4" parent="content-1"
                                                                    >content 1 - 4</a
                                                                >
                                                            </vl-side-navigation-item-next>
                                                        </ul>
                                                    </vl-side-navigation-item-next>
                                                    <vl-side-navigation-item-next parent="content-2">
                                                        <vl-side-navigation-toggle-next
                                                            href="#content-2"
                                                            child="content-2"
                                                        >
                                                            content 2
                                                        </vl-side-navigation-toggle-next>
                                                        <ul>
                                                            <vl-side-navigation-item-next>
                                                                <a href="#content-2-1" parent="content-2"
                                                                    >content 2 - 1</a
                                                                >
                                                            </vl-side-navigation-item-next>
                                                            <vl-side-navigation-item-next>
                                                                <a href="#content-2-2" parent="content-2"
                                                                    >content 2 - 2</a
                                                                >
                                                            </vl-side-navigation-item-next>
                                                            <vl-side-navigation-item-next>
                                                                <a href="#content-2-3" parent="content-2"
                                                                    >content 2 - 3</a
                                                                >
                                                            </vl-side-navigation-item-next>
                                                            <vl-side-navigation-item-next>
                                                                <a href="#content-2-4" parent="content-2"
                                                                    >content 2 - 4</a
                                                                >
                                                            </vl-side-navigation-item-next>
                                                        </ul>
                                                    </vl-side-navigation-item-next>
                                                    <vl-side-navigation-item-next>
                                                        <a href="#content-3"> content 3 </a>
                                                    </vl-side-navigation-item-next>
                                                </vl-side-navigation-group-next>
                                            </vl-side-navigation-content-next>
                                        </vl-side-navigation-next>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <vl-footer
                        slot="footer"
                        data-vl-identifier="0337f8dc-3266-4e7a-8f4a-95fd65189e5b"
                        data-vl-development
                    ></vl-footer>
                </vl-template>
            </main>
        `;
    }
}
