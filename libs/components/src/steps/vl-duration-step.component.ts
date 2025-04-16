import { BaseLitElement } from '@domg-wc/common';
import { resetStyle } from '@domg/govflanders-style/common';
import { vlLegacyStyles } from '@domg-wc/styles';
import { CSSResult, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { stepsStyle } from '@domg/govflanders-style/component';

@customElement('vl-duration-step')
export class VlDurationStepComponent extends BaseLitElement {
    static get styles(): (CSSResult | CSSResult[])[] {
        return [resetStyle, vlLegacyStyles, stepsStyle];
    }

    render(): TemplateResult {
        return html`
            <li role="listitem" class="vl-duration-step">
                <slot></slot>
            </li>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-duration-step': VlDurationStepComponent;
    }
}
