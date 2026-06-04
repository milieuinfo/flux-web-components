import { formControlDefaults } from './form-control.defaults';
import { FormControlMixin, programmaticValidator, requiredValidator } from '@open-wc/form-control';
import { LitElement, PropertyDeclarations } from 'lit';
import { submit } from '@open-wc/form-helpers';
import { FORM_MESSAGE_CUSTOM_TAG } from '../form-message/vl-form-message.component';
import { BaseLitElement } from '@domg-wc/common';
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
    /** Validate on blur (after focus) with live recovery, instead of only on submit. */
    protected blurValidation = formControlDefaults.blurValidation;

    // State
    protected isInvalid = false;

    // Sticky once true (reset via resetFormControl). Enables live re-validation on input after the first error.
    private erroredOnce = false;

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
            blurValidation: { type: Boolean, attribute: 'blur-validation' },
            isInvalid: { type: Boolean, state: true },
        };
    }

    connectedCallback() {
        super.connectedCallback();

        this.addEventListener('keydown', this.onKeydown);
        this.addEventListener('invalid', this.onInvalid);
        this.addEventListener('vl-input', this.onUserMutation);
        this.addEventListener('focusout', this.onFocusOut);
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        this.removeEventListener('keydown', this.onKeydown);
        this.removeEventListener('invalid', this.onInvalid);
        this.removeEventListener('vl-input', this.onUserMutation);
        this.removeEventListener('focusout', this.onFocusOut);
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);

        if (this.blurValidationEnabled) {
            // update error after programmatic value change (no vl-input fired).
            if (this.isInvalid && !changedProperties.has('isInvalid')) {
                this.runValidation();
            }
            return;
        }

        if (!changedProperties.has('isInvalid')) {
            this.isInvalid = false;
            this.hideFormMessages();
        }
    }

    abstract get validationTarget(): HTMLElement | undefined | null;

    /**
     * True when `blur-validation` is set on this control, or when the associated
     * `<form>` has `blur-validation` or `data-blur-validation` (cascade). OR-logic,
     * no per-field opt-out.
     */
    protected get blurValidationEnabled(): boolean {
        return (
            this.blurValidation ||
            !!this.form?.hasAttribute('blur-validation') ||
            !!this.form?.hasAttribute('data-blur-validation')
        );
    }

    resetFormControl() {
        this.isInvalid = false;
        this.erroredOnce = false;
        this.hideFormMessages();
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
        // Only stick erroredOnce in blur-validation mode (live recovery after submit).
        if (this.blurValidationEnabled) {
            this.erroredOnce = true;
        }
        this.focusFirstInvalidInput();
        this.showFormMessage();
    }

    private onUserMutation() {
        if (!this.blurValidationEnabled) return;
        // Live recovery only after the first error, so pristine input stays silent.
        if (this.erroredOnce) {
            this.runValidation();
        }
    }

    private onFocusOut() {
        if (!this.blurValidationEnabled) return;

        // Defer to next tick so document.activeElement reflects the new focus target.
        // With delegatesFocus, activeElement is the host on internal shadow focus shifts.
        setTimeout(() => {
            if (!this.isConnected) return;
            if (document.activeElement === this) return;
            this.runValidation();
        }, 0);
    }

    private runValidation() {
        if (this.validity.valid) {
            this.isInvalid = false;
            this.hideFormMessages();
        } else {
            this.isInvalid = true;
            this.erroredOnce = true;
            this.showFormMessage();
        }
    }

    private focusFirstInvalidInput() {
        const firstInvalidInput = this.form?.querySelector(':invalid');

        if (this === firstInvalidInput) {
            (firstInvalidInput as HTMLElement)?.focus();
            (firstInvalidInput as HTMLElement)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    private showFormMessage() {
        let errorState = '';

        for (const key in this.validity) {
            if (this.validity[key as keyof ValidityState]) {
                errorState = key;
                break;
            }
        }

        // Zoek de error message die bij de huidige error state hoort
        let errorMessage = this.form?.querySelector(
            `${FORM_MESSAGE_CUSTOM_TAG}[for="${this.id}"][state="${errorState}"]`
        );

        // Als er geen error message is voor de huidige error state, zoek dan de algemene error message zonder state attribuut
        if (!errorMessage) {
            errorMessage = this.form?.querySelector(`${FORM_MESSAGE_CUSTOM_TAG}[for="${this.id}"]:not([state])`);
        }

        if (errorMessage) {
            errorMessage.setAttribute('validation-message', this.validationMessage);
            if (!errorMessage.hasAttribute('show')) {
                errorMessage.setAttribute('show', '');
            }
        }
    }

    private hideFormMessages() {
        const formMessages = this.form?.querySelectorAll(`${FORM_MESSAGE_CUSTOM_TAG}[for="${this.id}"]`);

        formMessages?.forEach((formMessage) => {
            formMessage.removeAttribute('show');
        });
    }
}
