import { BaseLitElement, webComponent } from '@domg-wc/common';
import { vlLayoutStyles } from '@domg-wc/styles';
import { CSSResult, PropertyDeclarations, PropertyValues, TemplateResult, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { vlFormLabelComponentStyles } from '../form-label';
import { fieldsetStyles } from './vl-fieldset.css';
import { fieldsetDefaults } from './vl-fieldset.defaults';

@webComponent('vl-fieldset')
export class VlFieldsetComponent extends BaseLitElement {
    // Attributes
    private border = fieldsetDefaults.border;
    private horizontal = fieldsetDefaults.horizontal;
    private legendClasses = fieldsetDefaults.legendClasses;
    private legendText = '';

    static get styles(): CSSResult[] {
        return [...vlLayoutStyles, fieldsetStyles, vlFormLabelComponentStyles];
    }

    static get properties(): PropertyDeclarations {
        return {
            border: { type: Boolean },
            horizontal: { type: Boolean },
            legendClasses: { type: String, attribute: 'legend-classes' },
            legendText: { type: String, state: true },
        };
    }

    firstUpdated(changedProperties: PropertyValues): void {
        super.firstUpdated(changedProperties);
        const legendSlot = this.shadowRoot?.querySelector('slot[name="legend"]') as HTMLSlotElement;
        if (!legendSlot || legendSlot.assignedNodes().length === 0) {
            console.warn('vl-fieldset: De "legend" slot is vereist.');
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

        return this.querySelector(
            vlFormElementSelectors.map((selector) => `${selector}:not([disabled])`).join(',')
        ) as HTMLElement | null;
    }

    private onLegendClick = (e: MouseEvent): void => {
        e.preventDefault();
        this.getFirstFocusableElement()?.focus();
    };

    private onLegendSlotChange(e: Event): void {
        const slot = e.target as HTMLSlotElement;
        this.legendText = slot
            .assignedNodes()
            .map((node) => node.textContent)
            .join('');
    }

    render(): TemplateResult {
        const classList = {
            'vl-fieldset': true,
            'vl-fieldset--border': this.border,
            'vl-grid': this.horizontal,
        };

        const formLabelClassList = {
            'vl-fieldset__legend': true,
            'vl-column': this.horizontal,
            'vl-column--s-12': this.horizontal,
            ...this.legendClasses.split(' ').reduce((classes, className) => ({ ...classes, [className]: true }), {}),
        };

        // Legend is visually hidden for layout purposes, but still available for screen readers.
        // We render a form label instead of the legend to be able to style it properly and add the click event.
        return html`
            <fieldset class=${classMap(classList)}>
                <legend class="vl-visually-hidden">${this.legendText}</legend>
                <vl-form-label class=${classMap(formLabelClassList)} @click="${this.onLegendClick}" aria-hidden="true">
                    <slot name="legend" @slotchange=${this.onLegendSlotChange}></slot>
                </vl-form-label>
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
