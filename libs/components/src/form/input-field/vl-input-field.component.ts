import { findDeepestElementThroughShadowRoot, webComponent } from '@domg-wc/common';
import { vlAccessibilityStyles } from '@domg-wc/styles';
import { maxLengthValidator, minLengthValidator } from '@open-wc/form-control';
import { CSSResult, html, nothing, PropertyDeclarations, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { FormControl } from '../form-control';
import { maxValueValidator, minValueValidator, patternValidator } from './validators';
import { inputFieldStyles } from './vl-input-field.css';
import { inputFieldDefaults } from './vl-input-field.defaults';

const DESCRIPTION_ID = 'description';

@webComponent('vl-input-field')
export class VlInputFieldComponent extends FormControl {
    // Properties
    regex = inputFieldDefaults.regex; // Wordt enkel gebruikt in de pattern validator

    // Attributes
    private block = inputFieldDefaults.block;
    private readonly = inputFieldDefaults.readonly;
    private type = inputFieldDefaults.type;
    protected value = inputFieldDefaults.value;
    private placeholder = inputFieldDefaults.placeholder;
    private autocomplete = inputFieldDefaults.autocomplete;
    private minLength = inputFieldDefaults.minLength;
    private maxLength = inputFieldDefaults.maxLength;
    private min = inputFieldDefaults.min;
    private max = inputFieldDefaults.max;
    private minExclusive = inputFieldDefaults.minExclusive; // Wordt enkel gebruikt in de min validator
    private maxExclusive = inputFieldDefaults.maxExclusive; // Wordt enkel gebruikt in de max validator
    private pattern = inputFieldDefaults.pattern;
    private inputGroup = inputFieldDefaults.inputGroup;
    private describedby = inputFieldDefaults.describedby;

    // Variables
    protected initialValue = '';
    protected dispatchInput = false;
    private description = '';
    private describerObserver?: MutationObserver;
    private hiddenDescriber?: HTMLElement;

    static formControlValidators = [
        ...FormControl.formControlValidators,
        minLengthValidator,
        maxLengthValidator,
        minValueValidator,
        maxValueValidator,
        patternValidator,
    ];

    static get styles(): CSSResult[] {
        return [inputFieldStyles, vlAccessibilityStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            block: { type: Boolean },
            readonly: { type: Boolean },
            type: { type: String },
            value: { type: String, reflect: true },
            placeholder: { type: String },
            autocomplete: { type: String },
            minLength: { type: Number, attribute: 'min-length' },
            maxLength: { type: Number, attribute: 'max-length' },
            min: { type: Number },
            max: { type: Number },
            minExclusive: { type: Boolean, attribute: 'min-exclusive' },
            maxExclusive: { type: Boolean, attribute: 'max-exclusive' },
            inputMode: { type: String, state: true },
            pattern: { type: String },
            inputGroup: { type: Boolean, attribute: 'input-group' },
            regex: { type: Object },
            describedby: { type: String },
            description: { type: String, state: true },
        };
    }

    connectedCallback() {
        super.connectedCallback();

        if (!this.initialValue) {
            this.initialValue = this.value;
        }
    }

    disconnectedCallback() {
        this.describerObserver?.disconnect();
        this.restoreDescriber();

        super.disconnectedCallback();
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);

        this.onUpdated(changedProperties);
    }

    private isInputGroupPosition = (position: 'first' | 'last') => {
        switch (position) {
            case 'first':
                return this.parentElement?.firstElementChild === this;
            case 'last':
                return this.parentElement?.lastElementChild === this;
            default:
                return false;
        }
    };

    render(): TemplateResult {
        const classes = {
            'vl-input-field': true,
            'vl-input-field--disabled': this.disabled,
            'vl-input-field--error': this.isInvalid || this.error,
            'vl-input-field--success': this.success,
            'vl-input-field--block': this.block,
            'vl-input-field--input-group-left': this.inputGroup && this.isInputGroupPosition('first'),
            'vl-input-field--input-group-right': this.inputGroup && this.isInputGroupPosition('last'),
        };

        return html`
            <input
                id=${this.id || nothing}
                part="input"
                name=${this.name || nothing}
                class=${classMap(classes)}
                type=${this.type}
                aria-label=${this.label || nothing}
                aria-describedby=${this.description ? DESCRIPTION_ID : nothing}
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
                min=${this.min ?? nothing}
                max=${this.max ?? nothing}
                pattern=${ifDefined(this.pattern ? this.pattern : undefined)}
                inputmode=${this.inputMode}
                @input=${this.onInput}
            />
            ${this.description
                ? html`<span id=${DESCRIPTION_ID} class="vl-visually-hidden">${this.description}</span>`
                : nothing}
        `;
    }

    get validationTarget(): HTMLInputElement | undefined | null {
        return this.shadowRoot?.querySelector('input');
    }

    resetFormControl() {
        super.resetFormControl();

        this.value = this.initialValue;
    }

    protected onInput(event: Event & { target: HTMLInputElement }) {
        this.dispatchInput = true;
        this.value = event?.target?.value;
    }

    protected onUpdated(changedProperties: Map<string, unknown>) {
        if (changedProperties.has('describedby')) {
            this.syncDescriber();
        }

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

    private syncDescriber() {
        this.describerObserver?.disconnect();
        this.restoreDescriber();

        const describer = this.describedby
            ? (findDeepestElementThroughShadowRoot(this.parentElement, `#${this.describedby}`) as HTMLElement | null)
            : null;

        this.description = describer?.textContent?.trim() ?? '';

        if (describer) {
            if (!describer.hasAttribute('aria-hidden')) {
                describer.setAttribute('aria-hidden', 'true');
                this.hiddenDescriber = describer;
            }

            this.describerObserver = new MutationObserver(() => {
                this.description = describer.textContent?.trim() ?? '';
            });
            this.describerObserver.observe(describer, { characterData: true, childList: true, subtree: true });
        }
    }

    private restoreDescriber() {
        this.hiddenDescriber?.removeAttribute('aria-hidden');
        this.hiddenDescriber = undefined;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-input-field': VlInputFieldComponent;
    }
}
