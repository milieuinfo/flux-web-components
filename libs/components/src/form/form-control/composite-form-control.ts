import { PropertyDeclarations } from 'lit';
import { FormControl } from './form-control';
import {
    CompositeCustomValidator,
    CompositeValues,
    customErrorValidator,
    requiredAllValidator,
    SlottableValueElement,
    slotValues,
    slottedFields,
} from './composite-form-control.validators';

type SlottedElement = SlottableValueElement & { validationTarget?: HTMLElement };

export abstract class CompositeFormControl extends FormControl {
    customValidator?: CompositeCustomValidator;

    protected override submitFormOnEnter = false;

    private lastDetailJson: string | undefined;

    static formControlValidators = [requiredAllValidator, customErrorValidator];

    static get properties(): PropertyDeclarations {
        return {
            customValidator: { attribute: false },
        };
    }

    protected get propagatedAttributes(): readonly string[] {
        return ['disabled', 'success'];
    }

    get fieldValues(): CompositeValues {
        return slotValues(this);
    }

    get validationTarget(): HTMLElement | undefined | null {
        const fields = slottedFields(this) as SlottedElement[];
        const empty = this.validity?.valueMissing ? fields.find((el) => !el.value) : undefined;
        const field = empty ?? fields[0];
        return field?.validationTarget ?? field;
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('vl-change', this.onChildEvent);
        this.addEventListener('vl-reset', this.onChildReset);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('vl-change', this.onChildEvent);
        this.removeEventListener('vl-reset', this.onChildReset);
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);

        if (changedProperties.has('customValidator')) {
            this.syncFields();
        }

        this.propagatedAttributes.forEach((attribute) => {
            if (changedProperties.has(attribute)) {
                this.propagateAttribute(
                    attribute,
                    (this as unknown as Record<string, boolean>)[attribute],
                    changedProperties.get(attribute) === true,
                );
            }
        });
    }

    firstUpdated() {
        this.syncFields();
    }

    protected onSlotChange = () => {
        this.propagateState();
        this.syncFields();
    };

    protected onChildEvent = (event: Event) => {
        if (event.target === this) return;
        this.syncFields();
    };

    protected onChildReset = (event: Event) => {
        if (event.target === this) return;
        queueMicrotask(() => {
            if (this.isConnected) this.syncFields();
        });
    };

    protected syncFields() {
        const detail = this.fieldValues;
        this.setValue(null);

        const detailJson = JSON.stringify(detail);
        if (this.lastDetailJson !== undefined && this.lastDetailJson !== detailJson) {
            this.dispatchEvent(new CustomEvent('vl-change', { composed: true, bubbles: true, detail }));
            this.dispatchEventIfValid(detail);
        }
        this.lastDetailJson = detailJson;

        this.requestUpdate();
    }

    protected propagateState() {
        this.propagatedAttributes.forEach((attribute) => {
            if ((this as unknown as Record<string, boolean>)[attribute]) {
                this.propagateAttribute(attribute, true);
            }
        });
    }

    protected propagateAttribute(attribute: string, present: boolean, wasPresent = true) {
        if (!present && !wasPresent) {
            return;
        }
        (slottedFields(this) as SlottedElement[]).forEach((el) =>
            present ? el.setAttribute(attribute, '') : el.removeAttribute(attribute),
        );
    }
}
