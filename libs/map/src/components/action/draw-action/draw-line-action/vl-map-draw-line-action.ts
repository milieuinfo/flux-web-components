import { webComponent } from '@domg-wc/common';
import { VlDrawAction } from '../../../../actions/draw/draw-action';
import { VlDrawLineAction } from '../../../../actions/draw/draw-line-action';
import { VlMapDrawAction } from '../vl-map-draw-action';

@webComponent('vl-map-draw-line-action')
export class VlMapDrawLineAction extends VlMapDrawAction {
    _createAction(layer?): VlDrawAction {
        return new VlDrawLineAction(layer, this._callback, this.__drawOptions);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-draw-line-action': VlMapDrawLineAction;
    }
}
