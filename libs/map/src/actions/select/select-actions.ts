import { VlSelectAction } from './select-action';
import { ActionOptions, OlVectorLayerType } from '../../vl-map.model';
import { Feature as OlFeature } from 'ol';

export class VlSelectActions extends VlSelectAction {
    public layers: OlVectorLayerType[];

    constructor(layers: OlVectorLayerType[], onSelect?: (...args: any[]) => void, options?: ActionOptions) {
        // @ts-ignore: Negeer type error door het meegeven van een array van layers ipv een single layer.
        // Methoden om de layer op te vragen worden in deze file overschreven zodat er altijd maar 1 layer teruggegeven wordt.
        super(layers, onSelect, options);

        this.layers = layers;
        this.getLayer = (): OlVectorLayerType => {
            return this.getLayerByFeature(this.layers, this.selectedFeature) || this.layers[0];
        };
    }

    public get layer(): OlVectorLayerType {
        return this.getLayer();
    }

    private set layer(layer: OlVectorLayerType) {
        this._layer = layer;
    }

    // Een select-action is aan al zijn layers gekoppeld, niet enkel aan de proxy-layer
    // die `layer` (via getLayer) teruggeeft.
    public appliesToLayer(layer: OlVectorLayerType): boolean {
        return this.layers.includes(layer);
    }

    public hasVisibleLayer(): boolean {
        return this.layers.some((layer) => layer?.getVisible());
    }

    protected getLayerByFeature(layers: OlVectorLayerType[], feature: OlFeature): OlVectorLayerType {
        return layers.find((layer) => {
            const features = layer?.getSource()?.getFeatures() || [];
            const clusteredFeature = feature?.get('features')?.[0];

            if (features.indexOf(feature) !== -1) {
                return true;
            }

            return features.some((cluster) => {
                return cluster.get('features')?.some((feature: OlFeature) => {
                    return feature?.getId() === clusteredFeature?.getId();
                });
            });
        });
    }
}
