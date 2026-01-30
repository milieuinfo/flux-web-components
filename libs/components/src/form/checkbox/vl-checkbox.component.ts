import { webComponent } from '@domg-wc/common';
import { vlLegacyStyles } from '@domg-wc/styles';
import { CSSResult, html, nothing, PropertyDeclarations, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { FormControl } from '../form-control';
import { vlCheckboxComponentFluxStyles } from './vl-checkbox.component.flux-css';
import { checkboxDefaults } from './vl-checkbox.defaults';

@webComponent('vl-checkbox')
export class VlCheckboxComponent extends FormControl {
    private static instanceCounter = 0;

    // Attributes
    private block = checkboxDefaults.block;
    private value: string | null = checkboxDefaults.value;
    private checked = checkboxDefaults.checked;
    private isSwitch = checkboxDefaults.isSwitch;
    private indeterminate = checkboxDefaults.indeterminate;

    // Variables
    private initialValue: string | null = null;
    private initialCheckedValue = false;
    private dispatchInput = false;

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlLegacyStyles, vlCheckboxComponentFluxStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            block: { type: Boolean },
            value: { type: String },
            checked: { type: Boolean, reflect: true },
            indeterminate: { type: Boolean, reflect: true },
            isSwitch: { type: Boolean, attribute: 'switch' },
        };
    }

    get validationTarget(): HTMLInputElement | undefined | null {
        return this.shadowRoot?.querySelector('input');
    }

    connectedCallback() {
        super.connectedCallback();

        if (!this.id) {
            // For switch checkboxes, an id is required to link the label and input via the 'for' attribute.
            // Regular checkboxes use implicit labeling but benefit from having an id for accessibility.
            // An id is automatically generated if none is provided.
            this.id = `vl-checkbox-${++VlCheckboxComponent.instanceCounter}`;
        }
        if (!this.initialValue) {
            this.initialValue = this.value;
            this.initialCheckedValue = this.checked;
        }
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);

        if (changedProperties.has('checked') || changedProperties.has('value')) {
            const value = this.checked ? this.value || 'on' : null;
            const detail: { checked: boolean; value?: string | null; currentTarget: HTMLElement } = {
                checked: this.checked,
                currentTarget: this,
            };

            if (this.checked) {
                detail.value = value;
            }

            this.setValue(value);
            this.dispatchEvent(new CustomEvent('vl-change', { composed: true, bubbles: true, detail }));
            if (this.dispatchInput) {
                this.dispatchEvent(new CustomEvent('vl-input', { bubbles: true, composed: true, detail }));
                this.dispatchInput = false;
            }
            this.dispatchEventIfValid(detail);
        }
    }

    render(): TemplateResult {
        return html` ${!this.isSwitch ? this.renderCheckboxDefault() : this.renderCheckboxSwitch()} `;
    }

    resetFormControl() {
        super.resetFormControl();

        this.checked = this.initialCheckedValue;
        this.value = this.initialValue;
    }

    private renderCheckboxDefault(): TemplateResult {
        const classes = {
            'vl-checkbox': true,
            'vl-checkbox--disabled': this.disabled,
            'vl-checkbox--error': this.isInvalid || this.error,
            'vl-checkbox--success': this.success,
            'vl-checkbox--block': this.block,
        };

        return html`
            <label class=${classMap(classes)}>
                <input
                    id=${this.id}
                    name=${this.name || nothing}
                    class="vl-checkbox__toggle"
                    type="checkbox"
                    aria-label=${this.label || nothing}
                    aria-checked=${this.indeterminate ? 'mixed' : nothing}
                    aria-invalid=${this.isInvalid || nothing}
                    ?required=${this.required}
                    ?disabled=${this.disabled}
                    ?error=${this.error}
                    .value=${this.value}
                    .checked=${this.checked}
                    .indeterminate=${this.indeterminate && !this.checked}
                    @change=${this.handleChange}
                />
                <div class="vl-checkbox__label">
                    <i class="vl-checkbox__box" aria-hidden="true"></i>
                    <span>
                        <slot></slot>
                    </span>
                </div>
            </label>
        `;
    }

    private renderCheckboxSwitch(): TemplateResult {
        const classes = {
            'vl-checkbox--switch__wrapper': true,
            'vl-checkbox--disabled': this.disabled,
            'vl-checkbox--error': this.isInvalid || this.error,
            'vl-checkbox--success': this.success,
            'vl-checkbox--block': this.block,
        };

        return html`
            <div class=${classMap(classes)}>
                <input
                    id=${this.id}
                    name=${this.name || nothing}
                    type="checkbox"
                    class="vl-checkbox--switch"
                    role="switch"
                    aria-checked=${this.checked ? 'true' : 'false'}
                    ?required=${this.required}
                    ?disabled=${this.disabled}
                    ?error=${this.error}
                    .value=${this.value}
                    .checked=${this.checked}
                    @change=${this.handleChange}
                />
                <label for=${this.id} class="vl-checkbox__label">
                    <span class="vl-checkbox--switch__label">
                        <span aria-hidden="true"></span>
                    </span>
                    <span>
                        <slot></slot>
                    </span>
                </label>
            </div>
        `;
    }

    private handleChange(e: Event) {
        const target = e.target as HTMLInputElement;
        this.checked = target.checked;
        this.dispatchInput = true;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-checkbox': VlCheckboxComponent;
    }
}
