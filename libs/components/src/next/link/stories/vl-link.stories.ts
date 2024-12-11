import { story } from '@domg-wc/common-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { VlLinkComponent } from '../vl-link.component';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { linkArgTypes, linkArgs } from './vl-link.stories-arg';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import linkDoc from './vl-link.stories-doc.mdx';

registerWebComponents([VlLinkComponent]);

export default {
    id: 'components-next-link',
    title: 'Components-next/link',
    tags: ['autodocs'],
    args: linkArgs,
    argTypes: linkArgTypes,
    parameters: {
        docs: {
            page: linkDoc,
        },
    },
} as Meta<typeof linkArgs>;

const LinkTemplate = story(
    linkArgs,
    ({ href, bold, small, large, error, external, buttonAsLink, icon, iconPlacement, defaultSlot }) =>
        html`
            <vl-link-next
                href=${href}
                ?bold=${bold}
                ?small=${small}
                ?large=${large}
                ?error=${error}
                ?external=${external}
                ?button-as-link=${buttonAsLink}
                icon=${icon}
                icon-placement=${iconPlacement}
                >${unsafeHTML(defaultSlot)}</vl-link-next
            >
        `
);

export const LinkDefault = LinkTemplate.bind({});
LinkDefault.storyName = 'vl-link-next - default';
LinkDefault.args = {
    href: 'https://www.vlaanderen.be',
    defaultSlot: 'Vlaanderen',
};

export const LinkBold = LinkTemplate.bind({});
LinkBold.storyName = 'vl-link-next - bold';
LinkBold.args = {
    href: 'https://www.vlaanderen.be',
    defaultSlot: 'Vlaanderen',
    bold: true,
};

export const LinkSmall = LinkTemplate.bind({});
LinkSmall.storyName = 'vl-link-next - small';
LinkSmall.args = {
    href: 'https://www.vlaanderen.be',
    defaultSlot: 'Vlaanderen',
    small: true,
};

export const LinkLarge = LinkTemplate.bind({});
LinkLarge.storyName = 'vl-link-next - large';
LinkLarge.args = {
    href: 'https://www.vlaanderen.be',
    defaultSlot: 'Vlaanderen',
    large: true,
};

export const LinkError = LinkTemplate.bind({});
LinkError.storyName = 'vl-link-next - error';
LinkError.args = {
    href: 'https://www.vlaanderen.be',
    defaultSlot: 'Vlaanderen',
    error: true,
};

export const LinkExternal = LinkTemplate.bind({});
LinkExternal.storyName = 'vl-link-next - external';
LinkExternal.args = {
    href: 'https://www.vlaanderen.be',
    defaultSlot: 'Vlaanderen',
    external: true,
};

export const LinkIcon = LinkTemplate.bind({});
LinkIcon.storyName = 'vl-link-next - icon';
LinkIcon.args = {
    href: 'https://www.vlaanderen.be',
    defaultSlot: 'Vlaanderen',
    icon: 'arrow-right-fat',
};

export const ButtonStyledAsLink = LinkTemplate.bind({});
ButtonStyledAsLink.storyName = 'vl-link-next - button as link';
ButtonStyledAsLink.args = {
    defaultSlot: 'Annuleren',
    buttonAsLink: true,
};
