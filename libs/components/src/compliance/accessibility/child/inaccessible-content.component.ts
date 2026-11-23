import { html, nothing } from 'lit';
import { VlTitleComponent } from '../../../atom';
import { VlTypography } from '../../../block/typography';
import { AccessibilityProperties } from '../vl-accessibility.model';

export type InaccessibleContentProps = Pick<AccessibilityProperties, 'compliance' | 'evaluation' | 'limitations'>;

export const inaccessibleContentElements = () => [VlTypography, VlTitleComponent];

export const inaccessibleContent = ({ compliance, evaluation, limitations }: InaccessibleContentProps) => {
    // niet renderen i.p.v. verbergen: de inhoudstafel van vl-accessibility linkt ook naar een verborgen kop
    if (compliance === 'FULLY_COMPLIANT') return nothing;

    const inaccessibleContentTemplate = () => {
        if (evaluation === 'NOT_EVALUATED') {
            return html`De niet-toegankelijke inhoud is onbekend omdat de website niet is getest.`;
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
    return html` <div class="vl-column vl-column--12 vl-column--m-12">
        <vl-title type="h2" id="inaccessible-content">Niet-toegankelijke inhoud</vl-title>
        ${inaccessibleContentTemplate()}
    </div>`;
};
