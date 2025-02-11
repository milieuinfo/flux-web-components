import { BaseLitElement } from '@domg-wc/common-utilities';
import { vlGridStyles, vlResetStyles } from '@domg-wc/common-utilities/css';
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
            size: { type: Number, attribute: 'data-vl-items-size' },
            mediumSize: { type: Number, attribute: 'data-vl-items-medium-size' },
            smallSize: { type: Number, attribute: 'data-vl-items-small-size' },
            extraSmallSize: { type: Number, attribute: 'data-vl-items-extra-small-size' },
            bordered: { type: Boolean, attribute: 'data-vl-bordered' },
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
            [`vl-column-next--${this.size}`]: this.size,
            [`vl-column-next--m-${this.mediumSize}`]: this.mediumSize,
            [`vl-column-next--s-${this.smallSize}`]: this.smallSize,
            [`vl-column-next--xs-${this.extraSmallSize}`]: this.extraSmallSize,
        };
        return html`
            <div class="vl-description-data ${classMap(classes)}">
                <div class="vl-grid-next">
                    ${[...Array.from(this.children)].map((child, index) => {
                        const name = `item-${index}`;
                        child.setAttribute('slot', name);
                        return html`
                            <div class="vl-column-next ${classMap(columnClasses)}">
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
