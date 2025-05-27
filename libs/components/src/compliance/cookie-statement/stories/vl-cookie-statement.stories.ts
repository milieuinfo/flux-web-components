import { story } from '@resources/utils-storybook';
import { Meta } from '@storybook/web-components';
import { html } from 'lit-html';
import '../vl-cookie-statement.component';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { cookieStatementArgs, cookieStatementArgTypes } from './vl-cookie-statement.stories-arg';
import cookieStatementDoc from './vl-cookie-statement.stories-doc.mdx';

export default {
    id: 'components-compliance-cookie-statement',
    title: 'Components - Compliance/cookie-statement',
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
            date=${date}
            ?disable-back-link=${disableBackLink}
            ?hide-back-link=${hideBackLink}
            version=${version}
            @vl-click-back=${onClickBack}
        >
            <vl-cookie
                title="Captcha contactformulier"
                name="NID"
                purpose="reCaptcha is een beveiligingsmaatregel die controleert of u een legitieme bezoeker bent, om te voorkomen dat een bot of script het formulier misbruikt om spam mee te versturen."
                domain="google.com"
                processor="Google"
                validity="Permanente cookie met een geldigheid van 6 maanden"
            >
            </vl-cookie>
            <vl-cookie
                title="Bestellen publicaties Vlaamse overheid"
                name="SSESS* (vb. “SSESS8d910012bf7d5f60012be2880f590bf0”)"
                purpose="Bijhouden van het winkelmandje met bestelde publicaties en succesvol afhandelen van het bestel- en betalingsproces."
                domain="publicaties.vlaanderen.be"
                processor="Vlaamse overheid"
                validity="Permanente cookie met een geldigheid van 3 weken"
            >
            </vl-cookie>
            ${unsafeHTML(headerSlot)}
        </vl-cookie-statement>
    `
);

export const CookieStatementDefault = Template.bind({});
CookieStatementDefault.storyName = 'vl-cookie-statement - default';

export const CookieStatementHeaderSlot = Template.bind({});
CookieStatementHeaderSlot.storyName = 'vl-cookie-statement - header slot';
CookieStatementHeaderSlot.args = {
    headerSlot: `
    <vl-functional-header
        slot="header"
        title="Departement Omgeving"
        sub-title="Cookieverklaring"
        link="https://omgeving.vlaanderen.be"
        back="Start"
    ></vl-functional-header>
`,
};
