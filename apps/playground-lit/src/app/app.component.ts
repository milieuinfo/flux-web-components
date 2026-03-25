import { registerWebComponents } from '@domg-wc/common';
import { VlHeader } from '@domg-wc/components/compliance';
import { VlFormCrossValidationComponent } from '@domg-wc/integrations/form';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-component')
export class AppComponent extends LitElement {
    static {
        registerWebComponents([VlHeader, VlFormCrossValidationComponent]);
    }

    render() {
        return html`
            <vl-template>
                <vl-header
                    slot="header"
                    development
                    simple
                    identifier="59188ff6-662b-45b9-b23a-964ad48c2bfb"
                ></vl-header>
                <main slot="main">
                    <section class="vl-section">
                        <div class="vl-content-block vl-content-block--full-width">
                            <vl-title type="h2">Cross-validatie voorbeeld</vl-title>
                            <vl-form-cross-validation></vl-form-cross-validation>
                        </div>
                    </section>
                </main>
            </vl-template>
        `;
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        // gaat shadow dom uitzetten
        return this;
    }
}
