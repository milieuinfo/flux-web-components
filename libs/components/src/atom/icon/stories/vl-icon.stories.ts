import { story } from '@resources/utils-storybook';
import { registerWebComponents } from '@domg-wc/common';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { VlAllIconsComponent } from '../vl-all-icons.component';
import { VlIconComponent } from '../vl-icon.component';
import { iconArgs, iconArgTypes } from './vl-icon.stories-arg';
import iconDoc from './vl-icon.stories-doc.mdx';

registerWebComponents([VlIconComponent, VlAllIconsComponent]);

export default {
    id: 'components-atom-icon',
    title: 'Components - Atom/icon',
    tags: ['autodocs'],
    args: iconArgs,
    argTypes: iconArgTypes,
    parameters: {
        docs: {
            page: iconDoc,
        },
    },
} as Meta<typeof iconArgs>;

const IconTemplate = story(
    iconArgs,
    ({ icon, small, large, light, rightMargin, leftMargin, clickable }) => html`
        <vl-icon
            icon=${icon}
            ?small=${small}
            ?large=${large}
            ?light=${light}
            ?right-margin=${rightMargin}
            ?left-margin=${leftMargin}
            ?clickable=${clickable}
        >
        </vl-icon>
    `
);

export const IconDefault = IconTemplate.bind({});
IconDefault.storyName = 'vl-icon - default';
IconDefault.args = {
    icon: 'calendar',
};

export const IconSmall = IconTemplate.bind({});
IconSmall.storyName = 'vl-icon - small';
IconSmall.args = {
    icon: 'calendar',
    small: true,
};

export const IconLarge = IconTemplate.bind({});
IconLarge.storyName = 'vl-icon - large';
IconLarge.args = {
    icon: 'calendar',
    large: true,
};

export const IconLight = IconTemplate.bind({});
IconLight.storyName = 'vl-icon - light';
IconLight.args = {
    icon: 'calendar',
    light: true,
};

export const IconClickable = IconTemplate.bind({});
IconClickable.storyName = 'vl-icon - clickable';
IconClickable.args = {
    icon: 'calendar',
    clickable: true,
};

export const IconBeforeText = story(
    iconArgs,
    ({ icon, small, large, light, rightMargin, leftMargin, clickable }) => html`
        <div class="flex-center">
            <vl-icon
                icon=${icon}
                ?small=${small}
                ?large=${large}
                ?light=${light}
                ?right-margin=${rightMargin}
                ?left-margin=${leftMargin}
                ?clickable=${clickable}
            >
            </vl-icon>
            <span>Dit is een tekst</span>
        </div>
    `
);
IconBeforeText.storyName = 'vl-icon - before text';
IconBeforeText.args = {
    icon: 'calendar',
    rightMargin: true,
};

export const IconAfterText = story(
    iconArgs,
    ({ icon, small, large, light, rightMargin, leftMargin, clickable }) => html`
        <div class="flex-center">
            <span>Dit is een tekst</span>
            <vl-icon
                icon=${icon}
                ?small=${small}
                ?large=${large}
                ?light=${light}
                ?right-margin=${rightMargin}
                ?left-margin=${leftMargin}
                ?clickable=${clickable}
            >
            </vl-icon>
        </div>
    `
);
IconAfterText.storyName = 'vl-icon - after text';
IconAfterText.args = {
    icon: 'calendar',
    leftMargin: true,
};

export const AllIcons = () => html` <vl-all-icons></vl-all-icons>`;
AllIcons.storyName = 'vl-icon - alle iconen';
