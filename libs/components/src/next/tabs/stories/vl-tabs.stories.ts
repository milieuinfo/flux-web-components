import { story } from '@domg-wc/common-storybook';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../vl-tabs.component';
import { VlButtonComponent } from '../../button';
import { VlTabsComponent } from '../vl-tabs.component';
import { tabsNextArgs, tabsNextArgTypes } from './vl-tabs.stories-arg';
import tabsDoc from './vl-tabs.stories-doc.mdx';
import { addPane } from './vl-tabs.stories-util';

export default {
    id: 'components-next-tabs-tabs',
    title: 'Components-next/tabs/tabs',
    tags: ['autodocs'],
    args: tabsNextArgs,
    argTypes: tabsNextArgTypes,
    parameters: {
        docs: {
            page: tabsDoc,
        },
    },
} as Meta<typeof tabsNextArgs>;

registerWebComponents([VlTabsComponent, VlButtonComponent]);

export const TabsDefault = story(
    tabsNextArgs,
    ({ activeTab, alt, disableLinks, responsiveLabel, onChangeActiveTab, onClickActiveTab, displayStyle }) => html`
        <vl-tabs-next
            active-tab=${activeTab}
            display-style=${displayStyle}
            ?alt=${alt}
            responsive-label=${responsiveLabel}
            ?disable-links=${disableLinks}
            @change=${(event: CustomEvent) => onChangeActiveTab(event.detail)}
            @vl-click=${(event: CustomEvent) => onClickActiveTab(event.detail)}
        >
            <vl-tabs-pane-next id="trein" title="Trein">
                Nullam quis risus eget urna mollis ornare vel eu leo. Duis mollis, est non commodo luctus, nisi erat
                porttitor ligula, eget lacinia odio sem nec elit. Donec sed odio dui. Integer posuere erat a ante
                venenatis dapibus posuere velit aliquet.
            </vl-tabs-pane-next>
            <vl-tabs-pane-next id="metro" title="Metro, tram en bus">
                Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem
                malesuada magna mollis euismod. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit.
            </vl-tabs-pane-next>
            <vl-tabs-pane-next id="fiets" title="Fiets">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Aenean
                eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras justo odio, dapibus ac
                facilisis in, egestas eget quam. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            </vl-tabs-pane-next>
        </vl-tabs-next>
    `
);
TabsDefault.storyName = 'vl-tabs-next - default';
TabsDefault.args = {
    activeTab: 'trein',
    disableLinks: true,
};

export const TabsWithoutActiveTab = story(
    tabsNextArgs,
    ({ alt, disableLinks, responsiveLabel, onChangeActiveTab, displayStyle }) => html`
        <vl-tabs-next
            ?alt=${alt}
            display-style=${displayStyle}
            responsive-label=${responsiveLabel}
            ?disable-links=${disableLinks}
            @change=${(event: CustomEvent) => onChangeActiveTab(event.detail)}
        >
            <vl-tabs-pane-next id="trein" title="Trein">
                Nullam quis risus eget urna mollis ornare vel eu leo. Duis mollis, est non commodo luctus, nisi erat
                porttitor ligula, eget lacinia odio sem nec elit. Donec sed odio dui. Integer posuere erat a ante
                venenatis dapibus posuere velit aliquet.
            </vl-tabs-pane-next>
            <vl-tabs-pane-next id="metro" title="Metro, tram en bus">
                Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem
                malesuada magna mollis euismod. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit.
            </vl-tabs-pane-next>
            <vl-tabs-pane-next id="fiets" title="Fiets">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Aenean
                eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras justo odio, dapibus ac
                facilisis in, egestas eget quam. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            </vl-tabs-pane-next>
        </vl-tabs-next>
    `
);
TabsWithoutActiveTab.storyName = 'vl-tabs-next - without active tab';
TabsWithoutActiveTab.args = {
    responsiveLabel: 'Navigatie/menu',
};

export const TabsDynamic = story(
    tabsNextArgs,
    ({ activeTab, alt, disableLinks, responsiveLabel, onChangeActiveTab, displayStyle }) => html`
        <div>
            <vl-button-next id="add-pane-button" @click=${addPane}>Pane toevoegen</vl-button-next>
            <vl-tabs-next
                id="tabs"
                active-tab=${activeTab}
                display-style=${displayStyle}
                ?alt=${alt}
                responsive-label=${responsiveLabel}
                ?disable-links=${disableLinks}
                @change=${(event: CustomEvent) => onChangeActiveTab(event.detail)}
            >
                <vl-tabs-pane-next id="trein" title="Trein">
                    Nullam quis risus eget urna mollis ornare vel eu leo. Duis mollis, est non commodo luctus, nisi erat
                    porttitor ligula, eget lacinia odio sem nec elit. Donec sed odio dui. Integer posuere erat a ante
                    venenatis dapibus posuere velit aliquet.
                </vl-tabs-pane-next>
                <vl-tabs-pane-next id="metro" title="Metro, tram en bus">
                    Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta
                    sem malesuada magna mollis euismod. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </vl-tabs-pane-next>
            </vl-tabs-next>
        </div>
    `
);
TabsDynamic.storyName = 'vl-tabs-next - dynamic';
TabsDynamic.args = {
    activeTab: 'trein',
    disableLinks: true,
};
