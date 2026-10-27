import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlNavLink } from '../vl-nav-link.component';
import { VlNavSub } from '../vl-nav-sub.component';
import { navSubArgs, navSubArgTypes } from './vl-nav-sub.stories-arg';
import navSubDoc from './vl-nav-sub.stories-doc.mdx';

registerWebComponents([VlNavSub, VlNavLink]);

// vl-nav-sub is een listitem: in vl-dashboard staat hij altijd in een lijst, in een navigatie zo breed als
// vl-dashboard (uitgeklapt of ingeklapt)
const navigationStyles = html`
    <style>
        .nav-sub-story-navigation {
            width: var(--vl-dashboard-navigation-width, 300px);
            background-color: var(--vl-color--background-subtle);
        }

        .nav-sub-story-navigation--collapsed {
            width: 4.1rem;
            overflow: hidden;
        }
    </style>
`;

const navigationDecorator = (storyFn: () => unknown) =>
    html`${navigationStyles}
        <div role="list" class="nav-sub-story-navigation">${storyFn()}</div>`;

const collapsedNavigationDecorator = (storyFn: () => unknown) =>
    html`${navigationStyles}
        <div role="list" class="nav-sub-story-navigation nav-sub-story-navigation--collapsed">${storyFn()}</div>`;

export default {
    id: 'structures-dashboard-nav-sub',
    title: 'Structures/dashboard/nav-sub',
    tags: ['autodocs'],
    args: navSubArgs,
    argTypes: navSubArgTypes,
    parameters: {
        docs: {
            page: navSubDoc,
        },
    },
} as Meta<typeof navSubArgs>;

const NavSubTemplate = story(
    navSubArgs,
    ({ active, collapsed, href, icon, label, customCSS, defaultSlot }) => html`
        <vl-nav-sub
            ?active=${active}
            ?collapsed=${collapsed}
            href=${href}
            icon=${icon}
            label=${label}
            custom-css=${customCSS}
            >${unsafeHTML(defaultSlot)}</vl-nav-sub
        >
    `,
);

export const NavSubDefault = NavSubTemplate.bind({});
NavSubDefault.storyName = 'vl-nav-sub - default';
NavSubDefault.args = {
    icon: 'file',
    label: 'Dossier X',
    defaultSlot: `
        <vl-nav-link href="#lopend" icon="hourglass">Lopende taken</vl-nav-link>
        <vl-nav-link href="#afgesloten" icon="file-tasks-check">Afgesloten taken</vl-nav-link>
    `,
};
NavSubDefault.decorators = [navigationDecorator];

export const NavSubWithHref = NavSubTemplate.bind({});
NavSubWithHref.storyName = 'vl-nav-sub - href';
NavSubWithHref.args = {
    ...NavSubDefault.args,
    href: '#dossier-x',
    active: true,
};
NavSubWithHref.decorators = [navigationDecorator];

export const NavSubCollapsed = NavSubTemplate.bind({});
NavSubCollapsed.storyName = 'vl-nav-sub - collapsed';
NavSubCollapsed.args = {
    ...NavSubDefault.args,
    collapsed: true,
};
NavSubCollapsed.decorators = [collapsedNavigationDecorator];
