import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { vlResetStyles } from '@domg-wc/styles';
import { CSSResult, PropertyDeclarations, TemplateResult, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import { VlTextComponent } from '@domg-wc/components/atom';
import { vlFormLabelComponentStyles } from './vl-form-label.component.css';
import { formLabelDefaults } from './vl-form-label.defaults';

@webComponent('vl-form-label')
export class VlFormLabelComponent extends BaseLitElement {
    static {
        registerWebComponents([VlTextComponent]);
    }

    // Attributes
    private for = formLabelDefaults.for;
    private label = formLabelDefaults.label;
    private annotation = formLabelDefaults.annotation;
    private block = formLabelDefaults.block;
    private light = formLabelDefaults.light;

    static get styles(): CSSResult[] {
        return [vlResetStyles, vlFormLabelComponentStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            for: { type: String },
            label: { type: String },
            annotation: { type: String },
            block: { type: Boolean },
            light: { type: Boolean },
        };
    }

    connectedCallback() {
        super.connectedCallback();

        this.addEventListener('click', this.focusFormControl);
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);

        const formControl = this.getFormControl();
        formControl?.setAttribute('label', this.label);
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        const formControl = this.getFormControl();
        formControl?.removeAttribute('label');
        this.removeEventListener('click', this.focusFormControl);
    }

    render(): TemplateResult {
        const classList = {
            'vl-form__label': true,
            'vl-form__label--block': this.block,
            'vl-form__label--light': this.light,
        };

        return html`
            <label for=${this.for} class=${classMap(classList)} part="label">
                ${this.label ? this.label : html` <slot></slot>`}
                ${when(this.annotation, () => html`<vl-text annotation small part="annotation">${this.annotation}</vl-text>`)}
            </label>
        `;
    }

    private getFormControl(): HTMLElement | null {
        const form = this.closest('form') || this.parentElement;
        return form?.querySelector(`[id="${this.for}"]`) as HTMLElement | null;
    }

    private focusFormControl() {
        const formControl = this.getFormControl();
        formControl?.focus();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-form-label': VlFormLabelComponent;
    }
}
