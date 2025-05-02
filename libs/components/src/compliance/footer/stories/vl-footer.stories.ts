import { story } from '@resources/utils-storybook';
import { registerWebComponents } from '@domg-wc/common';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { VlFooter } from '../vl-footer.component';
import { footerArgs, footerArgTypes } from './vl-footer.stories-arg';
import footerDoc from './vl-footer.stories-doc.mdx';

registerWebComponents([VlFooter]);

export default {
    id: 'components-compliance-footer',
    title: 'Components - Compliance/footer',
    tags: ['autodocs'],
    args: footerArgs,
    argTypes: footerArgTypes,
    parameters: {
        docs: { page: footerDoc, inlineStories: false },
        layout: 'fullscreen',
    },
} as Meta<typeof footerArgs>;

export const FooterDefault = story(
    footerArgs,
    ({ identifier, development, onReady }) => html`
        <body>
            <vl-footer
                ?development=${development}
                identifier=${identifier}
                @ready=${(event: CustomEvent) => onReady(event)}
            ></vl-footer>
        </body>
    `
);
FooterDefault.storyName = 'vl-footer - default';
FooterDefault.args = {
    development: true,
    identifier: '0337f8dc-3266-4e7a-8f4a-95fd65189e5b',
};
