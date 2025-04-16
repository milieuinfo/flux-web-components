import { webComponent } from '@domg-wc/common';
import { StyleLike as OlStyleLike } from 'ol/style/Style';
import { VlSelectActions } from '../../../../../actions/select/select-actions';
import { ActionOptions, OlVectorLayerType } from '../../../../../vl-map.model';
import { VlMapLayerStyle } from '../../../../layer-style/vl-map-layer-style';
import { VlMapSelectAction } from '../vl-map-select-action';

@webComponent('vl-map-select-actions')
export class VlMapSelectActions extends VlMapSelectAction {
    private layerNames: string[];
    public olLayers: OlVectorLayerType[];

    public set layers(layers: string[]) {
        this.layerNames = layers;
    }

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

        this._processAction(this.olLayers);
    }

    connectedCallback(): void {
        super.connectedCallback();

        const olLayers: OlVectorLayerType[] = this.layerNames?.map((name) => {
            return this._mapElement.querySelector(`[data-vl-is-layer][data-vl-name="${name}"]`)?._layer;
        });

        this.olLayers = olLayers;
        this._processAction(this.olLayers);
    }

    _createAction(layers?: OlVectorLayerType | OlVectorLayerType[]): VlSelectActions {
        const options: ActionOptions = {
            style: this.style,
            cluster: this._cluster !== undefined,
            filter: this.appliesTo.bind(this),
        };

        return new VlSelectActions(layers as OlVectorLayerType[], this._callback, options);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-select-actions': VlMapSelectActions;
    }
}
