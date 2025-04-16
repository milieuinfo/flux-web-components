import { webComponent } from '@domg-wc/common';
import { VlMapDeleteAction } from './vl-map-delete-action';

@webComponent('vl-custom-map-delete-action')
export class VlTestCustomMapDeleteAction extends VlMapDeleteAction {
    appliesTo(feature, layer) {
        return feature.id.startsWith('1') && layer.id.startsWith('1');
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-custom-map-delete-action': VlTestCustomMapDeleteAction;
    }
}
