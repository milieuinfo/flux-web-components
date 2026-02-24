import { story } from '@resources/utils-storybook';
import { html } from 'lit';
import '../../../vl-map';
import '../../baselayer/vl-map-base-layer-grb-gray/vl-map-base-layer-grb-gray';
import '../../layer-style/vl-map-layer-style';
import '../../layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import '../vl-map-legend';
import { mapLegendArgs } from './vl-map-legend.stories-arg';

// Diagonale arcering patroon (10x10px, rode lijnen)
const diagonalPattern =
    'data:image/svg+xml;base64,' +
    btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">
  <line x1="0" y1="10" x2="10" y2="0" stroke="red" stroke-width="2"/>
</svg>`);

// Gestippeld patroon (10x10px, blauwe stippen)
const dottedPattern =
    'data:image/svg+xml;base64,' +
    btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">
  <circle cx="5" cy="5" r="2" fill="blue"/>
</svg>`);

const linkPatternStylesToFeatures = () => {
    document.addEventListener('DOMContentLoaded', async () => {
        const map: any = document.getElementById('map');
        await map?.ready;
        (document.querySelector('#pattern-diagonal') as any).appliesTo = (feature) =>
            feature.get('styleId') === 'pattern-diagonal';
        (document.querySelector('#pattern-dotted') as any).appliesTo = (feature) =>
            feature.get('styleId') === 'pattern-dotted';
        (document.querySelector('#no-pattern') as any).appliesTo = (feature) =>
            feature.get('styleId') === 'no-pattern';
    });
};

export default story(mapLegendArgs, ({ bottom, left, placement, right, top, layoutVertical }) => {
    const features = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [135000.0, 205000.0],
                            [145000.0, 205000.0],
                            [145000.0, 195000.0],
                            [135000.0, 195000.0],
                            [135000.0, 205000.0],
                        ],
                    ],
                },
                properties: {
                    styleId: 'pattern-diagonal',
                },
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [147000.0, 205000.0],
                            [157000.0, 205000.0],
                            [157000.0, 195000.0],
                            [147000.0, 195000.0],
                            [147000.0, 205000.0],
                        ],
                    ],
                },
                properties: {
                    styleId: 'pattern-dotted',
                },
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [159000.0, 205000.0],
                            [169000.0, 205000.0],
                            [169000.0, 195000.0],
                            [159000.0, 195000.0],
                            [159000.0, 205000.0],
                        ],
                    ],
                },
                properties: {
                    styleId: 'no-pattern',
                },
            },
        ],
    };

    linkPatternStylesToFeatures();

    return html` <vl-map id="map">
        <vl-map-baselayer-grb-gray></vl-map-baselayer-grb-gray>
        <vl-map-features-layer .features=${features} name="Patronen" projection-code="EPSG:31370">
            <vl-map-layer-style
                id="pattern-diagonal"
                name="Diagonale arcering"
                pattern="${diagonalPattern}"
                color="rgba(255,0,0,0.3)"
                border-color="#c00"
                border-size="2"
            ></vl-map-layer-style>
            <vl-map-layer-style
                id="pattern-dotted"
                name="Gestippeld"
                pattern="${dottedPattern}"
                color="rgba(0,0,255,0.3)"
                border-color="#009"
                border-size="2"
            ></vl-map-layer-style>
            <vl-map-layer-style
                id="no-pattern"
                name="Zonder patroon"
                color="rgba(0,128,0,0.5)"
                border-color="#060"
                border-size="2"
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
