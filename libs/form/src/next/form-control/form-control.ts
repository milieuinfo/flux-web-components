import { formControlDefaults } from './form-control.defaults';
import { FormControlMixin, programmaticValidator, requiredValidator } from '@open-wc/form-control';
import { LitElement, PropertyDeclarations } from 'lit';
import { submit } from '@open-wc/form-helpers';
import { ERROR_MESSAGE_CUSTOM_TAG } from '../error-message/vl-error-message.component';
import { BaseLitElement } from '@domg-wc/common-utilities';
import 'reflect-metadata';

export abstract class FormControl extends FormControlMixin(BaseLitElement) {
    // Attributes
    id = formControlDefaults.id;
    protected name = formControlDefaults.name;
    protected label = formControlDefaults.label;
    protected required = formControlDefaults.required;
    protected disabled = formControlDefaults.disabled;
    protected error = formControlDefaults.error;
    protected success = formControlDefaults.success;

    // State
    protected isInvalid = false;

    // Variables
    protected submitFormOnEnter = true;

    static formControlValidators = [requiredValidator, programmaticValidator];

    static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

    static get properties(): PropertyDeclarations {
        return {
            id: { type: String },
            name: { type: String },
            label: { type: String },
            required: { type: Boolean },
            disabled: { type: Boolean },
            error: { type: Boolean },
            success: { type: Boolean },
            isInvalid: { type: Boolean, state: true },
        };
    }

    connectedCallback() {
        super.connectedCallback();

        this.addEventListener('keydown', this.onKeydown);
        this.addEventListener('invalid', this.onInvalid);
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        this.removeEventListener('keydown', this.onKeydown);
        this.removeEventListener('invalid', this.onInvalid);
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);

        if (!changedProperties.has('isInvalid')) {
            this.isInvalid = false;
            this.hideErrorMessages();
        }
    }

    abstract get validationTarget(): HTMLElement | undefined | null;

    resetFormControl() {
        this.isInvalid = false;
        this.hideErrorMessages();
        this.dispatchEvent(new Event('vl-reset', { bubbles: true, composed: true }));
    }

    protected dispatchEventIfValid(detail: unknown) {
        if (this.validity.valid) {
            this.dispatchEvent(new CustomEvent('vl-valid', { composed: true, bubbles: true, detail }));
        }
    }

    protected onKeydown(event: KeyboardEvent) {
        if (event.code === 'Enter') {
            if (this.form && this.submitFormOnEnter) {
                submit(this.form);
            }
        }
    }

    private onInvalid(event: Event) {
        event.preventDefault();

        this.isInvalid = true;
        this.focusFirstInvalidInput();
        this.showErrorMessage();
    }

    private focusFirstInvalidInput() {
        const firstInvalidInput = this.form?.querySelector(':invalid');

        if (this === firstInvalidInput) {
            (firstInvalidInput as HTMLElement)?.focus();
            (firstInvalidInput as HTMLElement)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    private showErrorMessage() {
        let errorState = '';

        for (const key in this.validity) {
            if (this.validity[key as keyof ValidityState]) {
                errorState = key;
                break;
            }
        }

        // Zoek de error message die bij de huidige error state hoort
        let errorMessage = this.form?.querySelector(
            `${ERROR_MESSAGE_CUSTOM_TAG}[for="${this.id}"][state="${errorState}"]`
        );

        // Als er geen error message is voor de huidige error state, zoek dan de algemene error message zonder state attribuut
        if (!errorMessage) {
            errorMessage = this.form?.querySelector(`${ERROR_MESSAGE_CUSTOM_TAG}[for="${this.id}"]:not([state])`);
        }

        errorMessage?.setAttribute('validation-message', this.validationMessage);
        errorMessage?.setAttribute('show', '');
    }

    private hideErrorMessages() {
        const errorMessages = this.form?.querySelectorAll(`${ERROR_MESSAGE_CUSTOM_TAG}[for="${this.id}"]`);

        errorMessages?.forEach((errorMessage) => {
            errorMessage.removeAttribute('show');
        });
    }
}
