import { story } from '@domg-wc/common-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import { VlInfotextComponent } from '../vl-infotext.component';
import { registerWebComponents } from '@domg-wc/common-utilities';
import { InfotextArgs, infotextArgTypes, infotextArgs } from './vl-infotext.stories-arg';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import infotextDoc from './vl-infotext.stories-doc.mdx';

registerWebComponents([VlInfotextComponent]);

export default {
    id: 'components-infotext',
    title: 'Components/infotext',
    tags: ['autodocs'],
    args: infotextArgs,
    argTypes: infotextArgTypes,
    parameters: {
        docs: {
            page: infotextDoc,
        },
    },
} as Meta<InfotextArgs>;

const InfotextTemplate = story(
    infotextArgs,
    ({ badge, href, external, valueSlot, textSlot }) =>
        html`
            <vl-infotext ?badge=${badge} href=${href} ?external=${external}>
                <span slot="value">${unsafeHTML(valueSlot)}</span>
                <span slot="text">${unsafeHTML(textSlot)}</span>
            </vl-infotext>
        `
);

export const InfotextDefault = InfotextTemplate.bind({});
InfotextDefault.storyName = 'vl-infotext - default';
InfotextDefault.args = {
    valueSlot: '3200',
    textSlot: 'Bezoekers per dag',
};

export const InfotextBadge = InfotextTemplate.bind({});
InfotextBadge.storyName = 'vl-infotext - badge';
InfotextBadge.args = {
    valueSlot: '3200',
    textSlot: 'Bezoekers per dag',
    badge: true,
};

export const InfotextLink = InfotextTemplate.bind({});
InfotextLink.storyName = 'vl-infotext - link';
InfotextLink.args = {
    valueSlot: '3200',
    textSlot: 'Bezoekers per dag',
    href: 'https://www.vlaanderen.be',
};
