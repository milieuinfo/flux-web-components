import { BaseLitElement, webComponent } from '@domg-wc/common';
import { vlResetStyles } from '@domg-wc/styles';
import { CSSResult, html, PropertyDeclarations, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { formMessageDefaults } from './vl-form-message.defaults';
import { vFormMessageFluxStyles } from './vl-form-message.flux-css';

export const FORM_MESSAGE_CUSTOM_TAG = 'vl-form-message';

@webComponent(FORM_MESSAGE_CUSTOM_TAG)
export class VlFormMessageComponent extends BaseLitElement {
    // Attributes
    private show = formMessageDefaults.show;
    private preLine = formMessageDefaults.preLine;
    private for = formMessageDefaults.for; // Wordt enkel gebruikt in de form-control basis klasse
    private state = formMessageDefaults.state; // Wordt enkel gebruikt in de form-control basis klasse
    private validationMessage = '';

    static get styles(): CSSResult[] {
        return [vlResetStyles, vFormMessageFluxStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            show: { type: Boolean, reflect: true },
            preLine: { type: Boolean, attribute: 'pre-line' },
            for: { type: String },
            state: { type: String },
            validationMessage: { type: String, attribute: 'validation-message' },
        };
    }

    render(): TemplateResult {
        const classes = {
            'vl-form__error': true,
            'vl-pre-line': this.preLine,
        };
        return html`
            <p class=${classMap(classes)} part="text" ?hidden=${!this.show}>
                <slot>${this.validationMessage}</slot>
            </p>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        FORM_MESSAGE_CUSTOM_TAG: VlFormMessageComponent;
    }
}
