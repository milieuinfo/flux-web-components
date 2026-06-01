import { BaseLitElement, webComponent } from '@domg-wc/common';
import { vlResetStyles } from '@domg-wc/styles';
import { CSSResult, html, PropertyDeclarations, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { vlFormMessageComponentStyles } from './vl-form-message.component.css';
import { FormMessageVariant, formMessageDefaults } from './vl-form-message.defaults';

export const FORM_MESSAGE_CUSTOM_TAG = 'vl-form-message';

@webComponent(FORM_MESSAGE_CUSTOM_TAG)
export class VlFormMessageComponent extends BaseLitElement {
    // Attributes
    private show = formMessageDefaults.show;
    private preLine = formMessageDefaults.preLine;
    private for = formMessageDefaults.for; // Wordt enkel gebruikt in de form-control basis klasse
    private state = formMessageDefaults.state; // Wordt enkel gebruikt in de form-control basis klasse
    private variant: FormMessageVariant = formMessageDefaults.variant;
    private validationMessage = '';

    static get styles(): CSSResult[] {
        return [vlResetStyles, vlFormMessageComponentStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            show: { type: Boolean, reflect: true },
            preLine: { type: Boolean, attribute: 'pre-line' },
            for: { type: String },
            state: { type: String },
            variant: { type: String },
            validationMessage: { type: String, attribute: 'validation-message' },
        };
    }

    render(): TemplateResult {
        // Success-styling via de expliciete variant of, voor de auto-success lifecycle, via state="valid".
        const isSuccess = this.variant === 'success' || this.state === 'valid';
        const isAnnotation = this.variant === 'annotation';
        const classes = {
            'vl-form__success': isSuccess,
            'vl-form__annotation': isAnnotation,
            // Error is de default-stijl: alles wat geen success of annotation is.
            'vl-form__error': !isSuccess && !isAnnotation,
            'vl-pre-line': this.preLine,
        };
        // The wrapper is the live region: kept in the a11y tree at all times so that
        // when the inner <p> becomes visible (hidden removed + slot text), screen
        // readers announce the new content. aria-live="polite" waits for an idle
        // moment; aria-atomic ensures the full message is read on each change.
        // Annotation-messages zijn louter informatief en worden altijd getoond, los van de validatielogica.
        return html`
            <div role="status" aria-live="polite" aria-atomic="true">
                <p class=${classMap(classes)} part="text" ?hidden=${!this.show && !isAnnotation}>
                    <slot>${this.validationMessage}</slot>
                </p>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        FORM_MESSAGE_CUSTOM_TAG: VlFormMessageComponent;
    }
}
