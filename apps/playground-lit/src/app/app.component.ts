import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../vds/showcase/vds-showcase.component';

@customElement('app-component')
export class AppComponent extends LitElement {
    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    render(): TemplateResult {
        return html`<pg-vds-showcase></pg-vds-showcase>`;
    }
}
