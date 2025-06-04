import { VlDrawAction } from './draw-action';

export class VlDrawLineAction extends VlDrawAction {
    constructor(layer, onDraw, options = {}) {
        super(layer, 'LineString', onDraw, options);
    }
}
