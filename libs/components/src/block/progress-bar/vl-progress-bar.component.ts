import { BaseLitElement } from '@domg-wc/common';
import { html, PropertyDeclarations, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { progressBarDefaults } from './vl-progress-bar.defaults';
import { vlProgressBarFluxStyles } from './vl-progress-bar.flux-css';

@customElement('vl-progress-bar')
export class VlProgressBarComponent extends BaseLitElement {
    private value = progressBarDefaults.value;
    private label = progressBarDefaults.label;
    private labelledby = progressBarDefaults.labelledby;
    private indeterminate = progressBarDefaults.indeterminate;
    private error = progressBarDefaults.error;
    private success = progressBarDefaults.success;

    static get styles() {
        return [vlProgressBarFluxStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            value: {
                type: Number,
                attribute: 'value',
                reflect: true,
            },
            label: {
                type: String,
                attribute: 'label',
            },
            labelledby: {
                type: String,
                attribute: 'labelledby',
            },
            indeterminate: {
                type: Boolean,
                attribute: 'indeterminate',
                reflect: true,
            },
            error: {
                type: Boolean,
                attribute: 'error',
                reflect: true,
            },
            success: {
                type: Boolean,
                attribute: 'success',
                reflect: true,
            },
        };
    }

    connectedCallback(): void {
        super.connectedCallback();

        if (!this.label && !this.labelledby) {
            console.warn('Het invullen van `label` of `labelledby` is verplicht voor de toegankelijkheid.');
        }
        if (this.label && this.labelledby) {
            console.warn('De attributen `label` en `labelledby` mogen niet beiden ingevuld zijn.');
        }
    }

    private get classes() {
        return {
            'vl-progress-bar': true,
            'vl-progress-bar--indeterminate': this.indeterminate,
            'vl-progress-bar--error': this.error,
            'vl-progress-bar--success': this.success,
        };
    }

    private get progressValue(): string | undefined {
        if (this.indeterminate) return undefined;
        return Math.max(0, Math.min(100, this.value)).toFixed(0);
    }

    render(): TemplateResult {
        return html`
            <div
                class=${classMap(this.classes)}
                role="progressbar"
                aria-valuenow=${ifDefined(this.progressValue)}
                aria-label=${ifDefined(this.label || (!this.labelledby ? 'Voortgang' : undefined))}
                aria-labelledby=${ifDefined(this.labelledby ? this.labelledby : undefined)}
            >
                <div class="vl-progress-bar__track">
                    <div
                        class="vl-progress-bar__progress"
                        style="${this.indeterminate ? '' : `width: ${this.progressValue}%`}"
                    ></div>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-progress-bar': VlProgressBarComponent;
    }
}
