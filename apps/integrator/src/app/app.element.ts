import { CSSResult, LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { registerWebComponents } from '@domg-wc/common';
import { VlFormDemoComponent } from '@domg-wc/integration/form/demo/vl-form-demo.component';
import { vlLegacyStyles } from '@domg-wc/styles';

@customElement('app-element')
export class AppElement extends LitElement {
    static override get styles(): (CSSResult | CSSResult[])[] {
        return [vlLegacyStyles];
    }

    static {
        registerWebComponents([VlFormDemoComponent]);
    }

    override render() {
        return html`<vl-form-demo></vl-form-demo>`;
    }
}
