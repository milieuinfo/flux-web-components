import { html } from 'lit';
import { AccessibilityProperties } from '../vl-accessibility.model';
import { VlTitleComponent } from '../../../atom';
import { VlTypography } from '../../../block';

export type InaccessibleContentProps = Pick<AccessibilityProperties, 'compliance' | 'evaluation' | 'limitations'>;

export const inaccessibleContentElements = () => [VlTypography, VlTitleComponent];

export const inaccessibleContent = ({ compliance, evaluation, limitations }: InaccessibleContentProps) => {
    const inaccessibleContentTemplate = () => {
        if (evaluation === 'NOT_EVALUATED') {
            return html`De niet-toegankelijke inhoud is onbekend omdat de website niet is getest.`;
        }
        if (compliance === 'FULLY_COMPLIANT') {
            return html`Er is geen niet-toegankelijke inhoud omdat de website volledig toegankelijk is.`;
        }
        return html`
            <vl-typography>
                <p>De onderstaande inhoud is niet-toegankelijk om de volgende reden(en):</p>
                ${limitations &&
                limitations.withTiming &&
                html`<h3>Niet-naleving van het bestuursdecreet</h3>
                    <ul>
                        ${limitations.withTiming.map((limitation: string) => html` <li><p>${limitation}</p></li>`)}
                    </ul>`}
                ${limitations &&
                limitations.withoutTiming &&
                html`<h3>Onevenredige last</h3>
                    <ul>
                        ${limitations.withoutTiming.map((limitation: string) => html` <li><p>${limitation}</p></li>`)}
                    </ul>`}
                ${limitations &&
                limitations.outsideApplicableLaw &&
                html`<h3>De inhoud valt buiten de werkingssfeer van de toepasselijke wetgeving</h3>
                    <ul>
                        ${limitations.outsideApplicableLaw.map(
                            (limitation: string) => html` <li><p>${limitation}</p></li>`
                        )}
                    </ul>`}
            </vl-typography>
        `;
    };
    return html` <div
        style=${compliance === 'FULLY_COMPLIANT' && 'display: none'}
        id="inaccessible-content"
        class="vl-column vl-column--12 vl-column--m-12"
    >
        <vl-title type="h2">Niet-toegankelijke inhoud</vl-title>
        ${inaccessibleContentTemplate()}
    </div>`;
};
