import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import OlFeature from 'ol/Feature';
import OlGeoJSON from 'ol/format/GeoJSON';
import OlPoint from 'ol/geom/Point';
import OlStyle from 'ol/style/Style';
import { VlMap } from '../../../../vl-map';
import { VlMapFeaturesLayer } from './vl-map-features-layer';

registerWebComponents([VlMap, VlMapFeaturesLayer]);

const featuresLayerFixture = html`
    <vl-map>
        <vl-map-features-layer></vl-map-features-layer>
    </vl-map>
`;

const mapFixture = html`
    <vl-map>
        <vl-map-features-layer
            data-vl-name="testlaag"
            data-vl-min-resolution="2"
            data-vl-max-resolution="4"
            data-vl-features='{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[147055,197908]},"properties":null,"id":1}]}'
        >
        </vl-map-features-layer>
    </vl-map>
`;

const mapClusterFixture = html`
    <vl-map>
        <vl-map-features-layer
            data-vl-name="testlaag"
            data-vl-cluster="true"
            data-vl-cluster-distance="20"
            data-vl-features='{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[147055,197908]},"properties":null,"id":1}]}'
        >
        </vl-map-features-layer>
    </vl-map>
`;

const mapAutoExtentFixture = html`
    <vl-map>
        <vl-map-features-layer
            data-vl-name="testlaag"
            data-vl-features='{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[147055,197908]},"properties":null,"id":1}, {"type":"Feature","geometry":{"type":"Point","coordinates":[148055,197908]},"properties":null,"id":2}]}'
            data-vl-auto-extent
        >
        </vl-map-features-layer>
    </vl-map>
`;

const mapAutoExtentMaxZoomFixture = html`
    <vl-map>
        <vl-map-features-layer
            data-vl-name="testlaag"
            data-vl-features='{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[147055,197908]},"properties":null,"id":1}]}'
            data-vl-auto-extent
            data-vl-auto-extent-max-zoom="3"
        >
        </vl-map-features-layer>
    </vl-map>
`;

describe('vl-map-features-layer', () => {
    const geoJSON = new OlGeoJSON();

    it('het features attribuut op de kaartlaag bevat dezelfde features als in de source', () => {
        cy.mount(mapFixture);
        cy.runTestFor2<VlMap, VlMapFeaturesLayer>('vl-map', 'vl-map-features-layer', (vlMap, vlMapFeaturesLayer) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(vlMapFeaturesLayer.layer).to.exist;
                const layers = vlMap.map.getOverlayLayers();
                expect(vlMap.map.getOverlayLayers()).to.be.lengthOf(1);
                expect(geoJSON.writeFeatures(layers[0].getSource().getFeatures())).to.be.equal(
                    vlMapFeaturesLayer.getAttribute('features')
                );
            });
        });
    });

    it('zoomen werkt correct', () => {
        cy.mount(mapFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(vlMap['map'].getView().getCenter()).to.deep.equal([140860.69299028325, 190532.7165957574]);
            });
        });
    });

    it('auto-extent zoomen werkt correct', () => {
        cy.mount(mapAutoExtentFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.waitUntil(() => vlMap.map.getView().getZoom() > 3).then(() => {
                expect(vlMap['map'].getView().getCenter()).to.deep.equal([147555, 197908]);
            });
        });
    });

    it('auto-extent max-zoomen werkt correct', () => {
        cy.mount(mapAutoExtentMaxZoomFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.waitUntil(() => vlMap.map.getView().getZoom() === 3).then(() => {
                expect(vlMap['map'].getView().getCenter()).to.deep.equal([147055, 197908]);
            });
        });
    });

    it('het aanroepen van zoomToExtent zal de kaart doen inzoomen op de bounding box', () => {
        cy.mount(mapFixture);
        cy.runTestFor2<VlMap, VlMapFeaturesLayer>('vl-map', 'vl-map-features-layer', (vlMap, vlMapFeaturesLayer) => {
            cy.wrap(vlMap.ready).then(() => {
                const view = vlMap.map.getView();
                expect(view.getCenter()).to.not.deep.equal([147055, 197908]);
                cy.wrap(vlMapFeaturesLayer.zoomToExtent(99)).then(() => {
                    expect(view.getCenter()).to.deep.equal([147055, 197908]);
                    expect(view.getZoom()).to.be.above(3);
                    cy.wrap(vlMapFeaturesLayer.zoomToExtent(3)).then(() => {
                        expect(view.getCenter()).to.deep.equal([147055, 197908]);
                        expect(view.getZoom()).to.be.equal(3);
                    });
                });
            });
        });
    });

    it('bij het toevoegen van een feature zal deze automatisch toegevoegd worden aan de laag en zal de kaart opnieuw zoomen naar de extent van de kaartlaag indien de auto-extent geactiveerd werd', () => {
        cy.mount(mapFixture);
        cy.runTestFor2<VlMap, VlMapFeaturesLayer>('vl-map', 'vl-map-features-layer', (vlMap, vlMapFeaturesLayer) => {
            cy.wrap(vlMap.ready).then(() => {
                let layer = vlMap.map.getOverlayLayers()[0];
                expect(layer.getSource().getFeatures()).to.be.lengthOf(1);
                expect(geoJSON.writeFeatures(layer.getSource().getFeatures())).to.equal(
                    vlMapFeaturesLayer.getAttribute('data-vl-features')
                );
                expect(vlMap.map.getView().getCenter()).to.deep.equal([140860.69299028325, 190532.7165957574]);
                vlMapFeaturesLayer.setAttribute(
                    'data-vl-features',
                    '{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[147055,197908]},"properties":null},{"type":"Feature","geometry":{"type":"Point","coordinates":[157055,207908]},"properties":null}]}'
                );
                vlMapFeaturesLayer.setAttribute('data-vl-auto-extent', '');
                layer = vlMap.map.getOverlayLayers()[0];
                const feature = geoJSON.writeFeatures(layer.getSource().getFeatures());
                expect(layer.getSource().getFeatures().length).to.be.equal(2);
                expect(feature).to.be.equal(vlMapFeaturesLayer.getAttribute('data-vl-features'));
                expect(vlMap.map.getView().getCenter()[0]).to.be.equal(152055);
                expect(vlMap.map.getView().getCenter()[1]).to.be.equal(202908);
            });
        });
    });

    it('kan de boundingbox opvragen van de features op de laag', () => {
        cy.mount(featuresLayerFixture);
        cy.runTestFor2<VlMap, VlMapFeaturesLayer>('vl-map', 'vl-map-features-layer', (vlMap, vlMapFeaturesLayer) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(vlMapFeaturesLayer.boundingBox).to.be.undefined;
                vlMapFeaturesLayer.setAttribute(
                    'features',
                    '{"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[147055,197908]},"properties":null},{"type":"Feature","geometry":{"type":"Point","coordinates":[157055,207908]},"properties":null}]}'
                );
                expect(vlMapFeaturesLayer.boundingBox).to.deep.equal([147055, 197908, 157055, 207908]);
            });
        });
    });

    it('kan een feature verkrijgen via id', () => {
        cy.mount(mapFixture);
        cy.runTestFor2<VlMap, VlMapFeaturesLayer>('vl-map', 'vl-map-features-layer', (vlMap, vlMapFeaturesLayer) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(vlMapFeaturesLayer.getFeature(1)).to.exist;
                expect(vlMapFeaturesLayer.getFeature(2)).to.be.undefined;
            });
        });
    });

    it('kan een cluster verkrijgen via een feature id in de cluster', () => {
        cy.mount(mapFixture);
        cy.runTestFor2<VlMap, VlMapFeaturesLayer>('vl-map', 'vl-map-features-layer', (vlMap, vlMapFeaturesLayer) => {
            cy.wrap(vlMap.ready).then(() => {
                const feature1 = new OlFeature({
                    geometry: new OlPoint([109100, 204175]),
                });
                const feature2 = new OlFeature({
                    geometry: new OlPoint([109100, 204175]),
                });
                const feature3 = new OlFeature({
                    geometry: new OlPoint([109100, 204175]),
                });
                feature1.setId(1);
                feature2.setId(2);
                feature3.setId(3);
                const cluster1 = new OlFeature({});
                const cluster2 = new OlFeature({});
                cluster1.set('features', [feature1, feature2]);
                cluster2.set('features', [feature3]);
                vlMapFeaturesLayer.setAttribute('data-vl-cluster', '');
                vlMapFeaturesLayer.layer.getSource().addFeatures([cluster1, cluster2]);
                expect(vlMapFeaturesLayer.getCluster(1)).to.deep.equal(cluster1);
                expect(vlMapFeaturesLayer.getCluster(2)).to.deep.equal(cluster1);
                expect(vlMapFeaturesLayer.getCluster(3)).to.deep.equal(cluster2);
            });
        });
    });

    it('al de feature specifieke stijl kan verwijderd worden', () => {
        cy.mount(featuresLayerFixture);
        cy.runTestFor2<VlMap, VlMapFeaturesLayer>('vl-map', 'vl-map-features-layer', (vlMap, vlMapFeaturesLayer) => {
            cy.wrap(vlMap.ready).then(() => {
                const feature1 = new OlFeature();
                const feature2 = new OlFeature();
                feature1.setStyle(new OlStyle({}));
                feature2.setStyle(new OlStyle({}));
                const features = [feature1, feature2];
                vlMapFeaturesLayer.setAttribute('features', geoJSON.writeFeatures(features));
                vlMapFeaturesLayer.removeFeaturesStyle();
                expect(vlMapFeaturesLayer.features[0].getStyle()).to.be.null;
                expect(vlMapFeaturesLayer.features[1].getStyle()).to.be.null;
            });
        });
    });

    it('kan programmatorisch features verwijderen', () => {
        cy.mount(mapFixture);
        cy.runTestFor2<VlMap, VlMapFeaturesLayer>('vl-map', 'vl-map-features-layer', (vlMap, vlMapFeaturesLayer) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(vlMapFeaturesLayer.layer.getSource().getFeatures()).to.be.lengthOf(1);
                vlMapFeaturesLayer.clearFeatures();
                expect(vlMapFeaturesLayer.layer.getSource().getFeatures()).to.be.lengthOf(0);
            });
        });
    });

    it('kan programmatorisch feature toevoegen', () => {
        cy.mount(mapFixture);
        cy.runTestFor2<VlMap, VlMapFeaturesLayer>('vl-map', 'vl-map-features-layer', (vlMap, vlMapFeaturesLayer) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(vlMapFeaturesLayer.layer.getSource().getFeatures()).to.be.lengthOf(1);
                vlMapFeaturesLayer.addFeature(
                    '{"type":"Feature","geometry":{"type":"Point","coordinates":[148055,197908]},"properties":null,"id":2}'
                );
                expect(vlMapFeaturesLayer.layer.getSource().getFeatures()).to.be.lengthOf(2);
            });
        });
    });

    it('kan programmatorisch feature toevoegen aan layer met cluster', () => {
        cy.mount(mapClusterFixture);
        cy.runTestFor2<VlMap, VlMapFeaturesLayer>('vl-map', 'vl-map-features-layer', (vlMap, vlMapFeaturesLayer) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(vlMapFeaturesLayer.source.getSource().getFeatures()).to.be.lengthOf(1);
                vlMapFeaturesLayer.addFeature(
                    '{"type":"Feature","geometry":{"type":"Point","coordinates":[148055,197908]},"properties":null,"id":2}'
                );
                expect(vlMapFeaturesLayer.source.getSource().getFeatures()).to.be.lengthOf(2);
                expect(vlMapFeaturesLayer.getFeature(1)).to.exist;
                expect(vlMapFeaturesLayer.getFeature(2)).to.exist;
            });
        });
    });

    it('kan programmatorisch features wijzigen in layer met cluster', () => {
        cy.mount(mapClusterFixture);
        cy.runTestFor2<VlMap, VlMapFeaturesLayer>('vl-map', 'vl-map-features-layer', (vlMap, vlMapFeaturesLayer) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(vlMapFeaturesLayer.source.getSource().getFeatures()).to.be.lengthOf(1);
                vlMapFeaturesLayer.features = {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            geometry: { type: 'Point', coordinates: [148055, 197908] },
                            properties: null,
                            id: 2,
                        },
                        {
                            type: 'Feature',
                            geometry: { type: 'Point', coordinates: [148055, 197908] },
                            properties: null,
                            id: 3,
                        },
                    ],
                };
                expect(vlMapFeaturesLayer.source.getSource().getFeatures()).to.be.lengthOf(2);
                expect(vlMapFeaturesLayer.getFeature(1)).to.be.undefined;
                expect(vlMapFeaturesLayer.getFeature(2)).to.exist;
                expect(vlMapFeaturesLayer.getFeature(3)).to.exist;
            });
        });
    });

    it('kan programmatorisch feature collection toevoegen', () => {
        cy.mount(mapFixture);
        cy.runTestFor2<VlMap, VlMapFeaturesLayer>('vl-map', 'vl-map-features-layer', (vlMap, vlMapFeaturesLayer) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(vlMapFeaturesLayer.layer.getSource().getFeatures()).to.be.lengthOf(1);
                vlMapFeaturesLayer.addFeatureCollection({
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            geometry: { type: 'Point', coordinates: [148055, 197908] },
                            properties: null,
                            id: 2,
                        },
                    ],
                });
                expect(vlMapFeaturesLayer.layer.getSource().getFeatures()).to.be.lengthOf(2);
            });
        });
    });

    it('wanneer programmatorisch features van een laag met auto zoom verwijderd worden zal deze niet zoomen omdat er geen extent van de features meer is', () => {
        cy.mount(mapAutoExtentFixture);
        cy.runTestFor2<VlMap, VlMapFeaturesLayer>('vl-map', 'vl-map-features-layer', (vlMap, vlMapFeaturesLayer) => {
            cy.wrap(vlMap.ready)
                .wait(0)
                .then(() => {
                    expect(vlMap.map.getView().getCenter()).to.deep.equal([147555, 197908]);
                    vlMapFeaturesLayer.clearFeatures();
                    expect(vlMap.map.getView().getCenter()).to.deep.equal([147555, 197908]);
                });
        });
    });

    it('wanneer programmatorisch een feature aan een laag met auto zoom toegevoegd wordt zal de map daar naartoe zoomen - 1', () => {
        cy.mount(mapAutoExtentFixture);
        cy.runTestFor2<VlMap, VlMapFeaturesLayer>('vl-map', 'vl-map-features-layer', (vlMap, vlMapFeaturesLayer) => {
            cy.wrap(vlMap.ready).then(() => {
                cy.waitUntil(() => vlMap.map.getView().getZoom() > 3).then(() => {
                    expect(vlMap.map.getView().getCenter()).to.deep.equal([147055, 197908]);
                });
                vlMapFeaturesLayer.addFeature({
                    type: 'Feature',
                    geometry: { type: 'Point', coordinates: [146055, 197908] },
                    properties: null,
                    id: 3,
                });
                expect(vlMap.map.getView().getCenter()).to.deep.equal([147055, 197908]);
                vlMapFeaturesLayer.clearFeatures();
                cy.wait(0).then(() => {
                    // de wait zorgt ervoor dat de clearFeatures afgehandeld is - volgende event loop
                    vlMapFeaturesLayer.addFeature({
                        type: 'Feature',
                        geometry: { type: 'Point', coordinates: [146055, 197908] },
                        properties: null,
                        id: 3,
                    });
                    expect(vlMap.map.getView().getCenter()).to.deep.equal([146055, 197908]);
                });
            });
        });
    });

    it('wanneer programmatorisch features aan een laag met auto zoom toegevoegd worden zal de map daar naartoe zoomen - 2', () => {
        cy.mount(mapAutoExtentFixture);
        cy.runTestFor2<VlMap, VlMapFeaturesLayer>('vl-map', 'vl-map-features-layer', (vlMap, vlMapFeaturesLayer) => {
            cy.wrap(vlMap.ready)
                .wait(0)
                .then(() => {
                    expect(vlMap.map.getView().getCenter()).to.deep.equal([147555, 197908]);
                    vlMapFeaturesLayer.addFeatureCollection({
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                geometry: { type: 'Point', coordinates: [146055, 197908] },
                                properties: null,
                                id: 3,
                            },
                        ],
                    });
                    expect(vlMap.map.getView().getCenter()).to.deep.equal([147055, 197908]);
                    vlMapFeaturesLayer.clearFeatures();
                    vlMapFeaturesLayer.addFeature({
                        type: 'Feature',
                        geometry: { type: 'Point', coordinates: [146055, 197908] },
                        properties: null,
                        id: 3,
                    });
                    expect(vlMap.map.getView().getCenter()).to.deep.equal([146055, 197908]);
                });
        });
    });
});
