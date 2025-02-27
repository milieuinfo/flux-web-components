import { BaseLitElement, webComponent } from '@domg-wc/common-utilities';
import { resetStyle } from '@domg/govflanders-style/common';
import { formMessageStyle } from '@domg/govflanders-style/component';
import { CSSResult, html, PropertyDeclarations, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { errorMessageDefaults } from './vl-error-message.defaults';
import errorMessageUigStyle from './vl-error-message.uig-css';

export const ERROR_MESSAGE_CUSTOM_TAG = 'vl-error-message-next';

@webComponent(ERROR_MESSAGE_CUSTOM_TAG)
export class VlErrorMessageComponent extends BaseLitElement {
    // Attributes
    private show = errorMessageDefaults.show;
    private preLine = errorMessageDefaults.preLine;
    private for = errorMessageDefaults.for; // Wordt enkel gebruikt in de form-control basis klasse
    private state = errorMessageDefaults.state; // Wordt enkel gebruikt in de form-control basis klasse
    private validationMessage = '';

    static get styles(): CSSResult[] {
        return [resetStyle, formMessageStyle, errorMessageUigStyle];
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
            <p class=${classMap(classes)} part="text" ?hidden=${!this.show}><slot>${this.validationMessage}</slot></p>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        ERROR_MESSAGE_CUSTOM_TAG: VlErrorMessageComponent;
    }
}
