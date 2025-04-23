import { html } from 'lit';
import { VlFunctionalHeaderComponent } from '@domg-wc/components';

export const privacyHeaderElements = () => [VlFunctionalHeaderComponent];

export const header = ({ disableBackLink, hideBackLink }: { disableBackLink: boolean; hideBackLink: boolean }) => html`
    <vl-functional-header
        title="Departement Omgeving"
        sub-title="Privacy"
        link="https://omgeving.vlaanderen.be"
        ?disable-back-link=${disableBackLink}
        ?hide-back-link=${hideBackLink}
    ></vl-functional-header>
`;
