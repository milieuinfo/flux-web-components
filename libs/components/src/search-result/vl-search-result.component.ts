import { BaseLitElement, registerWebComponents, webComponent } from '@domg-wc/common';
import { vlLegacyStyles } from '@domg-wc/styles';
import { CSSResult } from 'lit';
import { VlSearchResultPropertiesComponent } from './vl-search-result-properties.component';
import { VlSearchResultTextComponent } from './vl-search-result-text.component';
import { VlSearchResultTitleComponent } from './vl-search-result-title.component';
import { vlSearchResultStyles } from './vl-search-result.css';

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
        return [...vlLegacyStyles, vlSearchResultStyles];
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
