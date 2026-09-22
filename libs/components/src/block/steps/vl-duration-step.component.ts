import { BaseLitElement } from '@domg-wc/common';
import { vlLegacyStyles, vlResetStyles } from '@domg-wc/styles';
import { CSSResult, PropertyDeclarations, PropertyValues, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { vlDurationStepFluxStyles } from './vl-duration-step.flux-css';

@customElement('vl-duration-step')
export class VlDurationStepComponent extends BaseLitElement {
    selected = false;
    interactive = false;

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlResetStyles, vlLegacyStyles, vlDurationStepFluxStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            selected: { type: Boolean, reflect: true },
            interactive: { type: Boolean, reflect: true },
        };
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.setAttribute('role', 'listitem');
    }

    protected updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        if (changedProperties.has('selected')) {
            if (this.selected) {
                this.setAttribute('aria-current', 'true');
            } else {
                this.removeAttribute('aria-current');
            }
        }
    }

    render(): TemplateResult {
        return html`
            <li role="presentation" part="duration-step" class="vl-duration-step">
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
