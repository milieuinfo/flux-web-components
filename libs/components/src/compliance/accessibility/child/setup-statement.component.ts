import { html } from 'lit';
import type { AccessibilityProperties } from '../vl-accessibility.model';

export type SetupStatementProps = Pick<AccessibilityProperties, 'evaluation' | 'date' | 'dateModified'>;
export const setupStatement = ({ evaluation, date, dateModified }: SetupStatementProps) => {
    const setupStatementTemplate = () => {
        switch (evaluation) {
            case 'EXPERT_EVALUATED':
                return html`Deze toegankelijkheidsverklaring is opgesteld op ${date} en gebaseerd op een analyse van een
                web accessibility specialist, gecertificeerd door the International Association of Accessibility
                Professionals (IAAP). Deze toegankelijkheidsverklaring is voor het laatst herzien op ${dateModified}.`;
            case 'SELF_EVALUATED':
                return html`Deze toegankelijkheidsverklaring is opgesteld op ${date} en gebaseerd op een analyse van
                Departement Omgeving. Deze toegankelijkheidsverklaring is voor het laatst herzien op ${dateModified}.`;
            case 'NOT_EVALUATED':
                return html`Deze toegankelijkheidsverklaring is opgesteld op ${date} en werd voor het laatst herzien op
                ${dateModified}.`;
            default:
                return null;
        }
    };
    return html` <div class="vl-column vl-column--12 vl-column--m-12">
        <vl-title type="h2" id="setup-accessibility-statement">Opstelling van deze toegankelijkheidsverklaring</vl-title>
        <p>${setupStatementTemplate()}</p>
    </div>`;
};
