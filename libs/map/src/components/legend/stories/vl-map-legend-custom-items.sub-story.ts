import { story } from '@resources/utils-storybook';
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
import '../../legend-item/vl-map-legend-item';
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

    return html` <vl-map>
        <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
        <vl-map-action-controls>
            <vl-map-measure-control></vl-map-measure-control>
        </vl-map-action-controls>
        <vl-map-features-layer name="Measurements">
            <vl-map-layer-style border-size="2"></vl-map-layer-style>
            <vl-map-measure-action></vl-map-measure-action>
        </vl-map-features-layer>
        <vl-map-features-layer .features=${features1} name="Openbare onderzoeken">
            <vl-map-layer-circle-style
                color="#ffe615"
                size="10"
                border-color="#000"
                border-size="1"
                text-feature-attribute-name="featureCharacter"
                text-size="bold 14px"
            ></vl-map-layer-circle-style>
        </vl-map-features-layer>
        <vl-map-features-layer .features=${features2} name="Beslissingen">
            <vl-map-layer-circle-style
                color="red"
                size="10"
                border-color="#000"
                text-feature-attribute-name="featureCharacter"
                border-size="1"
                text-size="bold 14px"
            ></vl-map-layer-circle-style>
        </vl-map-features-layer>
        <vl-map-features-layer .features=${features3} name="Wateroppervlaktes">
            <vl-map-layer-circle-style
                color="green"
                size="10"
                border-color="#000"
                text-feature-attribute-name="featureCharacter"
                border-size="1"
                text-size="bold 14px"
            ></vl-map-layer-circle-style>
        </vl-map-features-layer>
        <vl-map-legend
            placement=${placement}
            layout-vertical=${layoutVertical}
            bottom=${bottom}
            top=${top}
            right=${right}
            left=${left}
        >
            <vl-map-legend-item layer="Openbare onderzoeken">
                <span slot="label">Custom Openbare onderzoeken 1</span>
                <span slot="icon"
                    ><div
                        style=${`
                        height: 0.8em;
                        width: 0.8em;
                        border: 1px solid #000;
                        background-color:yellow;
                        border-radius: 50%;`}
                    ></div>
                </span>
            </vl-map-legend-item>
            <vl-map-legend-item layer="Measurements"> </vl-map-legend-item>
            <vl-map-legend-item layer="Openbare onderzoeken">
                <span slot="label">Custom Openbare onderzoeken 2</span>
                <span slot="icon"
                    ><div
                        style=${`
                        height: 0.8em;
                        width: 0.8em;
                        border: 1px solid #000;
                        background-color:purple;`}
                    ></div>
                </span>
            </vl-map-legend-item>
        </vl-map-legend>
    </vl-map>`;
});
