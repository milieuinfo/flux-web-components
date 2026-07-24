import { registerWebComponents } from '@domg-wc/common';
import { VlButtonComponent, VlLinkComponent, VlTitleComponent } from '@domg-wc/components/atom';
import {
    VlCheckboxComponent,
    VlDatepickerComponent,
    VlFieldsetComponent,
    VlFormLabelComponent,
    VlFormMessageComponent,
    VlInputFieldComponent,
    VlRadioComponent,
    VlRadioGroupComponent,
    VlSelectComponent,
    VlTextareaComponent,
} from '@domg-wc/components/form';
import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '../adapters/flux-button.component';
import '../adapters/flux-input.component';
import '../adapters/flux-link.component';
import '../adapters/flux-form-controls.component';
import '../adapters/flux-icon.component';
import '../demos/vl-form-demo.component';

import './sections/vds-integration-status.component';
import './sections/vds-overrides-list.component';
import './sections/vds-api-gaps.component';
import './sections/vds-api-gap-details.component';
import './sections/vds-variants.component';
import './sections/vds-layout-primitives.component';
import './sections/vds-forms.component';
import './sections/vds-icon-showcase.component';

@customElement('pg-vds-showcase')
export class PgVdsShowcase extends LitElement {
    @state()
    private overridesOff = false;

    @state()
    private gapsOff = false;

    @state()
    private showTechnical = false;

    static {
        registerWebComponents([
            VlButtonComponent,
            VlLinkComponent,
            VlTitleComponent,
            VlInputFieldComponent,
            VlDatepickerComponent,
            VlCheckboxComponent,
            VlSelectComponent,
            VlRadioGroupComponent,
            VlRadioComponent,
            VlFieldsetComponent,
            VlFormLabelComponent,
            VlFormMessageComponent,
            VlTextareaComponent,
        ]);
    }

    render(): TemplateResult {
        return html`
            <main class="vl-region">
                <label
                    title="Zet alle consument-side flux-overrides aan/uit (flux-look ↔ rauw VDS)"
                    style="position: fixed; right: 20px; bottom: 20px; z-index: 1000;
                           display: inline-flex; align-items: center; gap: 8px;
                           padding: 10px 16px; border-radius: 999px; cursor: pointer;
                           font-size: 13px; font-weight: 600; user-select: none;
                           box-shadow: 0 2px 12px rgba(0, 0, 0, 0.18);
                           border: 1px solid ${this.overridesOff ? '#d9a441' : '#99c2ff'};
                           background: ${this.overridesOff ? '#fff3d6' : '#ffffff'};
                           color: ${this.overridesOff ? '#6b5a1e' : '#0055cc'};"
                >
                    <input
                        type="checkbox"
                        .checked=${this.overridesOff}
                        @change=${(e: Event) => (this.overridesOff = (e.target as HTMLInputElement).checked)}
                    />
                    ${this.overridesOff ? 'Rauw VDS (overrides UIT)' : 'Rauw VDS tonen'}
                </label>
                <div class="vl-content-block vl-content-block--full-width">
                    <vl-title type="h1">FLUX-704 — flux atomen bovenop VDS</vl-title>
                    <p>
                        Upstream <code>@govflanders/vl-ui-design-system-web-components</code> via
                        <code>defineAll('vds')</code>. flux <code>vl-*</code> en VDS
                        <code>vds-*</code> leven samen op één pagina zonder registry-collision.
                    </p>
                    <label
                        title="Toon of verberg alle gap-analyse (token-overrides + API-gaps), globaal en inline onder elk voorbeeld"
                        style="display: inline-flex; align-items: center; gap: 8px;
                               padding: 8px 14px; border-radius: 999px; cursor: pointer;
                               font-size: 13px; font-weight: 600; user-select: none;
                               border: 1px solid ${this.gapsOff ? '#cbd2d9' : '#99c2ff'};
                               background: ${this.gapsOff ? '#f4f6f8' : '#ffffff'};
                               color: ${this.gapsOff ? '#57606a' : '#0055cc'};"
                    >
                        <input
                            type="checkbox"
                            .checked=${!this.gapsOff}
                            @change=${(e: Event) => (this.gapsOff = !(e.target as HTMLInputElement).checked)}
                        />
                        ${this.gapsOff ? 'Gap-analyse: uit' : 'Gap-analyse tonen (token + API)'}
                    </label>
                    <label
                        title="Toon of verberg de technische toelichtingen (hoe de icon-fonts geladen worden, de iframe-tactiek, code-voorbeelden). Standaard uit, zodat de pagina leesbaar blijft voor een niet-technisch publiek."
                        style="display: inline-flex; align-items: center; gap: 8px; margin-left: 8px;
                               padding: 8px 14px; border-radius: 999px; cursor: pointer;
                               font-size: 13px; font-weight: 600; user-select: none;
                               border: 1px solid ${this.showTechnical ? '#99c2ff' : '#cbd2d9'};
                               background: ${this.showTechnical ? '#ffffff' : '#f4f6f8'};
                               color: ${this.showTechnical ? '#0055cc' : '#57606a'};"
                    >
                        <input
                            type="checkbox"
                            .checked=${this.showTechnical}
                            @change=${(e: Event) =>
                                (this.showTechnical = (e.target as HTMLInputElement).checked)}
                        />
                        ${this.showTechnical ? 'Technische details: aan' : 'Technische details tonen'}
                    </label>
                </div>

                <pg-integration-status></pg-integration-status>
                ${this.gapsOff
                    ? nothing
                    : html`<pg-overrides-list></pg-overrides-list>
                          <pg-api-gaps></pg-api-gaps>
                          <pg-api-gap-details></pg-api-gap-details>`}

                <pg-variants .gapsOff=${this.gapsOff} .showTechnical=${this.showTechnical}></pg-variants>
                <pg-layout-primitives
                    .gapsOff=${this.gapsOff}
                    .showTechnical=${this.showTechnical}
                ></pg-layout-primitives>
                <pg-forms .gapsOff=${this.gapsOff}></pg-forms>
                <pg-icon-showcase
                    .gapsOff=${this.gapsOff}
                    .showTechnical=${this.showTechnical}
                ></pg-icon-showcase>
            </main>
        `;
    }

    protected updated(): void {
        const off = this.overridesOff;
        const sel =
            'flux-button, flux-input, flux-link, flux-datepicker, flux-select, flux-checkbox, flux-textarea, flux-fieldset, flux-radio-group';
        this.querySelectorAll(sel).forEach((el) => el.toggleAttribute('bare', off));
        const form = this.querySelector('flux-form-demo');
        form?.shadowRoot?.querySelectorAll(sel).forEach((el) => el.toggleAttribute('bare', off));
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }
}
