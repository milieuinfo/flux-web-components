import { GlobalStyles, registerWebComponents, webComponent } from '@domg-wc/common';
import { VlParagraphComponent, VlTitleComponent } from '@domg-wc/components/atom';
import { VlAlert, VlFunctionalHeaderComponent, VlTemplate } from '@domg-wc/components/block';
import { VlSideNavigationLayoutComponent } from '@domg-wc/components/block/next';
import { VlFooter, VlHeader } from '@domg-wc/components/compliance';
import { vlLayoutStyles, vlLegacyStyles } from '@domg-wc/styles';
import { CSSResult, html, LitElement } from 'lit';

registerWebComponents([
    VlTemplate,
    VlHeader,
    VlFooter,
    VlFunctionalHeaderComponent,
    VlTitleComponent,
    VlParagraphComponent,
    VlAlert,
    VlSideNavigationLayoutComponent,
]);

@webComponent('vl-page-layout-example')
export class VlPageLayoutExample extends LitElement {
    constructor() {
        super();

        GlobalStyles.getInstance().register();
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlLayoutStyles, vlLegacyStyles];
    }

    get isFullWidth() {
        return this.hasAttribute('full-width');
    }

    render() {
        return html`
            <main>
                <vl-template>
                    <vl-header slot="header" identifier="59188ff6-662b-45b9-b23a-964ad48c2bfb" development></vl-header>

                    <div slot="main">
                        <vl-functional-header
                            title="Pagina layout"
                            hide-back-link
                            ?full-width=${this.isFullWidth}
                            skip-to-content-id="#main-content"
                        >
                            <div slot="sub-title">${this.isFullWidth ? 'Volledige breedte' : 'Standaard layout'}</div>
                        </vl-functional-header>

                        <section class="vl-section">
                            <div class="vl-content-block ${this.isFullWidth ? 'vl-content-block--full-width' : ''}">
                                <vl-side-navigation-layout content-block heading-root-selector="#main-content">
                                    <div slot="content" id="main-content">
                                        <vl-title type="h1"
                                            >${this.isFullWidth ? 'Volledige breedte' : 'Standaard layout'}
                                        </vl-title>
                                        <vl-alert icon="info-circle">
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
                                        </vl-alert>

                                        <vl-paragraph>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec purus
                                            nisi, pulvinar sed lacinia vel, placerat in dolor. In lacinia magna sed
                                            eros porta vulputate. Sed sodales, nisl in dapibus venenatis, tellus
                                            arcu molestie nunc, non facilisis est ante non odio. Pellentesque nec
                                            auctor justo. Proin ut risus et felis faucibus gravida. Fusce congue,
                                            est vitae eleifend pulvinar, justo erat semper magna, ut efficitur metus
                                            dui ut lacus. Mauris nisl nisi, semper et metus a, sagittis accumsan
                                            arcu. Nulla ultrices lectus nunc, eu tristique justo tempor non.
                                            Vestibulum lobortis pharetra bibendum.
                                        </vl-paragraph>

                                        <vl-title type="h2" id="content-1">Content 1</vl-title>
                                        <vl-paragraph>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec purus
                                            nisi, pulvinar sed lacinia vel, placerat in dolor. In lacinia magna sed
                                            eros porta vulputate. Sed sodales, nisl in dapibus venenatis, tellus
                                            arcu molestie nunc, non facilisis est ante non odio. Pellentesque nec
                                            auctor justo. Proin ut risus et felis faucibus gravida.
                                        </vl-paragraph>

                                        <vl-title type="h3" id="content-1-1">Content 1 - 1</vl-title>
                                        <vl-paragraph>
                                            Fusce congue, est vitae eleifend pulvinar, justo erat semper magna, ut
                                            efficitur metus dui ut lacus.
                                        </vl-paragraph>

                                        <vl-title type="h3" id="content-1-2">Content 1 - 2</vl-title>
                                        <vl-paragraph>
                                            Mauris nisl nisi, semper et metus a, sagittis accumsan arcu. Nulla
                                            ultrices lectus nunc, eu tristique justo tempor non.
                                        </vl-paragraph>

                                        <vl-title type="h3" id="content-1-3">Content 1 - 3</vl-title>
                                        <vl-paragraph>
                                            Vestibulum lobortis pharetra bibendum. Donec purus nisi, pulvinar sed
                                            lacinia vel, placerat in dolor.
                                        </vl-paragraph>

                                        <vl-title type="h3" id="content-1-4">Content 1 - 4</vl-title>
                                        <vl-paragraph>
                                            In lacinia magna sed eros porta vulputate. Sed sodales, nisl in dapibus
                                            venenatis, tellus arcu molestie nunc.
                                        </vl-paragraph>

                                        <vl-title type="h2" id="content-2">Content 2</vl-title>
                                        <vl-paragraph>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec purus
                                            nisi, pulvinar sed lacinia vel, placerat in dolor. In lacinia magna sed
                                            eros porta vulputate. Sed sodales, nisl in dapibus venenatis, tellus
                                            arcu molestie nunc, non facilisis est ante non odio.
                                        </vl-paragraph>

                                        <vl-title type="h3" id="content-2-1">Content 2 - 1</vl-title>
                                        <vl-paragraph>
                                            Pellentesque nec auctor justo. Proin ut risus et felis faucibus gravida.
                                        </vl-paragraph>

                                        <vl-title type="h3" id="content-2-2">Content 2 - 2</vl-title>
                                        <vl-paragraph>
                                            Fusce congue, est vitae eleifend pulvinar, justo erat semper magna, ut
                                            efficitur metus dui ut lacus.
                                        </vl-paragraph>

                                        <vl-title type="h3" id="content-2-3">Content 2 - 3</vl-title>
                                        <vl-paragraph>
                                            Mauris nisl nisi, semper et metus a, sagittis accumsan arcu. Nulla
                                            ultrices lectus nunc, eu tristique justo tempor non.
                                        </vl-paragraph>

                                        <vl-title type="h3" id="content-2-4">Content 2 - 4</vl-title>
                                        <vl-paragraph>
                                            Vestibulum lobortis pharetra bibendum. Donec purus nisi, pulvinar sed
                                            lacinia vel, placerat in dolor.
                                        </vl-paragraph>

                                        <vl-title type="h2" id="content-3">Content 3</vl-title>
                                        <vl-paragraph>
                                            In lacinia magna sed eros porta vulputate. Sed sodales, nisl in dapibus
                                            venenatis, tellus arcu molestie nunc.
                                        </vl-paragraph>
                                    </div>
                                </vl-side-navigation-layout>
                            </div>
                        </section>
                    </div>
                    <vl-footer slot="footer" identifier="0337f8dc-3266-4e7a-8f4a-95fd65189e5b" development></vl-footer>
                </vl-template>
            </main>
        `;
    }
}
