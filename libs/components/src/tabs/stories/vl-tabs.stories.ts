import { story } from '@resources/utils-storybook';
import { registerWebComponents } from '@domg-wc/common';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../vl-tabs.component';
import { VlButtonComponent } from '../../button';
import { VlTabsComponent } from '../vl-tabs.component';
import { tabsArgs, tabsArgTypes } from './vl-tabs.stories-arg';
import tabsDoc from './vl-tabs.stories-doc.mdx';
import { addPane } from './vl-tabs.stories-util';

export default {
    id: 'components-tabs-tabs',
    title: 'Components/tabs/tabs',
    tags: ['autodocs'],
    args: tabsArgs,
    argTypes: tabsArgTypes,
    parameters: {
        docs: {
            page: tabsDoc,
        },
    },
} as Meta<typeof tabsArgs>;

registerWebComponents([VlTabsComponent, VlButtonComponent]);

export const TabsDefault = story(
    tabsArgs,
    ({ activeTab, alt, disableLinks, responsiveLabel, onChangeActiveTab, onClickActiveTab, displayStyle }) => html`
        <vl-tabs
            active-tab=${activeTab}
            display-style=${displayStyle}
            ?alt=${alt}
            responsive-label=${responsiveLabel}
            ?disable-links=${disableLinks}
            @change=${(event: CustomEvent) => onChangeActiveTab(event.detail)}
            @vl-click=${(event: CustomEvent) => onClickActiveTab(event.detail)}
        >
            <vl-tabs-pane id="trein" title="Trein">
                Nullam quis risus eget urna mollis ornare vel eu leo. Duis mollis, est non commodo luctus, nisi erat
                porttitor ligula, eget lacinia odio sem nec elit. Donec sed odio dui. Integer posuere erat a ante
                venenatis dapibus posuere velit aliquet.
            </vl-tabs-pane>
            <vl-tabs-pane id="metro" title="Metro, tram en bus">
                Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem
                malesuada magna mollis euismod. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit.
            </vl-tabs-pane>
            <vl-tabs-pane id="fiets" title="Fiets">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Aenean
                eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras justo odio, dapibus ac
                facilisis in, egestas eget quam. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            </vl-tabs-pane>
        </vl-tabs>
    `
);
TabsDefault.storyName = 'vl-tabs - default';
TabsDefault.args = {
    activeTab: 'trein',
    disableLinks: true,
};

export const TabsWithoutActiveTab = story(
    tabsArgs,
    ({ alt, disableLinks, responsiveLabel, onChangeActiveTab, displayStyle }) => html`
        <vl-tabs
            ?alt=${alt}
            display-style=${displayStyle}
            responsive-label=${responsiveLabel}
            ?disable-links=${disableLinks}
            @change=${(event: CustomEvent) => onChangeActiveTab(event.detail)}
        >
            <vl-tabs-pane id="trein" title="Trein">
                Nullam quis risus eget urna mollis ornare vel eu leo. Duis mollis, est non commodo luctus, nisi erat
                porttitor ligula, eget lacinia odio sem nec elit. Donec sed odio dui. Integer posuere erat a ante
                venenatis dapibus posuere velit aliquet.
            </vl-tabs-pane>
            <vl-tabs-pane id="metro" title="Metro, tram en bus">
                Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem
                malesuada magna mollis euismod. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit.
            </vl-tabs-pane>
            <vl-tabs-pane id="fiets" title="Fiets">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Aenean
                eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras justo odio, dapibus ac
                facilisis in, egestas eget quam. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            </vl-tabs-pane>
        </vl-tabs>
    `
);
TabsWithoutActiveTab.storyName = 'vl-tabs - without active tab';
TabsWithoutActiveTab.args = {
    responsiveLabel: 'Navigatie/menu',
};

export const TabsDynamic = story(
    tabsArgs,
    ({ activeTab, alt, disableLinks, responsiveLabel, onChangeActiveTab, displayStyle }) => html`
        <div>
            <vl-button id="add-pane-button" @click=${addPane}>Pane toevoegen</vl-button>
            <vl-tabs
                id="tabs"
                active-tab=${activeTab}
                display-style=${displayStyle}
                ?alt=${alt}
                responsive-label=${responsiveLabel}
                ?disable-links=${disableLinks}
                @change=${(event: CustomEvent) => onChangeActiveTab(event.detail)}
            >
                <vl-tabs-pane id="trein" title="Trein">
                    Nullam quis risus eget urna mollis ornare vel eu leo. Duis mollis, est non commodo luctus, nisi erat
                    porttitor ligula, eget lacinia odio sem nec elit. Donec sed odio dui. Integer posuere erat a ante
                    venenatis dapibus posuere velit aliquet.
                </vl-tabs-pane>
                <vl-tabs-pane id="metro" title="Metro, tram en bus">
                    Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta
                    sem malesuada magna mollis euismod. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </vl-tabs-pane>
            </vl-tabs>
        </div>
    `
);
TabsDynamic.storyName = 'vl-tabs - dynamic';
TabsDynamic.args = {
    activeTab: 'trein',
    disableLinks: true,
};
