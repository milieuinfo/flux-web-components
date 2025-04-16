import { webComponent } from '@domg-wc/common';
import { VlMapModifyAction } from './vl-map-modify-action';

@webComponent('vl-custom-map-modify-action')
export class VlTestCustomMapModifyAction extends VlMapModifyAction {
    appliesTo(feature, layer) {
        return feature && layer ? feature.id.startsWith('1') && layer.id.startsWith('1') : true;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-custom-map-modify-action': VlTestCustomMapModifyAction;
    }
}
