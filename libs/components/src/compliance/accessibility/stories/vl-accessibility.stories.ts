import { html } from 'lit-html';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../vl-accessibility.component';
import { Meta } from '@storybook/web-components-vite';
import accessibilityDoc from './vl-accessibility.stories-doc.mdx';
import { accessibilityArgs, accessibilityArgTypes } from './vl-accessibility.stories-arg';
import { story } from '@resources/utils-storybook';

// TODO kspeltin: deze commentaar was dode code, moet die ergens opgenomen worden ?
// const limitationsDescription = `<p>Attribuut om limitaties mee te geven aan de verklaring. De string die verwacht wordt is de <code>id</code> van een script dat aanwezig is op de pagina waarin een object zit.</p>
//
// Voorbeeld van zo'n object:
// <pre style="font-family: monospace;">{
//   withTiming: ['limitatie 1', 'limitatie 2'],
//   withoutTiming: ['limitatie 3'],
//   outsideApplicableLaw: ['limitatie 4']
// }</pre>
//
// <p>De <code>withTiming</code> limitaties vallen onder 'Niet-naleving van het bestuursdecreet'. Dit zijn tijdelijke limitaties.</p>
// <p>De <code>withoutTiming</code> limitaties vallen onder 'Onevenredige last'. Dit zijn permanente limitaties.</p>
// <p>De <code>outsideApplicableLaw</code> limitaties vallen onder 'De inhoud valt buiten de werkingssfeer van de toepasselijke wetgeving'. Dit zijn limitaties die buiten de werkingssfeer van de toepasselijke wetgeving vallen.</p>`;

export default {
    id: 'components-compliance-accessibility',
    title: 'Components - Compliance/accessibility',
    tags: ['autodocs'],
    args: accessibilityArgs,
    argTypes: accessibilityArgTypes,
    parameters: {
        layout: 'fullscreen',
        docs: { page: accessibilityDoc },
    },
} as Meta<typeof accessibilityArgs>;

const Template = story(
    accessibilityArgs,
    ({
        application,
        compliance,
        date,
        dateModified,
        disableBackLink,
        hideBackLink,
        evaluation,
        version,
        limitations,
        onClickBack,
        headerSlot,
    }) => html`
        <vl-accessibility
            application=${application}
            compliance=${compliance}
            date=${date}
            date-modified=${dateModified}
            ?disable-back-link=${disableBackLink}
            ?hide-back-link=${hideBackLink}
            evaluation=${evaluation}
            version=${version}
            .limitations=${limitations}
            @vl-click-back=${onClickBack}
        >
            ${unsafeHTML(headerSlot)}
        </vl-accessibility>
    `
);

const limitations = {
    withTiming: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ],
    withoutTiming: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ],
    outsideApplicableLaw: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ],
};

export const AccessibilityDefault = Template.bind({});
AccessibilityDefault.storyName = 'vl-accessibility - default';
AccessibilityDefault.args = {
    limitations,
};

export const AccessibilityHeaderSlot = Template.bind({});
AccessibilityHeaderSlot.storyName = 'vl-accessibility - header slot';
AccessibilityHeaderSlot.args = {
    limitations,
    headerSlot: `
    <vl-functional-header
        slot="header"
        title="Departement Omgeving & Andere"
        sub-title="Toegankelijkheid en gebruiksvoorwaarden "
        link="https://omgeving.vlaanderen.be"
        back="Start"
    ></vl-functional-header>`,
};
