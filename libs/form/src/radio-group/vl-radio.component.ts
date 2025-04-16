import { BaseLitElement, webComponent } from '@domg-wc/common';
import { vlLegacyStyles } from '@domg-wc/styles';
import { baseStyle, resetStyle } from '@domg/govflanders-style/common';
import { radioStyle } from '@domg/govflanders-style/component';
import { CSSResult, html, LitElement, nothing, PropertyDeclarations, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import radioUigStyle from './vl-radio.component.uig-css';
import { radioDefaults } from './vl-radio.defaults';

@webComponent('vl-radio')
export class VlRadioComponent extends BaseLitElement {
    // Attributes
    id = radioDefaults.id;
    private name = radioDefaults.name;
    private value = radioDefaults.value;
    private label = radioDefaults.label;
    private block = radioDefaults.block;
    private readonly = radioDefaults.readonly;
    private disabled = radioDefaults.disabled;
    private error = radioDefaults.error;
    private success = radioDefaults.success;
    private checked = radioDefaults.checked;

    // Variables
    private dispatchInput = false;

    static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

    static get styles(): (CSSResult | CSSResult[])[] {
        return [resetStyle, baseStyle, vlLegacyStyles, radioStyle, radioUigStyle];
    }

    static get properties(): PropertyDeclarations {
        return {
            id: { type: String },
            name: { type: String },
            value: { type: String },
            label: { type: String },
            disabled: { type: Boolean },
            readonly: { type: Boolean },
            error: { type: Boolean },
            success: { type: Boolean },
            block: { type: Boolean },
            checked: { type: Boolean, reflect: true },
        };
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);

        if (changedProperties.has('checked') || changedProperties.has('value')) {
            if (this.checked) {
                const detail = { checked: true, value: this.value };

                this.dispatchEvent(new CustomEvent('vl-change', { composed: true, bubbles: true, detail }));
                if (this.dispatchInput) {
                    this.dispatchEvent(new CustomEvent('vl-input', { bubbles: true, composed: true, detail }));
                    this.dispatchInput = false;
                }
                this.dispatchEvent(new CustomEvent('vl-valid', { composed: true, bubbles: true, detail }));
            }
        }
    }

    render(): TemplateResult {
        const classes = {
            'vl-radio': true,
            'vl-radio--block': this.block,
            'vl-radio--disabled': this.disabled,
            'vl-radio--error': this.error,
            'vl-radio--success': this.success,
        };
        return html`
            <label id="radio-label" class=${classMap(classes)} for=${this.id}>
                <input
                    id=${this.id || nothing}
                    name=${this.name || nothing}
                    class="vl-radio__toggle"
                    type="radio"
                    aria-label=${this.label || nothing}
                    .value=${live(this.value)}
                    .checked=${this.checked}
                    ?disabled=${this.disabled}
                    ?readonly=${this.readonly}
                    @change=${this.onChange}
                    @input=${this.onInput}
                />
                <div class="vl-radio__label">
                    <span id="label-text">
                        <slot></slot>
                    </span>
                </div>
            </label>
        `;
    }

    get validationTarget(): HTMLInputElement | undefined | null {
        return this.shadowRoot?.querySelector('input');
    }

    private onChange() {
        this.checked = !this.checked;
    }

    private onInput() {
        this.dispatchInput = true;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-radio': VlRadioComponent;
    }
}
