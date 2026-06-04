import { BaseLitElement, webComponent } from '@domg-wc/common';
import { vlResetStyles } from '@domg-wc/styles';
import { CSSResult, html, PropertyDeclarations, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { vlFormMessageComponentStyles } from './vl-form-message.component.css';
import { formMessageDefaults } from './vl-form-message.defaults';

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
        return [vlResetStyles, vlFormMessageComponentStyles];
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
        // The wrapper is the live region: kept in the a11y tree at all times so that
        // when the inner <p> becomes visible (hidden removed + slot text), screen
        // readers announce the new content. aria-live="polite" waits for an idle
        // moment; aria-atomic ensures the full message is read on each change.
        return html`
            <div role="status" aria-live="polite" aria-atomic="true">
                <p class=${classMap(classes)} part="text" ?hidden=${!this.show}>
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
