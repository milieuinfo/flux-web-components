import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common-utilities';
import { elementStyles, vlElementsStyle } from '@domg-wc/elements';
import { CSSResult } from 'lit';
import { VlSearchResultPropertiesComponent } from './vl-search-result-properties.component';
import { VlSearchResultTextComponent } from './vl-search-result-text.component';
import { VlSearchResultTitleComponent } from './vl-search-result-title.component';
import { vlSearchResultStyles } from './vl-search-result.css';

@elementStyles()
@webComponent('vl-search-result')
export class VlSearchResultComponent extends BaseLitElement {
    static {
        registerWebComponents([
            VlSearchResultTextComponent,
            VlSearchResultTitleComponent,
            VlSearchResultPropertiesComponent,
        ]);
    }

    static get styles(): CSSResult[] {
        return [...vlElementsStyle, vlSearchResultStyles];
    }

    connectedCallback() {
        super.connectedCallback();
        this.shadowRoot?.append(...this.childNodes);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-search-result': VlSearchResultComponent;
    }
}
