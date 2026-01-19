import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import { VlFooterNext } from '../vl-footer.component';
import { footerArgs, footerArgTypes } from './vl-footer.stories-arg';
import footerDoc from './vl-footer.stories-doc.mdx';

registerWebComponents([VlFooterNext]);

export default {
    id: 'components-compliance-next-footer',
    title: 'Components - Compliance/next/footer',
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
            <vl-footer-next
                ?development=${development}
                identifier=${identifier}
                @ready=${(event: CustomEvent) => onReady(event)}
            ></vl-footer-next>
        </body>
    `
);
FooterDefault.storyName = 'vl-footer-next - default';
FooterDefault.args = {
    development: true,
    identifier: '0337f8dc-3266-4e7a-8f4a-95fd65189e5b',
};
