import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import type { Coordinate } from 'ol/coordinate';
import { boundingExtent } from 'ol/extent';
import OlFeature from 'ol/Feature';
import OlPoint from 'ol/geom/Point';
import { get as getProjection } from 'ol/proj';
import proj4 from 'proj4';
import { VlMapFeaturesLayer } from './components/layer/vector-layer/vl-map-features-layer/vl-map-features-layer';
import { VlMapWfsLayer } from './components/layer/vector-layer/vl-map-wfs-layer/vl-map-wfs-layer';
import { NTV2_GRID_URL } from './utils/lambert-transformation';
import { VlMap } from './vl-map';

registerWebComponents([VlMap, VlMapFeaturesLayer, VlMapWfsLayer]);

type Testpunt = { id: number; x72: number; y72: number; x08: number; y08: number };

const TOLERANCE_IN_METERS = 0.011;

const featureCollection = (points: { id: number; coordinates: Coordinate }[]) =>
    JSON.stringify({
        type: 'FeatureCollection',
        features: points.map(({ id, coordinates }) => ({
            type: 'Feature',
            id,
            geometry: { type: 'Point', coordinates },
            properties: {},
        })),
    });

const getFeatureLayer = () => cy.get<VlMapFeaturesLayer>('vl-map-features-layer', { timeout: 10000 });

const coordinatesOf = (layer: VlMapFeaturesLayer, id: number): Coordinate =>
    (layer.getFeature(id).getGeometry() as OlPoint).getCoordinates();

const distance = ([x1, y1]: Coordinate, [x2, y2]: Coordinate) => Math.hypot(x1 - x2, y1 - y2);

const interceptGrid = (delay = 0) =>
    cy
        .intercept('GET', NTV2_GRID_URL, {
            fixture: 'map/bd72lb72_etrs89lb08.gsb,null',
            headers: { 'content-type': 'application/octet-stream' },
            delay,
        })
        .as('grid');

const gml2Response = ({ x72, y72 }: Testpunt) => `<?xml version="1.0" encoding="UTF-8"?>
<wfs:FeatureCollection xmlns:wfs="http://www.opengis.net/wfs" xmlns:gml="http://www.opengis.net/gml" xmlns:test="http://test">
    <gml:featureMember>
        <test:punten fid="punten.1">
            <test:geom>
                <gml:Point><gml:coordinates>${x72},${y72}</gml:coordinates></gml:Point>
            </test:geom>
        </test:punten>
    </gml:featureMember>
</wfs:FeatureCollection>`;

const describeFeatureTypeResponse = `<?xml version="1.0" encoding="UTF-8"?>
<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:gml="http://www.opengis.net/gml">
    <xsd:complexType name="puntenType">
        <xsd:complexContent>
            <xsd:extension base="gml:AbstractFeatureType">
                <xsd:sequence>
                    <xsd:element name="TYPE" type="xsd:string"/>
                    <xsd:element name="geom" type="gml:PointPropertyType"/>
                </xsd:sequence>
            </xsd:extension>
        </xsd:complexContent>
    </xsd:complexType>
</xsd:schema>`;

// Het transform-register van OpenLayers is page-globaal: eens het grid geladen is, blijft het geladen voor de rest van
// deze spec. Daarom draaien de tests zonder grid eerst.
describe('cypress-component - map - vl-map - ntv2-grid - before the grid is loaded', () => {
    beforeEach(() => {
        interceptGrid();
    });

    it('should not request the grid and keep the Helmert transformation without the ntv2-grid attribute', () => {
        cy.mount(html`
            <vl-map lambert2008>
                <vl-map-features-layer
                    projection-code="EPSG:31370"
                    features=${featureCollection([{ id: 1, coordinates: [153055, 203908] }])}
                ></vl-map-features-layer>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                const [layer] = vlMap.featuresLayers;
                expect(coordinatesOf(layer, 1)).to.deep.equal([653050.623011303, 703908.5023996672]);
                expect(vlMap.lambertTransformation).to.equal('helmert');
            });
        });
        cy.get('@grid.all').should('have.length', 0);
    });

    it('should not request the grid on a Lambert 72 map without projection-code', () => {
        cy.mount(html`
            <vl-map ntv2-grid>
                <vl-map-features-layer
                    features=${featureCollection([{ id: 1, coordinates: [153055, 203908] }])}
                ></vl-map-features-layer>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(coordinatesOf(vlMap.featuresLayers[0], 1)).to.deep.equal([153055, 203908]);
            });
        });
        cy.get('@grid.all').should('have.length', 0);
    });

    it('should not request the grid on a Lambert 2008 map with only Lambert 2008 data', () => {
        cy.intercept('http://localhost/wfs*', {}).as('getWfsLayer');
        cy.mount(html`
            <vl-map lambert2008 ntv2-grid>
                <vl-map-features-layer
                    features=${featureCollection([{ id: 1, coordinates: [653050, 703908] }])}
                ></vl-map-features-layer>
                <vl-map-features-layer
                    projection-code="EPSG:3812"
                    features=${featureCollection([{ id: 1, coordinates: [653050, 703908] }])}
                ></vl-map-features-layer>
                <vl-map-wfs-layer url="http://localhost/wfs" layers="punten"></vl-map-wfs-layer>
            </vl-map>
        `);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            cy.wrap(vlMap.ready).then(() => {
                vlMap.featuresLayers.forEach((layer) => {
                    expect(coordinatesOf(layer, 1)).to.deep.equal([653050, 703908]);
                });
                expect(vlMap.wfsLayers[0].source).not.to.equal(undefined);
                expect(vlMap.lambertTransformation).to.equal('helmert');
            });
        });
        cy.get('@grid.all').should('have.length', 0);
    });
});

describe('cypress-component - map - vl-map - ntv2-grid - with the grid', () => {
    beforeEach(() => {
        interceptGrid();
        cy.fixture<Testpunt[]>('map/lambert72-lambert2008-testpunten.json').as('testpunten');
    });

    // Deze test moet het grid als eerste laden: enkel dan komen de wijzigingen binnen terwijl het grid nog laadt. Bij een
    // herhaling is het grid al geladen en zou hij altijd slagen, dus geen retries.
    it('should apply layer changes made while the grid loads', { retries: 0 }, () => {
        interceptGrid(500);
        cy.intercept(
            { url: 'http://localhost/wfs*', query: { request: 'DescribeFeatureType' } },
            describeFeatureTypeResponse
        ).as('describeFeatureType');
        cy.intercept({ url: 'http://localhost/wfs*', query: { request: 'GetFeature' } }, {}).as('getFeature');
        cy.get<Testpunt[]>('@testpunten').then(([eerste, tweede]) => {
            cy.mount(html`
                <vl-map lambert2008 ntv2-grid>
                    <vl-map-features-layer
                        projection-code="EPSG:31370"
                        features=${featureCollection([{ id: 1, coordinates: [eerste.x72, eerste.y72] }])}
                    ></vl-map-features-layer>
                    <vl-map-wfs-layer
                        url="http://localhost/wfs"
                        layers="punten"
                        projection-code="EPSG:31370"
                    ></vl-map-wfs-layer>
                </vl-map>
            `);
            cy.get<VlMap>('vl-map').then(([vlMap]) => {
                expect(vlMap.lambertTransformation).to.equal('helmert');

                const [featuresLayer] = vlMap.featuresLayers;
                const lambert2008Feature = new OlFeature(new OlPoint([653050, 703908]));
                lambert2008Feature.setId(3);
                featuresLayer.clearFeatures();
                featuresLayer.addFeatureCollection(
                    featureCollection([{ id: 2, coordinates: [tweede.x72, tweede.y72] }])
                );
                featuresLayer.addFeatures([lambert2008Feature]);

                const [wfsLayer] = vlMap.wfsLayers;
                expect(wfsLayer.source).to.equal(undefined);
                wfsLayer.setAttribute('cql-filter', "TYPE = 'grens'");
            });

            getFeatureLayer()
                .should(([layer]) => expect(layer.features.map((feature) => feature.getId())).to.have.members([2, 3]))
                .then(([layer]) => {
                    expect(distance(coordinatesOf(layer, 2), [tweede.x08, tweede.y08])).to.be.below(
                        TOLERANCE_IN_METERS
                    );
                    expect(coordinatesOf(layer, 3)).to.deep.equal([653050, 703908]);
                });

            cy.get<VlMapWfsLayer>('vl-map-wfs-layer')
                .should(([layer]) => expect(layer.source).not.to.equal(undefined))
                .then(([layer]) => {
                    const url: URL = layer.source.getUrl()([0, 0, 1, 1], 1, getProjection('EPSG:3812'));
                    expect(url.searchParams.get('cql_filter')).to.match(/^BBOX\(geom,.+\) AND \(TYPE = 'grens'\)$/);
                });
            cy.get('@grid.all').should('have.length', 1);
        });
    });

    it('should transform every official test point from Lambert 72 to Lambert 2008 within 11 mm', () => {
        cy.get<Testpunt[]>('@testpunten').then((testpunten) => {
            cy.mount(html`
                <vl-map lambert2008 ntv2-grid>
                    <vl-map-features-layer
                        projection-code="EPSG:31370"
                        features=${featureCollection(
                            testpunten.map(({ id, x72, y72 }) => ({ id, coordinates: [x72, y72] }))
                        )}
                    ></vl-map-features-layer>
                </vl-map>
            `);
            getFeatureLayer()
                .should(([layer]) => expect(layer.features).to.have.length(testpunten.length))
                .then(([layer]) => {
                    testpunten.forEach(({ id, x08, y08 }) => {
                        expect(distance(coordinatesOf(layer, id), [x08, y08]), `testpunt ${id}`).to.be.below(
                            TOLERANCE_IN_METERS
                        );
                    });
                });
            cy.get<VlMap>('vl-map').its('0.lambertTransformation').should('equal', 'ntv2');
        });
    });

    it('should fall back to Helmert per point outside the grid without throwing', () => {
        const outsideGrid: Coordinate = [-200000, 200000];
        cy.get<Testpunt[]>('@testpunten').then(([testpunt]) => {
            cy.mount(html`
                <vl-map lambert2008 ntv2-grid>
                    <vl-map-features-layer
                        projection-code="EPSG:31370"
                        features=${featureCollection([
                            { id: 1, coordinates: [testpunt.x72, testpunt.y72] },
                            { id: 2, coordinates: outsideGrid },
                        ])}
                    ></vl-map-features-layer>
                </vl-map>
            `);
            getFeatureLayer()
                .should(([layer]) => expect(layer.features).to.have.length(2))
                .then(([layer]) => {
                    const helmert = proj4('EPSG:31370', 'EPSG:3812', outsideGrid);
                    expect(distance(coordinatesOf(layer, 1), [testpunt.x08, testpunt.y08])).to.be.below(
                        TOLERANCE_IN_METERS
                    );
                    expect(coordinatesOf(layer, 2)[0]).to.be.closeTo(helmert[0], 1e-6);
                    expect(coordinatesOf(layer, 2)[1]).to.be.closeTo(helmert[1], 1e-6);
                });
        });
    });

    it('should transform WFS features and the requested bbox via the grid', () => {
        cy.get<Testpunt[]>('@testpunten').then(([testpunt]) => {
            const { x72, y72, x08, y08 } = testpunt;
            cy.intercept(
                { url: 'http://localhost/wfs*', query: { request: 'GetFeature' } },
                { body: gml2Response(testpunt), headers: { 'content-type': 'text/xml' } }
            ).as('getFeature');
            cy.mount(html`
                <vl-map lambert2008 ntv2-grid>
                    <vl-map-wfs-layer
                        url="http://localhost/wfs"
                        layers="punten"
                        projection-code="EPSG:31370"
                    ></vl-map-wfs-layer>
                </vl-map>
            `);
            cy.get<VlMapWfsLayer>('vl-map-wfs-layer', { timeout: 10000 })
                .should(([layer]) => expect(layer.source?.getFeatures()).to.have.length(1))
                .then(([layer]) => {
                    const feature = layer.source.getFeatures()[0];
                    expect(distance((feature.getGeometry() as OlPoint).getCoordinates(), [x08, y08])).to.be.below(
                        TOLERANCE_IN_METERS
                    );

                    const url: URL = layer.source.getUrl()([x08, y08, x08, y08], 1, getProjection('EPSG:3812'));
                    const [minX, minY] = url.searchParams.get('bbox').split(',').map(Number);
                    expect(distance([minX, minY], [x72, y72])).to.be.below(TOLERANCE_IN_METERS);
                });
        });
    });

    it('should detect the WFS geometry name and transform the cql_filter bbox via the grid', () => {
        cy.get<Testpunt[]>('@testpunten').then(([testpunt]) => {
            const { x72, y72, x08, y08 } = testpunt;
            cy.intercept(
                { url: 'http://localhost/wfs*', query: { request: 'DescribeFeatureType' } },
                describeFeatureTypeResponse
            ).as('describeFeatureType');
            cy.intercept({ url: 'http://localhost/wfs*', query: { request: 'GetFeature' } }, {}).as('getFeature');
            cy.mount(html`
                <vl-map lambert2008 ntv2-grid>
                    <vl-map-wfs-layer
                        url="http://localhost/wfs"
                        layers="punten"
                        projection-code="EPSG:31370"
                        cql-filter="TYPE = 'grens'"
                    ></vl-map-wfs-layer>
                </vl-map>
            `);
            cy.get<VlMapWfsLayer>('vl-map-wfs-layer', { timeout: 10000 })
                .should(([layer]) => expect(layer.source).not.to.equal(undefined))
                .then(([layer]) => {
                    const url: URL = layer.source.getUrl()([x08, y08, x08, y08], 1, getProjection('EPSG:3812'));
                    const [geometryName, minX, minY] = url.searchParams
                        .get('cql_filter')
                        .match(/^BBOX\((\w+),([^,]+),([^,]+),/)
                        .slice(1);
                    expect(geometryName).to.equal('geom');
                    expect(distance([Number(minX), Number(minY)], [x72, y72])).to.be.below(TOLERANCE_IN_METERS);
                });
        });
    });

    it('should request the WFS bbox with Helmert when the map extent lies outside the grid', () => {
        cy.intercept('http://localhost/wfs*', {}).as('getWfsLayer');
        cy.mount(html`
            <vl-map lambert2008 ntv2-grid>
                <vl-map-wfs-layer
                    url="http://localhost/wfs"
                    layers="punten"
                    projection-code="EPSG:31370"
                ></vl-map-wfs-layer>
            </vl-map>
        `);
        cy.get<VlMapWfsLayer>('vl-map-wfs-layer', { timeout: 10000 })
            .should(([layer]) => expect(layer.source).to.exist)
            .then(([layer]) => {
                const extent = [0, 0, 1500000, 1500000];
                const corners = [
                    [extent[0], extent[1]],
                    [extent[0], extent[3]],
                    [extent[2], extent[1]],
                    [extent[2], extent[3]],
                ];
                const helmert = boundingExtent(corners.map((corner) => proj4('EPSG:3812', 'EPSG:31370', corner)));

                const url: URL = layer.source.getUrl()(extent, 1, getProjection('EPSG:3812'));
                const bbox = url.searchParams.get('bbox').split(',').map(Number);
                bbox.forEach((value, index) => expect(value).to.be.closeTo(helmert[index], 1e-6));
            });
        cy.get<VlMap>('vl-map').its('0.lambertTransformation').should('equal', 'ntv2');
    });

    it('should use the grid for every map on the page once it is loaded', () => {
        cy.get<Testpunt[]>('@testpunten').then(([testpunt]) => {
            const lambert72Features = featureCollection([{ id: 1, coordinates: [testpunt.x72, testpunt.y72] }]);
            cy.mount(html`
                <vl-map lambert2008 ntv2-grid>
                    <vl-map-features-layer
                        projection-code="EPSG:31370"
                        features=${lambert72Features}
                    ></vl-map-features-layer>
                </vl-map>
            `);
            cy.get<VlMap>('vl-map').its('0.lambertTransformation', { timeout: 10000 }).should('equal', 'ntv2');

            cy.mount(html`
                <vl-map lambert2008>
                    <vl-map-features-layer
                        projection-code="EPSG:31370"
                        features=${lambert72Features}
                    ></vl-map-features-layer>
                </vl-map>
            `);
            getFeatureLayer()
                .should(([layer]) => expect(layer.features).to.have.length(1))
                .then(([layer]) => {
                    expect(distance(coordinatesOf(layer, 1), [testpunt.x08, testpunt.y08])).to.be.below(
                        TOLERANCE_IN_METERS
                    );
                });
        });
    });
});
