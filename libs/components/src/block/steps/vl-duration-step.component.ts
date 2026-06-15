import { BaseLitElement } from '@domg-wc/common';
import { vlLegacyStyles, vlResetStyles } from '@domg-wc/styles';
import { CSSResult, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { vlDurationStepFluxStyles } from './vl-duration-step.flux-css';

@customElement('vl-duration-step')
export class VlDurationStepComponent extends BaseLitElement {
    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlResetStyles, vlLegacyStyles, vlDurationStepFluxStyles];
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.setAttribute('role', 'listitem');
    }

    render(): TemplateResult {
        return html`
            <li role="presentation" class="vl-duration-step">
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
