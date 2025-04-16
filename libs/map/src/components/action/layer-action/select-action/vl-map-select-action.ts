import { webComponent } from '@domg-wc/common';
import { VlSelectAction } from '../../../../actions/select/select-action';
import { VlMapLayerStyle } from '../../../layer-style/vl-map-layer-style';
import { VlMapLayerAction } from '../vl-map-layer-action';
import { StyleLike as OlStyleLike } from 'ol/style/Style';
import { Feature as OlFeature } from 'ol';
import { OlVectorLayerType } from '../../../../vl-map.model';

@webComponent('vl-map-select-action')
export class VlMapSelectAction extends VlMapLayerAction {
    protected _style: OlStyleLike;

    // @ts-ignore: Negeer override van de property "style" van de native Element klasse die van een ander type is.
    get style(): OlStyleLike {
        return this._style;
    }

    // @ts-ignore: Negeer override van de property "style" van de native Element klasse die van een ander type is.
    set style(style: VlMapLayerStyle | OlStyleLike) {
        if (style instanceof VlMapLayerStyle) {
            this._style = style.style;
        } else {
            this._style = style;
        }
        this._processAction();
    }

    get _cluster() {
        return this.getAttribute('cluster');
    }

    mark(id: string | number, layer?: OlVectorLayerType): void {
        if (this._action && id) {
            (this._action as VlSelectAction).markFeatureWithId(id, layer || this.layer);
        }
    }

    removeMarks(): void {
        if (this._action) {
            (this._action as VlSelectAction).demarkAllFeatures();
        }
    }

    select(feature: OlFeature): void {
        if (this.action && feature) {
            (this._action as VlSelectAction).selectFeature(feature);
        }
    }

    onSelect(callback: (...args: any[]) => void): void {
        this.__callback = callback;
    }

    reset(): void {
        if (this.action) {
            (this._action as VlSelectAction).clearFeatures();
        }
    }

    /**
     * Specifies if the action is allowed to be performed on a feature and/or a layer. Returns true by default.
     *
     * @param {Object} feature Openlayers feature
     * @param {Object} layer Openlayers layer
     *
     * @Return {boolean} true if the action is allowed to be performed, false if the action may not be performed for the supplied feature and/or layer
     */
    appliesTo(feature: OlFeature, layer: OlVectorLayerType) {
        return true;
    }

    _createAction(layer?: OlVectorLayerType): VlSelectAction {
        const options = {
            style: this.style,
            cluster: this._cluster !== undefined,
            filter: this.appliesTo.bind(this),
        };
        return new VlSelectAction(layer, this._callback, options);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-select-action': VlMapSelectAction;
    }
}
