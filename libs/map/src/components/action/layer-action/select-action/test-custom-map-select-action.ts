import { webComponent } from '@domg-wc/common';
import { VlMapSelectAction } from './vl-map-select-action';

@webComponent('vl-custom-map-select-action')
export class VlTestCustomMapSelectAction extends VlMapSelectAction {
    appliesTo(feature, layer) {
        return feature.id.startsWith('1') && layer.id.startsWith('1');
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-custom-map-select-action': VlTestCustomMapSelectAction;
    }
}
