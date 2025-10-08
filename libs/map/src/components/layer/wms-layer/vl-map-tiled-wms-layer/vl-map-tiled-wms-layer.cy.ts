import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlMap } from '../../../../vl-map';
import { VlMapTiledWmsLayer } from './vl-map-tiled-wms-layer';

registerWebComponents([VlMap, VlMapTiledWmsLayer]);

const tiledWmsLayerFixture = html`
    <vl-map lambert2008>
        <vl-map-tiled-wms-layer url="http://dummy/wms" name="dummy" layers="layer1,layer2"></vl-map-tiled-wms-layer>
    </vl-map>
`;

const tiledWmsLayerAdjustedConfigFixture = html`
    <vl-map lambert2008>
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

describe('cypress-component - map - vl-map-tiled-wms-layer', () => {
    it('should mount', () => {
        cy.mount(tiledWmsLayerFixture);
        cy.get('vl-map').shadow();
        cy.get('vl-map-tiled-wms-layer');
    });

    it('should be accessible', () => {
        cy.mount(tiledWmsLayerFixture);
        cy.injectAxe();
        cy.checkA11y('vl-map-tiled-wms-layer');
    });

    it('should set the correct request parameters', () => {
        cy.intercept('http://dummy/wms*').as('wmsRequest');
        cy.mount(tiledWmsLayerFixture);
        cy.wait('@wmsRequest').then((interception) => {
            const { request } = interception;
            cy.wrap(request.query).should((query) => {
                expect(query).to.have.property('LAYERS', 'layer1,layer2');
                expect(query).to.have.property('SERVICE', 'WMS');
                expect(query).to.have.property('REQUEST', 'GetMap');
                expect(query).to.have.property('TILED', 'true');
                // check if the tilesorigin property exists and has a value of a number,number format
                expect(query).to.have.property('tilesorigin');
                const tilesOriginValue = query['tilesorigin'];
                expect(tilesOriginValue).to.match(/^\d+(\.\d+)?,\d+(\.\d+)?$/);
            });
        });
    });

    it('wms tiled layer kan toegevoegd worden aan een map met de correcte configuratie', () => {
        cy.mount(tiledWmsLayerFixture);
        cy.runTestFor2<VlMap, VlMapTiledWmsLayer>('vl-map', 'vl-map-tiled-wms-layer', (vlMap, vlMapTiledWmsLayer) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(vlMapTiledWmsLayer.layer).to.exist;
                expect(vlMapTiledWmsLayer.layer.getSource().getParams().LAYERS).to.equal('layer1,layer2');
                expect(vlMapTiledWmsLayer.layer.getSource().getParams().STYLES).to.equal('');
                expect(vlMapTiledWmsLayer.layer.getSource().getParams().VERSION).to.equal('1.3.0');
                expect(vlMapTiledWmsLayer.layer.getSource().getUrls()[0]).to.equal('http://dummy/wms');
                expect(vlMapTiledWmsLayer.layer.getOpacity()).to.equal(1);
            });
        });
    });

    it('wms tiled layer kan toegevoegd worden met een aangepaste configuratie', async () => {
        cy.mount(tiledWmsLayerAdjustedConfigFixture);
        cy.runTestFor2<VlMap, VlMapTiledWmsLayer>('vl-map', 'vl-map-tiled-wms-layer', (vlMap, vlMapTiledWmsLayer) => {
            cy.wrap(vlMap.ready).then(() => {
                // await awaitUntil(() => layerElement.ready);
                expect(vlMapTiledWmsLayer.layer).to.exist;
                // assert.isDefined(layerElement.layer);
                // const { layer } = layerElement;
                expect(vlMapTiledWmsLayer.layer.getSource().getParams().LAYERS).to.equal('layer1');
                expect(vlMapTiledWmsLayer.layer.getSource().getParams().STYLES).to.equal('style1,style2');
                expect(vlMapTiledWmsLayer.layer.getSource().getParams().VERSION).to.equal('1.1.1');
                expect(vlMapTiledWmsLayer.layer.getSource().getUrls()[0]).to.equal('http://dummy/wms-adjusted');
                expect(vlMapTiledWmsLayer.layer.getOpacity()).to.equal(0.75);
            });
        });
    });
});
