import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlMap } from '../../vl-map';
import { VlMapFeaturesLayer } from './vector-layer/vl-map-features-layer/vl-map-features-layer';
import { VlMapWfsLayer } from './vector-layer/vl-map-wfs-layer/vl-map-wfs-layer';
import { VlMapImageWmsLayer } from './wms-layer/vl-map-image-wms-layer/vl-map-image-wms-layer';
import { VlMapTiledWmsLayer } from './wms-layer/vl-map-tiled-wms-layer/vl-map-tiled-wms-layer';
import { VlMapWmtsLayer } from './wmts-layer/vl-map-wmts-layer';

registerWebComponents([
    VlMap,
    VlMapFeaturesLayer,
    VlMapImageWmsLayer,
    VlMapTiledWmsLayer,
    VlMapWmtsLayer,
    VlMapWfsLayer,
]);

const featuresLayerFixture = html`
    <vl-map>
        <vl-map-features-layer
            name="testlaag"
            min-resolution="2"
            max-resolution="4"
            features='{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[147055,197908]},"properties":null,"id":1}]}'
        >
        </vl-map-features-layer>
    </vl-map>
`;

const imageWmsLayerFixture = html`
    <vl-map>
        <vl-map-image-wms-layer
            url="http://dummy/wms-adjusted"
            layers="layer1"
            styles="style1,style2"
            version="1.1.1"
            opacity="0.75"
            min-resolution="10"
            max-resolution="1000"
            name="adjusted"
        >
        </vl-map-image-wms-layer>
    </vl-map>
`;

const tiledWmsLayerFixture = html`
    <vl-map>
        <vl-map-tiled-wms-layer
            url="http://dummy/wms-adjusted"
            layers="layer1"
            styles="style1,style2"
            version="1.1.1"
            opacity="0.75"
            min-resolution="10"
            max-resolution="1000"
            name="adjusted"
        >
        </vl-map-tiled-wms-layer>
    </vl-map>
`;

const wfsLayerFixture = html`
    <vl-map>
        <vl-map-wfs-layer
            name="foobar"
            url="http://dummy/wfs"
            layers="layer1,layer2"
            min-resolution="10"
            max-resolution="1000"
        >
        </vl-map-wfs-layer>
    </vl-map>
`;

const wmtsLayerFixture = html`
    <vl-map>
        <vl-map-wmts-layer
            url="http://dummy/wmts"
            layer="grb_sel"
            name="GRB Wegenkaart"
            min-resolution="2"
            max-resolution="4"
        >
        </vl-map-wmts-layer>
    </vl-map>
`;

const featuresLayersFixture = html`
    <vl-map>
        <vl-map-features-layer></vl-map-features-layer>
        <vl-map-features-layer></vl-map-features-layer>
    </vl-map>
`;

const imageWmsLayersFixture = html`
    <vl-map>
        <vl-map-image-wms-layer url="http://dummy/wms-adjusted" layers="layer1"></vl-map-image-wms-layer>
        <vl-map-image-wms-layer url="http://dummy/wms-adjusted" layers="layer1"></vl-map-image-wms-layer>
    </vl-map>
`;

const tiledWmsLayersFixture = html`
    <vl-map>
        <vl-map-tiled-wms-layer url="http://dummy/wms-adjusted" layers="layer1"></vl-map-tiled-wms-layer>
        <vl-map-tiled-wms-layer url="http://dummy/wms-adjusted" layers="layer1"></vl-map-tiled-wms-layer>
    </vl-map>
`;

const wfsLayersFixture = html`
    <vl-map>
        <vl-map-wfs-layer url="http://dummy/wms-adjusted" layers="layer1"></vl-map-wfs-layer>
        <vl-map-wfs-layer url="http://dummy/wms-adjusted" layers="layer1"></vl-map-wfs-layer>
    </vl-map>
`;

const wmtsLayersFixture = html`
    <vl-map>
        <vl-map-wmts-layer url="http://dummy/wmts" layer="grb_sel"></vl-map-wmts-layer>
        <vl-map-wmts-layer url="http://dummy/wmts" layer="grb_sel"></vl-map-wmts-layer>
    </vl-map>
`;

const tags = [
    'vl-map-features-layer',
    'vl-map-image-wms-layer',
    'vl-map-tiled-wms-layer',
    'vl-map-wfs-layer',
    'vl-map-wmts-layer',
];
const LAYER_SELECTOR = `[is-layer], ${tags.join(', ')}`;

const getLayer = (map) => map.querySelector(LAYER_SELECTOR);

const getLayers = (map) => map.querySelectorAll(LAYER_SELECTOR);

const range = (minInclusive, maxExclusive) =>
    Array.from({ length: maxExclusive - minInclusive }, (x, i) => i + minInclusive);

const fixtures = [
    {
        name: 'features-layer',
        singleFixture: featuresLayerFixture,
        singleSelector: 'vl-map-features-layer',
        multipleFixture: featuresLayersFixture,
    },
    {
        name: 'image-wms-layer',
        singleFixture: imageWmsLayerFixture,
        singleSelector: 'vl-map-image-wms-layer',
        multipleFixture: imageWmsLayersFixture,
    },
    {
        name: 'tiled-wms-layer',
        singleFixture: tiledWmsLayerFixture,
        singleSelector: 'vl-map-tiled-wms-layer',
        multipleFixture: tiledWmsLayersFixture,
    },
    {
        name: 'wfs-layer',
        singleFixture: wfsLayerFixture,
        singleSelector: 'vl-map-wfs-layer',
        multipleFixture: wfsLayersFixture,
    },
    {
        name: 'wmts-layer',
        singleFixture: wmtsLayerFixture,
        singleSelector: 'vl-map-wmts-layer',
        multipleFixture: wmtsLayersFixture,
    },
];

describe('vl-map-layer', () => {
    fixtures.forEach((fixture) => {
        it(`${fixture.name} - kan een attribuut, titel, opvragen van de kaartlaag op basis van zijn sleutel`, () => {
            cy.mount(fixture.singleFixture);
            cy.runTestFor<VlMap>('vl-map', (vlMap) => {
                cy.wrap(vlMap.ready).then(() => {
                    const layer = getLayer(vlMap);
                    expect(layer.get('title')).to.be.equal(layer.getAttribute('name'));
                    expect(layer.get('title')).to.be.equal(layer._layer.get('title'));
                });
            });
        });
    });

    fixtures.forEach((fixture) => {
        it(`${fixture.name} - kan de zichtbaarheid van de kaartlaag opvragen en wijzigen`, () => {
            cy.mount(fixture.singleFixture);
            cy.runTestFor<VlMap>('vl-map', (vlMap) => {
                cy.wrap(vlMap.ready).then(() => {
                    const layer = getLayer(vlMap);
                    expect(layer.visible).to.be.true;
                    expect(layer._layer.getVisible()).to.be.true;
                    layer.visible = false;
                    expect(layer.visible).to.be.false;
                    expect(layer._layer.getVisible()).to.be.false;
                });
            });
        });
    });

    fixtures.forEach((fixture) => {
        it(`${fixture.name} - er kan gecontroleerd worden of de kaartlaag zichtbaar is op een bepaalde resolutie (minVisibility = , maxVisibility = )`, () => {
            cy.mount(fixture.singleFixture);
            cy.runTestFor<VlMap>('vl-map', (vlMap) => {
                cy.wrap(vlMap.ready).then(() => {
                    const layer = getLayer(vlMap);
                    const minVisibility = Number(layer.getAttribute('min-resolution'));
                    const maxVisibility = Number(layer.getAttribute('max-resolution'));
                    const visibleResolutions = range(minVisibility, maxVisibility);
                    const invisibleResolutions = range(0, minVisibility).concat(
                        range(maxVisibility, maxVisibility + 5)
                    );
                    invisibleResolutions.forEach(
                        (resolution) =>
                            expect(
                                layer.isVisibleAtResolution(resolution),
                                `zou niet zichtbaar mogen zijn op resolutie ${resolution}`
                            ).to.be.false
                    );
                    visibleResolutions.forEach(
                        (resolution) =>
                            expect(
                                layer.isVisibleAtResolution(resolution),
                                `zou zichtbaar moeten zijn op resolutie ${resolution}`
                            ).to.be.true
                    );
                });
            });
        });
    });

    fixtures.forEach((fixture) => {
        it(`${fixture.name} - de kaartlaag zal toegevoegd worden aan de map`, () => {
            cy.mount(fixture.singleFixture);
            cy.runTestFor<VlMap>('vl-map', (vlMap) => {
                cy.wrap(vlMap.ready).then(() => {
                    const layerElement = getLayer(vlMap);
                    const layers = vlMap.map.getOverlayLayers();
                    cy.waitUntil(() => layers?.length === 1).then(() => {
                        expect(layers).to.be.lengthOf(1);
                        const layer = layers[0];
                        cy.wrap(layer.ready).then(() => {
                            expect(layer).to.be.equal(layerElement.layer);
                            expect(layer.get('title')).to.be.equal(layerElement.getAttribute('name'));
                            expect(layer.getMinResolution()).to.be.equal(layerElement.getAttribute('min-resolution'));
                            expect(layer.getMaxResolution()).to.be.equal(layerElement.getAttribute('max-resolution'));
                        });
                    });
                });
            });
        });
    });

    fixtures.forEach((fixture) => {
        it(`${fixture.name} - wanneer het hidden attribuut wijzigt zal de kaartlaag zichtbaarheid aangepast worden en de map opnieuw gerenderd worden`, () => {
            cy.mount(fixture.singleFixture);
            cy.runTestFor<VlMap>('vl-map', (vlMap) => {
                cy.wrap(vlMap.ready).then(() => {
                    const rerenderSpy = cy.spy(vlMap, 'rerender');
                    const layerElement = getLayer(vlMap);
                    expect(layerElement.layer.getVisible()).to.be.true;
                    layerElement.setAttribute('hidden', '');
                    expect(layerElement.layer.getVisible()).to.be.false;
                    layerElement.removeAttribute('hidden');
                    expect(layerElement.layer.getVisible()).to.be.true;
                    expect(rerenderSpy).to.be.called;
                });
            });
        });
    });

    fixtures.forEach((fixture) => {
        it(`${fixture.name} - elke kaartlaag zal een id krijgen`, () => {
            cy.mount(fixture.multipleFixture);
            cy.runTestFor<VlMap>('vl-map', (vlMap) => {
                cy.wrap(vlMap.ready).then(() => {
                    expect(getLayers(vlMap)).to.be.lengthOf(vlMap.children.length);
                });
            });
        });
    });
});
