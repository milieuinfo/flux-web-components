import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import '../vl-header.component';
import { headerArgs, headerArgTypes } from './vl-header.stories-arg';
import headerDoc from './vl-header.stories-doc.mdx';

export default {
    id: 'components-compliance-next-header',
    title: 'Components - Compliance/next/header',
    tags: ['autodocs'],
    args: headerArgs,
    argTypes: headerArgTypes,
    parameters: {
        docs: {
            page: headerDoc,
            inlineStories: false,
        },
        layout: 'fullscreen',
    },
} as Meta<typeof headerArgs>;

export const HeaderDefault = story(
    headerArgs,
    ({
        authenticatedUserUrl,
        development,
        identifier,
        loginUrl,
        logoutUrl,
        skeleton,
        simple,
        switchCapacityUrl,
        applicationLinks,
        onReady,
    }) => html`
        <body>
            <vl-header-next
                authenticated-user-url=${authenticatedUserUrl}
                ?development=${development}
                identifier=${identifier}
                login-url=${loginUrl}
                logout-url=${logoutUrl}
                ?simple=${simple}
                ?skeleton=${skeleton}
                switch-capacity-url=${switchCapacityUrl}
                .applicationLinks=${applicationLinks}
                @ready=${onReady}
            ></vl-header-next>
        </body>
    `
);

HeaderDefault.storyName = 'vl-header-next - default';
HeaderDefault.args = {
    development: true,
    identifier: '59188ff6-662b-45b9-b23a-964ad48c2bfb',
    simple: true,
};

export const HeaderWithApplicationLinks = HeaderDefault.bind({});
HeaderWithApplicationLinks.storyName = 'vl-header-next - application links';
HeaderWithApplicationLinks.args = {
    development: true,
    identifier: '59188ff6-662b-45b9-b23a-964ad48c2bfb',
    simple: true,
    applicationLinks: [
        {
            label: 'Link 1',
            href: 'https://example.com/link1',
        },
        {
            label: 'Link 2',
            href: 'https://example.com/link2',
        },
    ],
};
