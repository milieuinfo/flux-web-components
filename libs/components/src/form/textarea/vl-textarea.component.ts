import { webComponent } from '@domg-wc/common';
import { vlResetStyles } from '@domg-wc/styles';
import { maxLengthValidator, minLengthValidator } from '@open-wc/form-control';
import { CSSResult, html, nothing, PropertyDeclarations, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { FormControl } from '../form-control/form-control';
import { vlTextareaComponentStyles } from './vl-textarea.component.css';
import { textareaDefaults } from './vl-textarea.defaults';

// de resterende tekens worden pas via aria-live aangekondigd vanaf de laatste 10 tekens
const CHARACTER_COUNT_LIVE_THRESHOLD = 10;

@webComponent('vl-textarea')
export class VlTextareaComponent extends FormControl {
    // Attributes
    protected block = textareaDefaults.block;
    protected readonly = textareaDefaults.readonly;
    protected characterCount = textareaDefaults.characterCount;
    protected value = textareaDefaults.value;
    protected placeholder = textareaDefaults.placeholder;
    protected autocomplete = textareaDefaults.autocomplete;
    protected minLength = textareaDefaults.minLength;
    protected maxLength = textareaDefaults.maxLength;
    protected rows = textareaDefaults.rows;
    protected cols = textareaDefaults.cols;

    // Variables
    protected override submitFormOnEnter = false;
    protected initialValue = '';
    protected dispatchInput = false;

    static formControlValidators = [...FormControl.formControlValidators, minLengthValidator, maxLengthValidator];

    static get styles(): CSSResult[] {
        return [vlResetStyles, vlTextareaComponentStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            block: { type: Boolean },
            readonly: { type: Boolean },
            characterCount: { type: Boolean, attribute: 'character-count' },
            value: { type: String, reflect: true },
            placeholder: { type: String },
            autocomplete: { type: String },
            minLength: { type: Number, attribute: 'min-length' },
            maxLength: { type: Number, attribute: 'max-length' },
            rows: { type: Number },
            cols: { type: Number },
        };
    }

    connectedCallback() {
        super.connectedCallback();

        if (!this.initialValue) {
            this.initialValue = this.value;
        }
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);

        if (changedProperties.has('value')) {
            const detail = { value: this.value };

            this.setValue(this.value);
            this.dispatchEvent(new CustomEvent('vl-change', { composed: true, bubbles: true, detail }));
            if (this.dispatchInput) {
                this.dispatchEvent(new CustomEvent('vl-input', { composed: true, bubbles: true, detail }));
                this.dispatchInput = false;
            }
            this.dispatchEventIfValid(detail);
        }
    }

    render(): TemplateResult {
        const classes = {
            'vl-textarea': true,
            'vl-textarea--disabled': this.disabled,
            'vl-textarea--error': this.isInvalid || this.error,
            'vl-textarea--success': this.success,
            'vl-textarea--block': this.block,
        };

        return html`
            <textarea
                id=${this.id || nothing}
                name=${this.name || nothing}
                class=${classMap(classes)}
                aria-label=${this.label || nothing}
                aria-invalid=${this.isInvalid || nothing}
                ?required=${this.required}
                ?disabled=${this.disabled}
                ?error=${this.error}
                ?readonly=${this.readonly}
                .value=${live(this.value)}
                placeholder=${this.placeholder || nothing}
                autocomplete=${this.autocomplete || nothing}
                minlength=${this.minLength ?? nothing}
                maxlength=${this.maxLength ?? nothing}
                rows=${this.rows ?? nothing}
                cols=${this.cols ?? nothing}
                @input=${this.onInput}
            ></textarea>
            ${this.characterCount && this.maxLength != null ? this.renderCharacterCount(this.maxLength) : nothing}
        `;
    }

    private renderCharacterCount(maxLength: number): TemplateResult {
        const remaining = maxLength - this.value.length;
        const announcement =
            remaining <= CHARACTER_COUNT_LIVE_THRESHOLD
                ? `Nog ${remaining} ${remaining === 1 ? 'teken' : 'tekens'} beschikbaar`
                : '';

        return html`
            <div class="vl-textarea__counter" aria-hidden="true">${this.value.length}/${maxLength}</div>
            <div class="vl-textarea__counter-status" aria-live="polite" aria-atomic="true">${announcement}</div>
        `;
    }

    get validationTarget(): HTMLTextAreaElement | undefined | null {
        return this.shadowRoot?.querySelector('textarea');
    }

    resetFormControl() {
        super.resetFormControl();

        this.value = this.initialValue;
    }

    private onInput(event: Event & { target: HTMLTextAreaElement }) {
        this.dispatchInput = true;
        this.value = event?.target?.value;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-textarea': VlTextareaComponent;
    }
}
