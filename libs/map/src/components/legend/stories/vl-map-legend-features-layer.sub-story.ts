import { story } from '@resources/utils-storybook';
import { html } from 'lit-html';
import '../../../vl-map';
import '../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../../layer-style/vl-map-layer-circle-style/vl-map-layer-circle-style';
import '../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import '../vl-map-legend';
import { mapLegendArgs } from './vl-map-legend.stories-arg';

export default story(mapLegendArgs, ({ bottom, left, placement, right, top, layoutVertical, hideTitle }) => {
    const features = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [147055.0, 197908.0],
                },
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [141000.0, 200908.0],
                },
            },
        ],
    };

    return html` <vl-map id="map">
        <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
        <vl-map-features-layer .features=${features} name="Laag 1">
            <vl-map-layer-circle-style
                name="Openbaar onderzoek"
                color="#ffe615"
                size="5"
                border-color="#000"
                border-size="1"
            ></vl-map-layer-circle-style>
        </vl-map-features-layer>
        <vl-map-legend
            placement=${placement}
            layout-vertical=${layoutVertical}
            hide-title=${hideTitle}
            bottom=${bottom}
            top=${top}
            right=${right}
            left=${left}
        ></vl-map-legend>
    </vl-map>`;
});
