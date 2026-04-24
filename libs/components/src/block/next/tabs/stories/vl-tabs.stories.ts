import { registerWebComponents } from '@domg-wc/common';
import { VlTitleComponent } from '@domg-wc/components/atom';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlTabLinkComponent } from '../vl-tab-link.component';
import { VlTabPanelComponent } from '../vl-tab-panel.component';
import { VlTabComponent } from '../vl-tab.component';
import '../vl-tabs.component';
import { VlTabsComponent } from '../vl-tabs.component';
import { tabsArgs, tabsArgTypes } from './vl-tabs.stories-arg';
import tabsDoc from './vl-tabs.stories-doc.mdx';

export default {
    id: 'components-block-next-tabs',
    title: 'Components - Block/next/tabs',
    tags: ['autodocs'],
    args: tabsArgs,
    argTypes: tabsArgTypes,
    parameters: {
        docs: {
            page: tabsDoc,
        },
    },
} as Meta<typeof tabsArgs>;

registerWebComponents([VlTabsComponent, VlTabComponent, VlTabLinkComponent, VlTabPanelComponent, VlTitleComponent]);

export const TabsDefault = story(
    tabsArgs,
    ({ defaultSlot, panelSlot, horizontalNavigation, label, onVlTabClick, onVlTabLinkClick }) => html`
        <vl-tabs-next
            label="${label}"
            ?horizontal-navigation="${horizontalNavigation}"
            @vl-tab-click="${onVlTabClick}"
            @vl-tab-link-click="${onVlTabLinkClick}"
            >${unsafeHTML(defaultSlot)}${unsafeHTML(panelSlot)}</vl-tabs-next
        >
    `,
);
TabsDefault.storyName = 'vl-tabs-next - default';
TabsDefault.args = {
    defaultSlot: `
        <vl-tab-next id="tab1" panel="tabpanel1">Trein</vl-tab-next>
        <vl-tab-next id="tab2" panel="tabpanel2">Metro, tram en bus</vl-tab-next>
        <vl-tab-next id="tab3" panel="tabpanel3">Fiets</vl-tab-next>
    `,
    panelSlot: `
        <vl-tab-panel-next id="tabpanel1" slot="panel" aria-labelledby="tab1heading">
            <vl-title type="h2" id="tab1heading">Trein</vl-title>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </vl-tab-panel-next>
        <vl-tab-panel-next id="tabpanel2" slot="panel" aria-labelledby="tab2heading">
            <vl-title type="h2" id="tab2heading">Metro, tram en bus</vl-title>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </vl-tab-panel-next>
        <vl-tab-panel-next id="tabpanel3" slot="panel" aria-labelledby="tab3heading">
            <vl-title type="h2" id="tab3heading">Fiets</vl-title>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </vl-tab-panel-next>
        `,
    label: 'Mijn tab widget',
};

export const TabsHorizontalNavigation = TabsDefault.bind({});
TabsHorizontalNavigation.storyName = 'vl-tabs-next - horizontal-navigation';
TabsHorizontalNavigation.args = {
    defaultSlot: `
        <vl-tab-link-next href="#tab1">Trein</vl-tab-link-next>
        <vl-tab-link-next href="#tab2">Metro, tram en bus</vl-tab-link-next>
        <vl-tab-link-next href="https://www.vlaanderen.be/intern/werkplek/dienstreizen-en-woon-werkverkeer/vervoersmiddelen/fietsen" external>Fiets</vl-tab-link-next>
    `,
    horizontalNavigation: true,
    label: 'Mijn horizontale navigatie',
};
