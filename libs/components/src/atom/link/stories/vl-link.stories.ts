import { registerWebComponents } from '@domg-wc/common';
import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { VlLinkComponent } from '../vl-link.component';
import { linkArgs, linkArgTypes } from './vl-link.stories-arg';
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
    ({ href, bold, small, large, error, external, buttonAsLink, type, icon, iconPlacement, defaultSlot, label }) =>
        html`
            <vl-link
                href=${href}
                ?bold=${bold}
                ?small=${small}
                ?large=${large}
                ?error=${error}
                ?external=${external}
                ?button-as-link=${buttonAsLink}
                type=${type}
                icon=${icon}
                icon-placement=${iconPlacement}
                label=${label}
                >${unsafeHTML(defaultSlot)}</vl-link
            >
        `
);

export const LinkDefault = LinkTemplate.bind({});
LinkDefault.storyName = 'vl-link - default';
LinkDefault.args = {
    href: 'https://www.vlaanderen.be',
    defaultSlot: 'Vlaanderen',
    label: 'Ga naar Vlaanderen.be',
};

export const LinkBold = LinkTemplate.bind({});
LinkBold.storyName = 'vl-link - bold';
LinkBold.args = {
    href: 'https://www.vlaanderen.be',
    defaultSlot: 'Vlaanderen',
    bold: true,
    label: 'Ga naar Vlaanderen.be',
};

export const LinkSmall = LinkTemplate.bind({});
LinkSmall.storyName = 'vl-link - small';
LinkSmall.args = {
    href: 'https://www.vlaanderen.be',
    defaultSlot: 'Vlaanderen',
    small: true,
    label: 'Ga naar Vlaanderen.be',
};

export const LinkLarge = LinkTemplate.bind({});
LinkLarge.storyName = 'vl-link - large';
LinkLarge.args = {
    href: 'https://www.vlaanderen.be',
    defaultSlot: 'Vlaanderen',
    large: true,
    label: 'Ga naar Vlaanderen.be',
};

export const LinkError = LinkTemplate.bind({});
LinkError.storyName = 'vl-link - error';
LinkError.args = {
    href: 'https://www.vlaanderen.be',
    defaultSlot: 'Vlaanderen',
    error: true,
    label: 'Ga naar Vlaanderen.be',
};

export const LinkExternal = LinkTemplate.bind({});
LinkExternal.storyName = 'vl-link - external';
LinkExternal.args = {
    href: 'https://www.vlaanderen.be',
    defaultSlot: 'Vlaanderen',
    external: true,
    label: 'Ga naar Vlaanderen.be (opent in een nieuw venster)',
};

export const LinkIcon = LinkTemplate.bind({});
LinkIcon.storyName = 'vl-link - icon';
LinkIcon.args = {
    href: 'https://www.vlaanderen.be',
    defaultSlot: 'Vlaanderen',
    icon: 'arrow-right-fat',
    iconPlacement: 'before',
    label: 'Ga naar Vlaanderen.be',
};

export const LinkIconOnly = LinkTemplate.bind({});
LinkIconOnly.storyName = 'vl-link - icon only';
LinkIconOnly.args = {
    href: 'https://www.vlaanderen.be',
    icon: 'arrow-right-fat',
    label: 'Ga naar Vlaanderen.be',
};

export const ButtonStyledAsLink = LinkTemplate.bind({});
ButtonStyledAsLink.storyName = 'vl-link - button as link';
ButtonStyledAsLink.args = {
    defaultSlot: 'Annuleren',
    buttonAsLink: true,
    label: 'Annuleer inschrijving',
};
