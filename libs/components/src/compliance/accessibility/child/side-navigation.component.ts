import { html } from 'lit';
import { VlSideNavigationComponent } from '../../../block/next/side-navigation';
import type { AccessibilityProperties } from '../vl-accessibility.model';

export type SideNavigationProps = Pick<AccessibilityProperties, 'compliance'>;

export const sideNavigationComponents = () => [VlSideNavigationComponent];

export const sideNavigation = ({ compliance }: SideNavigationProps) => {
    return html`
        <vl-side-navigation-next
            slot="navigation"
            id="side-nav-accessibility"
            aria-label="inhoudsopgave"
        >
            <ul>
                <li>
                    <a href="#compliance-status">Nalevingsstatus</a>
                </li>
                <li style=${compliance === 'FULLY_COMPLIANT' ? 'display: none' : ''}>
                    <a href="#inaccessible-content">Niet-toegankelijke inhoud</a>
                </li>
                <li>
                    <a href="#setup-accessibility-statement">Opstelling van deze toegankelijkheidsverklaring</a>
                </li>
                <li>
                    <a href="#feedback-contact">Feedback en contactgegevens</a>
                </li>
                <li>
                    <a href="#enforcement-procedure">Handhavingsprocedure</a>
                </li>
            </ul>
        </vl-side-navigation-next>
    `;
};
