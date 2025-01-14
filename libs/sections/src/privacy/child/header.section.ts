import { html } from 'lit';
import { VlFunctionalHeaderComponent } from '@domg-wc/components';

export const privacyHeaderElements = () => [VlFunctionalHeaderComponent];

export const header = ({ disableBackLink, hideBackLink }: { disableBackLink: boolean; hideBackLink: boolean }) => html`
    <vl-functional-header
        data-vl-title="Departement Omgeving"
        data-vl-sub-title="Privacy"
        data-vl-link="https://omgeving.vlaanderen.be"
        ?data-vl-disable-back-link=${disableBackLink}
        ?data-vl-hide-back-link=${hideBackLink}
    ></vl-functional-header>
`;
