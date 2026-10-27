import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent } from '@domg-wc/components/atom';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlNavLink } from '../vl-nav-link.component';
import { navLinkArgs, navLinkArgTypes } from './vl-nav-link.stories-arg';
import navLinkDoc from './vl-nav-link.stories-doc.mdx';

registerWebComponents([VlNavLink, VlButtonComponent]);

// vl-nav-link is een listitem: in vl-dashboard staat hij altijd in een lijst, in een navigatie zo breed als
// vl-dashboard (uitgeklapt of ingeklapt)
const navigationStyles = html`
    <style>
        .nav-link-story-navigation {
            width: var(--vl-dashboard-navigation-width, 300px);
            background-color: var(--vl-color--background-subtle);
        }

        .nav-link-story-navigation--collapsed {
            width: 4.1rem;
            overflow: hidden;
        }
    </style>
`;

const navigationDecorator = (storyFn: () => unknown) =>
    html`${navigationStyles}
        <div role="list" class="nav-link-story-navigation">${storyFn()}</div>`;

const collapsedNavigationDecorator = (storyFn: () => unknown) =>
    html`${navigationStyles}
        <div role="list" class="nav-link-story-navigation nav-link-story-navigation--collapsed">${storyFn()}</div>`;

export default {
    id: 'structures-dashboard-nav-link',
    title: 'Structures/dashboard/nav-link',
    tags: ['autodocs'],
    args: navLinkArgs,
    argTypes: navLinkArgTypes,
    parameters: {
        docs: {
            page: navLinkDoc,
        },
    },
} as Meta<typeof navLinkArgs>;

const NavLinkTemplate = story(
    navLinkArgs,
    ({
        active,
        collapsed,
        disabled,
        external,
        href,
        icon,
        customCSS,
        defaultSlot,
        linkActionSlot,
        linkBadgeSlot,
    }) => html`
        <vl-nav-link
            ?active=${active}
            ?collapsed=${collapsed}
            ?disabled=${disabled}
            ?external=${external}
            href=${href}
            icon=${icon}
            custom-css=${customCSS}
            >${unsafeHTML(defaultSlot)}${unsafeHTML(linkActionSlot)}${unsafeHTML(linkBadgeSlot)}</vl-nav-link
        >
    `,
);

export const NavLinkDefault = NavLinkTemplate.bind({});
NavLinkDefault.storyName = 'vl-nav-link - default';
NavLinkDefault.args = {
    href: '#overzicht',
    icon: 'places-home',
    defaultSlot: 'Overzicht',
};
NavLinkDefault.decorators = [navigationDecorator];

export const NavLinkActive = NavLinkTemplate.bind({});
NavLinkActive.storyName = 'vl-nav-link - active';
NavLinkActive.args = {
    ...NavLinkDefault.args,
    active: true,
};
NavLinkActive.decorators = [navigationDecorator];

export const NavLinkWithAction = NavLinkTemplate.bind({});
NavLinkWithAction.storyName = 'vl-nav-link - link-action';
NavLinkWithAction.args = {
    href: '#items',
    icon: 'list',
    defaultSlot: 'Beheer items',
    linkActionSlot: '<vl-button slot="link-action" icon="plus-circle-filled" label="Item toevoegen" ghost></vl-button>',
};
NavLinkWithAction.decorators = [navigationDecorator];

export const NavLinkWithBadge = NavLinkTemplate.bind({});
NavLinkWithBadge.storyName = 'vl-nav-link - link-badge';
NavLinkWithBadge.args = {
    href: '#notificaties',
    icon: 'bell',
    defaultSlot: 'Notificaties',
    linkBadgeSlot: '<span slot="link-badge">3</span>',
};
NavLinkWithBadge.decorators = [navigationDecorator];

export const NavLinkCollapsed = NavLinkTemplate.bind({});
NavLinkCollapsed.storyName = 'vl-nav-link - collapsed';
NavLinkCollapsed.args = {
    ...NavLinkWithAction.args,
    collapsed: true,
};
NavLinkCollapsed.decorators = [collapsedNavigationDecorator];

export const NavLinkCollapsedWithBadge = NavLinkTemplate.bind({});
NavLinkCollapsedWithBadge.storyName = 'vl-nav-link - collapsed met link-badge';
NavLinkCollapsedWithBadge.args = {
    ...NavLinkWithBadge.args,
    collapsed: true,
};
NavLinkCollapsedWithBadge.decorators = [collapsedNavigationDecorator];
