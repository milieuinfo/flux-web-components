import { webComponent } from '@domg-wc/common-utilities';
import Cleave from 'cleave.js';
import { PropertyDeclarations } from 'lit';
import { CleaveInstance, MaskOptions } from '../models/cleave.model';
import { VlInputFieldComponent } from '../input-field';
import { masks } from './masks';
import { maskValidator, maxValueValidator, minValueValidator } from './validators';
import { inputFieldMaskedDefaults } from './vl-input-field-masked.defaults';

@webComponent('vl-input-field-masked')
export class VlInputFieldMaskedComponent extends VlInputFieldComponent {
    // Attributes
    private mask = inputFieldMaskedDefaults.mask;
    private maskPrefix = inputFieldMaskedDefaults.maskPrefix;
    private rawValue = inputFieldMaskedDefaults.rawValue;
    private disableMaskValidation = inputFieldMaskedDefaults.disableMaskValidation; // Wordt enkel gebruikt in de mask validator

    // Variables
    private maskOptions: MaskOptions | null = null;
    private cleaveInstance: CleaveInstance | null = null;

    static formControlValidators = [
        ...VlInputFieldComponent.formControlValidators,
        maskValidator,
        minValueValidator,
        maxValueValidator,
    ];

    static get properties(): PropertyDeclarations {
        return {
            mask: { type: String },
            maskPrefix: { type: String, attribute: 'mask-prefix' },
            rawValue: { type: Boolean, attribute: 'raw-value' },
            disableMaskValidation: { type: Boolean, attribute: 'disable-mask-validation' },
        };
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.maskOptions = {
            ...masks[this.mask],
            onValueChanged: (event: { target: { value: string } }) => {
                this.handleValueChanged(event?.target?.value);
            },
        };

        if (!this.maskOptions) {
            return;
        } else {
            if (this.maskOptions.numericOnly) {
                this.inputMode = 'numeric';
            } else {
                switch (this.mask) {
                    case 'date':
                        this.inputMode = 'decimal';
                        break;
                    default:
                        this.inputMode = 'text';
                }
            }
        }

        if (this.maskPrefix) {
            this.maskOptions.prefix = this.maskPrefix;
        }

        if (!this.value.startsWith(this.maskOptions.prefix || '')) {
            this.value = this.maskOptions.prefix + this.value;
        }
    }

    firstUpdated(changedProperties: Map<string, unknown>) {
        super.firstUpdated(changedProperties);

        if (!this.maskOptions) {
            return;
        }

        this.cleaveInstance = new Cleave(this.validationTarget!, this.maskOptions);
    }

    resetFormControl() {
        super.resetFormControl();

        if (!this.initialValue.startsWith(this.maskOptions?.prefix || '')) {
            this.value = this.maskOptions?.prefix + this.initialValue;
        } else {
            this.value = this.initialValue;
        }
    }

    getRawValue(): string | undefined {
        return this.cleaveInstance?.getRawValue();
    }

    protected onInput() {
        // we definiëren hier een lege functie om de standaard onInput() van VlInputFieldComponent te overschrijven
        // we updaten de transformeerde value alreeds in een cleave.js callback (handleValueChanged()) daarom moet deze functie leeg zijn
        this.dispatchInput = true;
    }

    protected onUpdated(changedProperties: Map<string, unknown>) {
        if (changedProperties.has('value') || changedProperties.has('rawValue')) {
            let value = this.rawValue ? this.getRawValue() || '' : this.value;

            if (this.value === this.maskOptions?.prefix || this.getRawValue() === this.maskOptions?.prefix) {
                // Zet de ElementInternals value op een lege string indien enkel de prefix overschiet.
                // Dit zorgt ervoor dat de required validator kan inkicken als de gebruiker geen waarde heeft ingevuld.
                value = '';
            }

            const detail = { value };

            this.setValue(value);
            this.dispatchEvent(new CustomEvent('vl-change', { composed: true, bubbles: true, detail }));
            if (this.dispatchInput) {
                this.dispatchEvent(new CustomEvent('vl-input', { composed: true, bubbles: true, detail }));
                this.dispatchInput = false;
            }
            this.dispatchEventIfValid(detail);
        }
    }

    private handleValueChanged(value: string) {
        const customTransformFn = this.maskOptions?.customTransformFn;
        const transformedValue = customTransformFn ? customTransformFn(value) : value;
        this.value = transformedValue;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-input-field-masked': VlInputFieldMaskedComponent;
    }
}
