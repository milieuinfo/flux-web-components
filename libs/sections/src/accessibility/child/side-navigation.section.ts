import { VlSideNavigationComponent } from '@domg-wc/components/next/side-navigation';
import { html } from 'lit';
import type { AccessibilityProperties } from '../vl-accessibility.model';
import {
    VlColumnElement,
    VlSideNavigation,
    VlSideNavigationContentElement,
    VlSideNavigationGroupElement,
    VlSideNavigationH1,
    VlSideNavigationItemElement,
    VlSideNavigationToggleElement,
} from '@domg-wc/elements';

export type SideNavigationProps = Pick<AccessibilityProperties, 'compliance'>;

export const sideNavigationElements = () => [
    VlColumnElement,
    VlSideNavigation,
    VlSideNavigationH1,
    VlSideNavigationContentElement,
    VlSideNavigationGroupElement,
    VlSideNavigationItemElement,
    VlSideNavigationToggleElement,
    VlSideNavigationComponent,
];

export const sideNavigation = ({ compliance }: SideNavigationProps) => {
    return html` <div
        class="vl-column-next vl-column-next--4 vl-column-next--m-4 vl-column-next--s-4 vl-column-next--xs-0"
    >
        <vl-side-navigation-next  id="side-nav-accessibility" aria-label="inhoudsopgave">
            <vl-side-navigation-h1-next >Op deze pagina</vl-side-navigation-h1-next>
            <vl-side-navigation-content-next >
                <vl-side-navigation-group-next >
                    <vl-side-navigation-item-next  parent>
                        <vl-side-navigation-toggle-next  href="#compliance-status">
                            Nalevingsstatus
                            <i class="vl-vi vl-vi-arrow-right-fat"></i>
                        </vl-side-navigation-toggle-next>
                    </vl-side-navigation-item-next>
                    <vl-side-navigation-item-next
                        style=${compliance === 'FULLY_COMPLIANT' && 'display: none'}

                        parent
                    >
                        <vl-side-navigation-toggle-next  href="#inaccessible-content">
                            Niet-toegankelijke inhoud
                            <i class="vl-vi vl-vi-arrow-right-fat"></i>
                        </vl-side-navigation-toggle-next>
                    </vl-side-navigation-item-next>
                    <vl-side-navigation-item-next  parent>
                        <vl-side-navigation-toggle-next  href="#setup-accessibility-statement">
                            Opstelling van deze toegankelijkheidsverklaring
                            <i class="vl-vi vl-vi-arrow-right-fat"></i>
                        </vl-side-navigation-toggle-next>
                    </vl-side-navigation-item-next>
                    <vl-side-navigation-item-next  parent>
                        <vl-side-navigation-toggle-next  href="#feedback-contact">
                            Feedback en contactgegevens
                            <i class="vl-vi vl-vi-arrow-right-fat"></i>
                        </vl-side-navigation-toggle-next>
                    </vl-side-navigation-item-next>
                    <vl-side-navigation-item-next  parent>
                        <vl-side-navigation-toggle-next  href="#enforcement-procedure">
                            Handhavingsprocedure
                            <i class="vl-vi vl-vi-arrow-right-fat"></i>
                        </vl-side-navigation-toggle-next>
                    </vl-side-navigation-item-next>
                </vl-side-navigation-group-next>
            </div>
        </vl-side-navigation-next>
    </div>`;
};
