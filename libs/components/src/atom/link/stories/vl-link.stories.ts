import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { VlLinkComponent } from '../vl-link.component';
import { registerWebComponents } from '@domg-wc/common';
import { linkArgs, linkArgTypes } from './vl-link.stories-arg';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import linkDoc from './vl-link.stories-doc.mdx';

registerWebComponents([VlLinkComponent]);

export default {
    id: 'components-atom-link',
    title: 'Components - Atom/link',
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
            <vl-link
                href=${href}
                ?bold=${bold}
                ?small=${small}
                ?large=${large}
                ?error=${error}
                ?external=${external}
                ?button-as-link=${buttonAsLink}
                icon=${icon}
                icon-placement=${iconPlacement}
                >${unsafeHTML(defaultSlot)}</vl-link
            >
        `
);

export const LinkDefault = LinkTemplate.bind({});
LinkDefault.storyName = 'vl-link - default';
LinkDefault.args = {
    href: 'https://www.vlaanderen.be',
    defaultSlot: 'Vlaanderen',
};

export const LinkBold = LinkTemplate.bind({});
LinkBold.storyName = 'vl-link - bold';
LinkBold.args = {
    href: 'https://www.vlaanderen.be',
    defaultSlot: 'Vlaanderen',
    bold: true,
};

export const LinkSmall = LinkTemplate.bind({});
LinkSmall.storyName = 'vl-link - small';
LinkSmall.args = {
    href: 'https://www.vlaanderen.be',
    defaultSlot: 'Vlaanderen',
    small: true,
};

export const LinkLarge = LinkTemplate.bind({});
LinkLarge.storyName = 'vl-link - large';
LinkLarge.args = {
    href: 'https://www.vlaanderen.be',
    defaultSlot: 'Vlaanderen',
    large: true,
};

export const LinkError = LinkTemplate.bind({});
LinkError.storyName = 'vl-link - error';
LinkError.args = {
    href: 'https://www.vlaanderen.be',
    defaultSlot: 'Vlaanderen',
    error: true,
};

export const LinkExternal = LinkTemplate.bind({});
LinkExternal.storyName = 'vl-link - external';
LinkExternal.args = {
    href: 'https://www.vlaanderen.be',
    defaultSlot: 'Vlaanderen',
    external: true,
};

export const LinkIcon = LinkTemplate.bind({});
LinkIcon.storyName = 'vl-link - icon';
LinkIcon.args = {
    href: 'https://www.vlaanderen.be',
    defaultSlot: 'Vlaanderen',
    icon: 'arrow-right-fat',
    iconPlacement: 'before',
};

export const LinkIconOnly = LinkTemplate.bind({});
LinkIconOnly.storyName = 'vl-link - icon only';
LinkIconOnly.args = {
    href: 'https://www.vlaanderen.be',
    icon: 'arrow-right-fat',
};

export const ButtonStyledAsLink = LinkTemplate.bind({});
ButtonStyledAsLink.storyName = 'vl-link - button as link';
ButtonStyledAsLink.args = {
    defaultSlot: 'Annuleren',
    buttonAsLink: true,
    label: 'annuleer inschrijving',
};
