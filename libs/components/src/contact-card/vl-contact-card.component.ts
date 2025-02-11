import { BaseElementOfType, registerWebComponents, webComponent } from '@domg-wc/common-utilities';
import { vlGridStyles, vlResetStyles } from '@domg-wc/common-utilities/css';
import { VlColumnElement, VlGridElement } from '@domg-wc/elements';
import { contactCardStyle } from '@domg/govflanders-style/component';
import contactCardUigStyle from './vl-contact-card.uig-css';

@webComponent('vl-contact-card')
export class VlContactCardComponent extends BaseElementOfType(HTMLElement) {
    static {
        registerWebComponents([VlColumnElement, VlGridElement]);
    }

    constructor() {
        super(`
            <style>
                ${vlResetStyles}
                ${contactCardStyle}
                ${contactCardUigStyle}
                ${vlGridStyles}
            </style>
            <div class="vl-contact-data">
                <div class="vl-grid-next">
                    <div class="vl-column-next vl-column-next--4 vl-column-next--m-12">
                        <slot name="info"></slot>
                    </div>
                    <div class="vl-column-next vl-column-next--8 vl-column-next--m-12">
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
