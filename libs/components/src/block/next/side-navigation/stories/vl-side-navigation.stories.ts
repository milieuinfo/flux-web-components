import { story } from '@resources/utils-storybook';
import { registerWebComponents } from '@domg-wc/common';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../vl-side-navigation.component';
import { VlButtonComponent } from '../../../../atom/button';
import { VlIconComponent } from '../../../../atom/icon';
import { VlLinkComponent } from '../../../../atom/link';
import { VlTitleComponent } from '../../../../atom/title';
import { SideNavigationArgs, sideNavigationArgs, sideNavigationArgTypes } from './vl-side-navigation.stories-arg';
import sideNavigationDoc from './vl-side-navigation.stories-doc.mdx';
import { toggleCustomTocChildren } from '../vl-side-navigation-custom-toc.utils';

export default {
    id: 'components-block-next-side-navigation',
    title: 'Components - Block/next/side-navigation',
    tags: ['autodocs'],
    args: sideNavigationArgs,
    argTypes: sideNavigationArgTypes,
    parameters: {
        docs: {
            page: sideNavigationDoc,
            story: {
                inline: false,
                iframeHeight: 500,
            },
        },
    },
} as Meta<SideNavigationArgs>;

registerWebComponents([VlTitleComponent, VlLinkComponent, VlButtonComponent, VlIconComponent]);

const sampleContent = html`
    <div id="story-content-container">
        <section style="min-height: 400px">
            <vl-title type="h2" id="content-1-heading">Content 1</vl-title>
            <vl-paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco
            </vl-paragraph>
            <vl-paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco
            </vl-paragraph>
        </section>
        <section style="min-height: 400px;">
            <vl-title type="h3" id="content-1-1-heading">Content 1 - 1</vl-title>
            <vl-paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco
            </vl-paragraph>
            <vl-title type="h3" id="content-1-2-heading">Content 1 - 2</vl-title>
            <vl-paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco
            </vl-paragraph>
        </section>
        <section style="min-height: 400px;">
            <vl-title type="h2" id="content-2-heading">Content 2</vl-title>
            <vl-paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco
            </vl-paragraph>
            <vl-title type="h3" id="content-2-1-heading">Content 2 - 1</vl-title>
            <vl-paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco
            </vl-paragraph>
            <vl-title type="h3" id="content-2-2-heading">Content 2 - 2</vl-title>
            <vl-paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco </vl-paragraph
            ><vl-paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco
            </vl-paragraph>
        </section>
        <section style="min-height: 400px;">
            <vl-title type="h2" id="content-3-heading">Content 3</vl-title>
            <vl-paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco
            </vl-paragraph>
            <vl-paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco
            </vl-paragraph>
        </section>
    </div>
`;

export const SideNavigationDefault = story(
    sideNavigationArgs,
    ({ closed, compact, headingRootSelector, maxDepth, navigationTitle }) => {
        return html`
            <div class="vl-grid vl-content-block">
                <vl-side-navigation-next
                    class="vl-column vl-column--3 vl-column--start-10 vl-column--m-3  vl-column--s-12 vl-side-navigation--order-1"
                    ?closed=${closed}
                    ?compact=${compact}
                    max-depth=${maxDepth}
                    heading-root-selector=${headingRootSelector}
                    navigation-title=${navigationTitle}
                >
                </vl-side-navigation-next>
                <div class="vl-column vl-column--8 vl-column--m-9 vl-column--s-12 ">${sampleContent}</div>
            </div>
        `;
    }
);
SideNavigationDefault.storyName = 'vl-side-navigation-next - default';
SideNavigationDefault.args = {
    headingRootSelector: '#story-content-container',
};

export const SideNavigationCompact = story(
    sideNavigationArgs,
    ({ closed, headingRootSelector, maxDepth, navigationTitle }) => {
        return html`
            <div class="vl-grid vl-content-block">
                <vl-side-navigation-next
                    class="vl-column vl-column--12 vl-side-navigation--order-1"
                    ?closed=${closed}
                    compact
                    max-depth=${maxDepth}
                    heading-root-selector=${headingRootSelector}
                    navigation-title=${navigationTitle}
                >
                </vl-side-navigation-next>
                <div class="vl-column vl-column--12">${sampleContent}</div>
            </div>
        `;
    }
);
SideNavigationCompact.storyName = 'vl-side-navigation-next - compact';
SideNavigationCompact.args = {
    compact: true,
    headingRootSelector: '#story-content-container',
};

export const SideNavigationWithCustomToc = story(sideNavigationArgs, ({ closed, compact, maxDepth }) => {
    return html`
        <div class="vl-grid vl-content-block">
            <vl-side-navigation-next
                class="vl-column vl-column--3 vl-column--start-10 vl-column--m-3  vl-column--s-12  vl-side-navigation--order-1"
                ?closed=${closed}
                ?compact=${compact}
                max-depth=${maxDepth}
            >
                <ul>
                    <li>
                        <div class="nav-item-wrapper">
                            <vl-link href="#custom-intro">1. Inleiding</vl-link>
                            <vl-button
                                ghost
                                icon="arrow-right-fat"
                                class="toggle-button"
                                @click=${toggleCustomTocChildren}
                            ></vl-button>
                        </div>
                        <ul>
                            <li>
                                <vl-link href="#custom-vereisten">1.1 Vereisten</vl-link>
                            </li>
                            <li>
                                <vl-link href="#custom-documenten">1.2 Documenten</vl-link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div class="nav-item-wrapper">
                            <vl-link href="#custom-aanvraag">2. Aanvraag indienen</vl-link>
                            <vl-button
                                ghost
                                icon="arrow-right-fat"
                                class="toggle-button"
                                @click=${toggleCustomTocChildren}
                            ></vl-button>
                        </div>
                        <ul>
                            <li>
                                <vl-link href="#custom-online">2.1 Online</vl-link>
                            </li>
                            <li>
                                <vl-link href="#custom-per-post">2.2 Per post</vl-link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div class="nav-item-wrapper">
                            <vl-link href="#custom-termijnen">3. Termijnen</vl-link>
                        </div>
                    </li>
                </ul>
            </vl-side-navigation-next>
            <div class="vl-column vl-column--8 vl-column--m-9 vl-column--s-12 ">
                <div id="custom-toc-content">
                    <section>
                        <vl-title type="h2" id="custom-intro">Over deze pagina</vl-title>
                        <vl-paragraph>
                            Let op: de titels in de side-navigatie links zijn anders dan de koppen in de inhoud
                            hiernaast. Dit is een voorbeeld van een custom inhoudsopgave — je kunt zelf de teksten in de
                            navigatie kiezen. Bekijk de code van dit voorbeeld om te zien hoe je dit kunt doen.
                        </vl-paragraph>
                    </section>
                    <section>
                        <vl-title type="h3" id="custom-vereisten">Wat meebrengen</vl-title>
                        <vl-paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco
                        </vl-paragraph>
                        <vl-paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco
                        </vl-paragraph>
                    </section>
                    <section>
                        <vl-title type="h3" id="custom-documenten">Welke documenten</vl-title>
                        <vl-paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco
                        </vl-paragraph>
                        <vl-paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco
                        </vl-paragraph>
                    </section>
                    <section>
                        <vl-title type="h2" id="custom-aanvraag">Hoe indienen</vl-title>
                        <vl-paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco
                        </vl-paragraph>
                        <vl-title type="h3" id="custom-online">Online indienen</vl-title>
                        <vl-paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco
                        </vl-paragraph>
                        <vl-title type="h3" id="custom-per-post">Per post indienen</vl-title>
                        <vl-paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco
                        </vl-paragraph>
                    </section>
                    <section>
                        <vl-title type="h2" id="custom-termijnen">Verwachtingsdatum</vl-title>
                        <vl-paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco
                        </vl-paragraph>
                        <vl-paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco
                        </vl-paragraph>
                        <vl-paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco
                        </vl-paragraph>
                    </section>
                </div>
            </div>
        </div>
    `;
});
SideNavigationWithCustomToc.storyName = 'vl-side-navigation-next - custom table of contents';
