import { webComponent } from '@domg-wc/common';
import OlTileLayer from 'ol/layer/Tile';
import { Projection } from 'ol/proj';
import { Options as OlImageWMSSourceOptions } from 'ol/source/ImageWMS';
import { default as OlTileWMSSource, Options as OlTileWMSSourceOptions } from 'ol/source/TileWMS';
import { TileCoord } from 'ol/tilecoord';
import { VlMapWmsLayer } from '../vl-map-wms-layer';

class TileWMSSource extends OlTileWMSSource {
    private layer: VlMapTiledWmsLayer;

    constructor(layer: VlMapTiledWmsLayer) {
        super({ ...layer._sourceConfig });
        this.layer = layer;
    }

    tileUrlFunction(tileCoord: TileCoord, pixelRatio: number, projection: Projection): string {
        const extent = this.layer.mapElement.map.getView().calculateExtent(this.layer.mapElement.map.getSize());
        this.updateParams({ ...this.layer._sourceConfig.params, tilesorigin: `${extent[0]},${extent[3]}` });

        return super.tileUrlFunction(tileCoord, pixelRatio, projection);
    }
}

@webComponent('vl-map-tiled-wms-layer')
export class VlMapTiledWmsLayer extends VlMapWmsLayer {
    constructor() {
        super(OlTileLayer, OlTileWMSSource);
    }

    get _sourceConfig(): OlImageWMSSourceOptions & OlTileWMSSourceOptions {
        return {
            ...super._sourceConfig,
            params: {
                ...super._sourceConfig.params,
                TILED: true,
            },
        };
    }

    __createSource() {
        return new TileWMSSource(this);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'vl-map-tiled-wms-layer': VlMapTiledWmsLayer;
    }
}
