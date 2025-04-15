import { html } from 'lit';
import type { AccessibilityProperties } from '../vl-accessibility.model';
import { wcagLink } from './wcag-link.section';

export type ComplianceStatusProps = Pick<AccessibilityProperties, 'compliance' | 'evaluation'>;
export const complianceStatus = ({ compliance, evaluation }: ComplianceStatusProps) => {
    const complianceTemplate = () => {
        switch (compliance) {
            case 'FULLY_COMPLIANT':
                return html`Deze website voldoet volledig aan de ${wcagLink()}.`;
            case 'PARTIALLY_COMPLIANT':
                return html`Deze website voldoet gedeeltelijk aan de ${wcagLink()} omdat nog niet aan de onderstaande
                eisen is voldaan.`;
            case 'NOT_COMPLIANT':
                return html`Deze website voldoet niet aan de ${wcagLink()} omdat nog niet aan de onderstaande eisen is
                voldaan.`;
            default:
                return null;
        }
    };
    return html`
        <div id="compliance-status" class="vl-column vl-column--12 vl-column--m-12">
            <vl-title type="h2">Nalevingsstatus</vl-title>
            ${evaluation === 'NOT_EVALUATED'
                ? html`Deze website voldoet niet aan de ${wcagLink()}.`
                : complianceTemplate()}
        </div>
    `;
};
