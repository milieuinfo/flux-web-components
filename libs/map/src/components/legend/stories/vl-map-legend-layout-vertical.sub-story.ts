import { story } from '@resources/utils-storybook';
import { html } from 'lit';
import '../../../vl-map';
import '../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../../layer/wms-layer/vl-map-tiled-wms-layer/vl-map-tiled-wms-layer';
import '../../layer-style/vl-map-layer-circle-style/vl-map-layer-circle-style';
import '../../layer-style/vl-map-layer-style';
import '../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import '../../layer/vector-layer/vl-map-wfs-layer/vl-map-wfs-layer';
import '../vl-map-legend';
import { mapLegendArgs } from './vl-map-legend.stories-arg';
import { linkStylesToFeatures } from './vl-map-legend.stories-util';

export default story(mapLegendArgs, ({ bottom, left, placement, right, top }) => {
    const features = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [153055.0, 203908.0],
                },
                properties: {
                    styleId: 'style-1',
                },
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [141000.0, 200908.0],
                },
                properties: {
                    styleId: 'style-2',
                },
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [147055.0, 197908.0],
                            [157055.0, 197908.0],
                            [157055.0, 187908.0],
                            [147055.0, 187908.0],
                            [147055.0, 197908.0],
                        ],
                    ],
                },
                properties: {
                    styleId: 'style-3',
                },
            },
        ],
    };

    linkStylesToFeatures();

    return html`
        <vl-map>
            <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
            <vl-map-tiled-wms-layer
                data-vl-layers="grondwater:beschermingszones_2014"
                data-vl-name="Beschermingszones"
                data-vl-url="https://www.dov.vlaanderen.be/geoserver/wms"
            ></vl-map-tiled-wms-layer>
            <vl-map-features-layer .features=${features} data-vl-name="Shapes">
                <vl-map-layer-circle-style
                    id="style-1"
                    data-vl-name="Openbaar onderzoek"
                    data-vl-color="#ffe615"
                    data-vl-size="5"
                    data-vl-border-color="#000"
                    data-vl-border-size="1"
                ></vl-map-layer-circle-style>
                <vl-map-layer-circle-style
                    id="style-2"
                    data-vl-name="Beslissing"
                    data-vl-color="red"
                    data-vl-size="5"
                    data-vl-border-color="#000"
                    data-vl-border-size="1"
                ></vl-map-layer-circle-style>
                <vl-map-layer-style
                    id="style-3"
                    data-vl-name="Wateroppervlaktes"
                    data-vl-color="rgba(255,0,0,0.5)"
                    data-vl-border-color="rgba(255,255,100,1)"
                    data-vl-border-size="2"
                    data-vl-text-feature-attribute-name="label"
                    data-vl-text-background-color="rgba(0,0,255,0.2)"
                    data-vl-text-border-color="rgba(0,255,0,1)"
                    data-vl-text-border-size="3"
                    data-vl-text-color="rgba(255,0,0,1)"
                    data-vl-text-offset-x="10"
                    data-vl-text-offset-y="-10"
                    data-vl-text-size="13px"
                ></vl-map-layer-style>
            </vl-map-features-layer>
            <vl-map-legend
                data-vl-placement=${placement}
                data-vl-layout-vertical
                bottom=${bottom}
                top=${top}
                right=${right}
                left=${left}
            ></vl-map-legend>
        </vl-map>
    `;
});
