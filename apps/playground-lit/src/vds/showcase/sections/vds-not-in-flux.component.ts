import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '../../adapters/flux-button.component';
import '../../adapters/flux-input.component';
import '../../adapters/flux-separator.component';
import '../../adapters/flux-vds-only.component';

import { catCountLabel, patchesFor } from '../data/override-rows';

type Fit = 'ja' | 'nvt';

const MARKDOWN_SAMPLE = `# Markdown in flux

Tekst met **vet**, *cursief*, \`inline code\` en een [link](https://www.vlaanderen.be).

## Lijsten

- Item 1
- Item 2
  - Genest item
1. Eerste
2. Tweede

### Code

\`\`\`javascript
function hallo() {
  return 'wereld';
}
\`\`\`

## Tabel

| Syntax | Uitleg |
| ------ | ------ |
| Kop    | Titel  |
| Code   | \`inline\` |

> Een citaat over
> meerdere regels.

---

- [x] Afgewerkte taak
- [ ] Open taak`;

type NotInFluxRow = {
    vds: string;
    demo: string;
    height: number;
    fluxTag: string | null;
    erftOver: TemplateResult | null;
    interactive?: boolean;
    today: string;
    fit: Fit;
    fitNote: string;
    target: string;
};

const ROWS: NotInFluxRow[] = [
    {
        vds: 'vl-markdown',
        demo: 'markdown',
        height: 190,
        fluxTag: 'flux-markdown',
        erftOver: null,
        interactive: true,
        today: 'geen component; vl-typography toont HTML, geen markdown',
        fit: 'ja',
        fitNote: 'neemt de stylesheets van vl-typography over, dus identiek aan flux (ook mobiel); let op upstream-fix #13 (geen sanitizing)',
        target: 'vergelijk-markdown',
    },
    {
        vds: 'vl-avatar',
        demo: 'avatar',
        height: 55,
        fluxTag: 'flux-avatar',
        erftOver: html`<div style="display: flex; gap: 8px; align-items: center;">
            <flux-avatar initials="KD"></flux-avatar>
            <flux-avatar initials="AB" status="success"></flux-avatar>
            <flux-avatar icon="user" size="s"></flux-avatar>
        </div>`,
        today: 'geen component; wel ronde icoon-badges in vl-info-tile (icon-as-badge) en vl-infoblock',
        fit: 'ja',
        fitNote: 'kleuren via tokens, icoongrootte via de rem-brug',
        target: 'vergelijk-avatar',
    },
    {
        vds: 'vl-banner-message',
        demo: 'banner-message',
        height: 100,
        fluxTag: 'flux-banner-message',
        erftOver: html`<flux-banner-message status="warning" closable style="width: 100%;"
            ><span slot="title">Gepland onderhoud zaterdag van 8u tot 12u.</span></flux-banner-message
        >`,
        today: 'geen component; dichtst is vl-alert',
        fit: 'ja',
        fitNote: 'flux-statuspalet en radius via tokens',
        target: 'vergelijk-banner-message',
    },
    {
        vds: 'vl-inline-message',
        demo: 'inline-message',
        height: 80,
        fluxTag: 'flux-inline-message',
        erftOver: html`<div style="display: grid; gap: 8px; width: 100%;">
            <flux-inline-message status="success"
                ><span slot="body">Je gegevens zijn bewaard.</span></flux-inline-message
            >
            <flux-inline-message status="danger"><span slot="body">Dit veld is verplicht.</span></flux-inline-message>
        </div>`,
        today: 'geen component; dichtst is vl-alert size="small"',
        fit: 'ja',
        fitNote: 'flux-statuspalet via tokens, icoon via de rem-brug',
        target: 'vergelijk-inline-message',
    },
    {
        vds: 'vl-input-group',
        demo: 'input-group',
        height: 90,
        fluxTag: 'flux-input-group',
        erftOver: html`<flux-input-group label="Locatie" grow="fill" style="width: 100%;">
            <flux-input placeholder="Zoek een adres"></flux-input>
            <flux-button slot="after" secondary>Zoeken</flux-button>
        </flux-input-group>`,
        today: 'CSS-patroon vl-group--input-group met het input-group-attribuut',
        fit: 'ja',
        fitNote: 'rand, radius en hoogte via tokens',
        target: 'vergelijk-input-group',
    },
    {
        vds: 'vl-grid, vl-grid-item',
        demo: 'grid',
        height: 95,
        fluxTag: 'flux-grid',
        erftOver: html`<flux-grid columns="3" gap="s" style="width: 100%;">
            <flux-grid-item style="background: #eef6ff; padding: 8px;">1</flux-grid-item>
            <flux-grid-item style="background: #eef6ff; padding: 8px;">2</flux-grid-item>
            <flux-grid-item style="background: #eef6ff; padding: 8px;">3</flux-grid-item>
            <flux-grid-item column-span="2" style="background: #eef6ff; padding: 8px;">4 (span 2)</flux-grid-item>
        </flux-grid>`,
        today: 'CSS-klassen vl-grid en vl-column',
        fit: 'ja',
        fitNote: 'niets aan te passen: enkel layout, gaps komen uit de tokens',
        target: 'vergelijk-grid',
    },
    {
        vds: 'vl-divider',
        demo: 'divider',
        height: 70,
        fluxTag: 'flux-separator',
        erftOver: html`<div style="display: grid; gap: 12px; width: 100%;">
            <flux-separator></flux-separator>
            <flux-separator wave></flux-separator>
            <flux-separator slash></flux-separator>
        </div>`,
        today: 'CSS-klassen vl-separator, -wave en -slash',
        fit: 'ja',
        fitNote: 'kleur en dikte via tokens; de slash vraagt een eigen mask',
        target: 'vergelijk-separator',
    },
    {
        vds: 'vl-box, vl-inline, vl-stack',
        demo: 'layout',
        height: 140,
        fluxTag: null,
        erftOver: null,
        today: 'CSS-klassen vl-padding, vl-group en vl-stacked',
        fit: 'nvt',
        fitNote: 'enkel layout zonder eigen look; flux gebruikt zijn utility-klassen',
        target: 'vergelijk-layout',
    },
];

const fitBadge = (fit: Fit): TemplateResult => {
    const [fg, bg, label] = fit === 'ja' ? ['#1a7f37', '#e6f6ec', 'ja'] : ['#6b7280', '#f0f1f2', 'n.v.t.'];
    return html`<span
        style="color: ${fg}; background: ${bg}; padding: 1px 8px; border-radius: 10px; font-size: 11px; font-weight: 600;"
        >${label}</span
    >`;
};

@customElement('pg-not-in-flux')
export class PgNotInFlux extends LitElement {
    @state()
    private markdown = MARKDOWN_SAMPLE;

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    private renderErftOver(r: NotInFluxRow): TemplateResult {
        if (r.interactive) {
            return this.renderErftOverContent(
                r.fluxTag!,
                html`<flux-markdown style="width: 100%;" .content=${this.markdown}></flux-markdown>`
            );
        }
        if (!r.fluxTag || !r.erftOver) {
            return html`<span style="color: #6b7280;">geen adapter nodig</span>`;
        }
        return this.renderErftOverContent(r.fluxTag, r.erftOver);
    }

    private renderErftOverContent(fluxTag: string, content: TemplateResult): TemplateResult {
        const patches = patchesFor(fluxTag);
        return html`
            <div style="font-size: 11px; font-weight: 600; color: #0055cc; margin-bottom: 6px;">
                <code>${fluxTag}</code>
            </div>
            ${content}
            ${patches.length
                ? html`<div style="font-size: 11px; color: #6b7280; margin-top: 6px;">
                      ${patches.length} ${patches.length === 1 ? 'aanpassing' : 'aanpassingen'}: ${catCountLabel(patches)}
                  </div>`
                : nothing}
        `;
    }

    private fitToFrame(e: Event): void {
        const frame = e.target as HTMLIFrameElement;
        const body = frame.contentDocument?.body;
        if (!body) return;
        const Observer = (frame.contentWindow as (Window & typeof globalThis) | null)?.ResizeObserver ?? ResizeObserver;
        new Observer(() => this.fitFrame(frame)).observe(body);
        this.fitFrame(frame);
        void this.syncFrameMarkdown(frame);
    }

    private fitFrame(frame: HTMLIFrameElement): void {
        const body = frame.contentDocument?.body;
        if (body) frame.style.height = `${Math.ceil(body.getBoundingClientRect().height) + 12}px`;
    }

    private async syncFrameMarkdown(frame: HTMLIFrameElement | null): Promise<void> {
        const md = frame?.contentDocument?.querySelector('vl-markdown') as
            | (HTMLElement & { content: string; updateComplete: Promise<boolean> })
            | null;
        if (!frame || !md) return;
        md.content = this.markdown;
        while (!(await md.updateComplete));
        await new Promise((resolve) => setTimeout(resolve));
        await md.updateComplete;
        this.fitFrame(frame);
    }

    private onMarkdownInput(e: Event): void {
        this.markdown = (e.target as HTMLTextAreaElement).value;
        void this.syncFrameMarkdown(this.querySelector('iframe[data-markdown]'));
    }

    private renderMarkdownEditor(): TemplateResult {
        return html`<div style="margin: 0 0 12px;">
            <label for="niet-in-flux-markdown" style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px;">
                Probeer zelf: pas de markdown aan, beide kolommen werken live bij
            </label>
            <textarea
                id="niet-in-flux-markdown"
                rows="10"
                spellcheck="false"
                style="width: 100%; box-sizing: border-box; font: 13px/1.5 SFMono-Regular, Consolas, Menlo, monospace;
                       padding: 8px 10px; border: 1px solid #8695a8; border-radius: 3px;"
                .value=${this.markdown}
                @input=${this.onMarkdownInput}
            ></textarea>
            <button
                type="button"
                style="margin-top: 6px; font-size: 12px; cursor: pointer;"
                @click=${() => {
                    this.markdown = MARKDOWN_SAMPLE;
                    void this.syncFrameMarkdown(this.querySelector('iframe[data-markdown]'));
                }}
            >
                Voorbeeld terugzetten
            </button>
        </div>`;
    }

    private renderFrame(r: NotInFluxRow): TemplateResult {
        return html`<iframe
            src="/vds-frame.html?demo=${r.demo}"
            style="border: 0; width: 100%; height: ${r.height}px; display: block;"
            title="rauw VDS ${r.vds}, geïsoleerd in een eigen document"
            ?data-markdown=${!!r.interactive}
            @load=${this.fitToFrame}
        ></iframe>`;
    }

    private renderCard(r: NotInFluxRow): TemplateResult {
        const label = (text: string, color: string) =>
            html`<div style="font-size: 12px; font-weight: 600; color: ${color}; margin-bottom: 8px;">${text}</div>`;
        return html`<li
            style="list-style: none; border: 1px solid #d0d7de; border-radius: 8px; padding: 14px 16px; background: #fff;"
        >
            <div style="display: flex; flex-wrap: wrap; gap: 8px 12px; align-items: baseline; margin-bottom: 4px;">
                <vl-title type="h3" style="margin: 0;"><code>${r.vds}</code></vl-title>
                ${fitBadge(r.fit)}
                <a href="#${r.target}" style="font-size: 12px; margin-left: auto;">volledige vergelijking</a>
            </div>
            <dl style="display: grid; grid-template-columns: max-content 1fr; gap: 2px 10px; margin: 0 0 12px; font-size: 13px;">
                <dt style="color: #6b7280;">flux vandaag</dt>
                <dd style="margin: 0;">${r.today}</dd>
                <dt style="color: #6b7280;">aan te passen aan flux-styling</dt>
                <dd style="margin: 0;">${r.fit === 'ja' ? 'ja, ' : ''}${r.fitNote}</dd>
            </dl>
            ${r.interactive ? this.renderMarkdownEditor() : nothing}
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px;">
                <div style="border: 1px dashed #d0d7de; border-radius: 6px; padding: 12px; min-width: 0;">
                    ${label('vds · rauw VDS', '#0055cc')} ${this.renderFrame(r)}
                </div>
                <div style="border: 1px dashed #d0d7de; border-radius: 6px; padding: 12px; min-width: 0;">
                    ${label('erft over · flux-styling', '#0055cc')} ${this.renderErftOver(r)}
                </div>
            </div>
        </li>`;
    }

    render(): TemplateResult {
        return html`
            <section id="niet-in-flux" class="vl-section" aria-labelledby="niet-in-flux-title">
                <div class="vl-content-block vl-content-block--full-width">
                    <vl-title id="niet-in-flux-title" type="h2">VDS-componenten die flux niet aanbiedt</vl-title>
                    <p style="max-width: 900px;">
                        ${ROWS.length} VDS-componenten waar flux vandaag geen web component voor heeft. Per component:
                        rauw VDS naast de <b>erft over</b>-variant (een <code>flux-*</code> die van de VDS-klasse erft en
                        de flux-styling zet), wat flux nu in de plaats gebruikt, en of de look aan de flux-styling aan te
                        passen is.
                    </p>
                    <ul style="display: grid; gap: 16px; max-width: 960px; padding: 0; margin: 0;">
                        ${ROWS.map((r) => this.renderCard(r))}
                    </ul>
                </div>
            </section>
        `;
    }
}
