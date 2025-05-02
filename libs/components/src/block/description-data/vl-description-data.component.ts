import { BaseLitElement } from '@domg-wc/common';
import { vlGridStyles, vlResetStyles } from '@domg-wc/styles';
import { descriptionDataStyle } from '@domg/govflanders-style/component';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('vl-description-data')
export class VlDescriptionData extends BaseLitElement {
    private size = 0;
    private mediumSize = 0;
    private smallSize = 0;
    private extraSmallSize = 0;
    private bordered = false;

    static get styles() {
        return [vlResetStyles, descriptionDataStyle, vlGridStyles];
    }

    static get properties() {
        return {
            size: { type: Number, attribute: 'items-size' },
            mediumSize: { type: Number, attribute: 'items-medium-size' },
            smallSize: { type: Number, attribute: 'items-small-size' },
            extraSmallSize: { type: Number, attribute: 'items-extra-small-size' },
            bordered: { type: Boolean, attribute: 'bordered' },
        };
    }

    firstUpdated() {
        const observer = new MutationObserver(() => {
            this.requestUpdate();
        });

        observer.observe(this, { subtree: true, childList: true });
    }

    render() {
        this.size = this.size || 12 / this.children.length;
        const classes = {
            'vl-description-data--bordered': this.bordered,
        };
        const columnClasses = {
            [`vl-column--${this.size}`]: this.size,
            [`vl-column--m-${this.mediumSize}`]: this.mediumSize,
            [`vl-column--s-${this.smallSize}`]: this.smallSize,
            [`vl-column--xs-${this.extraSmallSize}`]: this.extraSmallSize,
        };
        return html`
            <div class="vl-description-data ${classMap(classes)}">
                <div class="vl-grid">
                    ${[...Array.from(this.children)].map((child, index) => {
                        const name = `item-${index}`;
                        child.setAttribute('slot', name);
                        return html`
                            <div class="vl-column ${classMap(columnClasses)}">
                                <slot name=${name}></slot>
                            </div>
                        `;
                    })}
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-description-data': VlDescriptionData;
    }
}
