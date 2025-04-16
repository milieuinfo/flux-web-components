import { webComponent } from '@domg-wc/common';
import { VlCompositeVectorLayer } from '../../../../actions/layer/composite-vector-layer';
import { VlModifyAction } from '../../../../actions/modify/modify-action';
import { VlMapVectorLayer } from '../../../layer/vector-layer/vl-map-vector-layer';
import { VlMapLayerAction } from '../vl-map-layer-action';

@webComponent('vl-map-modify-action')
export class VlMapModifyAction extends VlMapLayerAction {
    private __snappingLayer: VlCompositeVectorLayer;
    private __onSnappingLayerStyleChanged;

    static get _observedAttributes() {
        return ['snapping', 'snapping-pixel-tolerance'];
    }

    disconnectedCallback() {
        this.__removeSnappingLayerStyleChangedEventListener();
    }

    /**
     * Configure the function that will be called after processing an action.
     *
     * @param {Function} callback function with the following arguments:
     *                            - {ol.Feature} the modified feature
     *                            - {Function} reject callback with the modified feature as argument, which will revert the feature back to its original state
     */
    onModify(callback) {
        this.__callback = callback;
    }

    /**
     * Specifies if the action is allowed to be performed on a feature and/or a layer. Returns true by default.
     *
     * @param {Object} feature Openlayers feature
     * @param {Object} layer Openlayers layer
     *
     * @Return {boolean} true if the action is allowed to be performed, false if the action may not be performed for the supplied feature and/or layer
     */
    appliesTo(feature, layer) {
        return true;
    }

    _createAction(layer?) {
        const options = {
            snapping: this.__snappingOptions,
            filter: this.appliesTo.bind(this),
        };
        return new VlModifyAction(layer, this._callback, options);
    }

    _snappingChangedCallback() {
        this._processAction();
    }

    _snappingPixelToleranceChangedCallback() {
        this._processAction();
    }

    get __snappingOptions() {
        if (this.dataset.vlSnapping !== undefined && this.__snappingLayers.length > 0) {
            return {
                layer: this.__createSnappingLayer(),
                pixelTolerance: this.dataset.vlSnappingPixelTolerance || 10,
                node: false,
                vertex: false,
            };
        }

        return true;
    }

    __createSnappingLayer() {
        this.__snappingLayer = new VlCompositeVectorLayer(
            this.__snappingLayers.map((layer) => layer._layer),
            {}
        );
        this.__addSnappingLayerStyleChangedEventListener();
        return this.__snappingLayer;
    }

    __addSnappingLayerStyleChangedEventListener() {
        if (this.__snappingLayers && this.__snappingLayers.length > 0) {
            const firstVectorLayer = this.__snappingLayers[0];
            this.__snappingLayer.setStyle(firstVectorLayer.style);
            this.__onSnappingLayerStyleChanged = (event) => this.__snappingLayer.setStyle(event.target.style);
            firstVectorLayer.addEventListener(VlMapVectorLayer.EVENTS.styleChanged, this.__onSnappingLayerStyleChanged);
        }
    }

    __removeSnappingLayerStyleChangedEventListener() {
        if (this.__snappingLayers && this.__snappingLayers.length > 0) {
            this.__snappingLayers[0].removeEventListener(
                VlMapVectorLayer.EVENTS.styleChanged,
                this.__onSnappingLayerStyleChanged
            );
        }
    }

    get __snappingLayers(): any {
        return Array.from(this.querySelectorAll('vl-map-wfs-layer'));
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-modify-action': VlMapModifyAction;
    }
}
