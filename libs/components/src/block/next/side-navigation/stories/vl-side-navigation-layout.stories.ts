import { story } from '@resources/utils-storybook';
import { registerWebComponents } from '@domg-wc/common';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../vl-side-navigation-layout.component';
import '../vl-side-navigation.component';
import { toggleCustomTocChildren } from '../vl-side-navigation-custom-toc.utils';
import { VlButtonComponent } from '../../../../atom/button';
import { VlIconComponent } from '../../../../atom/icon';
import { VlLinkComponent } from '../../../../atom/link';
import { VlTitleComponent } from '../../../../atom/title';
import {
    SideNavigationLayoutArgs,
    sideNavigationLayoutArgs,
    sideNavigationLayoutArgTypes,
} from './vl-side-navigation-layout.stories-arg';
import sideNavigationLayoutDoc from './vl-side-navigation-layout.stories-doc.mdx';

export default {
    id: 'components-block-next-side-navigation-layout',
    title: 'Components - Block/next/side-navigation-layout',
    tags: ['autodocs'],
    args: sideNavigationLayoutArgs,
    argTypes: sideNavigationLayoutArgTypes,
    parameters: {
        docs: {
            page: sideNavigationLayoutDoc,
            story: {
                inline: false,
                iframeHeight: 500,
            },
        },
    },
} as Meta<SideNavigationLayoutArgs>;

registerWebComponents([VlTitleComponent, VlIconComponent, VlLinkComponent, VlButtonComponent]);

const loremIpsumParagraph = html`
    <vl-paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    </vl-paragraph>
`;

export const SideNavigationLayoutDefault = story(
    sideNavigationLayoutArgs,
    ({ compact, contentBlock, navigationTitle, excludeSelectors }) => {
        return html`
            <vl-side-navigation-layout-next
                ?compact=${compact}
                ?content-block=${contentBlock}
                heading-root-selector="#story-default-content"
                navigation-title=${navigationTitle}
                exclude-selectors=${excludeSelectors}
            >
                <div slot="content">
                    <div id="story-default-content">
                        <section>
                            <vl-title type="h2" id="default-content-1">Content 1</vl-title>
                            <vl-paragraph>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </vl-paragraph>
                        </section>
                        <section>
                            <vl-title type="h3" id="default-content-1-1">Content 1 - 1</vl-title>
                            ${loremIpsumParagraph} ${loremIpsumParagraph}
                        </section>
                        <section>
                            <vl-title type="h3" id="default-content-1-2">Content 1 - 2</vl-title>
                            ${loremIpsumParagraph} ${loremIpsumParagraph}
                        </section>
                        <section>
                            <vl-title type="h2" id="default-content-2">Content 2</vl-title>
                            ${loremIpsumParagraph} ${loremIpsumParagraph}
                            <vl-title type="h3" id="content-2-1-heading">Content 2 - 1</vl-title>
                            ${loremIpsumParagraph}
                            <vl-title type="h3" id="content-2-2-heading">Content 2 - 2</vl-title>
                            ${loremIpsumParagraph} ${loremIpsumParagraph}
                        </section>
                        <section>
                            <vl-title type="h2" id="default-content-3">Content 3</vl-title>
                            <vl-paragraph>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </vl-paragraph>
                            ${loremIpsumParagraph} ${loremIpsumParagraph}
                        </section>
                    </div>
                </div>
            </vl-side-navigation-layout-next>
        `;
    }
);
SideNavigationLayoutDefault.storyName = 'vl-side-navigation-layout-next - default';

export const SideNavigationLayoutWithSteps = story(
    sideNavigationLayoutArgs,
    ({ compact, contentBlock, maxDepth, excludeSelectors }) => {
        return html`
            <vl-side-navigation-layout-next
                ?compact=${compact}
                ?content-block=${contentBlock}
                max-depth=${maxDepth}
                heading-root-selector="#steps-content-container"
                max-depth="0"
                exclude-selectors=${excludeSelectors}
            >
                <div slot="content" id="steps-content-container">
                    <vl-steps>
                        <vl-step>
                            <span slot="icon">1</span>
                            <span slot="title">
                                <vl-title type="h2" id="vl-steps-vl-step-1">Stap 1: eerste actie</vl-title>
                            </span>
                            <span slot="content">
                                <div>
                                    <vl-paragraph>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus
                                        quam id. Penatibus et magnis dis parturient montes nascetur ridiculus.
                                    </vl-paragraph>
                                    ${loremIpsumParagraph}
                                </div>
                            </span>
                        </vl-step>
                        <vl-step>
                            <span slot="icon">2</span>
                            <span slot="title">
                                <vl-title type="h2" id="vl-steps-vl-step-2">Stap 2: tweede actie</vl-title>
                            </span>
                            <span slot="content">
                                <div>
                                    <vl-title type="h3" underline id="vl-steps-vl-step-2-abstract">Abstract</vl-title>
                                    ${loremIpsumParagraph}
                                    <vl-paragraph>
                                        Penatibus et magnis dis parturient montes nascetur ridiculus. Malesuada nunc vel
                                        risus commodo viverra maecenas accumsan lacus.
                                    </vl-paragraph>
                                    <vl-title type="h3" id="vl-steps-vl-step-2-volledig" underline>Volledig</vl-title>
                                    ${loremIpsumParagraph} ${loremIpsumParagraph}
                                </div>
                            </span>
                        </vl-step>
                        <vl-step>
                            <span slot="icon">3</span>
                            <span slot="title">
                                <vl-title type="h2" id="vl-steps-vl-step-3">Stap 3: derde actie</vl-title>
                            </span>
                            <span slot="content">
                                <div>
                                    <vl-paragraph>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua.
                                    </vl-paragraph>
                                    ${loremIpsumParagraph} ${loremIpsumParagraph} ${loremIpsumParagraph}
                                    ${loremIpsumParagraph} ${loremIpsumParagraph}
                                </div>
                            </span>
                        </vl-step>
                    </vl-steps>
                </div>
            </vl-side-navigation-layout-next>
        `;
    }
);
SideNavigationLayoutWithSteps.storyName = 'vl-side-navigation-layout-next - met steps';
SideNavigationLayoutWithSteps.parameters = {
    docs: {
        story: {
            inline: false,
            iframeHeight: 800,
        },
    },
};

export const SideNavigationLayoutTwoLayouts = story(
    sideNavigationLayoutArgs,
    ({ compact, contentBlock, excludeSelectors }) => {
        return html`
            <vl-side-navigation-layout-next
                ?compact=${compact}
                ?content-block=${contentBlock}
                heading-root-selector="#content-subsidies"
                exclude-selectors=${excludeSelectors}
            >
                <div slot="content">
                    <div id="content-subsidies">
                        <section>
                            <vl-title type="h2" id="subsidies-inleiding">Subsidies - Inleiding</vl-title>
                            <vl-paragraph>
                                Op deze pagina vind je informatie over subsidies. Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                            </vl-paragraph>
                            ${loremIpsumParagraph}
                        </section>
                        <section>
                            <vl-title type="h3" id="subsidies-voorwaarden">Voorwaarden</vl-title>
                            <vl-paragraph>
                                Om in aanmerking te komen moet je voldoen aan een aantal voorwaarden. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                                eu fugiat nulla pariatur.
                            </vl-paragraph>
                            ${loremIpsumParagraph}
                        </section>
                        <section>
                            <vl-title type="h3" id="subsidies-bedrag">Bedrag en duur</vl-title>
                            <vl-paragraph>
                                Het subsidiebedrag en de looptijd hangen af van je situatie. Excepteur sint occaecat
                                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </vl-paragraph>
                            ${loremIpsumParagraph}
                        </section>
                        <section>
                            <vl-title type="h2" id="subsidies-aanvraag">Aanvraag indienen</vl-title>
                            <vl-paragraph>
                                Je kunt je aanvraag online of per post indienen. Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </vl-paragraph>
                            ${loremIpsumParagraph}

                            <vl-title type="h3" id="subsidies-online">Online aanvragen</vl-title>
                            <vl-paragraph>
                                Via het e-loket kun je digitaal je aanvraag doen. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </vl-paragraph>
                            ${loremIpsumParagraph}

                            <vl-title type="h3" id="subsidies-post">Per post</vl-title>
                            <vl-paragraph>
                                Stuur het ingevulde formulier naar het vermelde adres. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </vl-paragraph>
                            ${loremIpsumParagraph} ${loremIpsumParagraph}
                        </section>
                        <section>
                            <vl-title type="h2" id="subsidies-afhandeling">Afhandeling en termijnen</vl-title>
                            <vl-paragraph>
                                Binnen welke termijn je een antwoord krijgt en hoe de betaling verloopt. Excepteur sint
                                occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                                laborum.
                            </vl-paragraph>
                            ${loremIpsumParagraph}
                        </section>
                    </div>
                </div>
            </vl-side-navigation-layout-next>
            <hr class="vl-separator-slash vl-padding--medium vl-margin--medium" />
            <vl-side-navigation-layout-next
                ?compact=${compact}
                ?content-block=${contentBlock}
                heading-root-selector="#content-diensten"
                exclude-selectors=${excludeSelectors}
            >
                <div slot="content">
                    <div id="content-diensten">
                        <section>
                            <vl-title type="h2" id="diensten-overzicht">Diensten - Overzicht</vl-title>
                            <vl-paragraph>
                                Hier vind je een overzicht van de diensten die wij aanbieden. Lorem ipsum dolor sit
                                amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                            </vl-paragraph>
                        </section>
                        <section>
                            <vl-title type="h3" id="diensten-online">Online diensten</vl-title>
                            <vl-paragraph>
                                Veel zaken kun je via de website afhandelen. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </vl-paragraph>
                            ${loremIpsumParagraph}
                        </section>
                        <section>
                            <vl-title type="h3" id="diensten-loket">Aan het loket</vl-title>
                            <vl-paragraph>
                                Voor bepaalde aanvragen moet je naar het loket komen. Excepteur sint occaecat cupidatat
                                non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </vl-paragraph>
                            ${loremIpsumParagraph}
                        </section>
                        <section>
                            <vl-title type="h2" id="diensten-afspraak">Afspraak maken</vl-title>
                            <vl-paragraph>
                                Maak een afspraak om wachttijden te vermijden. Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </vl-paragraph>
                            ${loremIpsumParagraph}

                            <vl-title type="h3" id="diensten-telefoon">Telefonisch</vl-title>
                            <vl-paragraph>
                                Bel ons om een afspraak in te plannen. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </vl-paragraph>
                            ${loremIpsumParagraph}

                            <vl-title type="h3" id="diensten-online-afspraak">Online reserveren</vl-title>
                            <vl-paragraph>
                                Kies een beschikbaar tijdstip in de online agenda. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </vl-paragraph>
                            ${loremIpsumParagraph}
                        </section>
                        <section>
                            <vl-title type="h2" id="diensten-contact">Contact en openingstijden</vl-title>
                            <vl-paragraph>
                                Waar je ons kunt bereiken en wanneer we open zijn. Excepteur sint occaecat cupidatat non
                                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </vl-paragraph>
                            ${loremIpsumParagraph}
                        </section>
                    </div>
                </div>
            </vl-side-navigation-layout-next>
        `;
    }
);
SideNavigationLayoutTwoLayouts.storyName = 'vl-side-navigation-layout-next - twee layouts met eigen content';
SideNavigationLayoutTwoLayouts.parameters = {
    docs: {
        story: {
            inline: false,
            iframeHeight: 900,
        },
    },
};

export const SideNavigationLayoutWithCustomToc = story(
    sideNavigationLayoutArgs,
    ({ compact, contentBlock, excludeSelectors }) => {
        return html`
            <vl-side-navigation-layout-next
                ?compact=${compact}
                ?content-block=${contentBlock}
                heading-root-selector="#story-custom-toc-content"
                exclude-selectors=${excludeSelectors}
            >
                <vl-side-navigation-next slot="navigation">
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
                <div slot="content">
                    <div id="story-custom-toc-content">
                        <section>
                            <vl-title type="h2" id="custom-intro">Over deze pagina</vl-title>
                            <vl-paragraph>
                                Let op: de titels in de side-navigatie links zijn anders dan de koppen in de inhoud
                                hiernaast. Dit is een voorbeeld van een custom inhoudsopgave — je kunt zelf de teksten
                                in de navigatie kiezen. Bekijk de code van dit voorbeeld om te zien hoe je dit kunt
                                doen.
                            </vl-paragraph>
                        </section>
                        <section>
                            <vl-title type="h3" id="custom-vereisten">Wat meebrengen</vl-title>
                            ${loremIpsumParagraph} ${loremIpsumParagraph}
                        </section>
                        <section>
                            <vl-title type="h3" id="custom-documenten">Welke documenten</vl-title>
                            ${loremIpsumParagraph} ${loremIpsumParagraph}
                        </section>
                        <section>
                            <vl-title type="h2" id="custom-aanvraag">Hoe indienen</vl-title>
                            ${loremIpsumParagraph}
                            <vl-title type="h3" id="custom-online">Online indienen</vl-title>
                            ${loremIpsumParagraph}
                            <vl-title type="h3" id="custom-per-post">Per post indienen</vl-title>
                            ${loremIpsumParagraph}
                        </section>
                        <section>
                            <vl-title type="h2" id="custom-termijnen">Verwachtingsdatum</vl-title>
                            ${loremIpsumParagraph} ${loremIpsumParagraph}
                        </section>
                    </div>
                </div>
            </vl-side-navigation-layout-next>
        `;
    }
);
SideNavigationLayoutWithCustomToc.storyName = 'vl-side-navigation-layout-next - custom table of contents';
