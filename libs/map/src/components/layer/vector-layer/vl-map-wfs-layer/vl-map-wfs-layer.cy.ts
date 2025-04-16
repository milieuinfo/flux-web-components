import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import OlProjection from 'ol/proj/Projection';
import { VlMap } from '../../../../vl-map';
import { VlMapWfsLayer } from './vl-map-wfs-layer';

registerWebComponents([VlMap, VlMapWfsLayer]);

const wfsLayerFixture = html`
    <vl-map>
        <vl-map-wfs-layer data-vl-name="foobar" data-vl-url="http://localhost/wfs" data-vl-layers="layer1,layer2">
        </vl-map-wfs-layer>
    </vl-map>
`;

const wfsLayerWithQueryParamsInUrlFixture = html`
    <vl-map>
        <vl-map-wfs-layer
            data-vl-name="foobar"
            data-vl-url="http://localhost/wfs?foo=bar"
            data-vl-layers="layer1,layer2"
        >
        </vl-map-wfs-layer>
    </vl-map>
`;

describe('vl-map-wfs-layer', () => {
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
                'http://localhost/wfs?service=WFS&request=GetFeature&typename=layer1%2Clayer2&bbox=1.2%2C3.4%2C5.6%2C7.8&srsname=EPSG%3A31370&outputFormat=GML2&version=2.0.0'
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
                'http://localhost/wfs?foo=bar&service=WFS&request=GetFeature&typename=layer1%2Clayer2&bbox=1.2%2C3.4%2C5.6%2C7.8&srsname=EPSG%3A31370&outputFormat=GML2&version=2.0.0'
            );
        });
    });

    it('de kaartlaag zal pas aangemaakt worden na constructie zodat op moment van constructie nog niet al de attributen gekend moeten zijn', () => {
        cy.intercept('http://localhost/wfs*', {}).as('getWfsLayer');
        cy.mount(wfsLayerWithQueryParamsInUrlFixture);
        cy.runTestFor<VlMap>('vl-map', (vlMap) => {
            const vlMapWfsLayer: any = document.createElement('vl-map-wfs-layer');
            vlMapWfsLayer.setAttribute('data-vl-name', 'foobar');
            vlMapWfsLayer.setAttribute('data-vl-url', 'http://localhost/wfs');
            vlMapWfsLayer.setAttribute('data-vl-layers', 'layer1,layer2');
            expect(vlMapWfsLayer.source).to.be.undefined;
            expect(vlMapWfsLayer.layer).to.be.undefined;
            vlMap.appendChild(vlMapWfsLayer);
            expect(vlMapWfsLayer.source).to.exist;
            expect(vlMapWfsLayer.layer).to.exist;
        });
    });
});
