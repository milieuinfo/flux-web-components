import { BaseLitElement } from '@domg-wc/common';
import { vlGridStyles, vlResetStyles } from '@domg-wc/styles';
import { descriptionDataStyle } from '@domg/govflanders-style/component';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { VlDescriptionDataItem } from './vl-description-data-item.component';

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

    private buildColumnClasses(child: Element) {
        const item = child instanceof VlDescriptionDataItem ? child : null;
        const size = item?.itemsSize ?? this.size;
        const mediumSize = item?.itemsMediumSize ?? this.mediumSize;
        const smallSize = item?.itemsSmallSize ?? this.smallSize;
        const extraSmallSize = item?.itemsExtraSmallSize ?? this.extraSmallSize;
        return {
            [`vl-column--${size}`]: !!size,
            [`vl-column--m-${mediumSize}`]: !!mediumSize,
            [`vl-column--s-${smallSize}`]: !!smallSize,
            [`vl-column--xs-${extraSmallSize}`]: !!extraSmallSize,
        };
    }

    render() {
        this.size = this.size || 12 / this.children.length;
        const classes = {
            'vl-description-data--bordered': this.bordered,
        };
        return html`
            <div class="vl-description-data ${classMap(classes)}">
                <div class="vl-grid">
                    ${[...Array.from(this.children)].map((child, index) => {
                        const name = `item-${index}`;
                        child.setAttribute('slot', name);
                        return html`
                            <div class="vl-column ${classMap(this.buildColumnClasses(child))}">
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
