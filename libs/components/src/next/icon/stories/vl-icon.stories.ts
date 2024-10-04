import { story } from '@domg-wc/common-storybook';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { VlAllIconsComponent } from '../vl-all-icons.component';
import { VlIconComponent } from '../vl-icon.component';
import { iconArgs, iconArgTypes } from './vl-icon.stories-arg';
import iconDoc from './vl-icon.stories-doc.mdx';

registerWebComponents([VlIconComponent, VlAllIconsComponent]);

export default {
    id: 'components-next-icon',
    title: 'Components-next/icon',
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
        <vl-icon-next
            icon=${icon}
            ?small=${small}
            ?large=${large}
            ?light=${light}
            ?right-margin=${rightMargin}
            ?left-margin=${leftMargin}
            ?clickable=${clickable}
        >
        </vl-icon-next>
    `
);

export const IconDefault = IconTemplate.bind({});
IconDefault.storyName = 'vl-icon-next - default';
IconDefault.args = {
    icon: 'calendar',
};

export const IconSmall = IconTemplate.bind({});
IconSmall.storyName = 'vl-icon-next - small';
IconSmall.args = {
    icon: 'calendar',
    small: true,
};

export const IconLarge = IconTemplate.bind({});
IconLarge.storyName = 'vl-icon-next - large';
IconLarge.args = {
    icon: 'calendar',
    large: true,
};

export const IconLight = IconTemplate.bind({});
IconLight.storyName = 'vl-icon-next - light';
IconLight.args = {
    icon: 'calendar',
    light: true,
};

export const IconClickable = IconTemplate.bind({});
IconClickable.storyName = 'vl-icon-next - clickable';
IconClickable.args = {
    icon: 'calendar',
    clickable: true,
};

export const IconBeforeText = story(
    iconArgs,
    ({ icon, small, large, light, rightMargin, leftMargin, clickable }) => html`
        <div class="flex-center">
            <vl-icon-next
                icon=${icon}
                ?small=${small}
                ?large=${large}
                ?light=${light}
                ?right-margin=${rightMargin}
                ?left-margin=${leftMargin}
                ?clickable=${clickable}
            >
            </vl-icon-next>
            <span>Dit is een tekst</span>
        </div>
    `
);
IconBeforeText.storyName = 'vl-icon-next - before text';
IconBeforeText.args = {
    icon: 'calendar',
    rightMargin: true,
};

export const IconAfterText = story(
    iconArgs,
    ({ icon, small, large, light, rightMargin, leftMargin, clickable }) => html`
        <div class="flex-center">
            <span>Dit is een tekst</span>
            <vl-icon-next
                icon=${icon}
                ?small=${small}
                ?large=${large}
                ?light=${light}
                ?right-margin=${rightMargin}
                ?left-margin=${leftMargin}
                ?clickable=${clickable}
            >
            </vl-icon-next>
        </div>
    `
);
IconAfterText.storyName = 'vl-icon-next - after text';
IconAfterText.args = {
    icon: 'calendar',
    leftMargin: true,
};

export const AllIcons = () => html` <vl-all-icons></vl-all-icons>`;
AllIcons.storyName = 'vl-icon-next - alle iconen';
