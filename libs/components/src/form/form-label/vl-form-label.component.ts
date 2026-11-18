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

    private slotObserver = new MutationObserver(() => this.setLabelOnFormControl());

    connectedCallback() {
        super.connectedCallback();

        this.addEventListener('click', this.focusFormControl);
        this.slotObserver.observe(this, { childList: true, characterData: true, subtree: true });
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);

        this.setLabelOnFormControl();
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        const formControl = this.getFormControl();
        formControl?.removeAttribute('label');
        this.removeEventListener('click', this.focusFormControl);
        this.slotObserver.disconnect();
    }

    // De <label for> in de shadow DOM bereikt de form control niet, dus de form control krijgt de labeltekst als
    // attribuut. Labeltekst in de default slot kan HTML bevatten, daarom enkel de tekstwaarde.
    private setLabelOnFormControl() {
        const label = this.label || this.getSlotText();
        this.getFormControl()?.setAttribute('label', label);
    }

    // Verborgen tekst en de tekst van een tooltip horen niet in de toegankelijke naam.
    private getSlotText(): string {
        const walker = document.createTreeWalker(this, NodeFilter.SHOW_TEXT, {
            acceptNode: (node) => {
                const excluded = node.parentElement?.closest('[aria-hidden="true"], [hidden], vl-tooltip');
                return excluded && excluded !== this && this.contains(excluded)
                    ? NodeFilter.FILTER_REJECT
                    : NodeFilter.FILTER_ACCEPT;
            },
        });
        let text = '';
        while (walker.nextNode()) {
            text += walker.currentNode.textContent;
        }
        return text.replace(/\s+/g, ' ').trim();
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
                ${when(
                    this.annotation,
                    () => html`<vl-text annotation small part="annotation">${this.annotation}</vl-text>`,
                )}
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
