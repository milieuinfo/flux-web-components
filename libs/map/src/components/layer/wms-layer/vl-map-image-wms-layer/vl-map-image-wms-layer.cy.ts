import { registerWebComponents } from '@domg-wc/common';
import { html } from 'lit';
import { VlMap } from '../../../../vl-map';
import { VlMapImageWmsLayer } from './vl-map-image-wms-layer';

registerWebComponents([VlMap, VlMapImageWmsLayer]);

const imageWmsLayerFixture = html`
    <vl-map>
        <vl-map-image-wms-layer
            data-vl-layers="GEM_GRENS"
            data-vl-name="Gemeentegrenzen"
            data-vl-url="http://dummy/wms-adjusted"
        ></vl-map-image-wms-layer>
    </vl-map>
`;

describe('component vl-map-image-wms - features layer', () => {
    it('should mount', () => {
        cy.mount(imageWmsLayerFixture);
        cy.get('vl-map').shadow();
        cy.get('vl-map-image-wms-layer');
    });

    it('should be accessible', () => {
        cy.mount(imageWmsLayerFixture);
        cy.injectAxe();
        cy.checkA11y('vl-map-image-wms-layer');
    });

    it('should set the correct request parameters', () => {
        cy.mount(imageWmsLayerFixture);
        cy.intercept('http://dummy/wms-adjusted*').as('wmsRequest');
        cy.wait('@wmsRequest').then((interception) => {
            const { request } = interception;
            cy.wrap(request.query).should((query) => {
                expect(query).to.have.property('LAYERS', 'GEM_GRENS');
                expect(query).to.have.property('SERVICE', 'WMS');
                expect(query).to.have.property('REQUEST', 'GetMap');
                expect(query).to.not.have.property('TILED');
                expect(query).to.not.have.property('tilesorigin');
            });
        });
    });

    it('wms image layer kan toegevoegd worden aan een map met de correcte configuratie', () => {
        cy.mount(imageWmsLayerFixture);
        cy.runTestFor2<VlMap, VlMapImageWmsLayer>('vl-map', 'vl-map-image-wms-layer', (vlMap, vlMapImageWmsLayer) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(vlMapImageWmsLayer.layer).is.not.undefined; // = defined
                const { layer } = vlMapImageWmsLayer;
                expect(layer.getSource().getParams().LAYERS).to.be.equal('GEM_GRENS');
                expect(layer.getSource().getParams().STYLES).to.be.equal('');
                expect(layer.getSource().getParams().VERSION).to.be.equal('1.3.0');
                expect(layer.getSource().getUrl()).to.be.equal('http://dummy/wms-adjusted');
                expect(layer.getOpacity()).to.be.equal(1);
            });
        });
    });

    it('wms image layer kan toegevoegd worden met een aangepaste configuratie', () => {
        cy.mount(html`
            <vl-map>
                <vl-map-image-wms-layer
                    data-vl-url="http://dummy/wms-adjusted"
                    data-vl-layers="layer1"
                    data-vl-styles="style1,style2"
                    data-vl-version="1.1.1"
                    data-vl-opacity="0.75"
                    data-vl-min-resolution="10"
                    data-vl-max-resolution="1000"
                    data-vl-name="adjusted"
                >
                </vl-map-image-wms-layer>
            </vl-map>
        `);
        cy.runTestFor2<VlMap, VlMapImageWmsLayer>('vl-map', 'vl-map-image-wms-layer', (vlMap, vlMapImageWmsLayer) => {
            cy.wrap(vlMap.ready).then(() => {
                expect(vlMapImageWmsLayer.layer).is.not.undefined; // = defined
                const { layer } = vlMapImageWmsLayer;
                expect(layer.getSource().getParams().LAYERS).to.be.equal('layer1');
                expect(layer.getSource().getParams().STYLES).to.be.equal('style1,style2');
                expect(layer.getSource().getParams().VERSION).to.be.equal('1.1.1');
                expect(layer.getSource().getUrl()).to.be.equal('http://dummy/wms-adjusted');
                expect(layer.getOpacity()).to.be.equal(0.75);
            });
        });
    });
});
