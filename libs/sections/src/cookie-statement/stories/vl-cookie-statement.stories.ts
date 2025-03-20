import { story } from '@domg-wc/common-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../vl-cookie-statement.section';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { cookieStatementArgs, cookieStatementArgTypes } from './vl-cookie-statement.stories-arg';
import cookieStatementDoc from './vl-cookie-statement.stories-doc.mdx';

export default {
    id: 'sections-cookie-statement',
    title: 'sections/cookie-statement',
    tags: ['autodocs'],
    args: cookieStatementArgs,
    argTypes: cookieStatementArgTypes,
    parameters: {
        layout: 'fullscreen',
        docs: {
            page: cookieStatementDoc,
        },
    },
} as Meta<typeof cookieStatementArgs>;

const Template = story(
    cookieStatementArgs,
    ({ date, disableBackLink, hideBackLink, version, onClickBack, headerSlot }) => html`
        <vl-cookie-statement
            data-vl-date=${date}
            ?data-vl-disable-back-link=${disableBackLink}
            ?data-vl-hide-back-link=${hideBackLink}
            data-vl-version=${version}
            @vl-click-back=${onClickBack}
        >
            <vl-cookie
                data-vl-title="Captcha contactformulier"
                data-vl-name="NID"
                data-vl-purpose="reCaptcha is een beveiligingsmaatregel die controleert of u een legitieme bezoeker bent, om te voorkomen dat een bot of script het formulier misbruikt om spam mee te versturen."
                data-vl-domain="google.com"
                data-vl-processor="Google"
                data-vl-validity="Permanente cookie met een geldigheid van 6 maanden"
            >
            </vl-cookie>
            <vl-cookie
                data-vl-title="Bestellen publicaties Vlaamse overheid"
                data-vl-name="SSESS* (vb. “SSESS8d910012bf7d5f60012be2880f590bf0”)"
                data-vl-purpose="Bijhouden van het winkelmandje met bestelde publicaties en succesvol afhandelen van het bestel- en betalingsproces."
                data-vl-domain="publicaties.vlaanderen.be"
                data-vl-processor="Vlaamse overheid"
                data-vl-validity="Permanente cookie met een geldigheid van 3 weken"
            >
            </vl-cookie>
            ${unsafeHTML(headerSlot)}
        </vl-cookie-statement>
    `
);

export const CookieStatementDefault = Template.bind({});
CookieStatementDefault.storyName = 'vl-cookie-statement - default';

export const CookieStatementHeaderSlot = Template.bind({});
CookieStatementHeaderSlot.storyName = 'vl-cookieStatement - header slot';
CookieStatementHeaderSlot.args = {
    headerSlot: `
    <vl-functional-header
        slot="header"
        data-vl-title="Departement Omgeving"
        data-vl-sub-title="Cookieverklaring"
        data-vl-link="https://omgeving.vlaanderen.be"
        data-vl-back="Start"
    ></vl-functional-header>
`,
};
