import { html } from 'lit-html';
import '../vl-header.section';
import { headerArgs, headerArgTypes } from './vl-header.stories-arg';
import { Meta } from '@storybook/web-components';
import headerDoc from './vl-header.stories-doc.mdx';
import { story } from '@resources/utils-storybook';

export default {
    id: 'sections-header',
    title: 'sections/header',
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
        loginRedirectUrl,
        loginUrl,
        logoutUrl,
        skeleton,
        simple,
        switchCapacityUrl,
        rejectLogout,
        logoutCallback,
        applicationLinks,
        onReady,
    }) => html`
        <body>
            <vl-header
                data-vl-authenticated-user-url=${authenticatedUserUrl}
                ?data-vl-development=${development}
                data-vl-identifier=${identifier}
                data-vl-login-redirect-url=${loginRedirectUrl}
                data-vl-login-url=${loginUrl}
                data-vl-logout-url=${logoutUrl}
                ?data-vl-simple=${simple}
                ?data-vl-skeleton=${skeleton}
                data-vl-switch-capacity-url=${switchCapacityUrl}
                ?data-vl-reject-logout=${rejectLogout}
                .logoutCallback=${logoutCallback}
                .applicationLinks=${applicationLinks}
                @ready=${onReady}
            ></vl-header>
        </body>
    `
);

HeaderDefault.storyName = 'vl-header - default';
HeaderDefault.args = {
    development: true,
    identifier: '59188ff6-662b-45b9-b23a-964ad48c2bfb',
    simple: true,
};
