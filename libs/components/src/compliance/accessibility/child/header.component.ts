import { html } from 'lit';
import { VlFunctionalHeaderComponent } from '../../../block/functional-header';
import type { AccessibilityProperties } from '../vl-accessibility.model';

export type HeaderProps = Pick<AccessibilityProperties, 'disableBackLink' | 'hideBackLink'>;

export const headerElements = () => [VlFunctionalHeaderComponent];

export const header = ({ disableBackLink, hideBackLink }: HeaderProps) => html`
    <vl-functional-header
        title="Departement Omgeving"
        sub-title="Toegankelijkheid en gebruiksvoorwaarden"
        link="https://omgeving.vlaanderen.be"
        ?disable-back-link=${disableBackLink}
        ?hide-back-link=${hideBackLink}
        skip-to-content-id="#main-content"
    ></vl-functional-header>
`;
