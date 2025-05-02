import { html } from 'lit-html';
import '../vl-header.component';
import { headerArgs, headerArgTypes } from './vl-header.stories-arg';
import { Meta } from '@storybook/web-components';
import headerDoc from './vl-header.stories-doc.mdx';
import { story } from '@resources/utils-storybook';

export default {
    id: 'components-compliance-header',
    title: 'Components - Compliance/header',
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
                authenticated-user-url=${authenticatedUserUrl}
                ?development=${development}
                identifier=${identifier}
                login-redirect-url=${loginRedirectUrl}
                login-url=${loginUrl}
                logout-url=${logoutUrl}
                ?simple=${simple}
                ?skeleton=${skeleton}
                switch-capacity-url=${switchCapacityUrl}
                ?reject-logout=${rejectLogout}
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
