import { html } from 'lit';
import { VlFunctionalHeaderComponent } from '../../../block/functional-header';
import type { AccessibilityProperties } from '../vl-accessibility.model';

export type HeaderProps = Pick<AccessibilityProperties, 'disableBackLink' | 'hideBackLink'>;

export const headerElements = () => [VlFunctionalHeaderComponent];

export const header = ({ disableBackLink, hideBackLink }: HeaderProps) => html`
    <vl-functional-header
        sub-title="Toegankelijkheid en gebruiksvoorwaarden"
        ?disable-back-link=${disableBackLink}
        ?hide-back-link=${hideBackLink}
        skip-to-content-id="#main-content"
    >
        <a slot="heading" href="https://omgeving.vlaanderen.be">Departement Omgeving</a>
    </vl-functional-header>
`;
