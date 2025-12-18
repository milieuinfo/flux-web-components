import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../vl-privacy.component';
import { privacyArgs, privacyArgTypes } from './vl-privacy.stories-arg';
import privacyDoc from './vl-privacy.stories-doc.mdx';

export default {
    id: 'components-compliance-privacy',
    title: 'Components - Compliance/privacy',
    tags: ['autodocs'],
    args: privacyArgs,
    argTypes: privacyArgTypes,
    parameters: {
        layout: 'fullscreen',
        docs: { page: privacyDoc },
    },
} as Meta<typeof privacyArgs>;

const Template = story(
    privacyArgs,
    ({ date, disableBackLink, hideBackLink, version, onClickBack, headerSlot, versionSlot, contentSlot, bottomSlot }) =>
        html`
            <vl-privacy
                date=${date}
                ?disable-back-link=${disableBackLink}
                ?hide-back-link=${hideBackLink}
                version=${version}
                @vl-click-back=${onClickBack}
            >
                ${unsafeHTML(headerSlot)} ${unsafeHTML(versionSlot)} ${unsafeHTML(contentSlot)}
                ${unsafeHTML(bottomSlot)}
            </vl-privacy>
        `
);
export const PrivacyDefault = Template.bind({});
PrivacyDefault.storyName = 'vl-privacy - default';

export const PrivacyHeaderSlot = Template.bind({});
PrivacyHeaderSlot.storyName = 'vl-privacy - header slot';
PrivacyHeaderSlot.args = {
    headerSlot: `
    <vl-functional-header
        slot="header"
        title="Departement Omgeving"
        sub-title="Privacy"
        link="https://omgeving.vlaanderen.be"
        back="Start"
        skip-to-content-id="#main-content"
    ></vl-functional-header>
`,
};
