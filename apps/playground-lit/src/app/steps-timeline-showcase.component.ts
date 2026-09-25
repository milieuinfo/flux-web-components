import { registerWebComponents } from '@domg-wc/common';
import {
    VlButtonComponent,
    VlIconComponent,
    VlLinkComponent,
    VlTextComponent,
    VlTitleComponent,
} from '@domg-wc/components/atom';
import { VlStepsComponent } from '@domg-wc/components/block';
import { html, LitElement, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';

type Toestand = { label: string; href: string };

type Gebeurtenis = { label: string; publicatie?: boolean; nietUitgevoerd?: boolean };

type Processtap = {
    nummer: number;
    titel: string;
    status: string;
    type?: 'disabled' | 'highlighted';
    acties?: ('hernemen' | 'bewerken')[];
    gebeurtenissen: Gebeurtenis[];
};

const eerdereToestanden: Toestand[] = [
    { label: '15 april 2027 - 20 augustus 2027', href: '#toestand-2027-04-15' },
    { label: '1 januari 2027 - 14 april 2027', href: '#toestand-2027-01-01' },
    { label: '2026 (gereconstrueerd)', href: '#toestand-2026' },
];

const processtappen: Processtap[] = [
    { nummer: 7, titel: 'Definitieve vaststelling', status: 'Nog te starten', type: 'disabled', gebeurtenissen: [] },
    { nummer: 6, titel: 'Principiële vaststelling', status: 'Nog te starten', type: 'disabled', gebeurtenissen: [] },
    {
        nummer: 5,
        titel: 'Ontwerp',
        status: 'Actief',
        type: 'highlighted',
        acties: ['hernemen', 'bewerken'],
        gebeurtenissen: [
            { label: 'Informatiemoment - 26/05/2026' },
            { label: 'Verslag planteam - 19/05/2026', publicatie: true },
            { label: 'Openbaar onderzoek - 05/05/2026 tot 04/07/2026' },
            { label: 'Voorlopige vaststelling - 28/04/2026' },
            { label: 'Ontwerp naar kabinet (eerste keer) - 14/04/2026' },
        ],
    },
    {
        nummer: 4,
        titel: 'Voorontwerp (herneming)',
        status: 'Afgerond',
        acties: ['hernemen'],
        gebeurtenissen: [
            { label: 'Einddatum reacties verslag plenaire vergadering - 20/03/2026' },
            { label: 'Publicatie verslag - 06/03/2026' },
            { label: 'Plenaire vergadering/einddatum adviesperiode - 18/02/2026' },
            { label: 'Versturen van de uitnodiging van plenaire - 06/02/2026' },
            { label: 'Voorontwerp naar kabinet (tweede keer) - 05/02/2026' },
            { label: 'Hernomen - 03/02/2026 - advies plenaire opnieuw gevraagd' },
        ],
    },
    {
        nummer: 3,
        titel: 'Voorontwerp',
        status: 'Hernomen',
        acties: ['hernemen'],
        gebeurtenissen: [
            { label: 'Einddatum reacties verslag plenaire vergadering', nietUitgevoerd: true },
            { label: 'Publicatie verslag', nietUitgevoerd: true },
            { label: 'Plenaire vergadering/einddatum adviesperiode', nietUitgevoerd: true },
            { label: 'Versturen van de uitnodiging van plenaire - 22/01/2026' },
            { label: 'Voorontwerp naar kabinet (eerste keer) - 15/01/2026' },
        ],
    },
    {
        nummer: 2,
        titel: 'Scopingnota',
        status: 'Afgerond',
        acties: ['hernemen'],
        gebeurtenissen: [
            { label: 'Participatiemoment - 26/11/2025' },
            { label: 'Participatieperiode - termijn 60d - 03/11/2025 tot 01/01/2026' },
            { label: 'Publicatie scopingnota - 29/10/2025' },
            { label: 'Advies van VECM - 22/10/2025' },
            { label: 'Adviesvraag naar VECM - 01/10/2025' },
        ],
    },
    {
        nummer: 1,
        titel: 'Startnota',
        status: 'Afgerond',
        acties: ['hernemen'],
        gebeurtenissen: [
            { label: 'Participatiemoment - 04/09/2025' },
            { label: 'Participatieperiode - termijn 60d - 01/08/2025 tot 29/09/2025' },
            { label: 'Goedkeuring startnota - 18/07/2025' },
            { label: 'Versturen van de startnota naar kabinet (eerste keer) - 07/07/2025' },
        ],
    },
];

const voorbereiding: Processtap = {
    nummer: 0,
    titel: 'Voorbereiding',
    status: 'Afgerond',
    type: 'disabled',
    gebeurtenissen: [{ label: 'Agenderingsnota - 30/06/2025' }, { label: 'Overleg RUP-voorstel - 12/06/2025' }],
};

@customElement('steps-timeline-showcase')
export class StepsTimelineShowcase extends LitElement {
    static {
        registerWebComponents([
            VlStepsComponent,
            VlButtonComponent,
            VlIconComponent,
            VlLinkComponent,
            VlTextComponent,
            VlTitleComponent,
        ]);
    }

    protected createRenderRoot() {
        return this;
    }

    private renderToestandenMjv(selected?: string, interactive = true) {
        return eerdereToestanden.map((toestand) => {
            if (toestand.label === selected) {
                return html`
                    <vl-duration-step slot="duration" selected>
                        <vl-title type="h5" appearance="h6" no-space-bottom>${toestand.label}</vl-title>
                    </vl-duration-step>
                `;
            }
            return interactive
                ? html`
                      <vl-duration-step slot="duration" interactive>
                          <vl-link href=${toestand.href}>${toestand.label}</vl-link>
                      </vl-duration-step>
                  `
                : html`<vl-duration-step slot="duration">${toestand.label}</vl-duration-step>`;
        });
    }

    private renderMjv() {
        return html`
            <div class="vl-grid">
                <div class="vl-column vl-column--4 vl-column--12--m">
                    <vl-title type="h3" appearance="h5">Standaard</vl-title>
                    <vl-steps line>
                        <vl-step heading-level="3" icon-aria-label="Actuele toestand">
                            <vl-icon slot="icon" icon="calendar"></vl-icon>
                            <span slot="title">Actuele toestand</span>
                            <span slot="subtitle">21 augustus 2027 - heden</span>
                            <vl-title slot="content" type="h4" appearance="h6">Eerdere toestanden:</vl-title>
                            ${this.renderToestandenMjv()}
                        </vl-step>
                    </vl-steps>
                </div>
                <div class="vl-column vl-column--4 vl-column--12--m">
                    <vl-title type="h3" appearance="h5">Eerdere toestand geselecteerd</vl-title>
                    <vl-steps line>
                        <vl-step heading-level="3" icon-aria-label="Actuele toestand">
                            <vl-icon slot="icon" icon="calendar"></vl-icon>
                            <vl-link slot="title" href="#toestand-actueel">Actuele toestand</vl-link>
                            <span slot="subtitle">21 augustus 2027 - heden</span>
                            <vl-title slot="content" type="h4" appearance="h6">Eerdere toestanden:</vl-title>
                            ${this.renderToestandenMjv(eerdereToestanden[0].label)}
                        </vl-step>
                    </vl-steps>
                </div>
                <div class="vl-column vl-column--4 vl-column--12--m">
                    <vl-title type="h3" appearance="h5">Conceptfase</vl-title>
                    <vl-steps line>
                        <vl-step heading-level="3" type="highlighted" icon-aria-label="Concept">
                            <vl-icon slot="icon" icon="calendar"></vl-icon>
                            <span slot="title">Concept</span>
                            <span slot="subtitle">Ingangsdatum aan te vullen</span>
                        </vl-step>
                        <vl-step heading-level="3" icon-aria-label="Actuele toestand">
                            <vl-icon slot="icon" icon="calendar"></vl-icon>
                            <span slot="title">Actuele toestand</span>
                            <span slot="subtitle">21 augustus 2027 - heden</span>
                            <vl-title slot="content" type="h4" appearance="h6">Eerdere toestanden:</vl-title>
                            ${this.renderToestandenMjv(undefined, false)}
                        </vl-step>
                    </vl-steps>
                </div>
            </div>
        `;
    }

    private renderActies(acties: Processtap['acties']) {
        if (!acties?.length) return nothing;
        return html`
            <div slot="content" class="vl-group">
                ${acties.includes('hernemen')
                    ? html`<vl-button secondary icon="synchronize" type="button">Hernemen</vl-button>`
                    : nothing}
                ${acties.includes('bewerken')
                    ? html`<vl-button secondary icon="pencil" type="button">Bewerken</vl-button>`
                    : nothing}
            </div>
        `;
    }

    private renderGebeurtenis(gebeurtenis: Gebeurtenis) {
        if (gebeurtenis.publicatie) {
            return html`
                <div class="vl-group vl-group--align-center">
                    <vl-icon icon="publication"></vl-icon>
                    <span>${gebeurtenis.label}</span>
                </div>
            `;
        }
        if (gebeurtenis.nietUitgevoerd) {
            return html`
                <div class="vl-group vl-group--align-center">
                    <vl-icon icon="hourglass"></vl-icon>
                    <span>${gebeurtenis.label}</span>
                </div>
            `;
        }
        return html`
            <div class="vl-group vl-group--align-center">
                <vl-icon icon="check-thin"></vl-icon>
                <vl-text bold>${gebeurtenis.label}</vl-text>
            </div>
        `;
    }

    private renderProcesstap(stap: Processtap) {
        const toggleable = !stap.type || stap.type === 'highlighted';
        return html`
            <vl-step type=${stap.type ?? nothing} ?toggleable=${toggleable} ?default-open=${toggleable}>
                <span slot="icon">${stap.nummer}</span>
                <span slot="title">${stap.titel}</span>
                <span slot="subtitle">${stap.status}</span>
                ${this.renderActies(stap.acties)}
                ${stap.gebeurtenissen.map(
                    (gebeurtenis) => html`
                        <vl-duration-step slot="duration">${this.renderGebeurtenis(gebeurtenis)}</vl-duration-step>
                    `,
                )}
            </vl-step>
        `;
    }

    private renderVizier() {
        return html`
            <vl-title type="h3" appearance="h2">Processtappen</vl-title>
            <vl-steps line>${processtappen.map((stap) => this.renderProcesstap(stap))}</vl-steps>
            <hr class="vl-separator-wave" />
            <vl-steps line last-step-no-line>${this.renderProcesstap(voorbereiding)}</vl-steps>
        `;
    }

    render() {
        return html`
            <section class="vl-section">
                <div class="vl-content-block vl-content-block--full-width">
                    <vl-title type="h2">vl-steps patronen: MJV-tijdlijn</vl-title>
                    <p>Toestanden van een exploitatie, uit de MJV UX Figma file (node 4198:71657 en 4198:75041).</p>
                    ${this.renderMjv()}
                </div>
            </section>
            <section class="vl-section">
                <div class="vl-content-block vl-content-block--full-width">
                    <vl-title type="h2">vl-steps patronen: VIZIER-processtappen</vl-title>
                    <p>Processtappen van een GRUP, uit de VIZIER Figma file (node 4656:29764).</p>
                    <div class="vl-grid">
                        <div class="vl-column vl-column--8 vl-column--12--m">${this.renderVizier()}</div>
                    </div>
                </div>
            </section>
        `;
    }
}
