import { webComponent } from '@domg-wc/common';
import { html, PropertyDeclarations, TemplateResult } from 'lit';
import { FormControl } from '../../../../components/src/form/form-control/form-control';
import {
    CompositeCustomValidator,
    customErrorValidator,
    rangeOverflowValidator,
    rangeUnderflowValidator,
    requiredAllValidator,
} from './validators';

type SlottedElement = HTMLElement & { value?: string; validationTarget?: HTMLElement };

const SLOTS = ['first', 'second'] as const;
type Slot = (typeof SLOTS)[number];

@webComponent('vl-composite-input')
export class VlCompositeInputComponent extends FormControl {
    customValidator?: CompositeCustomValidator;

    static formControlValidators = [
        requiredAllValidator,
        rangeUnderflowValidator,
        rangeOverflowValidator,
        customErrorValidator,
    ];

    static get properties(): PropertyDeclarations {
        return {
            customValidator: { attribute: false },
        };
    }

    get validationTarget(): HTMLElement | undefined | null {
        const field = this.querySelector<SlottedElement>('[slot="first"]');
        return field?.validationTarget ?? field;
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('vl-input', this.onChildEvent);
        this.addEventListener('vl-change', this.onChildEvent);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('vl-input', this.onChildEvent);
        this.removeEventListener('vl-change', this.onChildEvent);
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);

        if (changedProperties.has('customValidator')) {
            this.syncFormValue();
        }

        if (changedProperties.has('disabled')) {
            this.propagateAttribute('disabled', this.disabled);
        }

        if (changedProperties.has('success')) {
            this.propagateAttribute('success', this.success);
        }

        if (changedProperties.has('error') || changedProperties.has('isInvalid')) {
            this.syncErrorState();
        }
    }

    firstUpdated() {
        this.syncFormValue();
    }

    render(): TemplateResult {
        return html`
            <fieldset part="fieldset" style="border:0;padding:0;display:flex;gap:.5rem;align-items:center;">
                <legend class="vl-u-visually-hidden">${this.label || 'Samengesteld invoerveld'}</legend>
                <slot name="first" @slotchange=${this.onSlotChange}></slot>
                <slot name="second" @slotchange=${this.onSlotChange}></slot>
            </fieldset>
        `;
    }

    resetFormControl() {
        super.resetFormControl();
        this.eachChild((el) => {
            if ('value' in el) el.value = '';
        });
        this.syncFormValue();
    }

    private onSlotChange = () => {
        this.syncFormValue();
    };

    private onChildEvent = (event: Event) => {
        if (event.target === this) return;
        this.syncFormValue();
    };

    private getValue(slot: Slot): string {
        return this.querySelector<SlottedElement>(`[slot="${slot}"]`)?.value ?? '';
    }

    private syncFormValue() {
        const first = this.getValue('first');
        const second = this.getValue('second');
        const complete = first !== '' && second !== '';

        if (!complete) {
            this.setValue(null);
        } else if (this.name) {
            const data = new FormData();
            data.append(`${this.name}-first`, first);
            data.append(`${this.name}-second`, second);
            this.setValue(data);
        } else {
            this.setValue(`${first},${second}`);
        }

        const detail = { first, second };
        this.dispatchEvent(new CustomEvent('vl-change', { composed: true, bubbles: true, detail }));
        this.dispatchEventIfValid(detail);

        this.requestUpdate();
    }

    private syncErrorState() {
        const invalid = this.error || this.isInvalid;
        this.eachChild((el) => {
            const target = el.validationTarget ?? el;
            if (invalid) {
                el.setAttribute('error', '');
                target.setAttribute('aria-invalid', 'true');
            } else {
                el.removeAttribute('error');
                target.removeAttribute('aria-invalid');
            }
        });
    }

    private propagateAttribute(attribute: string, present: boolean) {
        this.eachChild((el) => (present ? el.setAttribute(attribute, '') : el.removeAttribute(attribute)));
    }

    private eachChild(fn: (el: SlottedElement) => void) {
        this.querySelectorAll<SlottedElement>('[slot="first"],[slot="second"]').forEach(fn);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-composite-input': VlCompositeInputComponent;
    }
}
