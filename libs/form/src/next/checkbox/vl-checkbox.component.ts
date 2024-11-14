import { webComponent } from '@domg-wc/common-utilities';
import { vlElementsStyle } from '@domg-wc/elements';
import { baseStyle, resetStyle } from '@domg/govflanders-style/common';
import { checkboxStyle } from '@domg/govflanders-style/component';
import { CSSResult, html, nothing, PropertyDeclarations, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { FormControl } from '../form-control/form-control';
import checkboxUigStyle from './vl-checkbox.component.uig-css';
import { checkboxDefaults } from './vl-checkbox.defaults';

@webComponent('vl-checkbox-next')
export class VlCheckboxComponent extends FormControl {
    // Attributes
    private block = checkboxDefaults.block;
    private value = checkboxDefaults.value;
    private checked = checkboxDefaults.checked;
    private isSwitch = checkboxDefaults.isSwitch;

    // Variables
    private initialValue: string | null = null;
    private initialCheckedValue = false;
    private dispatchInput = false;

    static get styles(): (CSSResult | CSSResult[])[] {
        return [resetStyle, baseStyle, vlElementsStyle, checkboxStyle, checkboxUigStyle];
    }

    static get properties(): PropertyDeclarations {
        return {
            block: { type: Boolean },
            value: { type: String },
            checked: { type: Boolean, reflect: true },
            isSwitch: { type: Boolean, attribute: 'switch' },
        };
    }

    connectedCallback() {
        super.connectedCallback();

        if (!this.initialValue) {
            this.initialValue = this.value;
            this.initialCheckedValue = this.checked;
        }
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);

        if (changedProperties.has('checked') || changedProperties.has('value')) {
            const value = this.checked ? this.value || 'on' : null;
            const detail: { checked: boolean; value?: string | null } = { checked: this.checked };

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
                    id=${this.id || nothing}
                    name=${this.name || nothing}
                    class="vl-checkbox__toggle"
                    type="checkbox"
                    aria-invalid=${this.isInvalid || nothing}
                    ?required=${this.required}
                    ?disabled=${this.disabled}
                    ?error=${this.error}
                    .value=${this.value}
                    .checked=${this.checked}
                    @click=${this.toggle}
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
                    id=${this.id || nothing}
                    name=${this.name || nothing}
                    type="checkbox"
                    class="vl-checkbox--switch"
                    role="switch"
                    ?required=${this.required}
                    ?disabled=${this.disabled}
                    ?error=${this.error}
                    .value=${this.value}
                    .checked=${this.checked}
                    @click=${this.toggle}
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

    get validationTarget(): HTMLInputElement | undefined | null {
        return this.shadowRoot?.querySelector('input');
    }

    resetFormControl() {
        super.resetFormControl();

        this.checked = this.initialCheckedValue;
        this.value = this.initialValue;
    }

    private toggle() {
        this.checked = !this.checked;
        this.dispatchInput = true;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-checkbox-next': VlCheckboxComponent;
    }
}
