import { descriptionDataStyle } from '@domg/govflanders-style/component';
import { resetStyle } from '@domg/govflanders-style/common';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseLitElement } from '@domg-wc/common';

@customElement('vl-description-data-item')
export class VlDescriptionDataItem extends BaseLitElement {
    private label = '';
    private value = '';
    public itemsSize: number | null = null;
    public itemsMediumSize: number | null = null;
    public itemsSmallSize: number | null = null;
    public itemsExtraSmallSize: number | null = null;

    static get styles() {
        return [resetStyle, descriptionDataStyle];
    }

    static get properties() {
        return {
            label: { type: String, attribute: 'label', reflect: true },
            value: { type: String, attribute: 'value', reflect: true },
            itemsSize: { type: Number, attribute: 'items-size', reflect: true },
            itemsMediumSize: { type: Number, attribute: 'items-medium-size', reflect: true },
            itemsSmallSize: { type: Number, attribute: 'items-small-size', reflect: true },
            itemsExtraSmallSize: { type: Number, attribute: 'items-extra-small-size', reflect: true },
        };
    }

    hasSlot(name: string) {
        return [...Array.from(this.children)].find((child) => child.getAttribute('slot') === name);
    }

    render() {
        const labelClass = 'vl-description-data__label';
        const valueClass = 'vl-description-data__value';
        return html`
            ${this.hasSlot('label')
                ? html` <slot name="label" class=${labelClass}></slot>`
                : html`<span class=${labelClass}>${this.label}</span>`}
            ${this.hasSlot('value')
                ? html`
                    <slot name="value" class=${valueClass}></span>`
                : html`<span class=${valueClass}>${this.value}</span>`}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-description-data-item': VlDescriptionDataItem;
    }
}
