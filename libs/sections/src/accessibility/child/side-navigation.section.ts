import { VlSideNavigationComponent } from '@domg-wc/components';
import { html } from 'lit';
import type { AccessibilityProperties } from '../vl-accessibility.model';

export type SideNavigationProps = Pick<AccessibilityProperties, 'compliance'>;

export const sideNavigationComponents = () => [VlSideNavigationComponent];

export const sideNavigation = ({ compliance }: SideNavigationProps) => {
    return html` <div
        class="vl-column vl-column--4 vl-column--m-4 vl-column--s-4 vl-column--xs-0"
    >
        <vl-side-navigation  id="side-nav-accessibility" aria-label="inhoudsopgave">
            <vl-side-navigation-h1 >Op deze pagina</vl-side-navigation-h1>
            <vl-side-navigation-content >
                <vl-side-navigation-group >
                    <vl-side-navigation-item  parent>
                        <vl-side-navigation-toggle  href="#compliance-status">
                            Nalevingsstatus
                            <i class="vl-vi vl-vi-arrow-right-fat"></i>
                        </vl-side-navigation-toggle>
                    </vl-side-navigation-item>
                    <vl-side-navigation-item
                        style=${compliance === 'FULLY_COMPLIANT' && 'display: none'}

                        parent
                    >
                        <vl-side-navigation-toggle  href="#inaccessible-content">
                            Niet-toegankelijke inhoud
                            <i class="vl-vi vl-vi-arrow-right-fat"></i>
                        </vl-side-navigation-toggle>
                    </vl-side-navigation-item>
                    <vl-side-navigation-item  parent>
                        <vl-side-navigation-toggle  href="#setup-accessibility-statement">
                            Opstelling van deze toegankelijkheidsverklaring
                            <i class="vl-vi vl-vi-arrow-right-fat"></i>
                        </vl-side-navigation-toggle>
                    </vl-side-navigation-item>
                    <vl-side-navigation-item  parent>
                        <vl-side-navigation-toggle  href="#feedback-contact">
                            Feedback en contactgegevens
                            <i class="vl-vi vl-vi-arrow-right-fat"></i>
                        </vl-side-navigation-toggle>
                    </vl-side-navigation-item>
                    <vl-side-navigation-item  parent>
                        <vl-side-navigation-toggle  href="#enforcement-procedure">
                            Handhavingsprocedure
                            <i class="vl-vi vl-vi-arrow-right-fat"></i>
                        </vl-side-navigation-toggle>
                    </vl-side-navigation-item>
                </vl-side-navigation-group>
            </div>
        </vl-side-navigation>
    </div>`;
};
