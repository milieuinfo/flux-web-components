import { html } from 'lit';
import type { AccessibilityProperties } from '../vl-accessibility.model';
import { VlFunctionalHeaderComponent } from '@domg-wc/components';

export type HeaderProps = Pick<AccessibilityProperties, 'disableBackLink' | 'hideBackLink'>;

export const headerElements = () => [VlFunctionalHeaderComponent];

export const header = ({ disableBackLink, hideBackLink }: HeaderProps) => html`
    <vl-functional-header
        data-vl-title="Departement Omgeving"
        data-vl-sub-title="Toegankelijkheid en gebruiksvoorwaarden"
        data-vl-link="https://omgeving.vlaanderen.be"
        ?data-vl-disable-back-link=${disableBackLink}
        ?data-vl-hide-back-link=${hideBackLink}
    ></vl-functional-header>
`;
