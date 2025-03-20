import { registerWebComponents } from '@domg-wc/common-utilities';
import { vlGridStyles } from '@domg-wc/common-utilities/css';
import { VlHttpErrorMessage, VlTabsComponent } from '@domg-wc/components';
import { vlElementsStyle } from '@domg-wc/elements';
import { SelectRichOption, VlSelectRichComponent } from '@domg-wc/form/next/select-rich';
import { CSSResult, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-component')
export class AppComponent extends LitElement {
    static {
        registerWebComponents([VlTabsComponent, VlSelectRichComponent, VlHttpErrorMessage]);
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlElementsStyle, vlGridStyles];
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <vl-http-error-message
                data-vl-title="Niets gevonden hiervoor."
                data-vl-image="https://static.freeimages.com/assets/icons/logo.svg"
                data-vl-image-alt="Niets gevonden"
            >
            </vl-http-error-message>
        `;
    }

    private geboorteplaatsen: SelectRichOption[] = [
        {
            label: 'België',
            value: '',
            choices: [
                { label: 'Hasselt', value: 'hasselt' },
                { label: 'Turnhout', value: 'turnhout' },
                { label: 'Knokke-Heist', value: 'knokke-heist' },
                { label: 'Waregem', value: 'waregem' },
                { label: 'Lier', value: 'lier' },
            ],
        },
        {
            label: 'Puerto Rico',
            value: '',
            choices: [{ label: 'Rio Piedras', value: 'rio piedras' }],
        },
    ];
}
