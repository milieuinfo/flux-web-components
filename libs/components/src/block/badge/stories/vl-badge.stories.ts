import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { VlBadgeComponent } from '../vl-badge.component';
import { badgeArgs, badgeArgTypes } from './vl-badge.stories-arg';
import badgeDoc from './vl-badge.stories-doc.mdx';

registerWebComponents([VlBadgeComponent]);

export default {
    id: 'components-block-badge',
    title: 'Components - Block/badge',
    tags: ['autodocs'],
    args: badgeArgs,
    argTypes: badgeArgTypes,
    parameters: {
        docs: {
            page: badgeDoc,
        },
    },
} as Meta<typeof badgeArgs>;

const BadgeTemplate = story(
    badgeArgs,
    ({ alt, background, icon, img, customCSS }) => html`
        <vl-badge alt=${alt} background=${background} icon=${icon} img=${img} custom-css=${customCSS}></vl-badge>
    `,
);

export const BadgeDefault = BadgeTemplate.bind({});
BadgeDefault.storyName = 'vl-badge - default';
BadgeDefault.args = {
    icon: 'file-tasks-check',
};

export const BadgePrimary = BadgeTemplate.bind({});
BadgePrimary.storyName = 'vl-badge - primary';
BadgePrimary.args = {
    icon: 'file-tasks-check',
    background: 'primary',
};

export const BadgeAction = BadgeTemplate.bind({});
BadgeAction.storyName = 'vl-badge - action';
BadgeAction.args = {
    icon: 'file-tasks-check',
    background: 'action',
};

export const BadgeImage = BadgeTemplate.bind({});
BadgeImage.storyName = 'vl-badge - img';
BadgeImage.args = {
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    alt: 'Logo van het bedrijf',
};
