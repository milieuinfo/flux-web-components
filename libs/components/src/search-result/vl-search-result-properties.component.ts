import { webComponent } from '@domg-wc/common-utilities';
import { CSSResult } from 'lit';
import { VlPropertiesComponent } from '../properties';
import { vlSearchResultPropertiesStyles } from './vl-search-result-properties.css';

@webComponent('vl-search-result-properties')
export class VlSearchResultPropertiesComponent extends VlPropertiesComponent {
    static get styles(): CSSResult[] {
        return [vlSearchResultPropertiesStyles];
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-search-result-properties': VlSearchResultPropertiesComponent;
    }
}
