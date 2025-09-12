import { story } from '@domg-wc/common-storybook';
import { html } from 'lit-html';
import '../../../vl-map';
import '../../action/draw-action/measure-action/vl-map-measure-action';
import '../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../../controls/measure-control/vl-map-measure-control';
import '../../controls/vl-map-action-controls';
import '../../layer-style/vl-map-layer-circle-style/vl-map-layer-circle-style';
import '../../layer-style/vl-map-layer-style';
import '../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import '../vl-map-legend';
import { mapLegendArgs } from './vl-map-legend.stories-arg';

export default story(mapLegendArgs, ({ bottom, left, placement, right, top, layoutVertical }) => {
    const features1 = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [147055.0, 197908.0],
                },
                properties: {
                    featureCharacter: 'O',
                    zIndex: '1',
                },
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [147075.0, 197908.0],
                },
                properties: {
                    featureCharacter: 'O',
                    zIndex: '2',
                },
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [147095.0, 197908.0],
                },
                properties: {
                    featureCharacter: 'O',
                    zIndex: '3',
                },
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [147105.0, 197908.0],
                },
                properties: {
                    featureCharacter: 'O',
                    zIndex: '4',
                },
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [147106.0, 197908.0],
                },
                properties: {
                    featureCharacter: 'O',
                    zIndex: '5',
                },
            },
        ],
    };

    const features2 = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [141000.0, 200908.0],
                },
                properties: {
                    featureCharacter: 'B',
                    zIndex: '5',
                },
            },
        ],
    };

    const features3 = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [153055.0, 203908.0],
                },
                properties: {
                    featureCharacter: 'W',
                    zIndex: '5',
                },
            },
        ],
    };

    return html` <vl-map lambert2008>
        <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
        <vl-map-action-controls>
            <vl-map-measure-control></vl-map-measure-control>
        </vl-map-action-controls>
        <vl-map-features-layer data-vl-name="Measurements" projection-code="EPSG:31370">
            <vl-map-layer-style data-vl-border-size="2"></vl-map-layer-style>
            <vl-map-measure-action></vl-map-measure-action>
        </vl-map-features-layer>
        <vl-map-features-layer .features=${features1} data-vl-name="Openbare onderzoeken" projection-code="EPSG:31370">
            <vl-map-layer-circle-style
                data-vl-color="#ffe615"
                data-vl-size="10"
                data-vl-border-color="#000"
                data-vl-border-size="1"
                data-vl-text-feature-attribute-name="featureCharacter"
                data-vl-text-size="bold 14px"
            ></vl-map-layer-circle-style>
        </vl-map-features-layer>
        <vl-map-features-layer .features=${features2} data-vl-name="Beslissingen" projection-code="EPSG:31370">
            <vl-map-layer-circle-style
                data-vl-color="red"
                data-vl-size="10"
                data-vl-border-color="#000"
                data-vl-text-feature-attribute-name="featureCharacter"
                data-vl-border-size="1"
                data-vl-text-size="bold 14px"
            ></vl-map-layer-circle-style>
        </vl-map-features-layer>
        <vl-map-features-layer .features=${features3} data-vl-name="Wateroppervlaktes" projection-code="EPSG:31370">
            <vl-map-layer-circle-style
                data-vl-color="green"
                data-vl-size="10"
                data-vl-border-color="#000"
                data-vl-text-feature-attribute-name="featureCharacter"
                data-vl-border-size="1"
                data-vl-text-size="bold 14px"
            ></vl-map-layer-circle-style>
        </vl-map-features-layer>
        <vl-map-legend
            data-vl-placement=${placement}
            data-vl-layout-vertical=${layoutVertical}
            bottom=${bottom}
            top=${top}
            right=${right}
            left=${left}
        ></vl-map-legend>
    </vl-map>`;
});
