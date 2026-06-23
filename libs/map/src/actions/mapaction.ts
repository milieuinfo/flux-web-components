import OlInteraction from 'ol/interaction/Interaction';
import { VlMapLayerStyle } from '../components/layer-style/vl-map-layer-style';
import { StyleLike as OlStyleLike } from 'ol/style/Style';
import { VlMapAction } from '../components/action/vl-map-action';
import { ActionOptions, OlVectorLayerType } from '../vl-map.model';
import { Map as OlMap } from 'ol';
import { VlCustomMap } from './map/custom-map';

export class VlBaseMapAction {
    protected _interactions: OlInteraction[];
    protected _layer: OlVectorLayerType;
    public map: OlMap;
    public options: ActionOptions;
    public style: VlMapLayerStyle | OlStyleLike;
    public hoverStyle: VlMapLayerStyle | OlStyleLike;
    public element: VlMapAction;

    constructor(interactions: OlInteraction | OlInteraction[]) {
        if (!Array.isArray(interactions)) {
            interactions = [interactions];
        }
        this._interactions = [];
        interactions.forEach((interaction) => {
            this.addInteraction(interaction);
        });
    }

    get layer(): OlVectorLayerType {
        return this._layer;
    }

    set layer(layer: OlVectorLayerType) {
        this._layer = layer;
    }

    appliesToLayer(layer: OlVectorLayerType): boolean {
        return this._layer === layer;
    }

    hasVisibleLayer(): boolean {
        return !!this._layer?.getVisible();
    }

    get interactions(): OlInteraction[] {
        return this._interactions;
    }

    set interactions(interactions: OlInteraction[]) {
        this._interactions = interactions;
    }

    addInteraction(interaction: OlInteraction): void {
        interaction.setActive(false);
        this._interactions.push(interaction);
    }

    activate(): void {
        this._interactions.forEach((interaction: OlInteraction) => {
            interaction.setActive(true);
        });
    }

    deactivate(): void {
        this._interactions.forEach((interaction: OlInteraction) => {
            interaction.setActive(false);
        });
    }

    getControl() {
        return (this.map as VlCustomMap).getActionControlWithIdentifier(this.element.identifier);
    }
}
