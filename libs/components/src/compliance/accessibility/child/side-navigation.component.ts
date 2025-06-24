import { html } from 'lit';
import { VlSideNavigationComponent } from '../../../block/side-navigation';
import type { AccessibilityProperties } from '../vl-accessibility.model';

export type SideNavigationProps = Pick<AccessibilityProperties, 'compliance'>;

export const sideNavigationComponents = () => [VlSideNavigationComponent];

export const sideNavigation = ({ compliance }: SideNavigationProps) => {
    return html` <div
        class="vl-column vl-column--4 vl-column--m-4 vl-column--s-12 vl-column--xs-12"
    >
        <vl-side-navigation id="side-nav-accessibility" aria-label="inhoudsopgave">
            <vl-side-navigation-h1 >Op deze pagina</vl-side-navigation-h1>
            <vl-side-navigation-content>
                <vl-side-navigation-group>
                    <vl-side-navigation-item parent>
                        <vl-side-navigation-toggle href="#compliance-status">
                            Nalevingsstatus
                        </vl-side-navigation-toggle>
                    </vl-side-navigation-item>
                    <vl-side-navigation-item 
                        style=${compliance === 'FULLY_COMPLIANT' && 'display: none'}
                        parent
                    >
                        <vl-side-navigation-toggle href="#inaccessible-content">
                            Niet-toegankelijke inhoud
                        </vl-side-navigation-toggle>
                    </vl-side-navigation-item>
                    <vl-side-navigation-item parent>
                        <vl-side-navigation-toggle href="#setup-accessibility-statement">
                            Opstelling van deze toegankelijkheidsverklaring
                        </vl-side-navigation-toggle>
                    </vl-side-navigation-item>
                    <vl-side-navigation-item parent>
                        <vl-side-navigation-toggle href="#feedback-contact">
                            Feedback en contactgegevens
                        </vl-side-navigation-toggle>
                    </vl-side-navigation-item>
                    <vl-side-navigation-item parent>
                        <vl-side-navigation-toggle href="#enforcement-procedure">
                            Handhavingsprocedure
                        </vl-side-navigation-toggle>
                    </vl-side-navigation-item>
                </vl-side-navigation-group>
            </vl-side-navigation-content>
        </vl-side-navigation>
    </div>`;
};
