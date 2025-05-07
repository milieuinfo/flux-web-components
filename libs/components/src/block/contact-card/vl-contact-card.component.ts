import { BaseElementOfType, webComponent } from '@domg-wc/common';
import { vlGridStyles, vlResetStyles } from '@domg-wc/styles';
import { contactCardStyle } from '@domg/govflanders-style/component';
import { vlContactCardFluxStyles } from './vl-contact-card.flux-css';

@webComponent('vl-contact-card')
export class VlContactCardComponent extends BaseElementOfType(HTMLElement) {
    constructor() {
        super(`
            <style>
                ${vlResetStyles}
                ${contactCardStyle}
                ${vlContactCardFluxStyles}
                ${vlGridStyles}
            </style>
            <div class="vl-contact-data">
                <div class="vl-grid">
                    <div class="vl-column vl-column--4 vl-column--m-12">
                        <slot name="info"></slot>
                    </div>
                    <div class="vl-column vl-column--8 vl-column--m-12">
                        <slot name="properties"></slot>
                    </div>
                </div>
            </div>
         `);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-contact-card': VlContactCardComponent;
    }
}
