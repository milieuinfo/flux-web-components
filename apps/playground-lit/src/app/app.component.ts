import { registerWebComponents } from '@domg-wc/common-utilities';
import { vlGridStyles, vlGroupStyles } from '@domg-wc/common-utilities/css';
import { VlSideSheet } from '@domg-wc/components';
import { vlElementsStyle } from '@domg-wc/elements';
import { VlSelectComponent } from '@domg-wc/form/next/select';
import { SelectRichOption, VlSelectRichComponent } from '@domg-wc/form/next/select-rich';
import { vlStackedStyles } from 'libs/common/utilities/src/css/layout/stacked/vl-stacked.css';
import { CSSResult, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { VlButtonComponent } from '@domg-wc/components/next/button';

@customElement('app-component')
export class AppComponent extends LitElement {
    static {
        registerWebComponents([VlButtonComponent, VlSelectComponent, VlSelectRichComponent]);
    }

    static get styles(): (CSSResult | CSSResult[])[] {
        return [vlElementsStyle, vlGroupStyles, vlStackedStyles, vlGridStyles];
    }

    constructor() {
        super();
    }

    private selectOptions = [
        { value: 'value1', label: 'option 1' },
        { value: 'value2', label: 'option 2' },
        { value: 'value3', label: 'option 3' },
    ];

    private _selectElement: VlSelectComponent;

    private get selectElement() {
        this._selectElement = this._selectElement ?? (this.querySelector('#select') as VlSelectComponent);
        return this._selectElement;
    }

    private addOptions = (selectElement?: VlSelectComponent) => {
        const select = selectElement || this.selectElement;
        if (select.options.length === 0) {
            select.options = this.selectOptions;
        }
    };

    private addPlaceholder = (selectElement?: VlSelectComponent) => {
        const select = selectElement || this.selectElement;
        console.log({ select });
        select.setAttribute('placeholder', 'My placeholder');
    };

    private addSelect = () => {
        if (this.selectElement) {
            const newSelect = document.createElement('vl-select-next');
            this.addPlaceholder(newSelect);
            this.addOptions(newSelect);
            this.selectElement.insertAdjacentElement('afterend', newSelect);
        }
    };

    private applyError = () => {
        if (this.selectElement) {
            this.selectElement.setAttribute('error', 'Fout!');
        }
    };

    private openSidesheet = () => {
        const sidesheet = this.querySelector('#sidesheet') as unknown as VlSideSheet;
        sidesheet.toggle();
    };

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        // gaat shadow dom uitzetten
        return this;
    }

    render() {
        return html`
            <h1>playground</h1>
            <form>
                <br />
                <vl-select-rich-next
                    .options=${[...this.geboorteplaatsen2]}
                    @vl-change=${(e) => console.log(e)}
                    multiple
                ></vl-select-rich-next>
                <br />
                <br />
                <vl-select-next .options=${[...this.geboorteplaatsen]} value="waregem"></vl-select-next>
                <br />
                <br />
                <vl-button-next type="reset">reset</vl-button-next>
            </form>
        `;
    }

    private geboorteplaatsen: SelectRichOption[] = [
        { label: 'Hasselt', value: 'hasselt' },
        { label: 'Turnhout', value: 'turnhout' },
        { label: 'Knokke-Heist', value: 'knokke-heist' },
        { label: 'Waregem', value: 'waregem' },
        { label: 'Lier', value: 'lier' },
    ];
    private geboorteplaatsen2: SelectRichOption[] = [
        { label: 'Hasselt', value: 'hasselt' },
        { label: 'Turnhout', value: 'turnhout', selected: true },
        { label: 'Knokke-Heist', value: 'knokke-heist', selected: true },
        { label: 'Waregem', value: 'waregem' },
        { label: 'Lier', value: 'lier' },
    ];
    private geboorteplaatsenTiered: SelectRichOption[] = [
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
