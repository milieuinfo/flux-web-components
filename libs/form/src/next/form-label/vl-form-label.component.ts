import { BaseLitElement, webComponent } from '@domg-wc/common-utilities';
import { globalStylesNext } from '@domg-wc/common-utilities/css/global-styles-decorator';
import { resetStyle } from '@domg/govflanders-style/common';
import { CSSResult, html, PropertyDeclarations, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { formLabelStyles } from './vl-form-label.css';
import { formLabelDefaults } from './vl-form-label.defaults';

@globalStylesNext()
@webComponent('vl-form-label-next')
export class VlFormLabelComponent extends BaseLitElement {
    // Attributes
    private for = formLabelDefaults.for;
    private label = formLabelDefaults.label;
    private block = formLabelDefaults.block;
    private light = formLabelDefaults.light;

    static get styles(): CSSResult[] {
        return [resetStyle, formLabelStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            for: { type: String },
            label: { type: String },
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

        return html` <label for=${this.for} class=${classMap(classList)} part="label"> ${this.label} </label> `;
    }

    private getFormControl(): HTMLElement | null {
        const form = this.closest('form');
        return form?.querySelector(`[id="${this.for}"]`) as HTMLElement | null;
    }

    private focusFormControl() {
        const formControl = this.getFormControl();
        formControl?.focus();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-form-label-next': VlFormLabelComponent;
    }
}
