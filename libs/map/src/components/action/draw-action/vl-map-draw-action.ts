import { VlCompositeVectorLayer } from '../../../actions/layer/composite-vector-layer';
import { VlMapVectorLayer } from '../../layer/vector-layer/vl-map-vector-layer';
import { VlMapLayerAction } from '../layer-action/vl-map-layer-action';
import { VlMapDrawActionStyle } from './draw-action-style/vl-map-draw-action-style';
import { StyleLike as OlStyleLike } from 'ol/style/Style';

export class VlMapDrawAction extends VlMapLayerAction {
    protected _style: OlStyleLike;

    // @ts-ignore: Negeer override van de property "style" van de native Element klasse die van een ander type is.
    get style(): OlStyleLike {
        return this._style;
    }

    // @ts-ignore: Negeer override van de property "style" van de native Element klasse die van een ander type is.
    set style(style: VlMapDrawActionStyle | OlStyleLike) {
        if (style instanceof VlMapDrawActionStyle) {
            this._style = style.style;
        }
        this._processAction();
    }

    onDraw(callback) {
        this.__callback = callback;
    }

    get __drawOptions(): {
        style: OlStyleLike;
        snapping: any;
    } {
        const options = { style: this.style, snapping: undefined };

        if (this.getAttribute('snapping') !== null) {
            options.snapping =
                this.__snappingLayers.length === 0
                    ? true
                    : {
                          layer: this.__createSnappingLayer(),
                          pixelTolerance: this.getAttribute('snapping-pixel-tolerance') || 10,
                          node: false,
                          vertex: false,
                      };
        }
        return options;
    }

    __createSnappingLayer() {
        const snappingLayer = new VlCompositeVectorLayer(
            this.__snappingLayers.map((layer) => layer._layer),
            {}
        );
        const firstVectorLayer = this.__snappingLayers[0];
        snappingLayer.setStyle(firstVectorLayer.style);
        firstVectorLayer.addEventListener(VlMapVectorLayer.EVENTS.styleChanged, (event) => {
            snappingLayer.setStyle(event.target.style);
        });
        return snappingLayer;
    }

    get __snappingLayers(): any {
        return Array.from(this.querySelectorAll('*')).filter((layer) => layer instanceof VlMapVectorLayer);
    }
}
