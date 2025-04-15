import { BaseLitElement } from '@domg-wc/common-utilities';
import { resetStyle } from '@domg/govflanders-style/common';
import { vlElementsStyle } from '@domg-wc/elements';
import { CSSResult, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { stepsStyle } from '@domg/govflanders-style/component';

@customElement('vl-duration-step')
export class VlDurationStepComponent extends BaseLitElement {
    static get styles(): (CSSResult | CSSResult[])[] {
        return [resetStyle, vlElementsStyle, stepsStyle];
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
