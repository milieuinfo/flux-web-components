import OlVectorSource from 'ol/source/Vector';
import * as OlLoadingstrategy from 'ol/loadingstrategy';

export class VlCompositeVectorSource extends OlVectorSource {
    private __sources: any;

    constructor(sources) {
        super({
            strategy: OlLoadingstrategy.bbox,
            loader: (extent, resolution, projection) => {
                const featurePromises = sources.map((source) => {
                    const url = source.getUrl()(extent, resolution, projection);
                    return fetch(url).then((response) => response.text());
                });
                Promise.all(featurePromises).then((featureResults) => {
                    featureResults.forEach((featureResult, index) => {
                        const features = sources[index].getFormat().readFeatures(featureResult);
                        this.addFeatures(features);
                    });
                });
            },
        });
        this.__sources = sources;
    }

    get sources() {
        return this.__sources;
    }
}
