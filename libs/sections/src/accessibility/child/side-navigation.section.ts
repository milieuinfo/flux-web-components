import { VlSideNavigationComponent } from '@domg-wc/components/next/side-navigation';
import { html } from 'lit';
import type { AccessibilityProperties } from '../vl-accessibility.model';

export type SideNavigationProps = Pick<AccessibilityProperties, 'compliance'>;

export const sideNavigationComponents = () => [VlSideNavigationComponent];

export const sideNavigation = ({ compliance }: SideNavigationProps) => {
    return html` <div
        class="vl-column-next vl-column-next--4 vl-column-next--m-4 vl-column-next--s-12 vl-column-next--xs-12"
    >
        <vl-side-navigation-next id="side-nav-accessibility" aria-label="inhoudsopgave">
            <vl-side-navigation-h1-next>Op deze pagina</vl-side-navigation-h1-next>
            <vl-side-navigation-content-next>
                <vl-side-navigation-group-next>
                    <vl-side-navigation-item-next>
                        <a href="#compliance-status">
                            Nalevingsstatus
                        </a>
                    </vl-side-navigation-item-next>
                    <vl-side-navigation-item-next
                        style=${compliance === 'FULLY_COMPLIANT' && 'display: none'}
                        parent
                    >
                        <a href="#inaccessible-content">
                            Niet-toegankelijke inhoud
                        </a>
                    </vl-side-navigation-item-next>
                    <vl-side-navigation-item-next>
                        <a href="#setup-accessibility-statement">
                            Opstelling van deze toegankelijkheidsverklaring
                        </a>
                    </vl-side-navigation-item-next>
                    <vl-side-navigation-item-next>
                        <a href="#feedback-contact">
                            Feedback en contactgegevens
                        </a>
                    </vl-side-navigation-item-next>
                    <vl-side-navigation-item-next>
                        <a href="#enforcement-procedure">
                            Handhavingsprocedure
                        </a>
                    </vl-side-navigation-item-next>
                </vl-side-navigation-group-next>
            </vl-side-navigation-content-next>
        </vl-side-navigation-next>
    </div>`;
};
