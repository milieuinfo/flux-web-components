import { registerWebComponents } from '@domg-wc/common';
import { VlTitleComponent } from '@domg-wc/components/atom';
import { VlProzaMessage, VlProzaMessagePreloader } from '@domg-wc/components/block';
import { VlSideNavigationLayoutComponent } from '@domg-wc/components/block/next';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';

export default {
    title: 'Patronen/Navigatie/Side Navigation/met proza message',
    parameters: {
        layout: 'fullscreen',
        docs: {
            story: {
                inline: false,
                iframeHeight: 860,
            },
        },
    },
} as Meta;

registerWebComponents([
    VlSideNavigationLayoutComponent,
    VlProzaMessagePreloader,
    VlProzaMessage,
    VlTitleComponent,
]);

const prozaDomain = 'side-navigation-layout-proza-message';

const sideNavigationLayoutWithProzaMessageHTML = html`
    <section class="vl-section">
        <div class="vl-content-block vl-content-block--full-width">
            <vl-proza-message-preloader domain="side-navigation-layout-proza-message"></vl-proza-message-preloader>
            <vl-side-navigation-layout-next
                content-block
                heading-root-selector="#side-navigation-layout-content"
            >
                <div slot="content" id="side-navigation-layout-content">
                    <vl-title type="h1" id="side-navigation-main-title">
                        <vl-proza-message
                            domain="side-navigation-layout-proza-message"
                            code="page-title"
                        ></vl-proza-message>
                    </vl-title>

                    <vl-title type="h2" id="section-1">
                        <vl-proza-message
                            domain="side-navigation-layout-proza-message"
                            code="section-1-title"
                        ></vl-proza-message>
                    </vl-title>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed libero ac nibh dictum
                        viverra. Donec a arcu non lorem viverra vestibulum.
                    </p>
                    <p>
                        Mauris commodo, dolor sit amet faucibus accumsan, dui nisl suscipit mi, sed vulputate risus ante
                        vitae velit. Donec feugiat fermentum nibh.
                    </p>

                    <vl-title type="h3" id="section-1-sub-1">
                        <vl-proza-message
                            domain="side-navigation-layout-proza-message"
                            code="section-1-sub-1"
                        ></vl-proza-message>
                    </vl-title>
                    <p>
                        Integer malesuada lorem vitae lorem volutpat, ut feugiat risus pulvinar. Curabitur mattis elit
                        sit amet turpis vestibulum, non vulputate nisi maximus.
                    </p>
                    <p>
                        Vivamus lacinia sem vel dui ultrices, a porttitor erat vulputate. Curabitur viverra facilisis
                        ligula, in sodales eros varius sit amet.
                    </p>

                    <vl-title type="h3" id="section-1-sub-2">
                        <vl-proza-message
                            domain="side-navigation-layout-proza-message"
                            code="section-1-sub-2"
                        ></vl-proza-message>
                    </vl-title>
                    <p>
                        Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                        curae; Aenean feugiat convallis lorem.
                    </p>
                    <p>
                        Nunc consequat, magna non luctus congue, leo sem porta mauris, ut varius elit massa sed libero.
                        Quisque luctus erat a massa pretium ullamcorper.
                    </p>

                    <vl-title type="h3" id="section-1-sub-3">
                        <vl-proza-message
                            domain="side-navigation-layout-proza-message"
                            code="section-1-sub-3"
                        ></vl-proza-message>
                    </vl-title>
                    <p>
                        Sed ac vulputate neque. Quisque at augue non augue pulvinar porttitor. Fusce suscipit ipsum mi,
                        et aliquet magna sodales id.
                    </p>

                    <vl-title type="h2" id="section-2">
                        <vl-proza-message
                            domain="side-navigation-layout-proza-message"
                            code="section-2-title"
                        ></vl-proza-message>
                    </vl-title>
                    <p>
                        Donec et erat vel est sodales viverra. Duis et justo sed neque convallis commodo. In in augue
                        non massa laoreet placerat.
                    </p>
                    <p>
                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                        Integer consequat porttitor mauris, vitae congue elit elementum vel.
                    </p>

                    <vl-title type="h3" id="section-2-sub-1">
                        <vl-proza-message
                            domain="side-navigation-layout-proza-message"
                            code="section-2-sub-1"
                        ></vl-proza-message>
                    </vl-title>
                    <p>
                        Phasellus in elit neque. Etiam dictum, velit et ultrices molestie, enim ligula varius nisi, id
                        ullamcorper leo purus eget dolor.
                    </p>

                    <vl-title type="h3" id="section-2-sub-2">
                        <vl-proza-message
                            domain="side-navigation-layout-proza-message"
                            code="section-2-sub-2"
                        ></vl-proza-message>
                    </vl-title>
                    <p>
                        Morbi tincidunt lorem ut erat iaculis, vitae vestibulum lorem semper. Donec non lorem quis
                        libero posuere egestas in non justo.
                    </p>

                    <vl-title type="h3" id="section-2-sub-3">
                        <vl-proza-message
                            domain="side-navigation-layout-proza-message"
                            code="section-2-sub-3"
                        ></vl-proza-message>
                    </vl-title>
                    <p>
                        Cras lacinia tortor augue, in feugiat justo condimentum in. Aenean malesuada lorem at nisl
                        feugiat, vitae semper arcu mattis.
                    </p>

                    <vl-title type="h2" id="section-3">
                        <vl-proza-message
                            domain="side-navigation-layout-proza-message"
                            code="section-3-title"
                        ></vl-proza-message>
                    </vl-title>
                    <p>
                        Curabitur non malesuada purus. Nulla molestie, massa in varius luctus, purus orci commodo urna,
                        vitae faucibus nisl velit ac lectus.
                    </p>
                    <vl-title type="h3" id="section-3-sub-1">
                        <vl-proza-message
                            domain="side-navigation-layout-proza-message"
                            code="section-3-sub-1"
                        ></vl-proza-message>
                    </vl-title>
                    <p>
                        In de side navigation zie je automatisch de standaard headingniveaus van de layout op basis van
                        deze contentstructuur.
                    </p>
                    <vl-title type="h3" id="section-3-sub-2">
                        <vl-proza-message
                            domain="side-navigation-layout-proza-message"
                            code="section-3-sub-2"
                        ></vl-proza-message>
                    </vl-title>
                    <p>
                        Alle sectietitels in dit voorbeeld worden via Proza geladen, zodat dezelfde content zowel in de
                        pagina als in de side navigation consistent blijft.
                    </p>
                </div>
            </vl-side-navigation-layout-next>
        </div>
    </section>
`;

const preloadProzaMessages = () => {
    VlProzaMessagePreloader.__setPreloadedMessagesCacheForDomain(
        prozaDomain,
        Promise.resolve({
            'page-title': 'Side Navigation - met Proza Message',
            'section-1-title': 'Ontwerpprincipes',
            'section-1-sub-1': 'Consistente headings',
            'section-1-sub-2': 'Scanbare content',
            'section-1-sub-3': 'Toegankelijkheid',
            'section-2-title': 'Implementatie',
            'section-2-sub-1': 'Preloaden van berichten',
            'section-2-sub-2': 'Vullen van titels',
            'section-2-sub-3': 'Validatie',
            'section-3-title': 'Resultaat',
            'section-3-sub-1': 'Wat je in de side navigation ziet',
            'section-3-sub-2': 'Samenvatting',
        })
    );
    VlProzaMessage.__setToegelatenOperatiesCacheForDomain(prozaDomain, Promise.resolve({ update: false }));
};

export const SideNavigationMetProzaMessage = () => {
    preloadProzaMessages();

    return sideNavigationLayoutWithProzaMessageHTML;
};

SideNavigationMetProzaMessage.storyName = 'side-navigation - met proza message';
