import { webComponent } from '@domg-wc/common';
import { VlDrawAction } from '../../../../actions/draw/draw-action';
import { VlMapDrawAction } from '../vl-map-draw-action';

@webComponent('vl-map-draw-point-action')
export class VlMapDrawPointAction extends VlMapDrawAction {
    _createAction(layer?): any {
        return new VlDrawAction(layer, 'Point', this._callback, this.__drawOptions);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-draw-point-action': VlMapDrawPointAction;
    }
}
