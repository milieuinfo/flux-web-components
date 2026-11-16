import { html } from 'lit';
import { VlFunctionalHeaderComponent } from '../../../block/functional-header';

export const privacyHeaderElements = () => [VlFunctionalHeaderComponent];

export const header = ({ disableBackLink, hideBackLink }: { disableBackLink: boolean; hideBackLink: boolean }) => html`
    <vl-functional-header
        sub-title="Privacy"
        ?disable-back-link=${disableBackLink}
        ?hide-back-link=${hideBackLink}
        skip-to-content-id="#main-content"
    >
        <a slot="heading" href="https://omgeving.vlaanderen.be">Departement Omgeving</a>
    </vl-functional-header>
`;
