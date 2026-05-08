import { webComponent } from '@domg-wc/common';
import { vlResetStyles } from '@domg-wc/styles';
import { CSSResult, html, PropertyDeclarations, PropertyValues, TemplateResult } from 'lit';
import { Validator } from '@open-wc/form-control';
import { FormControl } from '../form-control/form-control';
import { VlCheckboxComponent } from '../checkbox/vl-checkbox.component';
import { vlCheckboxGroupComponentStyles } from './vl-checkbox-group.component.css';
import { checkboxGroupDefaults } from './vl-checkbox-group.defaults';

/** Valide wanneer required niet gezet is, of wanneer minstens één checkbox aangevinkt is. */
const atLeastOneCheckedValidator: Validator = {
    attribute: 'required',
    key: 'valueMissing',
    message: 'Selecteer minstens één optie.',
    isValid(instance: HTMLElement): boolean {
        const group = instance as VlCheckboxGroupComponent;
        if (!group.hasAttribute('required')) return true;
        return group.values.length > 0;
    },
};

@webComponent('vl-checkbox-group')
export class VlCheckboxGroupComponent extends FormControl {
    /** De geselecteerde waarden van de groep. Enkel via JS-property instelbaar; gebruik `checked` op de child `<vl-checkbox>` voor de initiële staat. */
    values: string[] = [];

    private readonly = checkboxGroupDefaults.readonly;
    private block = checkboxGroupDefaults.block;
    private initialValues: string[] = [];

    // vl-checkbox gebruikt @click (niet @change), dus preventDefault() op de outer click werkt niet.
    // We herstellen de state in onChildChange via een WeakSet-guard om dubbele verwerking te voorkomen.
    private pendingRestores = new WeakSet<VlCheckboxComponent>();

    static get styles(): CSSResult[] {
        return [vlResetStyles, vlCheckboxGroupComponentStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            values: { type: Array },
            readonly: { type: Boolean },
            block: { type: Boolean },
        };
    }

    static formControlValidators = [...FormControl.formControlValidators, atLeastOneCheckedValidator];

    get validationTarget(): HTMLInputElement | undefined | null {
        const firstCheckbox = this.getCheckboxes()[0];
        return firstCheckbox ? firstCheckbox.validationTarget : null;
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('vl-change', this.onChildChange);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('vl-change', this.onChildChange);
    }

    protected firstUpdated(_changedProperties: PropertyValues) {
        super.firstUpdated(_changedProperties);

        const checked = this.getCheckboxes()
            .filter((cb) => cb.hasAttribute('checked'))
            .map((cb) => cb.getAttribute('value') ?? 'on');

        this.values = checked;
        this.initialValues = [...checked];
        this.setFormValue(this.values);
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);

        if (changedProperties.has('name')) {
            this.updateCheckboxesForAttribute('name');
        }
        if (changedProperties.has('block')) {
            this.updateCheckboxesForAttribute('block');
        }
        if (changedProperties.has('readonly')) {
            this.updateCheckboxesForAttribute('readonly');
        }
        if (changedProperties.has('disabled')) {
            this.updateCheckboxesForAttribute('disabled');
        }
        if (changedProperties.has('error')) {
            this.updateCheckboxesForAttribute('error');
        }
        if (changedProperties.has('isInvalid')) {
            this.getCheckboxes().forEach((cb) => {
                if (this.isInvalid) {
                    cb.setAttribute('error', '');
                    cb.validationTarget?.setAttribute('aria-invalid', 'true');
                } else {
                    cb.removeAttribute('error');
                    cb.validationTarget?.removeAttribute('aria-invalid');
                }
            });
        }
        if (changedProperties.has('success')) {
            this.updateCheckboxesForAttribute('success');
        }
        if (changedProperties.has('values')) {
            this.setFormValue(this.values);
        }
    }

    render(): TemplateResult {
        return html`
            <fieldset>
                <legend class="vl-u-visually-hidden">${this.label}</legend>
                <slot></slot>
            </fieldset>
        `;
    }

    resetFormControl() {
        super.resetFormControl();

        this.values = [...this.initialValues];
        this.syncCheckedStateToChildren(this.initialValues);
        this.setFormValue(this.values);
    }

    private setFormValue(values: string[]) {
        const fd = new FormData();
        values.forEach((v) => fd.append(this.name, v));
        this.setValue(fd);
    }

    private onChildChange = (event: Event) => {
        const detail = (event as CustomEvent).detail as { checked: boolean; value?: string | null };
        const value = detail.value ?? 'on';
        const targetCheckbox = event.target as VlCheckboxComponent;

        if (this.pendingRestores.has(targetCheckbox)) {
            this.pendingRestores.delete(targetCheckbox);
            return;
        }

        if (this.readonly) {
            this.pendingRestores.add(targetCheckbox);
            if (this.values.includes(value)) {
                targetCheckbox.setAttribute('checked', '');
            } else {
                targetCheckbox.removeAttribute('checked');
            }
            targetCheckbox.validationTarget?.focus();
            return;
        }

        if (detail.checked) {
            if (!this.values.includes(value)) {
                this.values = [...this.values, value];
            }
        } else {
            this.values = this.values.filter((v) => v !== value);
        }

        this.setFormValue(this.values);
    };

    private syncCheckedStateToChildren(values: string[]) {
        this.getCheckboxes().forEach((cb) => {
            const value = cb.getAttribute('value') ?? 'on';
            if (values.includes(value)) {
                cb.setAttribute('checked', '');
            } else {
                cb.removeAttribute('checked');
            }
        });
    }

    private updateCheckboxesForAttribute(attribute: string) {
        const key = attribute as keyof VlCheckboxGroupComponent;
        this.getCheckboxes().forEach((cb) =>
            this[key] ? cb.setAttribute(attribute, '') : cb.removeAttribute(attribute)
        );
    }

    private getCheckboxes(): VlCheckboxComponent[] {
        return Array.from(this.querySelectorAll<VlCheckboxComponent>('vl-checkbox'));
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-checkbox-group': VlCheckboxGroupComponent;
    }
}
