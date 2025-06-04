import { VlDrawAction } from './draw-action';

export class VlDrawPolygonAction extends VlDrawAction {
    constructor(layer, onDraw, options = {}) {
        super(layer, 'Polygon', onDraw, options);
    }
}
