import { webComponent } from '@domg-wc/common';
import { VlDrawPolygonAction } from '../../../../actions/draw/draw-polygon-action';
import { VlMapDrawAction } from '../vl-map-draw-action';

@webComponent('vl-map-draw-polygon-action')
export class VlMapDrawPolygonAction extends VlMapDrawAction {
    _createAction(layer) {
        return new VlDrawPolygonAction(layer, this._callback, this.__drawOptions);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-draw-polygon-action': VlMapDrawPolygonAction;
    }
}
