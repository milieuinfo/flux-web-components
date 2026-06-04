import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import OlProjection from 'ol/proj/Projection';
import { VlMap } from '../../../../vl-map';
import { VlMapWfsLayer } from './vl-map-wfs-layer';

registerWebComponents([VlMap, VlMapWfsLayer]);

const wfsLayerFixture = html`
    <vl-map lambert2008>
        <vl-map-wfs-layer name="foobar" url="http://localhost/wfs" layers="layer1,layer2"> </vl-map-wfs-layer>
    </vl-map>
`;

const wfsLayerWithQueryParamsInUrlFixture = html`
    <vl-map lambert2008>
        <vl-map-wfs-layer name="foobar" url="http://localhost/wfs?foo=bar" layers="layer1,layer2"> </vl-map-wfs-layer>
    </vl-map>
`;

const wfsLayerWithCqlFilterAndGeometryNameFixture = html`
    <vl-map lambert2008>
        <vl-map-wfs-layer
            name="foobar"
            url="http://localhost/wfs"
            layers="layer1,layer2"
            cql-filter="WTRLICHC = 'Kanaal'"
            geometry-name="GEOM"
        >
        </vl-map-wfs-layer>
    </vl-map>
`;

const wfsLayerWithCqlFilterFixture = html`
    <vl-map lambert2008>
        <vl-map-wfs-layer name="foobar" url="http://localhost/wfs" layers="layer1,layer2" cql-filter="WTRLICHC = 'Kanaal'">
        </vl-map-wfs-layer>
    </vl-map>
`;

// Geometrie-property met een niet-triviaal type (MultiSurface) om aan te tonen dat de namespace-gebaseerde detectie
// werkt voor om het even welk GML-geometrie-type, niet enkel Point.
const describeFeatureTypeResponse = `<?xml version="1.0" encoding="UTF-8"?>
<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:gml="http://www.opengis.net/gml">
    <xsd:complexType name="layer1Type">
        <xsd:complexContent>
            <xsd:extension base="gml:AbstractFeatureType">
                <xsd:sequence>
                    <xsd:element name="WTRLICHC" type="xsd:string"/>
                    <xsd:element name="the_geom" type="gml:MultiSurfacePropertyType"/>
                </xsd:sequence>
            </xsd:extension>
        </xsd:complexContent>
    </xsd:complexType>
</xsd:schema>`;

describe('cypress-component - map - vl-map-wfs-layer', () => {
    it('wfs layer kan toegevoegd worden aan een map met de correcte configuratie', () => {
        cy.intercept('http://localhost/wfs*', {}).as('getWfsLayer');
        cy.mount(wfsLayerFixture);
        cy.runTestFor<VlMapWfsLayer>('vl-map-wfs-layer', (vlMapWfsLayer) => {
            const projection = new OlProjection({
                code: 'EPSG:31370',
            });
            expect(vlMapWfsLayer.layer).is.not.null;
            expect(
                vlMapWfsLayer.layer.getSource().getUrl()([1.2, 3.4, 5.6, 7.8], 123, projection).toString()
            ).to.be.equal(
                'http://localhost/wfs?service=WFS&request=GetFeature&typename=layer1%2Clayer2&bbox=1.2%2C3.4%2C5.6%2C7.8&srsname=EPSG%3A3812&outputFormat=GML2&version=2.0.0'
            );
        });
    });

    it('de query params in de geconfigureerde wfs url worden gelaten as-is indien we ze niet moeten overschrijven', () => {
        cy.intercept('http://localhost/wfs*', {}).as('getWfsLayer');
        cy.mount(wfsLayerWithQueryParamsInUrlFixture);
        cy.runTestFor<VlMapWfsLayer>('vl-map-wfs-layer', (vlMapWfsLayer) => {
            const projection = new OlProjection({
                code: 'EPSG:31370',
            });
            expect(vlMapWfsLayer.layer).is.not.null;
            expect(
                vlMapWfsLayer.layer.getSource().getUrl()([1.2, 3.4, 5.6, 7.8], 123, projection).toString()
            ).to.be.equal(
                'http://localhost/wfs?foo=bar&service=WFS&request=GetFeature&typename=layer1%2Clayer2&bbox=1.2%2C3.4%2C5.6%2C7.8&srsname=EPSG%3A3812&outputFormat=GML2&version=2.0.0'
            );
        });
    });

    it('met cql-filter en expliciete geometry-name bouwt een cql_filter met BBOX-clausule i.p.v. een bbox-parameter', () => {
        cy.intercept('http://localhost/wfs*', {}).as('getWfsLayer');
        cy.mount(wfsLayerWithCqlFilterAndGeometryNameFixture);
        cy.runTestFor<VlMapWfsLayer>('vl-map-wfs-layer', (vlMapWfsLayer) => {
            const projection = new OlProjection({ code: 'EPSG:31370' });
            const url = vlMapWfsLayer.layer.getSource().getUrl()([1.2, 3.4, 5.6, 7.8], 123, projection);
            expect(url.searchParams.has('bbox')).to.be.false;
            expect(url.searchParams.get('cql_filter')).to.equal("BBOX(GEOM,1.2,3.4,5.6,7.8) AND (WTRLICHC = 'Kanaal')");
        });
    });

    it('met cql-filter zonder geometry-name wordt de geometry-property via DescribeFeatureType auto-gedetecteerd, en pas daarna de source aangemaakt', () => {
        cy.intercept({ url: 'http://localhost/wfs*', query: { request: 'DescribeFeatureType' } }, describeFeatureTypeResponse).as(
            'describeFeatureType'
        );
        cy.intercept({ url: 'http://localhost/wfs*', query: { request: 'GetFeature' } }, {}).as('getWfsLayer');
        cy.mount(wfsLayerWithCqlFilterFixture);
        cy.wait('@describeFeatureType');
        cy.runTestFor<VlMapWfsLayer>('vl-map-wfs-layer', (vlMapWfsLayer) => {
            const projection = new OlProjection({ code: 'EPSG:31370' });
            // Race-condition-garantie: de source/layer bestaat pas nadat de geometry-property opgelost is.
            cy.wrap(null).should(() => {
                expect(vlMapWfsLayer.layer, 'layer is pas aangemaakt na geometry-detectie').to.exist;
            });
            cy.then(() => {
                const url = vlMapWfsLayer.layer.getSource().getUrl()([1.2, 3.4, 5.6, 7.8], 123, projection);
                expect(url.searchParams.has('bbox')).to.be.false;
                expect(url.searchParams.get('cql_filter')).to.equal(
                    "BBOX(the_geom,1.2,3.4,5.6,7.8) AND (WTRLICHC = 'Kanaal')"
                );
            });
        });
    });

    it('met cql-filter valt terug op een bbox-request en waarschuwt wanneer DescribeFeatureType faalt', () => {
        cy.intercept({ url: 'http://localhost/wfs*', query: { request: 'DescribeFeatureType' } }, { statusCode: 500, body: '' }).as(
            'describeFeatureType'
        );
        cy.intercept({ url: 'http://localhost/wfs*', query: { request: 'GetFeature' } }, {}).as('getWfsLayer');
        cy.window().then((win) => cy.spy(win.console, 'warn').as('consoleWarn'));
        cy.mount(wfsLayerWithCqlFilterFixture);
        cy.wait('@describeFeatureType');
        cy.get('@consoleWarn').should('have.been.calledWithMatch', /geometry-property niet automatisch bepalen/);
        cy.runTestFor<VlMapWfsLayer>('vl-map-wfs-layer', (vlMapWfsLayer) => {
            const projection = new OlProjection({ code: 'EPSG:31370' });
            cy.wrap(null).should(() => {
                expect(vlMapWfsLayer.layer, 'layer is pas aangemaakt na geometry-detectie').to.exist;
            });
            cy.then(() => {
                const url = vlMapWfsLayer.layer.getSource().getUrl()([1.2, 3.4, 5.6, 7.8], 123, projection);
                // Veilige terugval: geen ongelimiteerde, filter-loze cql_filter, maar een bbox-begrensd request.
                expect(url.searchParams.has('cql_filter')).to.be.false;
                expect(url.searchParams.get('bbox')).to.equal('1.2,3.4,5.6,7.8');
            });
        });
    });

    it('cql-filter is reactief: een wijziging na connect refresht de source en herbouwt de cql_filter-url', () => {
        cy.intercept('http://localhost/wfs*', {}).as('getWfsLayer');
        cy.mount(wfsLayerWithCqlFilterAndGeometryNameFixture);
        cy.runTestFor<VlMapWfsLayer>('vl-map-wfs-layer', (vlMapWfsLayer) => {
            const projection = new OlProjection({ code: 'EPSG:31370' });
            const refreshSpy = cy.spy(vlMapWfsLayer.source, 'refresh');
            vlMapWfsLayer.setAttribute('cql-filter', "WTRLICHC = 'Rivier'");
            expect(refreshSpy, 'source.refresh wordt aangeroepen bij een cql-filter wijziging').to.have.been.called;
            const url = vlMapWfsLayer.layer.getSource().getUrl()([1.2, 3.4, 5.6, 7.8], 123, projection);
            expect(url.searchParams.get('cql_filter')).to.equal("BBOX(GEOM,1.2,3.4,5.6,7.8) AND (WTRLICHC = 'Rivier')");
        });
    });

    it('de kaartlaag zal pas aangemaakt worden na constructie zodat op moment van constructie nog niet al de attributen gekend moeten zijn', () => {
        cy.intercept('http://localhost/wfs*', {}).as('getWfsLayer');
        cy.mount(wfsLayerWithQueryParamsInUrlFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const vlMapWfsLayer: any = document.createElement('vl-map-wfs-layer');
            vlMapWfsLayer.setAttribute('name', 'foobar');
            vlMapWfsLayer.setAttribute('url', 'http://localhost/wfs');
            vlMapWfsLayer.setAttribute('layers', 'layer1,layer2');
            expect(vlMapWfsLayer.source).to.be.undefined;
            expect(vlMapWfsLayer.layer).to.be.undefined;
            vlMap.appendChild(vlMapWfsLayer);
            expect(vlMapWfsLayer.source).to.exist;
            expect(vlMapWfsLayer.layer).to.exist;
        });
    });
});
