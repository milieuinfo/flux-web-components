import { registerWebComponents, webComponent } from '@domg-wc/common-utilities';
import { GlobalStyles, vlContentBlockStyles, vlSectionStyles } from '@domg-wc/common-utilities/css';
import { VlAlert, VlFunctionalHeaderComponent, VlTemplate } from '@domg-wc/components';
import { VlParagraphComponent } from '@domg-wc/components/next/paragraph';
import { VlTitleComponent } from '@domg-wc/components/next/title';
import { VlFooter, VlHeader } from '@domg-wc/sections';
import { CSSResult, LitElement, html } from 'lit';

registerWebComponents([
    VlTemplate,
    VlHeader,
    VlFooter,
    VlFunctionalHeaderComponent,
    VlTitleComponent,
    VlParagraphComponent,
    VlAlert,
]);

@webComponent('vl-page-layout-example')
export class VlPageLayoutExample extends LitElement {
    constructor() {
        super();

        GlobalStyles.getInstance().register();
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlSectionStyles, vlContentBlockStyles];
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
                                <vl-title-next type="h1"
                                    >${this.isFullWidth ? 'Volledige breedte' : 'Standaard layout'}
                                </vl-title-next>
                                <vl-alert icon="info-circle">
                                    ${this.isFullWidth
                                        ? html`<span slot="title">Alternatieve volledige breedte layout</span> Dit is
                                              een layout voor applicaties die de volledige schermbreedte nodig hebben.
                                              Gebruik dit enkel wanneer de standaard layout niet mogelijk is,
                                              bijvoorbeeld in het geval van uitgebreide data tabellen.`
                                        : html`<span slot="title">Standaard layout</span>Dit is de standaard layout voor
                                              applicaties. Gebruik de alternatieve "Volledige breedte" variant enkel
                                              indien deze layout te smal is om alle content duidelijk te visualiseren.`}
                                </vl-alert>

                                <vl-paragraph-next>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec purus nisi, pulvinar
                                    sed lacinia vel, placerat in dolor. In lacinia magna sed eros porta vulputate. Sed
                                    sodales, nisl in dapibus venenatis, tellus arcu molestie nunc, non facilisis est
                                    ante non odio. Pellentesque nec auctor justo. Proin ut risus et felis faucibus
                                    gravida. Fusce congue, est vitae eleifend pulvinar, justo erat semper magna, ut
                                    efficitur metus dui ut lacus. Mauris nisl nisi, semper et metus a, sagittis accumsan
                                    arcu. Nulla ultrices lectus nunc, eu tristique justo tempor non. Vestibulum lobortis
                                    pharetra bibendum.
                                </vl-paragraph-next>
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
