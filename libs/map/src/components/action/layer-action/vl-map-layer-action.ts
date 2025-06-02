import { webComponent } from '@domg-wc/common';
import { VlMapAction } from '../vl-map-action';
import { VlMapVectorLayer } from '../../layer/vector-layer/vl-map-vector-layer';
import { OlVectorLayerType } from '../../../vl-map.model';

@webComponent('vl-map-layer-action')
export class VlMapLayerAction extends VlMapAction {
    static get _observedAttributes(): string[] {
        return ['layer'];
    }

    connectedCallback(): void {
        this._layerChangedCallback();
        return super.connectedCallback();
    }

    get layer(): OlVectorLayerType {
        return this._layer;
    }

    set layer(layer: OlVectorLayerType) {
        this._layer = layer;
        this._processAction();
    }

    // @ts-expect-error: layer is defined in the parent class
    get _layerElement(): VlMapVectorLayer {
        return (
            this._mapElement.querySelector(`[is-layer][name="${this.getAttribute('layer')}"]`) ||
            this.closest('[is-layer]')
        );
    }

    _layerChangedCallback(): void {
        if (this._layerElement) {
            this.layer = this._layerElement.layer;
        }
    }

    _processAction(layers?: OlVectorLayerType[]): void {
        this._mapElement.ready.then(() => {
            if (this._action) {
                this._mapElement.removeAction(this._action);
            }

            if (this.layer) {
                this._action = this._createAction(this.layer);
                super._processAction();
            }

            if (layers) {
                this._action = this._createAction(layers);
                super._processAction();
            }
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-layer-action': VlMapLayerAction;
    }
}
