import { html } from 'lit';
import { VlSideNavigationComponent } from '../../../block/side-navigation';
import type { AccessibilityProperties } from '../vl-accessibility.model';

export type SideNavigationProps = Pick<AccessibilityProperties, 'compliance'>;

export const sideNavigationComponents = () => [VlSideNavigationComponent];

export const sideNavigation = ({ compliance }: SideNavigationProps) => {
    return html` <div
        class="vl-column vl-column--3 vl-column--m-3 vl-column--s-12 vl-column--xs-12 vl-column--start-10 vl-column--s-start-1"
    >
        <vl-side-navigation id="side-nav-accessibility" aria-label="inhoudsopgave">
            <vl-side-navigation-h1 >Op deze pagina</vl-side-navigation-h1>
            <vl-side-navigation-content>
                <vl-side-navigation-group>
                    <vl-side-navigation-item>
                        <a href="#compliance-status">
                            Nalevingsstatus
                        </a>
                    </vl-side-navigation-item>
                    <vl-side-navigation-item 
                        style=${compliance === 'FULLY_COMPLIANT' && 'display: none'}
                    >
                        <a href="#inaccessible-content">
                            Niet-toegankelijke inhoud
                        </a>
                    </vl-side-navigation-item>
                    <vl-side-navigation-item>
                        <a href="#setup-accessibility-statement">
                            Opstelling van deze toegankelijkheidsverklaring
                        </a>
                    </vl-side-navigation-item>
                    <vl-side-navigation-item>
                        <a href="#feedback-contact">
                            Feedback en contactgegevens
                        </a>
                    </vl-side-navigation-item>
                    <vl-side-navigation-item>
                        <a href="#enforcement-procedure">
                            Handhavingsprocedure
                        </a>
                    </vl-side-navigation-item>
                </vl-side-navigation-group>
            </vl-side-navigation-content>
        </vl-side-navigation>
    </div>`;
};
