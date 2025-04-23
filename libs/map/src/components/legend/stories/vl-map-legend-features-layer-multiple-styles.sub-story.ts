import { story } from '@resources/utils-storybook';
import { html } from 'lit';
import '../../../vl-map';
import '../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../../layer-style/vl-map-layer-circle-style/vl-map-layer-circle-style';
import '../../layer-style/vl-map-layer-style';
import '../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import '../vl-map-legend';
import { mapLegendArgs } from './vl-map-legend.stories-arg';
import { linkStylesToFeatures } from './vl-map-legend.stories-util';

export default story(mapLegendArgs, ({ bottom, left, placement, right, top, layoutVertical }) => {
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

    return html` <vl-map id="map">
        <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
        <vl-map-features-layer .features=${features} name="Shapes">
            <vl-map-layer-circle-style
                id="style-1"
                name="Openbaar onderzoek"
                color="#ffe615"
                size="5"
                border-color="#000"
                border-size="1"
            ></vl-map-layer-circle-style>
            <vl-map-layer-circle-style
                id="style-2"
                name="Beslissing"
                color="red"
                size="5"
                border-color="#000"
                border-size="1"
            ></vl-map-layer-circle-style>
            <vl-map-layer-style
                id="style-3"
                name="Wateroppervlaktes"
                color="rgba(255,0,0,0.5)"
                border-color="rgba(255,255,100,1)"
                border-size="2"
                text-feature-attribute-name="label"
                text-background-color="rgba(0,0,255,0.2)"
                text-border-color="rgba(0,255,0,1)"
                text-border-size="3"
                text-color="rgba(255,0,0,1)"
                text-offset-x="10"
                text-offset-y="-10"
                text-size="13px"
            ></vl-map-layer-style>
        </vl-map-features-layer>
        <vl-map-legend
            placement=${placement}
            layout-vertical=${layoutVertical}
            bottom=${bottom}
            top=${top}
            right=${right}
            left=${left}
        ></vl-map-legend>
    </vl-map>`;
});
