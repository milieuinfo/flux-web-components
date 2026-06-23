import { html } from 'lit';
import { VlFunctionalHeaderComponent } from '../../../block/functional-header';

export const privacyHeaderElements = () => [VlFunctionalHeaderComponent];

export const header = ({ disableBackLink, hideBackLink }: { disableBackLink: boolean; hideBackLink: boolean }) => html`
    <vl-functional-header
        title-label="Departement Omgeving"
        sub-title="Privacy"
        link="https://omgeving.vlaanderen.be"
        ?disable-back-link=${disableBackLink}
        ?hide-back-link=${hideBackLink}
        skip-to-content-id="#main-content"
    ></vl-functional-header>
`;
