import { BaseLitElement, webComponent } from '@domg-wc/common';
import { vlLayoutStyles } from '@domg-wc/styles';
import { CSSResult, PropertyDeclarations, TemplateResult, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { formLabelStyles } from '../form-label';
import { fieldsetStyles } from './vl-fieldset.css';
import { fieldsetDefaults } from './vl-fieldset.defaults';

@webComponent('vl-fieldset')
export class VlFieldsetComponent extends BaseLitElement {
    // Attributes
    private border = fieldsetDefaults.border;
    private horizontal = fieldsetDefaults.horizontal;
    private legend = fieldsetDefaults.legend;
    private legendClasses = fieldsetDefaults.legendClasses;
    
    static get styles(): CSSResult[] {
        return [...vlLayoutStyles, fieldsetStyles, formLabelStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            border: { type: Boolean },
            horizontal: { type: Boolean },
            legend: { type: String },
            legendClasses: { type: String, attribute: 'legend-classes' },
        };
    }

    connectedCallback(): void {
        super.connectedCallback();
        if (!this.legend) {
            console.warn('"legend" is een vereist attribuut van vl-fieldset.');
        }
    }

    private getFirstFocusableElement(): HTMLElement | null {
        const vlFormElementSelectors = [
            'vl-input-field',
            'vl-checkbox',
            'vl-radio',
            'vl-datepicker',
            'vl-select',
            'vl-select-rich',
            'vl-textarea',
            'vl-textarea-rich',
            'vl-upload',
        ];

        return this.querySelector(vlFormElementSelectors.map(selector => `${selector}:not([disabled])`).join(',')) as HTMLElement | null;
    }

    private onLegendClick = (e: MouseEvent): void => {
        e.preventDefault();
        this.getFirstFocusableElement()?.focus();
    }

    render(): TemplateResult {
        const classList = {
            'vl-fieldset': true,
            'vl-fieldset--border': this.border,
            'vl-grid': this.horizontal,
        };

        const legendClassList = {
            'vl-fieldset__legend': true,
            'vl-form__label': true,
            'vl-column': this.horizontal,
            'vl-column--s-12': this.horizontal,
            ...this.legendClasses.split(' ').reduce((classes, className) => ({ ...classes, [className]: true }), {}),
        };

        // Legend is visually hidden for layout purposes, but still available for screen readers.
        // We render a form label instead of the legend to be able to style it properly and add the click event. 
        return html`
            <fieldset class=${classMap(classList)}>
                <legend class="vl-visually-hidden">${this.legend}</legend>
                <vl-form-label class=${classMap(legendClassList)} @click="${this.onLegendClick}" aria-hidden="true">${this.legend}</vl-form-label>
                <slot></slot>
            </fieldset>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-fieldset': VlFieldsetComponent;
    }
}
